export function getEnumByKey(value: any, key: any) {
  if (value != null && value != '') {
    // @ts-ignore
    return key[value];
  } else {
    return null;
  }
}
