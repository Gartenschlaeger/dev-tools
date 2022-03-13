import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { FormService } from 'src/app/services/form-service.service'

interface DockerRunEnvironmentVariable {
    name: string
    value: string
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
            imageLabel: new FormControl('latest', {
                validators: []
            })
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
        const imageName = this.formService.getControlValue(this.groupScript, 'imageName')
        const imageLabel = this.formService.getControlValue(this.groupScript, 'imageLabel')

        let result = 'docker run \\\n'

        for (let i = 0; i < this.envVariables.length; i++) {
            result += `  -e "${this.envVariables[i].name}=${this.envVariables[i].value}" \\\n`
        }

        result += `  -d ${imageName}`
        if (imageLabel) {
            result += `:${imageLabel}`
        }

        return result
    }

    handleReset() {
        this.formService.resetForm(this.groupScript)
        this.formService.resetForm(this.groupEnv)
        this.envVariables = []
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
