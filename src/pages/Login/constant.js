export const END_POINT = {
    login : {
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL}users/login`
    },
    register : {
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL}/users/register`
    }
};
