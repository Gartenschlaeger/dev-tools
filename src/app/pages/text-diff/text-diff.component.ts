import { Component } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'
import { FormService } from '../../modules/form/services/form-service.service'
import { DiffPart } from './entities/DiffPart'
import { DiffTableRowResult } from './entities/DiffTableRowResult'
import { TextDiffService } from './services/text-diff-service'

class TextDiffFormModel {
	left: string = ''
	right: string = ''
	isSideBySideMode: boolean = true
}

const FormDefaults = new TextDiffFormModel()

@Component({
	selector: 'app-text-diff',
	templateUrl: './text-diff.component.html',
	styleUrls: ['./text-diff.component.css']
})
export class TextDiffComponent {
	form!: UntypedFormGroup

	hasCompared: boolean = false
	isSideBySideMode: boolean = true
	tableRows?: DiffTableRowResult[]
	tableRowsLineByLine?: DiffTableRowResult[]
	diffsCount?: number
	filteredTableRows?: DiffTableRowResult[]
	filteredTableRowsLineByLine?: DiffTableRowResult[]

	constructor(private fb: UntypedFormBuilder, private formService: FormService, private textDiffService: TextDiffService) {
		this.form = this.defineForm()
	}

	defineForm(): UntypedFormGroup {
		return this.fb.group({
			left: [FormDefaults.left, [Validators.required]],
			right: [FormDefaults.right, [Validators.required]],
			isSideBySideMode: [FormDefaults.isSideBySideMode]
		})
	}

	trackTableRows(index: number, row: DiffTableRowResult): string | undefined {
		if (row && row.leftContent) {
			return row.leftContent.lineContent
		} else if (row && row.rightContent) {
			return row.rightContent.lineContent
		}
		return undefined
	}

	trackDiffs(index: number, diff: DiffPart): string | undefined {
		return diff && diff.content ? diff.content : undefined
	}

	async handleSubmit() {
		if (this.formService.validate(this.form)) {
			const model: TextDiffFormModel = this.form.value

			this.tableRows = await this.textDiffService.getDiffsByLines(model.left, model.right)
			this.tableRowsLineByLine = this.tableRows.reduce(
				(tableLineByLine: DiffTableRowResult[], row: DiffTableRowResult) => {
					if (!tableLineByLine) {
						tableLineByLine = []
					}

					if (row.hasDiffs) {
						if (row.leftContent) {
							tableLineByLine.push({
								leftContent: row.leftContent,
								rightContent: undefined,
								belongTo: row.belongTo,
								hasDiffs: true,
								numDiffs: row.numDiffs
							})
						}

						if (row.rightContent) {
							tableLineByLine.push({
								leftContent: undefined,
								rightContent: row.rightContent,
								belongTo: row.belongTo,
								hasDiffs: true,
								numDiffs: row.numDiffs
							})
						}
					} else {
						tableLineByLine.push(row)
					}

					return tableLineByLine
				},
				[]
			)

			this.diffsCount = this.tableRows.filter((row) => row.hasDiffs).length
			this.filteredTableRows = this.tableRows
			this.filteredTableRowsLineByLine = this.tableRowsLineByLine
			this.isSideBySideMode = model.isSideBySideMode
			this.hasCompared = true
		}
	}

	handleReset() {
		this.formService.reset(this.form, FormDefaults)
		this.hasCompared = false
	}
}
