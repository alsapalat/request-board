import React from 'react';
import LoginContainer from 'modules/auth/containers/LoginContainer';
import { Switch, Route } from 'react-router-dom';
import Private from './Private';
import { useAuth } from './hooks';

function App() {
  const [isAuthenticated] = useAuth();
  if (typeof isAuthenticated !== 'boolean') return null;
  return !isAuthenticated
    ? (
      <Switch>
        <Route component={LoginContainer} />
      </Switch>
    ) : (
      <Switch>
        <Route path="/" component={Private} />
      </Switch>
    );
}

export default App;
