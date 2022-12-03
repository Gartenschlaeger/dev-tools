import { DiffPart } from './DiffPart';

export interface DiffLineResult {
    lineNumber: number;
    prefix: string;
    lineContent: string;
    lineDiffs: DiffPart[];
}
