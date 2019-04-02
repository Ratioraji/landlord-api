module.exports = {
  sendJSONResponse(res, status, content) {
    res.status(status);
    res.json(content);
  },
  catchErrors(fn){
    return function (req, res, next) {
      return fn(req, res, next).catch(next);
    };
  }
};