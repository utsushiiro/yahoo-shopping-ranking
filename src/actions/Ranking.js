import fetchJsonp from 'fetch-jsonp';
import qs from 'qs';
import { replace } from 'react-router-redux';

const API_URL = 'https://shopping.yahooapis.jp/ShoppingWebService/V1/json/categoryRanking';
const API_ID = 'dj00aiZpPWRZMlFMTExjelhXSiZzPWNvbnN1bWVyc2VjcmV0Jng9MzM-';

const startRequest = category => ({
  type: 'START_REQUEST',
  payload: { category }
});

const receiveRequest = (category, err, response) => ({
  type: 'RECEIVE_REQUEST',
  payload: { category, err, response }
});

const finishRequest = category => ({
  type: 'FINISH_REQUEST',
  payload: { category }
});

export const fetchRanking = categoryId => {
  return async (dispatch, getState) => {
    const categories = getState().shopping.categories;
    const category = categories.find(category => (category.id === categoryId));

    if (typeof category === 'undefined') {
      dispatch(replace('/'));
      return;
    }

    dispatch(startRequest(category));

    const queryString = qs.stringify({
      appid: API_ID,
      category_id: categoryId
    });

    try{
      const response = await fetchJsonp(`${API_URL}?${queryString}`);
      const data = await response.json();
      dispatch(receiveRequest(category, null, data));
    }catch (err){
      dispatch(receiveRequest(category, err, null));
    }
    dispatch(finishRequest(category));
  };
};