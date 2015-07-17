module.exports = {
  returnResponse: function returnResponse(res) {
    return function (err, cats) {
      res.json(cats);
    };
  },

  isEmpty: function isEmpty(value) {
    return !(Boolean(value) &&
    typeof value === 'object' && Object.keys(value).length > 0);
  },

  returnResponseOrError: function returnResponseOrError(err, res, obj) {
    if (isEmpty(err)) {
      res.status(500).json(err);
    } else {
      res.status(200).json(obj);
    }
  }
};
