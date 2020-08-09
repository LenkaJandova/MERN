const isEmpty = (obj) => {
  if (obj == null) return true;
  if (obj.constructor === Object) {
    return Object.entries(obj).length === 0;
  }
  if (obj.constructor === String) {
    return obj.trim().length === 0;
  }
  throw 'Unsupported operation';
};

module.exports = isEmpty;
