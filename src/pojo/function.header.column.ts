import { Expression } from "./expression";
import { NodeUser } from "./node.user";
import { Currency } from './currency';
import { NodeRequirement } from "./node.requirement";

export class FunctionHeaderColumn implements Expression {

    private headerName: string;

    public constructor(headerName: string) {
        this.headerName = headerName;
    }

    public get(nodeUser: NodeUser) {
        let currency = nodeUser.rollup(this.headerName);
        return currency.getAmount();
    }

    public requirements() {
        return new NodeRequirement([], [], []);
    }

    public view() {
        return '(' + this.headerName + ')';
    }
}