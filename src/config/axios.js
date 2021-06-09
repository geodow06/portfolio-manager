import axios from 'axios';

const cognitoAxios = axios.create({
    baseUrl: process.env.REACT_APP_COGNITO_DOMAIN
})

axios.interceptors.request.use(request => {
    console.log(request);
    // Edit request config
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    console.log(response);
    // Edit response config
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

export {cognitoAxios}