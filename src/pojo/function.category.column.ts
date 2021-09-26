import { Category } from "./category";
import { FunctionValue } from "./function.value";
import { NodeUser } from "./node.user";

export class FunctionCategoryColumn implements FunctionValue {

    private category : Category;
    private headerName : string;

    public constructor(category : Category, headerName : string) {
        this.category = category;
        this.headerName = headerName;
    }

    public get(nodeUser: NodeUser) {
        const value = nodeUser.rollup(this.category, this.headerName);
        return value.getAmount();
    }
}