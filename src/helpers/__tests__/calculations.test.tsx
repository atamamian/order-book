import { floatSafeRemainder } from '../calculations';

describe('floatSafeRemainder(val, step)', () => {
  it('returns accurate remainder on floats', () => {
    expect(floatSafeRemainder(12345.25, 0.05)).toEqual(0);
  });
});
