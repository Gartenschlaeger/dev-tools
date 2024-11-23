import { DockerRunEnvironmentVariable } from './docker-run-environment.variable';
import { DockerRunPortMapping } from './docker-run-port.mapping';
import { DockerRunVolumeMapping } from './docker-run-volume.mapping';

export type DockerRunNetworkMode = 'none' | 'bridge' | 'host' | 'custom';

export class DockerRunModel {
    imageName: string = '';
    imageTag: string = '';
    containerName: string = '';
    runDetached: boolean = true;
    volumeMappings: DockerRunVolumeMapping[] = [];
    restartMode: 'no' | 'always' | 'unless-stopped' = 'no';
    hostname: string = '';
    networkMode: DockerRunNetworkMode = 'bridge';
    networkName: string = '';
    portMappings: DockerRunPortMapping[] = [];
    environmentVariables: DockerRunEnvironmentVariable[] = [];
    useShortParams: boolean = true;
    multilineScript: boolean = true;
}
