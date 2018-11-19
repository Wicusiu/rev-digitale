type getter = (value: any) => string ;

export interface IFieldAccessor {
  name: string;
  getter?: getter;
}

export const isFieldRequired = (fieldsRequired : IFieldAccessor[], fieldName:string) : boolean => {
  const fieldRequired : IFieldAccessor = getField(fieldsRequired, fieldName) ;
  return fieldRequired != null;
};

export const isFieldAllowToUpdate = (fieldsNotAllowForUpdate: IFieldAccessor[], fieldName: string, initalValues: any): boolean => {
  const fieldNotAllowForUpdate: IFieldAccessor = getField(fieldsNotAllowForUpdate, fieldName);
  return fieldNotAllowForUpdate == null || (initalValues.hasOwnProperty(fieldName) && !getValue(fieldNotAllowForUpdate, initalValues));
};

export const getField = (fields: IFieldAccessor[], fieldName: string): IFieldAccessor => {
  const field: IFieldAccessor = fields.find((field: IFieldAccessor) => {
    return field.name === fieldName;
  });
  return field;
};

export const getValue = (field: IFieldAccessor, initalValues: any): boolean => {
  return field != null ? initalValues.hasOwnProperty(field.name) ? (typeof field.getter === 'function') ? field.getter(initalValues) : initalValues[field.name] : '' : '';
};

export const checkIfFieldsNotAllowForUpdateHaveBeenUpdated = (fieldsNotAllowForUpdate: Array<IFieldAccessor>, initalValues: any, currentValues: any): Array<IFieldAccessor> => {
  const fieldsNotAllowForUpdateUpdated = [];
  fieldsNotAllowForUpdate.map((field, index) => {
    if (getValue(field, initalValues) == null && getValue(field, currentValues) != null) {
      fieldsNotAllowForUpdateUpdated.push(field);
    }
  });

  return fieldsNotAllowForUpdateUpdated;
};
