import Login from "./Login";
import Register from "./Register";

export const ROUTE_AUTH = {
    DEFAULT: '/',
    LOGIN: '/login',
    REGISTER: '/register',

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
        exact: true
    },
    {
        path: ROUTE_AUTH.REGISTER,
        component: Register,
        exact: true

    },
    // {
    //     path: '/sso/:token',
    //     component: SSO,
    //     exact: true
    // },
];
export default routes;