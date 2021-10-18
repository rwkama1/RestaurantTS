"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DTOCategory_1 = require("../../../shared/entity/DTOCategory");
const logicexception_1 = require("../../../shared/exceptions/logicexception");
class LogicCategory {
    _name;
    _description;
    //GETTERS
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    //SETTERS
    set name(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The name cannot be empty");
        }
        this._name = value;
    }
    set description(value) {
        if (value.trim() === "") {
            throw new logicexception_1.LogicException("The description cannot be empty");
        }
        this._description = value;
    }
    register = async () => {
        return this.getDTO();
    };
    update = async (description) => {
        this.description = description;
        return this.getDTO();
    };
    getDTO = () => {
        let dtocategory = new DTOCategory_1.default(this.name, this.description);
        return dtocategory;
    };
    constructor(pname, pdescription) {
        this.name = pname;
        this.description = pdescription;
    }
}
exports.default = LogicCategory;
//# sourceMappingURL=LCategory.js.map