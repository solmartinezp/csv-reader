
function transformObject(inputObject: { [key: string]: string }): { [key: string]: string } {
  const keys: string[] = Object.keys(inputObject);
  const values: string[] = Object.values(inputObject)[0].split(';');

  return keys[0].split(';').reduce((result: { [key: string]: string }, key: string, index: number) => {
      result[key.trim().toLowerCase().replace(' ', '_')] = values[index];
      return result;
  }, {});
}

export default transformObject;
