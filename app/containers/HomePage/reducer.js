/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION } from './constants';
import * as CONSTANTS from './constants'
export const initialState = fromJS({});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CONSTANTS.GET_OWN_IP_SUCCESS:
    return Object.assign({}, state, {
      'getOwnIpSuccess': action.response
    });
    case CONSTANTS.GET_SPECIFIC_IP_FAILURE:
      return Object.assign({}, state, {
        'getOwnIpFailure': action.error
      });

    default:
      return state;
  }
}

export default homePageReducer;
