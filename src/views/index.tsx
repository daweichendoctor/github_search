import loadable from 'utils/loadable';

export const Home = loadable(() => import('./home')); // 搜索页面

export const SearchDetail = loadable(() => import('./search-detail')); // 搜索详情页面

export const Login = loadable(() => import('./login')); // 登录页面
