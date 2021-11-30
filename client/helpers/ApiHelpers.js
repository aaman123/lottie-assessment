import axios from 'axios';

/*
    Description: API Calls functions.
    Dependencies: Axios
*/

const callPostLottieApi = (payLoad) => {
    return axios({
        method: 'POST',
        url: `https://www.amansutariya.codes/api/postLottieData`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: payLoad
    }).catch(error => {
        return error.response;
    });
}

const callGetLottieApi = (param) => {
    return axios({
        type: 'GET',
        url: `https://www.amansutariya.codes/api/getLotties/${param}`,
        header: {
            'Content-Type': 'application/json'
        }
    }).catch(error => {
        return error.response;
    });  
}

const callSearchLottieApi = (param, searchTerm) => {
    return axios({
        type: 'GET',
        url: `https://www.amansutariya.codes/api/searchLottie/${param}/${searchTerm}`,
        header: {
            'Content-Type': 'application/json'
        }
    }).catch(error => {
        return error.response;
    });
}

export {
    callPostLottieApi,
    callGetLottieApi,
    callSearchLottieApi
}