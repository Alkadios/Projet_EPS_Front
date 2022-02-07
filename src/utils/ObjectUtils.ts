export default function ObjectUtils() {
  function isObjectEmpty(obj: any) {
    return Object.keys(obj).length === 0;
  }

  function deleteNestedObject(array: Array<any>, childrenProperty: string, property: string, value: any) {
    let found = false;

    function recursive(array: Array<any>, childrenProperty: string, property: string, value: any) {
      for (const o of array) {
        if (o[property] === value) {
          const index = array.findIndex((e) => e[property] === value);
          array.splice(index, 1);
          found = true;
          return;
        }

        if (!o[childrenProperty]) continue;
        recursive(o[childrenProperty], childrenProperty, property, value);
        if (found) return;
      }
    }

    recursive(array, childrenProperty, property, value);
  }

  function setNestedProperties(
    array: Array<any>,
    childrenProperty: string,
    idProperty: string,
    values: Array<any>,
    subPropertyNameToSet: string,
    propertyNameToSet: string,
    propertyValueToSet: any
  ) {
    for (const o of array) {
      if (values.includes(o[idProperty])) {
        if (subPropertyNameToSet) o[subPropertyNameToSet][propertyNameToSet] = propertyValueToSet;
        else o[propertyNameToSet] = propertyValueToSet;
      }

      if (!o[childrenProperty]) continue;
      setNestedProperties(
        o[childrenProperty],
        childrenProperty,
        idProperty,
        values,
        subPropertyNameToSet,
        propertyNameToSet,
        propertyValueToSet
      );
    }
  }

  function findNestedObjects(
    array: Array<any>,
    childrenProperty: string,
    subProperty: string,
    property: string,
    value: any
  ) {
    const children: any[] = [];

    function recursive(array: Array<any>, childrenProperty: string, subProperty: string, property: string, value: any) {
      for (const o of array) {
        let prop;
        if (subProperty) prop = o[subProperty][property];
        else prop = o[property];

        if (prop === value) {
          children.push(o);
        }

        if (!o[childrenProperty]) continue;
        recursive(o[childrenProperty], childrenProperty, subProperty, property, value);
      }
    }

    recursive(array, childrenProperty, subProperty, property, value);
    return children;
  }

  return { isObjectEmpty, deleteNestedObject, setNestedProperties, findNestedObjects };
}
