import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { StringBuilder } from 'src/app/helper/string-builder'
import { FormService } from 'src/app/services/form-service.service'

interface DockerRunEnvironmentVariable {
    name: string
    value: string
}

interface DockerRunFormGroupValues {
    imageName: string
    imageLabel: string
    containerName: string
    dettached: boolean
    multiline: boolean
    shortparams: boolean
}

const FormDefaultValues: DockerRunFormGroupValues = {
    imageName: '',
    imageLabel: '',
    containerName: '',
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
            imageName: new FormControl('', {
                validators: [Validators.required]
            }),
            imageLabel: new FormControl('', {
                validators: []
            }),
            containerName: new FormControl('', {
                validators: [Validators.pattern('^[a-zA-Z_-]+$')]
            }),
            dettached: new FormControl(true, {}),
            multiline: new FormControl(false, {}),
            shortparams: new FormControl(true, {})
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
