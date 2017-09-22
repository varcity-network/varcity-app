import req from 'superagent';
require('dotenv').config();
const SEARCH_API_URL = process.env.REACT_APP_SEARCH_API_URL || '/api/search';

export default {
  search({ payload }) {
    return req
      .post(`${SEARCH_API_URL}`)
      .send(payload)
      .then(searchResults => {
        return searchResults.body;
      });
  }
};
