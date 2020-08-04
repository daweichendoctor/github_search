import * as pages from 'views';

const routes: MyRouteProps[] = [
    {
        path: '/',
        exact: true, // /one no match /one/two
        // strict: true, // /one/ no match /one match /one/two
        auth: true,
        component: pages.Home,
    }, {
        path: '/login',
        component: pages.Login,
    }, {
        path: '/search-detail',
        component: pages.SearchDetail
    },
]
export default routes;