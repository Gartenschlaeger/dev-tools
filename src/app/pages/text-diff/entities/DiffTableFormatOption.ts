import { DiffTableFormat } from './DiffTableFormat';

export interface DiffTableFormatOption {
    id: string;
    name: string;
    label: string;
    value: DiffTableFormat;
    icon?: string;
    disabled?: boolean;
}
