import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { StringBuilder } from 'src/app/helper/string-builder'
import { FormService } from 'src/app/services/form-service.service'
import { environment } from 'src/environments/environment'

export interface DockerRunEnvironmentVariable {
    name: string
    value: string
}

export interface DockerRunFormGroupValues {
    imageName: string
    imageLabel: string
    containerName: string
    hostname: string
    dettached: boolean
    multiline: boolean
    shortparams: boolean
}

export const FormDefaultValues: DockerRunFormGroupValues = {
    imageName: '',
    imageLabel: '',
    containerName: '',
    hostname: '',
    dettached: true,
    shortparams: true,
    multiline: false
}

@Component({
    selector: 'app-docker-run-page',
    templateUrl: './docker-run-page.component.html'
})
export class DockerRunPageComponent implements OnInit {
    groupScript!: FormGroup
    groupEnv!: FormGroup
    envVariables: DockerRunEnvironmentVariable[] = []
    generatedScript: string = ''

    constructor(public formService: FormService) {}

    ngOnInit(): void {
        this.groupScript = this.defineFormGroupScript()
        this.groupEnv = this.defineFormGroupEnvVariable()
    }

    defineFormGroupScript(): FormGroup {
        return new FormGroup({
            imageName: new FormControl(environment.dockerRunDefaults?.imageName, {
                validators: [Validators.required]
            }),
            imageLabel: new FormControl(environment.dockerRunDefaults?.imageLabel, {
                validators: []
            }),
            containerName: new FormControl(environment.dockerRunDefaults?.containerName, {
                validators: [Validators.pattern('^[a-zA-Z_-]+$')]
            }),
            hostname: new FormControl(environment.dockerRunDefaults?.hostname, {}),
            dettached: new FormControl(environment.dockerRunDefaults?.dettached, {}),
            multiline: new FormControl(environment.dockerRunDefaults?.multiline, {}),
            shortparams: new FormControl(environment.dockerRunDefaults?.shortparams, {})
        })
    }

    defineFormGroupEnvVariable(): FormGroup {
        return new FormGroup({
            name: new FormControl('', {
                validators: [Validators.required]
            }),
            value: new FormControl('', {
                validators: [Validators.required]
            })
        })
    }

    handleRemoveEnvVariable(index: number) {
        this.envVariables.splice(index, 1)
    }

    generateScript(): string {
        const imageName: string = this.groupScript.value.imageName
        const imageLabel: string = this.groupScript.value.imageLabel
        const containerName: string = this.groupScript.value.containerName
        const hostname: string = this.groupScript.value.hostname
        const multiline: boolean = this.groupScript.value.multiline
        const shortparams: boolean = this.groupScript.value.shortparams
        const dettached: boolean = this.groupScript.value.dettached

        const multilineStr = multiline ? ' \\\n' : ' '

        const builder = new StringBuilder()
        builder.append('docker run')

        if (dettached) {
            builder.append(shortparams ? ' -d' : ' --detach')
        }

        builder.append(multilineStr)

        if (containerName) {
            builder.append(`--name="${containerName}"`, multilineStr)
        }

        if (hostname) {
            builder.append(`--hostname="${hostname}"`, multilineStr)
        }

        for (let i = 0; i < this.envVariables.length; i++) {
            builder.append(
                shortparams ? '-e' : '--env',
                '="',
                this.envVariables[i].name,
                '=',
                this.envVariables[i].value,
                '"',
                multilineStr
            )
        }

        builder.append(imageName, ':', imageLabel ? imageLabel : 'latest')

        return builder.build()
    }

    handleReset() {
        this.formService.resetForm(this.groupScript)
        this.formService.resetForm(this.groupEnv)
        this.groupScript.setValue(FormDefaultValues)
        this.envVariables = []
        this.generatedScript = ''
    }

    handleGenerateScript() {
        if (this.formService.validateForm(this.groupScript)) {
            this.generatedScript = this.generateScript()
        }
    }

    handleAddEnvironment() {
        if (this.formService.validateForm(this.groupEnv)) {
            this.envVariables.push({
                name: this.groupEnv.get('name')?.value,
                value: this.groupEnv.get('value')?.value
            })

            this.groupEnv.reset()
        }
    }
}
