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
    groupEnv!: FormGroup
    groupScript!: FormGroup
    environmentVariables: DockerRunEnvironmentVariable[] = []
    script: string = ''
    isScriptVisible: boolean = false

    constructor(public formService: FormService) {}

    ngOnInit(): void {
        this.groupScript = this.defineFormGroupScript()
        this.groupEnv = this.defineFormGroupEnvironmentVariable()
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

    defineFormGroupEnvironmentVariable(): FormGroup {
        return new FormGroup({
            name: new FormControl('', {
                validators: [Validators.required]
            }),
            value: new FormControl('', {
                validators: [Validators.required]
            })
        })
    }

    addEnvironmentVariableHandler() {}

    removeEnvironmentVariableHandler(index: number) {
        this.environmentVariables.splice(index, 1)
    }

    generateScript(): string {
        const imageName = this.formService.getControlValue(this.groupScript, 'imageName')
        const imageLabel = this.formService.getControlValue(this.groupScript, 'imageLabel')

        let result = 'docker run \\\n'

        for (let i = 0; i < this.environmentVariables.length; i++) {
            result += `  -e "${this.environmentVariables[i].name}=${this.environmentVariables[i].value}" \\\n`
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
        this.environmentVariables = []
    }

    handleGenerateScript() {
        if (this.formService.validateForm(this.groupScript)) {
            this.script = this.generateScript()
            this.isScriptVisible = true
        }
    }

    handleAddEnvironment() {
        if (this.formService.validateForm(this.groupEnv)) {
            this.environmentVariables.push({
                name: this.groupEnv.get('name')?.value,
                value: this.groupEnv.get('value')?.value
            })

            this.groupEnv.reset()
        }
    }
}
