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
