function getAllKeys(outputArray: object[]): string[] {
  const keys: Set<string> = new Set();
  outputArray.forEach(obj => {
      Object.keys(obj).forEach(key => {
          keys.add(key);
      });
  });
  return Array.from(keys);
}

export default getAllKeys;
