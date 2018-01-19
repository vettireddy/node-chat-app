const expect = require('expect');
var {isRealString} = require('./validations');

describe('isRealString', () => {
  it('Should return true if given a proper string input', () => {
    var str = 'test-string';
    var result = isRealString(str);
    expect(result).toBeTruthy();
  });

  it('Should return false if given a non-string input', () => {
    var str = 23;
    var result = isRealString(str);
    expect(result).toBeFalsy();
  });

  it('Should return false if given spaces as input', () => {
    var str = '     ';
    var result = isRealString(str);
    expect(result).toBeFalsy();
  })
})