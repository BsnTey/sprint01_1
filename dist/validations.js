"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationDTO = void 0;
class ValidationDTO {
    constructor(inputObj) {
        this.inputObj = inputObj;
        this.isType = (validationFiled, typeCheck, mayBeNull = false) => {
            for (const key of validationFiled) {
                const isNull = this.inputObj[key] === null;
                const typeChecks = isNull ? (mayBeNull ? false : true) : typeof this.inputObj[key] !== typeCheck;
                if (!(key in this.errorStage.checkKeys) && key in this.inputObj && typeChecks) {
                    this.errorStage.errorsMessages.push({
                        message: "the field is incorrect type",
                        field: key,
                    });
                    this.errorStage.checkKeys.push(key);
                }
            }
        };
        this.getErrorArray = () => {
            return {
                errorsMessages: this.errorStage.errorsMessages,
            };
        };
        this.isNotNullable = (validationFiled) => {
            for (const key of validationFiled) {
                if (!(key in this.errorStage.checkKeys) && !(key in this.inputObj)) {
                    this.errorStage.errorsMessages.push({
                        message: "the field is missing",
                        field: key,
                    });
                    this.errorStage.checkKeys.push(key);
                }
            }
            return this;
        };
        this.isString = (validationFiled) => {
            this.isType(validationFiled, "string");
            return this;
        };
        this.isBoolean = (validationFiled) => {
            this.isType(validationFiled, "boolean");
            return this;
        };
        this.isNumber = (validationFiled, mayBeNull = false) => {
            this.isType(validationFiled, "number", mayBeNull);
            return this;
        };
        this.isFieldsCorrectArray = (validationFiled, confirmType) => {
            if (!(validationFiled in this.errorStage.checkKeys) && validationFiled in this.inputObj) {
                if (!Array.isArray(this.inputObj[validationFiled]) || !this.inputObj[validationFiled].every((value) => confirmType.includes(value))) {
                    this.errorStage.errorsMessages.push({
                        message: "the field is incorrect type",
                        field: validationFiled,
                    });
                    this.errorStage.checkKeys.push(validationFiled);
                }
            }
            return this;
        };
        this.isMaxLength = (objSchemaLength) => {
            const keys = this.getKeys(objSchemaLength);
            for (const key of keys) {
                if (key in this.errorStage.checkKeys && key in this.inputObj && this.inputObj[key].length > objSchemaLength[key]) {
                    this.errorStage.errorsMessages.push({
                        message: `the field must have a length less than ${objSchemaLength[key]}`,
                        field: key,
                    });
                    this.errorStage.checkKeys.push(key);
                }
            }
            return this;
        };
        this.isMinMax = (objSchemaLength, mayBeNull = false) => {
            const keys = this.getKeys(objSchemaLength);
            for (const key of keys) {
                const isNull = this.inputObj[key] === null;
                const typeChecks = isNull ? (mayBeNull ? false : true) : this.inputObj[key] < objSchemaLength[key][0] || this.inputObj[key] > objSchemaLength[key][1];
                if (!(key in this.errorStage.checkKeys) && key in this.inputObj && typeChecks) {
                    this.errorStage.errorsMessages.push({
                        message: `the field must have been between ${objSchemaLength[key][0]} and ${objSchemaLength[key][1]}`,
                        field: key,
                    });
                    this.errorStage.checkKeys.push(key);
                }
            }
            return this;
        };
        this.keysInputObj = this.getKeys(inputObj);
        this.errorStage = {
            checkKeys: [],
            errorsMessages: [],
        };
    }
    getKeys(obj) {
        return Object.keys(obj);
    }
}
exports.ValidationDTO = ValidationDTO;
