import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHomePageDomain = state => state.get('homePage', initialState);

export const getOwnIpSuccess = () => createSelector( selectHomePageDomain ,substate => substate.getOwnIpSuccess);
export const getOwnIpFailure = () => createSelector( selectHomePageDomain ,substate => substate.getOwnIpFailure);

