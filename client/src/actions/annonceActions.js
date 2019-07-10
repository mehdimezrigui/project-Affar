import axios from 'axios';

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  ADD_ANNONCE,
  GET_ANNONCES,
  GET_ANNONCE,
  DELETE_ANNONCE,
  POST_LOADING
} from './types';

// Add annonce
export const addAnnonce = (annonceData) => dispatch => {
  console.log('annonceData',annonceData)
  dispatch(clearErrors());
  axios
    .post('/api/annoucement', annonceData)
    .then(res =>
      dispatch({
        type: ADD_ANNONCE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get annonces
export const getAnnonces = () => dispatch => {
  dispatch(setAnnonceLoading());
  axios
    .get('/api/annoucement')
    .then(res =>
      dispatch({
        type: GET_ANNONCES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ANNONCES,
        payload: null
      })
    );
};

// Get annonce
export const getAnnonce = id => dispatch => {
  dispatch(setAnnonceLoading());
  axios
    .get(`/api/annoucement/${id}`)
    .then(res =>
      dispatch({
        type: GET_ANNONCE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ANNONCE,
        payload: null
      })
    );
};

// Delete annonce
export const deleteAnnonce = id => dispatch =>  {
  axios
    .delete(`/api/annoucement/${id}`).then(res => dispatch(getAnnonces()) )
    // .then(res =>
    //   dispatch({
    //     type: DELETE_ANNONCE,
    //     payload: id
    //   })
      
    // )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response ? err.response.data : err
      })
    );
};

 export const searchItem  = (payload) => {
  return {
    type : 'SEARCH_ITEM',
    payload
  }
}

// Set loading state
export const setAnnonceLoading = () => {
  return {
    type: POST_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
