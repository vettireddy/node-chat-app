const expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message.js');

describe('generateMessage', () => {
  it('Should generate the correct message Object', () => {
    var from = 'test@from.com';
    var text = 'test message';
    var message = generateMessage(from, text);
    
    expect(message).toBeA('object');
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,text});
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
  });
});

describe('generateLocationMessage', () => {
  it('Should generate the location message object', () => {
    var from = 'test';
    var lat = 1;
    var lng = 1;
    var url = `https://www.google.com/maps?q=${lat},${lng}`;
    var message = generateLocationMessage(from, lat, lng);
    expect(message).toInclude({from,url});
    expect(message.from).toBe(from);
    expect(message.url).toBe(url);
    expect(message.createdAt).toBeA('number');
  });
});