import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHomePageDomain = state => state.get('homePage', initialState);

export const getIpSuccess = () => createSelector( selectHomePageDomain ,substate => substate.getIpSuccess);
export const getIpFailure = () => createSelector( selectHomePageDomain ,substate => substate.getIpFailure);

