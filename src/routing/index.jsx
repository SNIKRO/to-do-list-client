import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Login from '../pages/login';
import Main from '../pages/main';
import Registration from '../pages/registration';
import { LOG_IN, MAIN, REGISTRATION } from './routes';
export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={LOG_IN} component={Login} />
        <Route path={REGISTRATION} component={Registration} />
        <Route path={MAIN} component={Main} exact />
        <Redirect from="*" to={LOG_IN} />
      </Switch>
    </BrowserRouter>
  );
}
