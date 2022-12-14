import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { FormService } from '../../../modules/shared/services/form-service.service';
import { JsonTreeParserService, TreeNode } from '../services/json-tree-parser.service';

class JsonFormatterFormModel {
    source: string = '';
    minify: boolean = false;
    stringify: boolean = false;
    viewAsTree: boolean = false;

    static default = new JsonFormatterFormModel();
}

class JsonFormatterResultModel {
    formattedValue: string = '';
    error?: string;
}

@Component({
    selector: 'app-json-formatter',
    templateUrl: './json-formatter.component.html',
    styleUrls: ['./json-formatter.component.scss']
})
export class JsonFormatterComponent implements OnInit {

    form!: UntypedFormGroup;
    result?: JsonFormatterResultModel;

    treeDataSource = new MatTreeNestedDataSource<TreeNode>();

    treeControl = new NestedTreeControl<TreeNode>(this.getChildNodes);

    constructor(private fb: UntypedFormBuilder,
                private formService: FormService,
                private treeParser: JsonTreeParserService) {
    }

    getChildNodes(node: TreeNode) {
        return node.nodes;
    }

    hasChildren(index: number, node: TreeNode) {
        return !!node.nodes?.length;
    }

    ngOnInit() {
        this.form = this.defineForm();

        // if source was passed by another page immediately start formatting
        const model: JsonFormatterFormModel = this.form.value;
        if (model.source) {
            this.handleSubmit();
        }

        this.handleViewAsTreeChanged(this.form.value.viewAsTree);
    }

    defineForm(): UntypedFormGroup {
        const source = (history.state.source as string) || JsonFormatterFormModel.default.source;
        return this.fb.group({
            source: [source, [Validators.required]],
            minify: [JsonFormatterFormModel.default.minify],
            stringify: [JsonFormatterFormModel.default.stringify],
            viewAsTree: [JsonFormatterFormModel.default.viewAsTree]
        });
    }

    handleReset() {
        this.formService.reset(this.form, JsonFormatterFormModel.default);
        this.result = undefined;
        this.handleViewAsTreeChanged(JsonFormatterFormModel.default.viewAsTree);
    }

    handleSubmit() {
        if (this.formService.validate(this.form)) {
            const model = this.form.value;

            try {
                if (model.viewAsTree) {
                    const tree = this.treeParser.parse(model.source);
                    this.treeDataSource.data = tree.nodes!;
                    this.result = undefined;
                } else {
                    this.treeDataSource.data = [];

                    let parsedValue = JSON.parse(model.source);
                    if (typeof parsedValue !== 'object') {
                        parsedValue = JSON.parse(parsedValue);
                    }

                    let res;
                    if (model.minify || model.stringify) {
                        res = JSON.stringify(parsedValue);
                    } else {
                        res = JSON.stringify(parsedValue, null, '  ');
                    }

                    if (model.stringify) {
                        res = JSON.stringify(res);
                    }

                    this.result = {
                        formattedValue: res,
                        error: undefined
                    };
                }
            } catch (err) {
                this.result = {
                    formattedValue: '',
                    error: 'Failed to format JSON'
                };

                if (err instanceof Error) {
                    this.result.error = err.message;
                }
            }
        }
    }

    private handleViewAsTreeChanged(isChecked: boolean) {
        if (isChecked) {
            this.form.get('minify')?.disable();
            this.form.get('stringify')?.disable();
        } else {
            this.form.get('minify')?.enable();
            this.form.get('stringify')?.enable();
        }
    }

    public handleViewAsTreeChange(event: MatCheckboxChange) {
        this.handleViewAsTreeChanged(event.checked);
    }
}
