import { ADD_WATCHLIST, DELETE_WATCHLIST, CLEAR_WATCHLISTS } from '../constants';

export const addWatchlist = (query) => {
  const action = {
    type: ADD_WATCHLIST,
    query
  }
  console.log('action in addWatchlist', action);
  return action;
}
