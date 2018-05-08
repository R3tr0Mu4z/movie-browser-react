import {ADD_WATCHLIST} from '../constants';

export const addWatchlist = (text) => {
    const action = {
        type: ADD_WATCHLIST,
        text
    }
    console.log('action watchlist', action);
    return action;
}