import AuthContext from '../../store/auth-context';
import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const UserProfile = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory()

  const [userInfo,setUserInfo] = useState(null);
  
  const userDetail = useCallback( async() => {
    const response = await fetch('https://user-app-full.herokuapp.com/api/store-data',{
      headers : {
        'x-access-token' : authCtx.token
      }
    });
    const user = await response.json();
    if(user.data.name){
      setUserInfo(user.data);
    }
  },[authCtx.token]
  )
  useEffect(()=> {
    console.log('running');
    if(authCtx.isLoggedIn){
        userDetail();
    }
  },[authCtx.isLoggedIn,userDetail]);

  const detailFormHandler = () => {
      history.replace('/detail-form');
  }

  return (
    <section className={classes.profile}>
      
      {userInfo?(<>
          <h2>Profile Detail</h2>
          <ProfileForm userData = {userInfo}/>
          </>):(<>
          <h2>No details found! Please fill your details.</h2>
          <div className={classes.actions}>
            <button   onClick={detailFormHandler}>Details form</button>
          </div>
          </>)}
    </section>
  );
};

export default UserProfile;
