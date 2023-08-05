export const API_PREFIX = '/api';

export const defaultHeaders = {
    'Content-Type': 'application/json'
}

export const calculateHeaders = (token: string) => {
    return {
        ...defaultHeaders,
        'Authorization': `Bearer ${token}`
    }
}