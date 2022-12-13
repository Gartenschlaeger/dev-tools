import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FormService } from '../../../modules/shared/services/form-service.service';
import { JsonTreeParserService, TreeNode } from '../services/json-tree-parser.service';

class JsonFormatterFormModel {
    source: string = '';
    minify: boolean = false;
    stringify: boolean = false;
    viewAsTree: boolean = false;
}

class JsonFormatterResultModel {
    formattedValue: string = '';
    treeNode?: TreeNode;
    error?: string;
}

const FormDefaults = new JsonFormatterFormModel();

interface CustomFlatNode {
    name: string;
    level: number;
    expandable: boolean;
}

@Component({
    selector: 'app-json-formatter',
    templateUrl: './json-formatter.component.html'
})
export class JsonFormatterComponent implements OnInit {

    form!: UntypedFormGroup;
    result?: JsonFormatterResultModel;

    private getNodeName(node: TreeNode): string {
        switch (node.type) {
            case 'string':
                return `${node.name} = "${node.value}"`;
            case 'boolean':
                return `${node.name} = ${node.value ? 'true' : 'false'}`;
            default:
                if (node.value) {
                    return `${node.name} = ${node.value}`;
                }
                return node.name;
        }
    }

    private _transformer = (node: TreeNode, level: number) => {
        return {
            name: this.getNodeName(node),
            expandable: node.nodes && node.nodes.length > 0 || false,
            level: level
        };
    };

    treeControl = new FlatTreeControl<CustomFlatNode>(
        node => node.level,
        node => node.expandable
    );

    treeFlattener = new MatTreeFlattener(
        this._transformer,
        node => node.level,
        node => node.expandable,
        node => node.nodes
    );

    treeDataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    hasChild = (_: number, node: CustomFlatNode) => node.expandable;

    constructor(private fb: UntypedFormBuilder,
                private formService: FormService,
                private treeParser: JsonTreeParserService) {
    }

    ngOnInit() {
        this.form = this.defineForm();

        // if source was passed by another page immediately start formatting
        const model: JsonFormatterFormModel = this.form.value;
        if (model.source) {
            this.handleSubmit();
        }
    }

    defineForm(): UntypedFormGroup {
        const source = (history.state.source as string) || FormDefaults.source;
        return this.fb.group({
            source: [source, [Validators.required]],
            minify: [FormDefaults.minify],
            stringify: [FormDefaults.stringify],
            viewAsTree: [FormDefaults.viewAsTree]
        });
    }

    handleReset() {
        this.formService.reset(this.form, FormDefaults);
        this.result = undefined;
        this.treeDataSource.data = [];
        this.handleViewAsTreeChanged(FormDefaults.viewAsTree);
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
