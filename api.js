import { call, put } from 'redux-saga/effects';
import axios from 'axios';
// import { ErrorCheck } from './commonUtils';

const apis = {
    "getOwnApi": "http://ipv6.ip.nf/me.json"
}


export function* apiCallHandler(action, responseConst, errorConst, apiUrlConstant, isLoading = true) {
    try {
        yield [apiTryBlockHandler(action, responseConst, apiUrlConstant, isLoading)];
    } catch (error) {
        // yield [ErrorCheck(action, error, errorConst)];
    } finally {
        // isLoading ? yield put({ type: 'hide_loader' }) : null
    }
}

function* apiTryBlockHandler(action, responseConst, apiUrlConstant, isLoading = true) {
    switch (apiUrlConstant) {
        case 'getOwnApi': {
           let url = `http://ipv4.ip.nf/me.json`
            const response = yield call(axios.get, url);
            yield put({ type: responseConst, response: response.data });
            break;
        }

        default:
            break;
    }
}
