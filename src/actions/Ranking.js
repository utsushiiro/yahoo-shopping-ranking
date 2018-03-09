import fetchJsonp from 'fetch-jsonp';
import qs from 'qs';

const API_URL = 'https://shopping.yahooapis.jp/ShoppingWebService/V1/json/categoryRanking';
const API_ID = 'dj00aiZpPWRZMlFMTExjelhXSiZzPWNvbnN1bWVyc2VjcmV0Jng9MzM-';

const startRequest = categoryId => ({
  type: 'START_REQUEST',
  payload: { categoryId }
});

const receiveRequest = (categoryId, err, response) => ({
  type: 'RECEIVE_REQUEST',
  payload: { categoryId, err, response }
});

const finishRequest = categoryId => ({
  type: 'FINISH_REQUEST',
  payload: { categoryId }
});

export const fetchRanking = categoryId => {
  return async dispatch => {
    dispatch(startRequest(categoryId));

    const queryString = qs.stringify({
      appid: API_ID,
      category_id: categoryId
    });

    try{
      const response = await fetchJsonp(`${API_URL}?${queryString}`);
      const data = await response.json();
      dispatch(receiveRequest(categoryId, null, data));
    }catch (err){
      dispatch(receiveRequest(categoryId, err, null));
    }
    dispatch(finishRequest(categoryId));
  };
};