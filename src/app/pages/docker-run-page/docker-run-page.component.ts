import { Component, OnInit, ViewChild } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { FormTextfieldComponent } from 'src/app/modules/form/components/form-textfield/form-textfield.component'
import { FormService } from 'src/app/modules/form/services/form-service.service'
import { requiredIfValidator } from 'src/app/modules/form/validators/required-if.validator'
import { LoggingService } from 'src/app/modules/shared/services/logging.service'
import { PageComponent } from 'src/app/pages/PageComponent'
import { StringBuilder } from 'src/app/utilities/string-builder'

export class DockerRunModel {
	imageName: string = ''
	imageTag: string = ''
	containerName: string = ''
	runDettached: boolean = true
	volumeMappings: DockerRunVolumeMapping[] = []
	restartMode: 'no' | 'always' | 'unless-stopped' = 'no'
	hostname: string = ''
	networkMode: DockerRunNetworkMode = 'bridge'
	networkName: string = ''
	portMappings: DockerRunPortMapping[] = []
	environmentVariables: DockerRunEnvironmentVariable[] = []
	useShortParams: boolean = true
	multilineScript: boolean = true
}

export interface DockerRunPortMapping {
	hostPort: number
	containerPort: number
}

export interface DockerRunVolumeMapping {
	hostPath: string
	containerPath: string
}

export interface DockerRunEnvironmentVariable {
	key: string
	value: string
}

export type DockerRunNetworkMode = 'none' | 'bridge' | 'host' | 'custom'

export const FormDefaultValues = new DockerRunModel()

@Component({
	selector: 'app-docker-run-page',
	templateUrl: './docker-run-page.component.html'
})
export class DockerRunPageComponent extends PageComponent implements OnInit {
	@ViewChild('inputContainerPort') inputContainerPort!: FormTextfieldComponent
	@ViewChild('inputEnvironmentKey') inputEnvironmentKey!: FormTextfieldComponent
	@ViewChild('inputVolumeHostPath') inputVolumeHostPath!: FormTextfieldComponent

	form!: FormGroup
	formAddEnvVariable!: FormGroup
	environmentVariables!: FormArray
	formAddPortMapping!: FormGroup
	portMappings!: FormArray
	formAddVolumeMapping!: FormGroup
	volumeMappings!: FormArray
	generatedScript: string = ''
	shareLink?: string

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private logger: LoggingService,
		private fb: FormBuilder,
		public formService: FormService
	) {
		super(route)
	}

	ngOnInit(): void {
		this.form = this.defineFormGroupScript()

		this.form.valueChanges.subscribe(() => {
			if (this.generatedScript) {
				// automatically refresh the script if the user has already clicked on generate
				this.handleSubmit()
			}
		})

		this.portMappings = this.form.get('portMappings') as FormArray
		this.environmentVariables = this.form.get('environmentVariables') as FormArray
		this.volumeMappings = this.form.get('volumeMappings') as FormArray

		this.formAddEnvVariable = this.defineFormGroupEnvVariable()
		this.formAddPortMapping = this.defineFormGroupPortMappings()
		this.formAddVolumeMapping = this.defineFormAddVolumeMapping()

		// reload settings from share query
		this.route.queryParams.subscribe((params: any) => {
			if (params.s) {
				this.handleShareQuery(params.s)
			}
		})
	}

	handleShareQuery(query: string) {
		this.logger.debug('found share query string')

		try {
			const model: DockerRunModel = JSON.parse(atob(query))
			this.logger.debug('deserialized share query', model)

			model.portMappings.forEach((i) => this.addPortMapping(i))
			model.environmentVariables.forEach((i) => this.addEnvironmentVariable(i))
			model.volumeMappings.forEach((i) => this.addVolumeMapping(i))

			this.form.setValue(model)

			this.handleSubmit()
		} catch (err) {
			this.logger.error('failed to restore shared state', err)
		}
	}

	addPortMapping(value: DockerRunPortMapping) {
		this.portMappings.push(
			new FormGroup({
				containerPort: new FormControl(value.containerPort, { validators: [Validators.required] }),
				hostPort: new FormControl(value.hostPort, { validators: [Validators.required] })
			})
		)
	}

	addEnvironmentVariable(value: DockerRunEnvironmentVariable) {
		this.environmentVariables.push(
			new FormGroup({
				key: new FormControl(value.key, { validators: [Validators.required] }),
				value: new FormControl(value.value, { validators: [Validators.required] })
			})
		)
	}

	addVolumeMapping(value: DockerRunVolumeMapping) {
		this.volumeMappings.push(
			new FormGroup({
				hostPath: new FormControl(value.hostPath, {}),
				containerPath: new FormControl(value.containerPath, {})
			})
		)
	}

	defineFormGroupScript(): FormGroup {
		return this.fb.group(
			{
				imageName: new FormControl(FormDefaultValues.imageName, {
					validators: [Validators.required]
				}),
				imageTag: new FormControl(FormDefaultValues.imageTag, {
					validators: []
				}),
				containerName: new FormControl(FormDefaultValues.containerName, {
					validators: [Validators.pattern('^[a-zA-Z0-9_-]+$')]
				}),
				volumeMappings: this.fb.array([]),
				hostname: new FormControl(FormDefaultValues.hostname, {
					validators: [Validators.pattern('^[a-zA-Z0-9_-]+$')]
				}),
				networkMode: new FormControl(FormDefaultValues.networkMode, {}),
				networkName: new FormControl(FormDefaultValues.networkName, {
					validators: []
				}),
				runDettached: new FormControl(FormDefaultValues.runDettached, {}),
				restartMode: new FormControl(FormDefaultValues.restartMode, {}),
				multilineScript: new FormControl(FormDefaultValues.multilineScript, {}),
				useShortParams: new FormControl(FormDefaultValues.useShortParams, {}),
				environmentVariables: this.fb.array([]),
				portMappings: this.fb.array([])
			},
			{ validators: [requiredIfValidator('networkMode', 'custom', 'networkName')] }
		)
	}

	defineFormGroupEnvVariable(): FormGroup {
		return new FormGroup({
			key: new FormControl('', {
				validators: [Validators.required]
			}),
			value: new FormControl('', {
				validators: [Validators.required]
			})
		})
	}

	defineFormGroupPortMappings(): FormGroup {
		return new FormGroup({
			containerPort: new FormControl(null, {
				validators: [Validators.required, Validators.pattern('\\d+')]
			}),
			hostPort: new FormControl(null, {
				validators: [Validators.required, Validators.pattern('\\d+')]
			})
		})
	}

	defineFormAddVolumeMapping(): FormGroup {
		return new FormGroup({
			hostPath: new FormControl(null, {}),
			containerPath: new FormControl(null, {})
		})
	}

	generateScript(): string {
		this.logger.debug('generateScript')

		const model: DockerRunModel = this.form.value
		const multilineStr = model.multilineScript ? ' \\\n' : ' '

		const builder = new StringBuilder()
		builder.append('docker run')

		if (model.runDettached) {
			builder.append(model.useShortParams ? ' -d' : ' --detach')
		}

		builder.append(multilineStr)

		if (model.containerName) {
			builder.append(`--name "${model.containerName}"`, multilineStr)
		}

		if (model.hostname) {
			builder.append(`--hostname "${model.hostname}"`, multilineStr)
		}

		if (model.restartMode !== 'no') {
			builder.append(`--restart ${model.restartMode}`, multilineStr)
		}

		if (model.networkMode != 'bridge') {
			if (model.networkMode != 'custom') {
				builder.append(`--network ${model.networkMode}`, multilineStr)
			} else {
				builder.append(`--network "${model.networkName}"`, multilineStr)
			}
		}

		model.portMappings.forEach((pm) => {
			builder.append(
				model.useShortParams ? '-p' : '--publish',
				' ',
				pm.hostPort,
				':',
				pm.containerPort,
				multilineStr
			)
		})

		model.volumeMappings.forEach((vm) => {
			builder.append(
				model.useShortParams ? '-v' : '--volume',
				' ',
				vm.hostPath,
				':',
				vm.containerPath,
				multilineStr
			)
		})

		model.environmentVariables.forEach((v) => {
			const escapedValue = v.value.replace(/"/, `\\"`)
			builder.append(model.useShortParams ? '-e' : '--env', ' "', v.key, '=', escapedValue, '"', multilineStr)
		})

		builder.append(model.imageName, ':', model.imageTag ? model.imageTag : 'latest')

		return builder.build()
	}

	handleReset() {
		this.portMappings.clear()
		this.environmentVariables.clear()
		this.volumeMappings.clear()

		this.form.reset()
		this.form.setValue(FormDefaultValues)
		this.form.markAsUntouched()

		this.formAddPortMapping.reset()
		this.formAddPortMapping.markAsUntouched()

		this.formAddEnvVariable.reset()
		this.formAddEnvVariable.markAsUntouched()

		this.generatedScript = ''
		this.shareLink = ''

		this.router.navigate(['.'], { relativeTo: this.route, queryParams: {} })
	}

	handleSubmit() {
		this.logger.debug(this.form, this.form.valid, this.form.errors)

		if (this.formService.validateForm(this.form)) {
			this.generatedScript = this.generateScript()
		}
	}

	handleShare() {
		this.logger.debug('handleShare')

		const json = JSON.stringify(this.form.value)
		const base64 = btoa(json)
		this.shareLink = `${window.location.origin}/docker-run/?s=${base64}`
	}

	handleAddEnvironment() {
		if (this.formService.validateForm(this.formAddEnvVariable)) {
			const key: string = this.formAddEnvVariable.value.key
			const value: string = this.formAddEnvVariable.value.value
			this.addEnvironmentVariable({ key, value })

			this.inputEnvironmentKey.focus()
			this.formAddEnvVariable.reset()
		}
	}

	handleRemoveEnvVariable(index: number) {
		this.environmentVariables.removeAt(index)
	}

	handleAddPortMapping() {
		if (this.formService.validateForm(this.formAddPortMapping)) {
			const containerPort = this.formAddPortMapping.value.containerPort
			const hostPort = this.formAddPortMapping.value.hostPort
			this.addPortMapping({ containerPort, hostPort })

			this.inputContainerPort.focus()
			this.formAddPortMapping.reset()
		}
	}

	handleRemPortMapping(index: number) {
		this.portMappings.removeAt(index)
	}

	handleAddVolumeMapping() {
		if (this.formService.validateForm(this.formAddVolumeMapping)) {
			const hostPath: string = this.formAddVolumeMapping.value.hostPath
			const containerPath: string = this.formAddVolumeMapping.value.containerPath
			this.addVolumeMapping({ hostPath, containerPath })

			this.inputVolumeHostPath.focus()
			this.formAddVolumeMapping.reset()
		}
	}

	handleRemoveVolumeMapping(index: number) {
		this.volumeMappings.removeAt(index)
	}
}
