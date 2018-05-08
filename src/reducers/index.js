import { ADD_WATCHLIST, DELETE_WATCHLIST, CLEAR_WATCHLISTS } from '../constants';

const watchlist = (action) => {
  let { query} = action;
  return {
    id: Math.random(),
    query
  }
}



const watchlists = (state = [], action) => {
  let watchlists = null;
  switch(action.type) {
    case ADD_WATCHLIST:
      watchlists = [...state, watchlist(action)];
    
      return watchlists;
    default:
      return state;
  }
}

export default watchlists;
