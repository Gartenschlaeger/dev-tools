import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../../../modules/shared/services/form-service.service';
import { LoggingService } from '../../../modules/shared/services/logging.service';
import { ShareService } from '../../../modules/shared/services/share.service';
import { StringBuilder } from '../../../modules/shared/utilities/string-builder';
import { requiredIfValidator } from '../../../modules/shared/validators/required-if.validator';
import { DockerRunEnvironmentVariable } from '../entities/docker-run-environment.variable';
import { DockerRunPortMapping } from '../entities/docker-run-port.mapping';
import { DockerRunVolumeMapping } from '../entities/docker-run-volume.mapping';
import { DockerRunModel } from '../entities/docker-run.model';

export const FormDefaultValues = new DockerRunModel();

@Component({
    selector: 'app-docker-run',
    templateUrl: './docker-run.component.html'
})
export class DockerRunComponent implements OnInit {
    @ViewChild('inputContainerPort') inputContainerPort!: ElementRef<HTMLInputElement>;
    @ViewChild('inputEnvironmentKey') inputEnvironmentKey!: ElementRef<HTMLInputElement>;
    @ViewChild('inputVolumeHostPath') inputVolumeHostPath!: ElementRef<HTMLInputElement>;

    form!: UntypedFormGroup;
    formAddEnvVariable!: UntypedFormGroup;
    environmentVariables!: UntypedFormArray;
    formAddPortMapping!: UntypedFormGroup;
    portMappings!: UntypedFormArray;
    formAddVolumeMapping!: UntypedFormGroup;
    volumeMappings!: UntypedFormArray;
    generatedScript: string = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private logger: LoggingService,
        private fb: UntypedFormBuilder,
        private shareService: ShareService,
        public formService: FormService
    ) {
    }

    ngOnInit(): void {
        this.form = this.defineFormGroupScript();

        this.form.valueChanges.subscribe(() => {
            if (this.generatedScript) {
                // automatically refresh the script if the user has already clicked on generate
                this.handleSubmit();
            }
        });

        this.portMappings = this.form.get('portMappings') as UntypedFormArray;
        this.environmentVariables = this.form.get('environmentVariables') as UntypedFormArray;
        this.volumeMappings = this.form.get('volumeMappings') as UntypedFormArray;

        this.formAddEnvVariable = this.defineFormGroupEnvVariable();
        this.formAddPortMapping = this.defineFormGroupPortMappings();
        this.formAddVolumeMapping = this.defineFormAddVolumeMapping();

        // reload settings from share query
        this.route.queryParams.subscribe((params: any) => {
            if (params.s) {
                this.handleShareQuery(params.s);
            }
        });

        this.shareService.registerForShare(() => {
            return JSON.stringify(this.form.value);
        });
    }

    handleShareQuery(query: string) {
        this.logger.debug('found share query string');

        try {
            const model: DockerRunModel = JSON.parse(atob(query));
            this.logger.debug('deserialized share query', model);

            model.portMappings.forEach((i) => this.addPortMapping(i));
            model.environmentVariables.forEach((i) => this.addEnvironmentVariable(i));
            model.volumeMappings.forEach((i) => this.addVolumeMapping(i));

            this.form.setValue(model);

            this.handleSubmit();
        } catch (err) {
            this.logger.error('failed to restore shared state', err);
        }
    }

    addPortMapping(value: DockerRunPortMapping) {
        this.portMappings.push(
            new UntypedFormGroup({
                containerPort: new UntypedFormControl(value.containerPort, { validators: [Validators.required] }),
                hostPort: new UntypedFormControl(value.hostPort, { validators: [Validators.required] })
            })
        );
    }

    addEnvironmentVariable(value: DockerRunEnvironmentVariable) {
        this.environmentVariables.push(
            new UntypedFormGroup({
                key: new UntypedFormControl(value.key, { validators: [Validators.required] }),
                value: new UntypedFormControl(value.value, { validators: [Validators.required] })
            })
        );
    }

    addVolumeMapping(value: DockerRunVolumeMapping) {
        this.volumeMappings.push(
            new UntypedFormGroup({
                hostPath: new UntypedFormControl(value.hostPath, {}),
                containerPath: new UntypedFormControl(value.containerPath, {})
            })
        );
    }

    defineFormGroupScript(): UntypedFormGroup {
        return this.fb.group(
            {
                imageName: new UntypedFormControl(FormDefaultValues.imageName, {
                    validators: [Validators.required]
                }),
                imageTag: new UntypedFormControl(FormDefaultValues.imageTag, {
                    validators: []
                }),
                containerName: new UntypedFormControl(FormDefaultValues.containerName, {
                    validators: [Validators.pattern('^[a-zA-Z0-9_-]+$')]
                }),
                volumeMappings: this.fb.array([]),
                hostname: new UntypedFormControl(FormDefaultValues.hostname, {
                    validators: [Validators.pattern('^[a-zA-Z0-9_-]+$')]
                }),
                networkMode: new UntypedFormControl(FormDefaultValues.networkMode, {}),
                networkName: new UntypedFormControl(FormDefaultValues.networkName, {
                    validators: []
                }),
                runDettached: new UntypedFormControl(FormDefaultValues.runDetached, {}),
                restartMode: new UntypedFormControl(FormDefaultValues.restartMode, {}),
                multilineScript: new UntypedFormControl(FormDefaultValues.multilineScript, {}),
                useShortParams: new UntypedFormControl(FormDefaultValues.useShortParams, {}),
                environmentVariables: this.fb.array([]),
                portMappings: this.fb.array([])
            },
            { validators: [requiredIfValidator('networkMode', 'custom', 'networkName')] }
        );
    }

    defineFormGroupEnvVariable(): UntypedFormGroup {
        return new UntypedFormGroup({
            key: new UntypedFormControl('', {
                validators: [Validators.required]
            }),
            value: new UntypedFormControl('', {
                validators: [Validators.required]
            })
        });
    }

    defineFormGroupPortMappings(): UntypedFormGroup {
        return new UntypedFormGroup({
            containerPort: new UntypedFormControl(null, {
                validators: [Validators.required, Validators.pattern('\\d+')]
            }),
            hostPort: new UntypedFormControl(null, {
                validators: [Validators.required, Validators.pattern('\\d+')]
            })
        });
    }

    defineFormAddVolumeMapping(): UntypedFormGroup {
        return new UntypedFormGroup({
            hostPath: new UntypedFormControl(null, {}),
            containerPath: new UntypedFormControl(null, {})
        });
    }

    generateScript(): string {
        this.logger.debug('generateScript');

        const model: DockerRunModel = this.form.value;
        const multilineStr = model.multilineScript ? ' \\\n' : ' ';

        const builder = new StringBuilder();
        builder.append('docker run');

        if (model.runDetached) {
            builder.append(model.useShortParams ? ' -d' : ' --detach');
        }

        builder.append(multilineStr);

        if (model.containerName) {
            builder.append(`--name "${model.containerName}"`, multilineStr);
        }

        if (model.hostname) {
            builder.append(`--hostname "${model.hostname}"`, multilineStr);
        }

        if (model.restartMode !== 'no') {
            builder.append(`--restart ${model.restartMode}`, multilineStr);
        }

        if (model.networkMode != 'bridge') {
            if (model.networkMode != 'custom') {
                builder.append(`--network ${model.networkMode}`, multilineStr);
            } else {
                builder.append(`--network "${model.networkName}"`, multilineStr);
            }
        }

        model.portMappings.forEach((pm) => {
            builder.append(
                model.useShortParams ? '-p' : '--publish',
                ' ',
                pm.hostPort.toString(),
                ':',
                pm.containerPort.toString(),
                multilineStr
            );
        });

        model.volumeMappings.forEach((vm) => {
            builder.append(
                model.useShortParams ? '-v' : '--volume',
                ' ',
                vm.hostPath,
                ':',
                vm.containerPath,
                multilineStr
            );
        });

        model.environmentVariables.forEach((v) => {
            const escapedValue = v.value.replace(/"/, `\\"`);
            builder.append(model.useShortParams ? '-e' : '--env', ' "', v.key, '=', escapedValue, '"', multilineStr);
        });

        builder.append(model.imageName);
        builder.append(':');
        builder.append(model.imageTag ? model.imageTag : 'latest');

        return builder.build();
    }

    async handleReset() {
        this.portMappings.clear();
        this.environmentVariables.clear();
        this.volumeMappings.clear();

        this.formService.reset(this.form, FormDefaultValues);
        this.formService.reset(this.formAddPortMapping);
        this.formService.reset(this.formAddEnvVariable);
        this.formService.reset(this.formAddVolumeMapping);

        this.generatedScript = '';

        await this.router.navigate(['.'], { relativeTo: this.route, queryParams: {} });

        this.shareService.setEnable(false);
    }

    handleSubmit() {
        this.logger.debug(this.form, this.form.valid, this.form.errors);

        const isValid = this.formService.validate(this.form);
        if (isValid) {
            this.generatedScript = this.generateScript();
        }

        this.shareService.setEnable(isValid);
    }

    handleAddEnvironment() {
        if (this.formService.validate(this.formAddEnvVariable)) {
            const key: string = this.formAddEnvVariable.value.key;
            const value: string = this.formAddEnvVariable.value.value;
            this.addEnvironmentVariable({ key, value });

            this.inputEnvironmentKey.nativeElement.focus();
            this.formAddEnvVariable.reset();
        }
    }

    handleRemoveEnvVariable(index: number) {
        this.environmentVariables.removeAt(index);
    }

    handleAddPortMapping() {
        if (this.formService.validate(this.formAddPortMapping)) {
            const containerPort = this.formAddPortMapping.value.containerPort;
            const hostPort = this.formAddPortMapping.value.hostPort;
            this.addPortMapping({ containerPort, hostPort });

            this.inputContainerPort.nativeElement.focus();
            this.formAddPortMapping.reset();
        }
    }

    handleRemPortMapping(index: number) {
        this.portMappings.removeAt(index);
    }

    handleAddVolumeMapping() {
        if (this.formService.validate(this.formAddVolumeMapping)) {
            const hostPath: string = this.formAddVolumeMapping.value.hostPath;
            const containerPath: string = this.formAddVolumeMapping.value.containerPath;
            this.addVolumeMapping({ hostPath, containerPath });

            this.inputVolumeHostPath.nativeElement.focus();
            this.formAddVolumeMapping.reset();
        }
    }

    handleRemoveVolumeMapping(index: number) {
        this.volumeMappings.removeAt(index);
    }
}
