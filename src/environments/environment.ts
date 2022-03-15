import { Environment } from 'src/environments/environment.interface'

export const environment: Environment = {
    production: false,
    dockerRunDefaults: {
        imageName: 'mariadb',
        imageLabel: 'v5.6',
        hostname: 'custom',
        containerName: 'database',
        dettached: true,
        multiline: true,
        shortparams: false
    }
}
