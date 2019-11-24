import { takeEvery } from 'redux-saga';
import { apiCallHandler } from '../../../api';
import * as CONSTANTS from './constants'
// Individual exports for testing

export function* getOwnApiAsync(action) {
  yield [apiCallHandler(action, CONSTANTS.GET_IP_SUCCESS, CONSTANTS.GET_IP_FAILURE, 'getOwnApi')];
}

export function* watcherGetOwnApiAsync() {
  yield takeEvery(CONSTANTS.GET_IP, getOwnApiAsync);
}

export default function* rootSaga() {
  yield [
    watcherGetOwnApiAsync(),
  ]
}