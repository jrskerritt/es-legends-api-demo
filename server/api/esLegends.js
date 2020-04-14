const fetch = require('isomorphic-unfetch');
const queryString = require('query-string');
const esLegendsApiUrl = 'https://api.elderscrollslegends.io/v1';

// https://docs.elderscrollslegends.io/#api_v1cards_list

const defaultPageSize = 20;

/**
 * Get card data from the ESL API.
 * @param {Object} params An object containing any of the parameters supported
 *  by the ESL API. See their documentation for details.
 */
function getCards(params) {
  if (!params) {
    params = {};
  }

  if (!params.pageSize) {
    params.pageSize = defaultPageSize;
  }

  const endpoint = esLegendsApiUrl + '/cards?' + queryString.stringify(params);
  return fetch(endpoint)
    .then(r => r.json())
    .then(({ cards, _links }) => ({
      cards: cards.map(c => ({
        id: c.id,
        name: c.name,
        rarity: c.rarity,
        type: c.type,
        subtypes: c.subtypes,
        cost: c.cost,
        power: c.power,
        health: c.health,
        set: c.set.name,
        text: c.text,
        imageUrl: c.imageUrl
      })),
      nextPageUrl: _links.next && _links.next.replace(esLegendsApiUrl, '/api')
    }));
};

module.exports = {
  getCards
};
