export function getEnumKeyByEnumValue(myEnum: any, myEnumValue: any): any {
  let keys = Object.keys(myEnum).filter(x => myEnum[x] == myEnumValue);

  return keys.length > 0 ? keys[0] : null;
}
