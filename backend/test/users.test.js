const getCurrentUser = require('../routes/api/users-functions');

const mockResponse = () => {
  const res = {};
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('extract user info', () => {
  test('extract user info', () => {
    const req = { user: { id: '', name: '', email: '' } };
    const res = mockResponse();
    getCurrentUser(req, res);
    expect(res.json).toHaveBeenCalledWith({ id: '', name: '', email: '' });
  });
});
