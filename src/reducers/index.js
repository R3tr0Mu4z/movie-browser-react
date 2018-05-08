import { ADD_WATCHLIST, DELETE_WATCHLIST, CLEAR_WATCHLISTS } from '../constants';
import { bake_cookie, read_cookie } from 'sfcookies';

const watchlist = (action) => {
  let { query} = action;
  return {
    id: Math.random(),
    query
  }
}



const watchlists = (state = [], action) => {
  let watchlists = null;
   state = read_cookie('watchlists');
  switch(action.type) {
    case ADD_WATCHLIST:
      watchlists = [...state, watchlist(action)];
      bake_cookie('watchlists', watchlists);
      return watchlists;
    default:
      return state;
  }
}

export default watchlists;
