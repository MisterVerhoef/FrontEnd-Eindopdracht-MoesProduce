import axios from "axios";


const api = axios.create({
    baseURL: 'http://localhost:8080',
});

api.interceptors.request.use(
    (config) => {
        console.log('Interceptor called');
        const token = localStorage.getItem('token');
        console.log('Token from localStorage:', token);
        console.log('Token being sent:', token);
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        console.log('Request config:', config);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {

            localStorage.removeItem('token');
            window.location = '/login';
        }
        return Promise.reject(error);
    }
);

export const loginUser = async (data) => {
    return await api.post('/api/users/login', {
        usernameOrEmail: data.usernameOrEmail,
        password: data.password
    });
};

export const searchAdverts = async (query) => {
    return await api.get('/api/adverts/search', {
        params: {
            query: query,
        }
    });
};


export const registerUser = async (data) => {
    return await api.post('/api/users/register', {
        username: data.username,
        email: data.email,
        password: data.password,
        termsAccepted: data.termsAccepted
    });

};
export const changePassword = async (data) => {
    return await api.put('/api/users/change-password', {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
    });
};


export default api;