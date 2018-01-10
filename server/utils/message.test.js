const expect = require('expect');
var {generateMessage} = require('./message.js');

describe('generateMessage', () => {
  it('Should generate the correct message Object', () => {
    var from = 'test@from.com';
    var text = 'test message';
    var message = generateMessage(from, text);
    
    expect(message).toBeA('object');
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,text});
    expect(message.from).toBe('test@from.com');
    expect(message.text).toBe('test message');
  });
});