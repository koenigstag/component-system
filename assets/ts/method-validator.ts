
export const validators = {
  number: Yup.number().required('param is required'),
  '?number': Yup.number(),
  string: Yup.string().required('param is required'),
  '?string': Yup.string(),
  boolean: Yup.boolean().required('param is required'),
  '?boolean': Yup.boolean(),
};

function MethodValidator() {
  this.params = [];
  this.validate = (...args) => {
    args.forEach((v, i) => {
      if (this.params[i]) {
        this.params[i].validateSync(v, { strict: true });
      }
    });
  };
}

export function ValidateClass(constructor) {
  class ValidatedClass extends constructor {}

  // static methods
  for (const validator in constructor.validation?.methods) {
    ValidatedClass[validator] = function (...args) {
      ValidatedClass.validation.methods[validator].validate(...args);
      constructor[validator](...args);
    };
  }

  // prototype methods
  for (const validator in constructor.prototype.validation?.methods) {
    ValidatedClass.prototype[validator] = function (...args) {
      ValidatedClass.prototype.validation.methods[validator].validate(...args);
      constructor.prototype[validator](...args);
    };
  }

  return ValidatedClass;
}

export function type(typeString) {
  return function (target, method, paramIndex) {
    if (!target.validation) {
      target.validation = { props: {}, methods: {} };
    }

    if (!target.validation.methods[method]) {
      target.validation.methods[method] = new MethodValidator();
    }

    target.validation.methods[method].params[paramIndex] =
      validators[typeString];
  };
}

export function IsNumber() {
  return type('number');
}

export function IsString() {
  return type('string');
}

export function IsBoolean() {
  return type('boolean');
}
