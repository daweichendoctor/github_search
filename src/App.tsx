import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';

import { ErrorBoundary, Layout } from 'components';
import { AppStore } from 'store';
import routes from 'routes';

import 'assets/style/index.scss';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Switch>
          {routes.map(({ component: Component, ...rest }: MyRouteProps, index: number) => (
            <Route
              key={index}
              {...rest}
              render={(params: RouteComponentProps) => {
                if (AppStore.auth || rest.path === '/login') {
                  return <Layout>
                    <Component {...params} />
                  </Layout>
                }
                return <Redirect
                  to={{
                    pathname: "/login",
                    // 传递跳转的页面
                    state: { from: params.location }
                  }}
                />
              }}
            />
          ))}
          <Redirect to='/' />
        </Switch>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
