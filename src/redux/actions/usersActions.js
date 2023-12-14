

const addUser = (newUser) => {
    let allUsers = JSON.parse(localStorage.getItem('users')) || []; // Initialize as an empty array if 'users' is not in localStorage
  
    const userExists = allUsers.filter((obj) => newUser.email === obj.email);
  
    console.log("User Exists", userExists);
  
    if (userExists.length === 0) {
      allUsers = [...allUsers, newUser]; // Update allUsers array by creating a new array with the new user
      localStorage.setItem('users', JSON.stringify(allUsers)); // Save the updated array to localStorage
      return {added: true,allUsers};
    } 
    else {
      return {added: false,error : "Error Occurred"};;
    }
};


export const useSignup = () => {
  
    const signup = (newUser) => (dispatch) => 
    {
      dispatch({ type: 'USER_REGISTER_REQUEST' });

      let res = addUser(newUser);
      let users = res.allUsers;
      
      if (res.added) {
        dispatch({
          type: 'USER_REGISTER_SUCCESS',
          payload: {
            users
          }
        });
      } 
      
      else 
      {
        dispatch({
          type: 'USER_REGISTER_FAILURE',
          payload: { error: res.error }
        });
      }
    };
  
    return signup;
};


export const addUsers = () =>{

    const loadUsers = (users) => (dispatch) => {

        dispatch({ type: 'LOAD_USERS_REQUEST' });
        localStorage.setItem('users', JSON.stringify(users));

        if(users)
        {
            dispatch({
                type: 'LOAD_USERS_SUCCESS',
                payload: {
                    users
                }
            })

        }
        else
        {
            dispatch({
                type: 'LOAD_USERS_FAILURE',
                payload: {
                    error: "Error Occurred" 
                }
            })
        }
        console.log(users);

    }

    return loadUsers;


}
