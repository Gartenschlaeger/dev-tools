import { Component, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { StringBuilder } from 'src/app/helper/string-builder'
import { DockerRunEnvironmentVariable, DockerRunModel, DockerRunPortMapping } from 'src/app/models/docker-run.model'
import { FormService } from 'src/app/services/form-service.service'
import { requiredIfValidator } from 'src/app/validators/required-if.validator'

export const FormDefaultValues = new DockerRunModel()

@Component({
    selector: 'app-docker-run-page',
    templateUrl: './docker-run-page.component.html'
})
export class DockerRunPageComponent implements OnInit {
    groupScript!: FormGroup
    portMappings!: FormArray
    environmentVariables!: FormArray
    groupEnv!: FormGroup
    groupPortMapping!: FormGroup
    generatedScript: string = ''
    shareLink?: string

    constructor(private fb: FormBuilder, private route: ActivatedRoute, public formService: FormService) {}

    ngOnInit(): void {
        this.groupScript = this.defineFormGroupScript()
        this.portMappings = this.groupScript.get('portMappings') as FormArray
        this.environmentVariables = this.groupScript.get('environmentVariables') as FormArray

        this.groupEnv = this.defineFormGroupEnvVariable()
        this.groupPortMapping = this.defineFormGroupPortMappings()

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

            this.groupScript.setValue(model)

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
                    validators: [Validators.pattern('^[a-zA-Z_-]+$')]
                }),
                hostname: new FormControl(FormDefaultValues.hostname, {}),
                networkMode: new FormControl(FormDefaultValues.networkMode, {}),
                networkName: new FormControl(FormDefaultValues.networkName, {
                    validators: []
                }),
                runDettached: new FormControl(FormDefaultValues.runDettached, {}),
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

    generateScript(): string {
        const model: DockerRunModel = this.groupScript.value
        const multilineStr = model.multilineScript ? ' \\\n' : ' '

        const builder = new StringBuilder()
        builder.append('docker run')

        if (model.runDettached) {
            builder.append(model.useShortParams ? ' -d' : ' --detach')
        }

        builder.append(multilineStr)

        if (model.containerName) {
            builder.append(`--name="${model.containerName}"`, multilineStr)
        }

        if (model.hostname) {
            builder.append(`--hostname="${model.hostname}"`, multilineStr)
        }

        if (model.networkMode != 'bridge') {
            if (model.networkMode != 'custom') {
                builder.append(`--network=${model.networkMode}`, multilineStr)
            } else {
                builder.append(`--network="${model.networkName}"`, multilineStr)
            }
        }

        model.portMappings.forEach((pm) => {
            builder.append(
                model.useShortParams ? '-p' : '--publish',
                '=',
                pm.containerPort,
                ':',
                pm.hostPort,
                multilineStr
            )
        })

        model.environmentVariables.forEach((v) => {
            builder.append(model.useShortParams ? '-e' : '--env', '="', v.key, '=', v.value, '"', multilineStr)
        })

        builder.append(model.imageName, ':', model.imageTag ? model.imageTag : 'latest')

        return builder.build()
    }

    handleReset() {
        this.portMappings.clear()
        this.environmentVariables.clear()

        this.groupScript.reset()
        this.groupScript.setValue(FormDefaultValues)
        this.groupScript.markAsUntouched()

        this.groupPortMapping.reset()
        this.groupPortMapping.markAsUntouched()

        this.groupEnv.reset()
        this.groupEnv.markAsUntouched()

        this.generatedScript = ''
        this.shareLink = ''
    }

    handleGenerateScript() {
        console.debug(this.groupScript.valid, this.groupScript.value)
        if (this.formService.validateForm(this.groupScript)) {
            this.generatedScript = this.generateScript()
        }
    }

    handleShare() {
        const json = JSON.stringify(this.groupScript.value)
        const base64 = btoa(json)
        this.shareLink = `${window.location.origin}/docker-run/?s=${base64}`
    }

    handleAddEnvironment() {
        if (this.formService.validateForm(this.groupEnv)) {
            const key: string = this.groupEnv.value.key
            const val: string = this.groupEnv.value.value

            this.environmentVariables.push(
                new FormGroup({
                    key: new FormControl(key, { validators: [Validators.required] }),
                    value: new FormControl(val, { validators: [Validators.required] })
                })
            )

            this.groupEnv.reset()
        }
    }

    handleRemoveEnvVariable(index: number) {
        this.environmentVariables.removeAt(index)
    }

    handleAddPortMapping() {
        if (this.formService.validateForm(this.groupPortMapping)) {
            const containerPort = this.groupPortMapping.value.containerPort
            const hostPort = this.groupPortMapping.value.hostPort

            this.portMappings.push(
                new FormGroup({
                    containerPort: new FormControl(containerPort, { validators: [Validators.required] }),
                    hostPort: new FormControl(hostPort, { validators: [Validators.required] })
                })
            )

            this.groupPortMapping.reset()
        }
    }

    handleRemPortMapping(index: number) {
        this.portMappings.removeAt(index)
    }
}
