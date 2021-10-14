import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from '../pages/login';
import Registration from '../pages/registration';
import { LOG_IN, REGISTRATION } from './routes';
export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={LOG_IN} component={Login} />
        <Route path={REGISTRATION} component={Registration} />
      </Switch>
    </BrowserRouter>
  );
}
