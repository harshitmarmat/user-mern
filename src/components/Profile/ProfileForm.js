import AuthContext from '../../store/auth-context';
import { useContext } from 'react';
import classes from './ProfileForm.module.css';
import { useHistory } from 'react-router-dom';

const ProfileForm = (props) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const deleteAccountHandler = async()=> {
    await fetch('/api/store-data-delete',{
      headers : {
        'x-access-token' : authCtx.token
      }
    }).then((res)=>{
      if(res.ok){
        authCtx.logout();
        alert('Account Deleted Permanently');
        history.push('/');
      }
    }).catch(err=>{
      alert.apply(err);
    })
  }
  return (
    <>
    <div className={classes.container}>
        <ul>
          <li>Userame <span>: {props.userData.name}</span></li>
          <li>Phone <span>: {props.userData.phone}</span></li>
          <li>Address <span>: {props.userData.address}</span></li>
        </ul>
    </div>
    <div className={classes.actions}>
      <button className={classes.toggle} onClick={deleteAccountHandler}>Delete Account</button>
    </div>
    </>
  );
}

export default ProfileForm;
