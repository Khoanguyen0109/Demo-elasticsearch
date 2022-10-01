import MainPage from "./MainPage";
import { ReactComponent as IcnMyCourses } from '../../assets/icn_teach.svg';


export const ROUTE = {
    DEFAULT: '/',
    USER: '/user'
// 
};

const routes = [
    {
        path: ROUTE.DEFAULT,
        component: MainPage,
        exact: true,
        // private: true,
        menu: {
            title: 'Main',
            icon: IcnMyCourses,
            group: 'noname',
            order: 1
        }

    },
    // {
    //     path: ROUTE.USER,
    //     component: MainPage,
    //     exact: true,
    //     // private: true,
    //     menu: {
    //         title: 'User',
    //         icon: IcnMyCourses,
    //         group: 'noname',
    //         order: 1
    //     }

    // },

    // {
    //     path: '/sso/:token',
    //     component: SSO,
    //     exact: true
    // },
];
export default routes;