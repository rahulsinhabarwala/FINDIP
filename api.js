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

// Hi,

// To Do:
// There's an attached screenshot of the task.
// There's an input field and display data about ip.
// Get the data using the api from https://ip.nf/
// Also, you need to put validation on the input field for checking in input as an IP.
// You may use a third party script for that.
// On initial load the data will be about the user.
// After that user can enter an IP to get details about it.

// Note:
// Try to segregate the code into components.
// Use common styles.
// Try using loop on the result to render than hardcoding the keys.
// The UI is just an example. Feel free to use your own styler and be creative.