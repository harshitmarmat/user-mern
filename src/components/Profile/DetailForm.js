import { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './DetailForm.module.css';

const ctype_alnum=(str)=> {
    var code, i, len;
    var isNumeric = false, isAlpha = false; // I assume that it is all non-alphanumeric
  
    for (i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i);
  
      switch (true) {
        case code > 47 && code < 58: // check if 0-9
          isNumeric = true;
          break;
  
        case (code > 64 && code < 91) || (code > 96 && code < 123): // check if A-Z or a-z
          isAlpha = true;
          break;
  
        default:
          // not 0-9, not A-Z or a-z
          return false; // stop function with false result, no more checks
      }
    }
  
    return isNumeric && isAlpha; // return the loop results, if both are true, the string is certainly alphanumeric
 }

const DetailForm = () => {
    const authCtx = useContext(AuthContext);
    const history = useHistory();
    const [isLoading] = useState(false);
    const [userNameError,setUserNameError] = useState(false);
    const [numberError,setNumberError] = useState(false);

    const usernameRef = useRef('');
    const mnumberRef = useRef('');
    const emailRef = useRef('');
    const addressRef = useRef('');

    const storeData = async(userName,phoneNumber,email,address)=>{
        await fetch('https://user-app-full.herokuapp.com/api/store-data',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'x-access-token' : authCtx.token
            },
            body : JSON.stringify({
                name : userName,
                phone : phoneNumber,
                email : email,
                address : address
            })
        });
    }



    const userDetailHandler = (event) => {
        setNumberError(false);
        setUserNameError(false);
        event.preventDefault();
        const userName = usernameRef.current.value;
        const phoneNumber = mnumberRef.current.value;
        const email = emailRef.current.value;
        const address = addressRef.current.value;

        if(!ctype_alnum(userName)){
            setUserNameError(true);
        }
        else if(phoneNumber.length!==10){
            setNumberError(true);
        }

        else{
            storeData(userName,phoneNumber,email,address);
            history.replace('/profile');
        }
    }


    return (
        <section className={classes.auth}>
            <h1>User Details Form</h1>
            <form onSubmit={userDetailHandler}>
            <div className={classes.control}>
                <label htmlFor='username'>Username</label>
                <input ref={usernameRef} type='name' id='username' required />
                {userNameError && <p>choose a valid username (It should be alphanumeric)</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='number'>Mobile Number</label>
                <input ref={mnumberRef}  type='number' id='number' required />
                {numberError && <p>Number should be of 10 digits.</p>}
            </div>
            <div className={classes.control}>
                <label htmlFor='address'>Address</label>
                <input ref={addressRef} type='address' id='address' required />
            </div>
            
            <div className={classes.actions}>
                {!isLoading && <button type='submit'>Update</button>}
                {isLoading && <p>Sending Request...</p>}
            </div>
            </form>
        </section>
        );
}

export default DetailForm;