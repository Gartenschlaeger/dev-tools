import { Injectable } from '@angular/core';
import { LoggingService } from '../../../modules/shared/services/logging.service';

export class TreeNode {
    parent?: TreeNode;
    nodes?: TreeNode[];
    type?: string;
    value?: any;
    isArrayValue?: boolean;

    constructor(public name: string) {}
}

@Injectable()
export class JsonTreeParserService {
    constructor(private _logger: LoggingService) {}

    public parse(json: string): TreeNode {
        const root = new TreeNode('root');
        root.nodes = [];

        const obj = JSON.parse(json);
        this.addObjectPropertiesToNode(obj, root);

        this._logger.debug(root);

        return root;
    }

    private addChildNode(parentNode: TreeNode, childNode: TreeNode) {
        childNode.parent = parentNode;

        if (parentNode.nodes === undefined) {
            parentNode.nodes = [];
        }

        parentNode.nodes.push(childNode);
    }

    private addObjectPropertiesToNode(obj: any, parentNode: TreeNode) {
        //this._logger.debug('addObjectPropertiesToNode', obj, parentNode);

        if (typeof obj === 'string') {
            obj = JSON.parse(obj);
        }

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
                        valueNode.type = type;
                        valueNode.value = value;
                        valueNode.isArrayValue = Array.isArray(obj);

                        this.addChildNode(parentNode, valueNode);
                        //this._logger.debug('valueNode', valueNode);
                        break;

                    case 'object':
                        const objNode = new TreeNode(key);
                        objNode.type = 'object';
                        objNode.isArrayValue = Array.isArray(obj);
                        if (Array.isArray(value)) {
                            objNode.type = 'array';
                        }

                        if (value === null) {
                            objNode.value = 'null';
                        } else {
                            this.addObjectPropertiesToNode(value, objNode);
                        }

                        this.addChildNode(parentNode, objNode);
                        //this._logger.debug('objNode', objNode);
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
