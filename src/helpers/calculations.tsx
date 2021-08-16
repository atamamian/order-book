// Javascript's modulus operator doesn't handle floats correctly
// This function just turns floats into strings,
// counts the decimals, converts the value and step into ints,
// and returns the correct modulus calculation.
export const floatSafeRemainder = (value: number, step: number): number => {
  const valDecCount = (value.toString().split('.')[1] || '').length;
  const stepDecCount = (step.toString().split('.')[1] || '').length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = parseInt(value.toFixed(decCount).replace('.', ''));
  const stepInt = parseInt(step.toFixed(decCount).replace('.', ''));
  return (valInt % stepInt) / Math.pow(10, decCount);
};
