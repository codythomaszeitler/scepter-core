import { CategoryRequirement } from "./category.requirement";
import { FunctionRequirement } from "./function.requirement";

export class NodeRequirement {

    private categories : Array<CategoryRequirement>;
    private functions : Array<FunctionRequirement>;
    private headerNames : Array<string>;

    constructor(categories : Array<CategoryRequirement>, functions : Array<FunctionRequirement>, headerNames : Array<string>) {
        this.categories = categories;
        this.functions = functions;
        this.headerNames = headerNames;
    }

    public getCategoryRequirements() {
        return this.categories;
    }

    public getHeaderNames() {
        return this.headerNames;
    }

    public getFunctionRequirements() {
        return this.functions;
    }

    public append(requirement : NodeRequirement) {
        const categories = this.categories.slice();
        const functions = this.functions.slice();
        const headerNames = this.headerNames.slice();

        categories.push(...requirement.categories);
        functions.push(...requirement.functions);
        headerNames.push(...requirement.headerNames);

        return new NodeRequirement(
            categories,
            functions,
            headerNames
        );
    }
}
