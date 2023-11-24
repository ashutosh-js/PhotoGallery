import axios, { AxiosInstance } from 'axios';

const unsplashAccessKey = '3fhli-1PmH3MhJyiuj6IamXxqUqkgpX3FBJqqq7ne5c';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'https://api.unsplash.com/',
    headers: {
        Authorization: `Client-ID ${unsplashAccessKey}`,
    },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios request error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;







