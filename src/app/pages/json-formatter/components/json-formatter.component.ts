import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { FormService } from '../../../modules/shared/services/form-service.service';
import { JsonTreeParserService, TreeNode } from '../services/json-tree-parser.service';

const formDefaults = {
    source: '',
    minify: false,
    stringify: false,
    viewMode: 'json'
};

interface JsonFormatterResultModel {
    formattedValue: string;
    error?: string;
    viewMode: string;
}

@Component({
    selector: 'app-json-formatter',
    templateUrl: './json-formatter.component.html',
    styleUrls: ['./json-formatter.component.scss']
})
export class JsonFormatterComponent implements OnInit {
    form = new FormGroup({
        source: new FormControl<string>(formDefaults.source, {
            validators: [Validators.required]
        }),
        minify: new FormControl<boolean>(formDefaults.minify),
        stringify: new FormControl<boolean>(formDefaults.stringify),
        viewMode: new FormControl<string>(formDefaults.viewMode, {
            nonNullable: true
        })
    });

    result?: JsonFormatterResultModel;

    treeDataSource = new MatTreeNestedDataSource<TreeNode>();
    treeControl = new NestedTreeControl<TreeNode>(this.getChildNodes);

    constructor(private formService: FormService, private treeParser: JsonTreeParserService) {}

    ngOnInit() {
        this.viewModeChanged();
        if (this.form.value.source) {
            this.handleSubmit();
        }
    }

    getChildNodes(node: TreeNode) {
        return node.nodes;
    }

    hasChildren(index: number, node: TreeNode) {
        return !!node.nodes?.length;
    }

    handleReset() {
        this.formService.reset(this.form, formDefaults);
        this.viewModeChanged();
        this.result = undefined;
        this.treeDataSource.data = [];
    }

    handleSubmit() {
        if (this.formService.validate(this.form)) {
            try {
                const tree = this.treeParser.parse(this.form.value.source!);
                this.treeDataSource.data = tree.nodes!;

                let parsedValue = JSON.parse(this.form.value.source!);
                if (typeof parsedValue !== 'object') {
                    parsedValue = JSON.parse(parsedValue);
                }

                let res;
                if (this.form.value.minify || this.form.value.stringify) {
                    res = JSON.stringify(parsedValue);
                } else {
                    res = JSON.stringify(parsedValue, null, '  ');
                }

                if (this.form.value.stringify) {
                    res = JSON.stringify(res);
                }

                this.result = {
                    formattedValue: res,
                    error: undefined,
                    viewMode: this.form.value.viewMode!
                };
            } catch (err) {
                this.result = {
                    formattedValue: '',
                    error: 'Failed to format JSON',
                    viewMode: this.form.value.viewMode!
                };

                if (err instanceof Error) {
                    this.result.error = err.message;
                }
            }
        }
    }

    private viewModeChanged() {
        if (this.form.value.viewMode! === 'json') {
            this.form.get('minify')?.enable();
            this.form.get('stringify')?.enable();
        } else {
            this.form.get('minify')?.disable();
            this.form.get('stringify')?.disable();
        }
    }

    public handleViewModeChange(event$: MatRadioChange) {
        this.form.patchValue({ viewMode: event$.value });
        this.viewModeChanged();
        if (this.result) {
            this.handleSubmit();
        }
    }

    public handleMinifyChanges() {
        if (this.result) {
            this.handleSubmit();
        }
    }

    public handleStringifyChanges() {
        if (this.result) {
            this.handleSubmit();
        }
    }
}
