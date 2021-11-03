import Login from "./Login";

export const ROUTE_AUTH = {
    DEFAULT: '/',
    LOGIN: '/login',
    LOGOUT: '/logout',
};

const routes = [
    {
        path: ROUTE_AUTH.DEFAULT,
        component: Login,
        exact: true
    },
    {
        path: ROUTE_AUTH.LOGIN,
        component: Login,
    },
    // {
    //     path: '/sso/:token',
    //     component: SSO,
    //     exact: true
    // },
];
export default routes;