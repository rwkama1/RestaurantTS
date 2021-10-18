"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayCategories = void 0;
class ArrayCategories {
    arraycat;
    constructor(parraycat) {
        this.arraycat = parraycat;
    }
    search = (name) => {
        let listc = this.arraycat;
        for (let c of listc) {
            if (name === c.name) {
                return c;
            }
        }
        return null;
    };
    getSort = () => {
        let listc = this.arraycat;
        const sortarray = listc.sort((a, b) => a.name.localeCompare(b.name));
        return sortarray;
    };
}
exports.ArrayCategories = ArrayCategories;
//# sourceMappingURL=LArrayCategory.js.map