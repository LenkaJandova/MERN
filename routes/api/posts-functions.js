module.exports = {
  deleteComment: (req, res) => {
    if (req.params.id === 1) {
      res.status(200);
    } else {
      res.status(404);
    }
  },
};
