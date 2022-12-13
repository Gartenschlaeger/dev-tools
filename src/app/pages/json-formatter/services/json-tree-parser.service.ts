import { Injectable } from '@angular/core';

export class TreeNode {
    nodes?: TreeNode[];
    value?: any;
    type?: string;
    isArrayValue?: boolean;

    constructor(public name: string) {
    }
}

@Injectable()
export class JsonTreeParserService {
    public parse(json: string): TreeNode {
        const root = new TreeNode('root');
        root.nodes = [];

        const obj = JSON.parse(json);
        this.addObjectPropertiesToNode(obj, root);

        return root;
    }

    private addChildNode(parentNode: TreeNode, childNode: TreeNode) {
        if (parentNode.nodes === undefined) {
            parentNode.nodes = [];
        }

        parentNode.nodes.push(childNode);
    }

    private addObjectPropertiesToNode(obj: any, parentNode: TreeNode) {
        const isArray = Array.isArray(obj);
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                const type = typeof value;
                switch (type) {
                    case 'boolean':
                    case 'number':
                    case 'bigint':
                    case 'string':
                    case 'undefined':
                        const valueNode = new TreeNode(key);
                        valueNode.value = value;
                        valueNode.type = type;
                        valueNode.isArrayValue = isArray;
                        this.addChildNode(parentNode, valueNode);
                        break;

                    case 'object':
                        const objNode = new TreeNode(key);
                        objNode.isArrayValue = isArray;
                        this.addChildNode(parentNode, objNode);
                        if (value === null) {
                            objNode.value = 'null';
                        } else {
                            this.addObjectPropertiesToNode(value, objNode);
                        }
                        break;

                    case 'symbol':
                        break;
                    case 'function':
                        break;
                }
            }
        }
    }
}
