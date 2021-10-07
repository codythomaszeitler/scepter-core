import { FunctionValue } from "./function.value";
import { NodeUser } from "./node.user";
import { Node } from './node';
import { Currency } from './currency';
import { NodeRequirement } from "./node.requirement";


export class FunctionHeaderColumn implements FunctionValue {

    private node: Node;
    private headerName: string;

    public constructor(node: Node, headerName: string) {
        this.node = node;
        this.headerName = headerName;
    }

    public get(nodeUser: NodeUser) {
        const categories = nodeUser.getNode(this.node).getLinkedCategories();

        let currency = new Currency(0);
        for (let category of categories) {
            currency = currency.add(nodeUser.rollup(category, this.headerName));
        }
        return currency.getAmount();
    }

    public requirements() {
        return new NodeRequirement([], [], []);
    }

    public view() {
        return this.headerName;
    }
}