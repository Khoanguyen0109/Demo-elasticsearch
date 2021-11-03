export const END_POINT = {
    login: {
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL}/login`
    },
    register: {
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL}/register`
    },
    get_current_user: {
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}/me`
    },
}
