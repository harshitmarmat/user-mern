import { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage';
import AuthContext from './store/auth-context';
import ProfilePage from './pages/ProfilePage';
import DetailFormPage from './pages/DetailFormPage';

function App() {
  const authCtx  = useContext(AuthContext);
  console.log(authCtx.isLoggedIn);
  
  return (
    <Layout>
      <Switch>
        {!authCtx.isLoggedIn && (<Route path='/' exact>
          <AuthPage />
        </Route>)}
        {authCtx.isLoggedIn && (<Route path='/' exact>
          <ProfilePage />
        </Route>)}
        {authCtx.isLoggedIn &&
          (<Route path='/profile'>
            <ProfilePage/>
          </Route>)}
        
        <Route path='/detail-form'>
          {authCtx.isLoggedIn?<DetailFormPage/>:<Redirect to='/' />}
        </Route>
        <Route path='*'>
          <Redirect to='/'/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
