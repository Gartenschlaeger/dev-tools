export class DockerRunModel {
    imageName: string = ''
    imageTag: string = ''
    containerName: string = ''
    runDettached: boolean = true
    hostname: string = ''
    networkMode: DockerRunNetworkMode = 'bridge'
    networkName: string = ''
    portMappings: DockerRunPortMapping[] = []
    environmentVariables: DockerRunEnvironmentVariable[] = []
    useShortParams: boolean = true
    multilineScript: boolean = true
}

export interface DockerRunPortMapping {
    containerPort: number
    hostPort: number
}

export interface DockerRunEnvironmentVariable {
    key: string
    value: string
}

export type DockerRunNetworkMode = 'none' | 'bridge' | 'host' | 'custom'
