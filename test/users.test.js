const getCurrentUser = require('../routes/api/users-functions');

describe('extract user info', () => {
  test('extract user info', () => {
    const req = { user: { id: '', name: '', email: '' } };
    const res = {};

    getCurrentUser(req, res);
  });
});
