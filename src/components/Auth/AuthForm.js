import { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './AuthForm.module.css';

const AuthForm = () => {

  const authCtx = useContext(AuthContext);
  const history = useHistory()
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setIsLoading] = useState(false);
  const emailInputRef = useRef();
  const passInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const authenthicationHandler = async(event) => {
    event.preventDefault();
    setIsLoading(true);
    const emailInput = emailInputRef.current.value;
    const passInput = passInputRef.current.value;
    if(!isLogin){
      const response = await fetch('https://user-app-full.herokuapp.com/api/register',{
        method: 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          email : emailInput,
          password : passInput
        })
        
      });
      const data = await response.json();
      console.log(data);
      if(data.error){
        alert(data.error);
      }else{
        alert('Successfull Registered!')
        authCtx.login(data.tokenId)//provide token to authctx
        history.push('/profile');
      }
      setIsLoading(false);
    }
    else{
      const response = await fetch('https://user-app-full.herokuapp.com/api/login',{
        method: 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          email : emailInput,
          password : passInput
        })
      })
      const data = await response.json();
      setIsLoading(false);
      console.log(data);
      if(data.error){
        alert(data.error);
      }
      else{
        alert('Successfully loggedin!')
        authCtx.login(data.tokenId)//provide token to authctx
         history.push('/profile');
      }
    }
   
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={authenthicationHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={emailInputRef} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input ref={passInputRef} type='password' id='password' required />
        </div>
        <div className={classes.actions}>
        {/* <button>Login</button> */}
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending Request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
