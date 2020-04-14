const esLegendsApi = require('../api/esLegends');

function apiHandler(req, res) {
  esLegendsApi.getCards(req.query)
    .then(data => {
      res.json(data);
      res.end();
    })
    .catch(e => {
      console.log(e);
      res.sendStatus(500)
    });
};

module.exports = apiHandler;
