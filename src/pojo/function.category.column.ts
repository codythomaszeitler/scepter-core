import { Category } from "./category";
import { CategoryRequirement } from "./category.requirement";
import { FunctionRequirement } from "./function.requirement";
import { FunctionValue } from "./function.value";
import { NodeRequirement } from "./node.requirement";
import { NodeUser } from "./node.user";

export class FunctionCategoryColumn implements FunctionValue {

    private category : Category;
    private headerName : string;

    public constructor(category : Category, headerName : string) {
        this.category = category;
        this.headerName = headerName;
    }

    public requirements() {
        const categories = new Array<CategoryRequirement>();
        categories.push(new CategoryRequirement(
            this.category, this.headerName
        ));

        const requirements = new NodeRequirement(categories, [], []);
        return requirements;
    }

    public get(nodeUser: NodeUser) {
        const value = nodeUser.rollup(this.category, this.headerName);
        return value.getAmount();
    }

    public view() {
        return this.category.getName() + ':' + this.headerName;
    }
}