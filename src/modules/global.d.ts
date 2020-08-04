import { RouteProps } from 'react-router';
import { AxiosRequestConfig } from 'axios';

declare global {
    interface MyRouteProps extends RouteProps {
        auth?: boolean;
        component: Component;
    }
    interface Api {
        [propName: string]: {
            method: Method,
            url: string
        }
    }
    type graphApiType = 'query' | 'mutation';
}
