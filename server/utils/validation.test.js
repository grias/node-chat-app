const expect = require('expect');

const isRealString = require('./validation');

describe('isRealString()', () => {
  it('Should allow non-space string', () => {
    expect(isRealString('  asd sd ')).toBe(true);
  });

  it('Should reject spaces', () => {
    expect(isRealString('     ')).toBe(false);
  });

  it('Should reject non-string values', () => {
    expect(isRealString({name: 'Chad'})).toBe(false);
  });
});
