export const LOCAL_STORAGE = {
    ACCESS_TOKEN: 'access_token'
}

export const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)}` }
};
