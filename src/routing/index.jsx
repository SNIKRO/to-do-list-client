import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import login from '../pages/login';
import registration from '../pages/registration';
import { LOG_IN, REGISTRATION } from './routes';
export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={LOG_IN} component={login} />
        <Route path={REGISTRATION} component={registration} />
        <Redirect from="*" to={LOG_IN} />
      </Switch>
    </BrowserRouter>
  );
}
