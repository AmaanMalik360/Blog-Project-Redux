import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { signout } from '../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
  console.log("Auth User",auth.user);
  let myuser = JSON.parse(localStorage.getItem('user'));
  
  const [user, setUser] = useState(myuser); // Contains user's information

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
    if(type === 'info'){
      toast.info(text, {
        // Set to 1.5sec
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
    }

  }

  const signOut = () =>{
    dispatch(signout())
    notify('Signed out Successfully', "success")
  }
  

  const renderLoggedInLinks = () => {
    const hasWritePermission = user && user.permissions.includes('Write');
  
    return (
      <>
        <Link to="/home">Home</Link>
        {hasWritePermission && <Link to="/create">New Blog</Link>}
        <Link onClick={signOut} to="/">Signout</Link>
      </>
    );
  };
  
  
  const renderNonLoggedInLinks = () =>{
    return (
      <>
        <Link to="/">Signup</Link>
        <Link to="/signin">Signin</Link>    
        {/* <Link to="/userlist">Users</Link>     */}
      </>
      
      ) 
  }
    
  const renderLoggedInAdminLinks = () =>{
      return (
        <>
          <Link onClick={signOut} to="/"> Signout</Link>     
        </>
        
      ) 
  }

  return (

    <nav className='navbar'>
        <h1>The Dojo Blog</h1>
        <div className="links">
        {auth.user && Object.keys(auth.user).length !== 0 && auth.user.isActive ? 
          auth.user.isAdmin  ? 
            renderLoggedInAdminLinks() : 
            renderLoggedInLinks() : 
          renderNonLoggedInLinks()}

        </div>
        
    </nav>
  )
}

export default Navbar