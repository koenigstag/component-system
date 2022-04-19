
export const createTypedObject = (object, validator = {}) => {
  return new Proxy(object,
    {
      set(target, prop, value) {
        const newObj = { ...target, [prop]: value };

        // throws an error
        validator?.validateSync?.(newObj);

        target[prop] = value;

        return true;
      },
      get(target, prop) {
        const validatorOptions = validator?.[prop];
        if (validatorOptions.private || validatorOptions.protected) {
          throw new TypeError('Cannot read private or protected field')
        }

        return target[prop];
      },
    },
  );
};

const typedVar = createTypedObject({ test: '43' },
  Yup.object({
    test: Yup.string().required(),
  }),
);

typedVar.test = '1';
