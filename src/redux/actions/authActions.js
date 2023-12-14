

const matchUser = (email, password) => 
{
    let allUsers = JSON.parse(localStorage.getItem('users')) || []; // Initialize as an empty array if 'users' is not in localStorage

    const userExists = allUsers.filter((obj) => email === obj.email && password === obj.password);
  
    console.log("The found user is:", userExists);
    if (userExists.length === 0) 
    {
      const res = {
        exists: false,
        error:  "Error Occurred"
      };
      return res;

    } 
    else 
    {  
      const res = {
        exists: true,
        user: userExists[0]
      };
  
      localStorage.setItem('user', JSON.stringify(userExists[0]));
      localStorage.setItem('token', JSON.stringify(true));
      return res;
    }
};

export const useLogin = () =>{
    
    const signin = (email,password) => (dispatch) => 
    {

        dispatch({type: 'LOGIN_REQUEST'})  
        let res = matchUser(email,password)
        
        if(res.exists)
        {
            let user = res.user

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    user
                }
            })
            
            // Return the user information
            return user;
        }
        else
        {
            dispatch({
                type: 'LOGIN_FAILURE',
                payload: {error: res.error}
            })
            return null;
        
        }
    }      

    return signin;
}


export const signout = () =>{
    return async dispatch => {
        localStorage.removeItem('user', null);
        localStorage.setItem('token', JSON.stringify(false));
        
        dispatch({
            type:'LOGOUT_REQUEST'
        })
    }

}


