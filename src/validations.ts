export class ValidationDTO {
  private keysInputObj: string[];
  private errorStage: any;

  constructor(private inputObj: any) {
    this.keysInputObj = this.getKeys(inputObj);
    this.errorStage = {
      checkKeys: [],
      errorArray: [],
    };
  }

  private getKeys<U extends object>(obj: U): string[] {
    return Object.keys(obj);
  }

  private isType = (validationFiled: string[], typeCheck: string, mayBeNull = false) => {
    for (const key of validationFiled) {
      const isNull = this.inputObj[key] === null;
      const typeChecks = isNull ? (mayBeNull ? false : true) : typeof this.inputObj[key] !== typeCheck;

      if (!(key in this.errorStage.checkKeys) && key in this.inputObj && typeChecks) {
        this.errorStage.errorArray.push({
          errorsMessages: [
            {
              message: "the field is incorrect type",
              field: key,
            },
          ],
        });
        this.errorStage.checkKeys.push(key);
      }
    }
  };

  getErrorArray = () => {
    return this.errorStage.errorArray;
  };

  isNotNullable = (validationFiled: string[]) => {
    for (const key of validationFiled) {
      if (!(key in this.errorStage.checkKeys) && !(key in this.inputObj)) {
        this.errorStage.errorArray.push({
          errorsMessages: [
            {
              message: "the field is missing",
              field: key,
            },
          ],
        });
        this.errorStage.checkKeys.push(key);
      }
    }

    return this;
  };

  isString = (validationFiled: string[]) => {
    this.isType(validationFiled, "string");
    return this;
  };

  isBoolean = (validationFiled: string[]) => {
    this.isType(validationFiled, "boolean");
    return this;
  };

  isNumber = (validationFiled: string[], mayBeNull = false) => {
    this.isType(validationFiled, "number", mayBeNull);
    return this;
  };

  isFieldsCorrectArray = (validationFiled: string, confirmType: string[]) => {
    if (!(validationFiled in this.errorStage.checkKeys) && validationFiled in this.inputObj) {
      if (!Array.isArray(this.inputObj[validationFiled]) || !this.inputObj[validationFiled].every((value: string) => confirmType.includes(value))) {
        this.errorStage.errorArray.push({
          errorsMessages: [
            {
              message: "the field is incorrect type",
              field: validationFiled,
            },
          ],
        });
        this.errorStage.checkKeys.push(validationFiled);
      }
    }

    return this;
  };

  isMaxLength = (objSchemaLength: Record<string, number>) => {
    const keys = this.getKeys(objSchemaLength);
    for (const key of keys) {
      console.log(key);
      console.log(this.errorStage.checkKeys);

      if (key in this.errorStage.checkKeys && key in this.inputObj && this.inputObj[key].length > objSchemaLength[key]) {
        console.log(key);
        this.errorStage.errorArray.push({
          errorsMessages: [
            {
              message: `the field must have a length less than ${objSchemaLength[key]}`,
              field: key,
            },
          ],
        });
        this.errorStage.checkKeys.push(key);
      }
    }

    return this;
  };

  isMinMax = (objSchemaLength: Record<string, [number, number]>, mayBeNull = false) => {
    const keys = this.getKeys(objSchemaLength);

    for (const key of keys) {
      const isNull = this.inputObj[key] === null;
      const typeChecks = isNull ? (mayBeNull ? false : true) : this.inputObj[key] < objSchemaLength[key][0] || this.inputObj[key] > objSchemaLength[key][1];

      if (!(key in this.errorStage.checkKeys) && key in this.inputObj && typeChecks) {
        this.errorStage.errorArray.push({
          errorsMessages: [
            {
              message: `the field must have been between ${objSchemaLength[key][0]} and ${objSchemaLength[key][1]}`,
              field: key,
            },
          ],
        });
        this.errorStage.checkKeys.push(key);
      }
    }

    return this;
  };
}
