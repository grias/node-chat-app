const expect = require('expect');

const generateMessage = require('./message');

describe('generateMessage', () => {
  it('should return correct message object', () => {
    let message = 'Test message';
    let from = 'Just me';
    let res = generateMessage(from, message);
    expect(res.text).toBe(message);
    expect(res.from).toBe(from);
    expect(res.createdAt).toExist().toBeA('number');
  });
});
