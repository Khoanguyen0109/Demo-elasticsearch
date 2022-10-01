import routes from "./routes/routes";
import { createBrowserHistory as createHistory } from "history";
import { Router, Route ,Switch } from "react-router-dom";

import PublicRoute from "./routes/PublicRoutes";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import PrivateRoute from "./routes/PrivateRoute";
import AuthDataProvider from "./Auth/AuthContext";
import { SnackbarProvider } from "notistack";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import frLocale from 'date-fns/locale/fr';

const history = createHistory();

function App() {
  const privateRoutes = [];
  const publicRoutes = [];

  for (let i = 0; i < routes.length; i++) {
    if (routes[i].private) {
      privateRoutes.push(routes[i]);
    } else {
      publicRoutes.push(routes[i]);
    }
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}> 

    <AuthDataProvider>
                    <SnackbarProvider maxSnack={3}>

      <Router history={history}>
      <Switch>

        {privateRoutes.map((route, index) => (
          <PrivateRoute
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.component}
            routes={route.routes}
          />
        ))}
        {publicRoutes.map((route, index) => (
          <PublicRoute
            key={index}
            component={route.component}
            path={route.path}
            exact={route.exact}
            routes={route.routes}
          />
        ))}
        <Route path="*" exact={true} component={ErrorPage} isPublic={true} />
        </Switch>

      </Router>
      </SnackbarProvider>
    </AuthDataProvider>
    </LocalizationProvider>

  );
}

export default App;
