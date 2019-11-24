/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import * as CONSTANTS from './constants'
export const initialState = fromJS({});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.DEFAULT_ACTION:
      return state;
    case CONSTANTS.GET_IP_SUCCESS:
      return Object.assign({}, state, {
        'getIpSuccess': action.response
      });
    case CONSTANTS.GET_IP_FAILURE:
      return Object.assign({}, state, {
        'getIpFailure': action.error
      });

    default:
      return state;
  }
}

export default homePageReducer;
