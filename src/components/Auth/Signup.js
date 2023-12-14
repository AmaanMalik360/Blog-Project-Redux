import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from 'react-redux';
import { useSignup} from "../../redux/actions/usersActions"

const Signup = () => {

    const dispatch = useDispatch();
    const users = useSelector(state => state.users)
    const blogsRed = useSelector(state => state.blogs)

    console.log("Users in Signup",users.users);
    console.log("Blogs in Signup",blogsRed);
    const signup = useSignup()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [pending, setPending] = useState(false)
    const move = useNavigate();

    const notify = (text, type) =>{
        if(type === 'success')
        {
          toast.success(text, {
            // Set to 1.5sec
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
        }
        if(type === 'error'){
          toast.error(text, {
            // Set to 1.5sec
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
          });
        }
    
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let id = uuid().slice(0, 8);
        let isActive = true;
        let isAdmin = false;
        let permissions = []
        const user = { id, name, email, password, isActive, isAdmin, permissions };
        console.log(user);
        setPending(true)
      
        try {
          // Dispatch the signup action and wait for it to complete
          await dispatch(signup(user));
          
          // Notify user
          notify('User Created. ', 'success');
          setPending(false)
          
          // If signup is successful, move to the "/signin" route
          move("/signin");
        } 
        catch (error) {
          // If an error occurs, handle it here
          console.error("Error during signup:", error);
          setPending(false)
          
          // Notify user
          notify('Error during signup', 'error');
        }
    };
         

    return (
        <div className='create'>
            <h2>Enter Required Information</h2>

            <form onSubmit={handleSubmit}>
                <label >Name: </label>
                <input
                    type='text'
                    required
                    placeholder='Type Your Name'
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                />
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
               
               
                {!pending && <button >Signup</button> }
                {pending && <button disabled>Signing Up.....</button>}


            </form>


        </div>              
    ) 
}

export default Signup