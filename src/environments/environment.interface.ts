import { DockerRunFormGroupValues } from 'src/app/pages/docker-run-page/docker-run-page.component'

export interface Environment {
    production: boolean
    dockerRunDefaults?: DockerRunFormGroupValues
}
