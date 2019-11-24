// import { take, call, put, select } from 'redux-saga/effects';
import {takeEvery} from 'redux-saga';
import {apiCallHandler} from '../../../api';
import * as CONSTANTS from './constants'
// Individual exports for testing
export function* getOwnApiAsync(action) {
  console.log("action:>>saga",action)
  // See example in containers/HomePage/saga.js
  yield[apiCallHandler(action, CONSTANTS.GET_OWN_IP_SUCCESS, CONSTANTS.GET_OWN_IP_FAILURE, 'getOwnApi')];
}

export function* watcherGetOwnApiAsync(){
  yield takeEvery(CONSTANTS.GET_OWN_IP, getOwnApiAsync);
}

export default function* rootSaga(){
  yield [
    watcherGetOwnApiAsync(),
    ]
}