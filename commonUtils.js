
// import { put } from 'redux-saga/effects';

// export function* ErrorCheck(action, error, constant) {
//     if (error.response) {
//         if (error.response.status === 401) {
//             yield put(push('/login'));
//         } else if (error.response.status === 403) {
//             yield put(push('/forbidden'));
//         } else if (error.response.status === 404) {
//             yield put(push('/forbidden'));
//         } else {
//             yield put({ type: constant, error: error.message });
//         }
//     }
// }

// // export function GetHeaders() {
// //     let headers = {
// //         headers: {
// //             'Content-Type': 'application/json',
// //         }
// //     };
// //     if (localStorage.token) {
// //         if(window.location.pathname.includes("application/")) {
// //             headers.headers["X-Authorization"] = `Bearer ${applicationStudioAccessToken}`;
// //         } else {
// //             headers.headers["X-Authorization"] = `Bearer ${localStorage.token}`;
// //         }
// //     }
// //     return headers
// // }
