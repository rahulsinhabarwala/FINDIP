import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { ErrorCheck } from './commonUtils';

const apis = {
    "getOwnApi": "http://ipv6.ip.nf/me.json"
}

export function* apiCallHandler(action, responseConst, errorConst, apiUrlConstant, isLoading = true) {
    try {
        yield [apiTryBlockHandler(action, responseConst, apiUrlConstant, isLoading)];
    } catch (error) {
        yield [ErrorCheck(action, error, errorConst)];
    } finally {
        // code here
    }
}

function* apiTryBlockHandler(action, responseConst, apiUrlConstant, isLoading = true) {
    let url = 'https://ip.nf/'
    switch (apiUrlConstant) {
        case 'getOwnApi': {
            action.ipAddress ? url = `${url}${action.ipAddress}.json` : url = `${url}me.json`
            const response = yield call(axios.get, url);
            yield put({ type: responseConst, response: response.data });
            break;
        }

        default:
            break;
    }
}
