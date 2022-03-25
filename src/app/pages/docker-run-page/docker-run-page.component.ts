import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { StringBuilder } from 'src/app/helper/string-builder'
import { FormService } from 'src/app/services/form-service.service'
import { requiredIfValidator } from 'src/app/validators/required-if.validator'

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
export class DockerRunPageComponent implements OnInit {
	@ViewChild('inputContainerPort') inputContainerPort!: ElementRef<HTMLInputElement>
	@ViewChild('inputEnvironmentKey') inputEnvironmentKey!: ElementRef<HTMLInputElement>
	@ViewChild('inputVolumeHostPath') inputVolumeHostPath!: ElementRef<HTMLInputElement>

	form!: FormGroup
	formAddEnvVariable!: FormGroup
	environmentVariables!: FormArray
	formAddPortMapping!: FormGroup
	portMappings!: FormArray
	formAddVolumeMapping!: FormGroup
	volumeMappings!: FormArray
	generatedScript: string = ''
	shareLink?: string

	constructor(private fb: FormBuilder, private route: ActivatedRoute, public formService: FormService) {}

	ngOnInit(): void {
		this.form = this.defineFormGroupScript()
		this.portMappings = this.form.get('portMappings') as FormArray
		this.environmentVariables = this.form.get('environmentVariables') as FormArray
		this.volumeMappings = this.form.get('volumeMappings') as FormArray

		this.formAddEnvVariable = this.defineFormGroupEnvVariable()
		this.formAddPortMapping = this.defineFormGroupPortMappings()
		this.formAddVolumeMapping = this.defineFormAddVolumeMapping()

		this.route.queryParams.subscribe((params: any) => {
			if (params.s) {
				this.handleShareQuery(params.s)
			}
		})
	}

	handleShareQuery(query: string) {
		try {
			const model: DockerRunModel = JSON.parse(atob(query))

			model.environmentVariables.forEach((i) => this.addEnvironmentVariable(i))
			model.portMappings.forEach((i) => this.addPortMapping(i))

			this.form.setValue(model)

			this.handleGenerateScript()
		} catch (err) {
			console.error('failed to restore shared state', err)
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
				hostname: new FormControl(FormDefaultValues.hostname, {}),
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
			builder.append(model.useShortParams ? '-e' : '--env', ' "', v.key, '=', v.value, '"', multilineStr)
		})

		builder.append(model.imageName, ':', model.imageTag ? model.imageTag : 'latest')

		return builder.build()
	}

	handleReset() {
		this.portMappings.clear()
		this.environmentVariables.clear()

		this.form.reset()
		this.form.setValue(FormDefaultValues)
		this.form.markAsUntouched()

		this.formAddPortMapping.reset()
		this.formAddPortMapping.markAsUntouched()

		this.formAddEnvVariable.reset()
		this.formAddEnvVariable.markAsUntouched()

		this.generatedScript = ''
		this.shareLink = ''
	}

	handleGenerateScript() {
		if (this.formService.validateForm(this.form)) {
			this.generatedScript = this.generateScript()
		}
	}

	handleShare() {
		const json = JSON.stringify(this.form.value)
		const base64 = btoa(json)
		this.shareLink = `${window.location.origin}/docker-run/?s=${base64}`
	}

	handleAddEnvironment() {
		if (this.formService.validateForm(this.formAddEnvVariable)) {
			const key: string = this.formAddEnvVariable.value.key
			const val: string = this.formAddEnvVariable.value.value

			this.environmentVariables.push(
				new FormGroup({
					key: new FormControl(key, { validators: [Validators.required] }),
					value: new FormControl(val, { validators: [Validators.required] })
				})
			)

			this.inputEnvironmentKey.nativeElement.focus()
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

			this.portMappings.push(
				new FormGroup({
					hostPort: new FormControl(hostPort, { validators: [Validators.required] }),
					containerPort: new FormControl(containerPort, { validators: [Validators.required] })
				})
			)

			this.inputContainerPort.nativeElement.focus()
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

			this.volumeMappings.push(
				new FormGroup({
					hostPath: new FormControl(hostPath, {}),
					containerPath: new FormControl(containerPath, {})
				})
			)

			this.inputVolumeHostPath.nativeElement.focus()
			this.formAddVolumeMapping.reset()
		}
	}

	handleRemoveVolumeMapping(index: number) {
		this.volumeMappings.removeAt(index)
	}
}
