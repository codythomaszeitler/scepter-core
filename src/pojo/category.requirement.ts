import { Category } from "./category";


export class CategoryRequirement {

    private category : Category;
    private headerName : string;

    constructor(category : Category, headerName : string) {
        this.category = category;
        this.headerName = headerName;
    }

    public getCategory() {
        return this.category;
    }

    public getHeaderName() {
        return this.headerName;
    }
}