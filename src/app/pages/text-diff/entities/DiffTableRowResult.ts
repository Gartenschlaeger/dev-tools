import { DiffLineResult } from './DiffLineResult';
import { SideDiff } from './SideDiff';

export interface DiffTableRowResult {
    leftContent: DiffLineResult | undefined;
    rightContent: DiffLineResult | undefined;
    belongTo: SideDiff;
    hasDiffs: boolean;
    numDiffs: number;
}
