/*
 *
 * HomePage actions
 *
 */

import * as CONSTANTS from './constants';

export function defaultAction() {
  return {
    type: CONSTANTS.DEFAULT_ACTION,
  };
}

export function getOwnIpAddress () {
  return {
    type: CONSTANTS.GET_OWN_IP
  }
}
