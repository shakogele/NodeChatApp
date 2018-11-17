var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct text message', () => {
    var from = 'Shalva';
    var text = "Some Message";
    var message = generateMessage(from, text);

    expect(message.createdAt).toBe('object');
    expect(message).toInclude({from,text});

  });
})
