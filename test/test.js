var assert = require('assert');
const isEmpty = require('../routes/validation/is-empty');

describe('test', function () {
  describe('isEmpty', function () {
    it('emptyObject', function () {
      assert.equal(isEmpty({}), true);
    });
    it('populatedObject', function () {
      assert.equal(isEmpty({ color: 'red' }), false);
    });
    it('emptyString', function () {
      assert.equal(isEmpty(''), true);
    });
    it('populatedString', function () {
      assert.equal(isEmpty('hello'), false);
    });
    it('Undefined', function () {
      assert.equal(isEmpty(undefined), true);
    });
    it('null', function () {
      assert.equal(isEmpty(null), true);
    });
    it('stringWithJustSpaces', function () {
      assert.equal(isEmpty('   '), true);
    });
  });
});
