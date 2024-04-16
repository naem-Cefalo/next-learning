import axios from 'axios';

const http = axios.create({?
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`, // Replace with your API base URL
});

// Request interceptor
http.interceptors.request.use(
  (config) => {
    // Modify the request config here (add headers, authentication tokens)
    config.headers.Authorization = 'test ats'

    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

// Response interceptor
http.interceptors.response.use(
  (response) => {
    // Modify the response data here
    return response;
  },
  (error) => {
    // Handle response errors here
    return Promise.reject(error);
  }
);

export default http;