type ReturnFunc = {
  value: number,
  label: number
}
function createArrayFromTo(from: number, to: number): ReturnFunc[] {
  if (from > to) {
    console.error("'From' value should be less than or equal to 'To' value.");
    return [];
  }
  let result = [];
  for (let i = from; i <= to; i++) {
    result.push({
      value: i,
      label: i,
    });
  }
  return result.reverse();
}

export { createArrayFromTo }