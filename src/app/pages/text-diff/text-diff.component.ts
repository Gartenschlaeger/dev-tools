import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { FormService } from '../../modules/form/services/form-service.service'
import { DiffPart } from './entities/DiffPart'
import { DiffTableFormat } from './entities/DiffTableFormat'
import { DiffTableRowResult } from './entities/DiffTableRowResult'
import { TextDiffService } from './services/text-diff-service'

class TextDiffFormModel {
	left: string = ''
	right: string = ''
}

const FormDefaults = new TextDiffFormModel()

@Component({
	selector: 'app-text-diff',
	templateUrl: './text-diff.component.html',
	styleUrls: ['./text-diff.component.css']
})
export class TextDiffComponent {
	form!: FormGroup

	format: DiffTableFormat = 'SideBySide'

	tableRows?: DiffTableRowResult[]
	tableRowsLineByLine?: DiffTableRowResult[]
	diffsCount?: number
	filteredTableRows?: DiffTableRowResult[]
	filteredTableRowsLineByLine?: DiffTableRowResult[]

	constructor(private fb: FormBuilder, private formService: FormService, private textDiffService: TextDiffService) {
		this.form = this.defineForm()
	}

	defineForm(): FormGroup {
		return this.fb.group({
			left: [FormDefaults.left, [Validators.required]],
			right: [FormDefaults.right, [Validators.required]]
		})
	}

	trackTableRows(index: number, row: DiffTableRowResult) {
		return row && row.leftContent
			? row.leftContent.lineContent
			: row && row.rightContent
			? row.rightContent.lineContent
			: undefined
	}

	trackDiffs(index: number, diff: DiffPart) {
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
		}
	}

	handleReset() {
		this.formService.reset(this.form, FormDefaults)
	}
}
