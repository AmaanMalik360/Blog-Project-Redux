import React, { useState } from 'react'
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { signout } from '../../redux/actions/authActions';
import { useLogin } from '../../redux/actions/authActions';

const Signin = () => {

    const dispatch = useDispatch();
    const signin = useLogin()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [pending, setPending] = useState(false)
    const move = useNavigate();

    const notify = (text, type) =>
    {
        if(type === 'success')
        {
          toast.success(text, {
            // Set to 1.5sec
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
        }
        if(type === 'error')
        {
          toast.error(text, {
            // Set to 1.5sec
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
        }  
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPending(true);
      
        try {
          // Dispatch the signin action and get the user information
          const user = await dispatch(signin(email, password));
      
          if (user) 
          {
            const isAdmin = user.isAdmin;
            const isActive = user.isActive;
      
            if (isAdmin) 
            {
              notify('Signed In Successfully', 'success');
              setPending(false);
              move('/userlist');
            } 
            else 
            {
              setPending(false);
              if (isActive)
              {
                notify('Signed In Successfully', 'success');
                move('/home');
              } 
              else
              {
                // localStorage.setItem('user', null);
                dispatch(signout())
                notify('You are not allowed to sign in', 'error');
              }
            }
          } 
          else 
          {
            notify('User Not Found', 'error');
            setPending(false);
          }
        } 
        catch (error) 
        {
          // Handle error
          console.error('Error during signin:', error);
          setPending(false);
          notify('Error during signin', 'error');
        }
      };
      

    // const handleSubmit = (e) =>{
    //     e.preventDefault();

    //     console.log(email, password);
    //     console.log("Token is :", token );
    //     setPending(true)
    //     let signedin = matchUser( email, password);
    //     console.log("User Object from MatchUser is:", signedin);

    //     if(signedin.exists)
    //     {
    //         const user = signedin.user
    //         const isAdmin = user.isAdmin;
    //         const isActive = user.isActive;

    //         // console.log("Token is:", token );
            
    //         if (isAdmin) 
    //         {
    //             notify('Signed In Successfully', 'success')
    //             setPending(false)
    //             move("/userlist")
                
    //         }
    //         else
    //         {    
    //             setPending(false)
    //             if(isActive)
    //             {
    //                 notify('Signed In Successfully','success')
    //                 move('/home')
    //             }     
    //             else
    //             {
    //                 localStorage.setItem('user', null);
    //                 notify('You are not allowed to signin','error')
    //             }  

    //         }
    //     }
    //     else{
    //         notify('User Not Found','error')
    //         setPending(false)
    //     }
    // }

    return (
        <div className='create'>
            <h2>Enter Info to Login: </h2>

            <form onSubmit={handleSubmit}>
                <label >Email: </label>
                <input
                    type='email'
                    required
                    placeholder='Type Your Email'
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
                <label >Password: </label>
                <input
                    type='password'
                    required
                    placeholder='Type Your Password'
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                />

                {!pending && <button >Signin</button>}
                {pending && <button disabled>Signing in.....</button>}

            </form>

            
        </div>           
    )
}

export default Signin