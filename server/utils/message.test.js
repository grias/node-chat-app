const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage()', () => {
  it('should return correct message object', () => {
    let message = 'Test message';
    let from = 'Just me';
    let res = generateMessage(from, message);
    expect(res.text).toBe(message);
    expect(res.from).toBe(from);
    expect(res.createdAt).toExist().toBeA('number');
  });
});

describe('generateLocationMessage()', () => {
  it('Should generate correct location url', () => {
    let coords = {
      lat: 10.11
    , long: -72
    };
    let res = generateLocationMessage('user1', coords.lat, coords.long);
    expect(res.url).toBe(`http://google.com/maps?q=${coords.lat},${coords.long}`);
  });
});
