import {
  ADD_ANNONCE,
  GET_ANNONCES,
  GET_ANNONCE,
  DELETE_ANNONCE,
  POST_LOADING
} from '../actions/types';

const initialState = {
  annonces: [],
  annonce: {},
  loading: false,
  search :''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "SEARCH_ITEM":
      return {
        ...state,
        search: action.payload
      };
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ANNONCES:
      return {
        ...state,
        annonces: action.payload,
        loading: false
      };
    case GET_ANNONCE:
      return {
        ...state,
        annonce: action.payload,
        loading: false
      };
    case ADD_ANNONCE:
      return {
        ...state,
        annonces: [action.payload, ...state.annonces]
      };
    case DELETE_ANNONCE:
      return {
        ...state,
        annonces: state.annonce.filter(annonce => annonce._id !== action.payload)
      };
    default:
      return state;
  }
}
