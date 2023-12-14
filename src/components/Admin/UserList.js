import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addUsers } from '../../redux/actions/usersActions';


const UserList = ({ title }) => {

  const dispatch = useDispatch();
  const reduxusers = useSelector(state => state.users)
  console.log("users in UserList from redux:",reduxusers.users);
  const loadUsers = addUsers()

  const [users, setUsers] = useState(reduxusers.users)

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

  const handleLoading = async (users) => 
  {
      try 
      {
        // Dispatch the loadUsers action and wait for it to complete
        await dispatch(loadUsers(users));
    
        // If loading is successful, say loading Successful  
        // notify('Users Loaded Successfully. ', 'success');
      } 
      catch (error) {
        // If an error occurs, handle it here
        console.error("Error during Loading:", error);
    
        // Notify user
        // notify('Error during Loading', 'error');
      }
  }

  const deleteUser = (id) => {
    const userToDelete = users.find((obj) => obj.id === id);
  
    if (userToDelete) 
    {
      if (userToDelete.isAdmin)
      {
        notify("Cannot delete admin user.","error");
      } 
      else 
      {
        const newUsers = users.filter((user) => user.id !== id);
        handleLoading(newUsers)
        setUsers(newUsers);
        notify("User deleted successfully.",'success');
      }
    }
    else {
      notify("User not found.","info");
    }
  };

  const handleCheck = (id) => {
    const userToUpdate = users.find((obj) => obj.id === id);
  
    if (userToUpdate && !userToUpdate.isAdmin) 
    {
      const newUsers = users.map((obj) =>
        obj.id === id ? { ...obj, isActive: !obj.isActive } : obj
      );
  
      // update the users in redux now
      handleLoading(newUsers)
      setUsers(newUsers)
      console.log("The user after using check:", newUsers);
      notify("Changed isActive for user.","success");
    }
    else 
    {
      notify("Cannot change isActive for admin.","info");
    }
  };

  // Function to set Permissions.
  const handlePermissionChange = (id, e) => {
    const userToUpdate = users.find((obj) => obj.id === id);

    if (userToUpdate && !userToUpdate.isAdmin) {
      const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
      console.log("Selected Options", selectedOptions);

      const permissionExists = userToUpdate.permissions.includes(selectedOptions[0]);

      let updatedPermissions;
      if (permissionExists) {
        // Permission Exists.
        // Remove existing permissions from userToUpdate.permissions
        updatedPermissions = userToUpdate.permissions.filter(
          (permission) => !selectedOptions.includes(permission)
        );
      } else {
        // Permission does not exist.
        // Add newly selected options to updatedPermissions
        updatedPermissions = [...userToUpdate.permissions, selectedOptions[0]];
      }

      console.log("Updated Permission", updatedPermissions);

      const newUsers = users.map((obj) =>
        obj.id === id ? { ...obj, permissions: updatedPermissions } : obj
      );

      // Update the Redux state with the new permissions
      handleLoading(newUsers);
      setUsers(newUsers);
      console.log("The user after changing permissions:", newUsers);
      notify("Changed permissions for user.", "success");
    } 
    else 
    {
      notify("Cannot change permissions for admin.", "info");
    }
  };

  


  // Styles 
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thStyle = {
    border: '4px solid white',
    padding: '10px',
    color: 'white',
    backgroundColor: 'rgb(244, 89, 136)',
    textAlign: 'left',
  };

  const tdStyle = {
    border: '4px solid white',
    backgroundColor: 'rgb(255, 223, 232)',
    borderRadius: '4px',
    padding: '10px',
  };

  const optionStyle = {
    backgroundColor: 'rgb(255, 223, 232)',
    border: 'none',
    borderRadius: '4px',
    padding: '6px',
    width: '100%', // Adjust as needed
    boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    color: '#333',
    height: 'auto', // Set a fixed height or 'auto'
    overflowY: 'auto', // Use 'auto' or 'hidden' to control scrollbar
    // cursor: 'pointer',
  };
  
  

  // Functions
  const goToUser = (user) => {
    console.log(user);
  };

  

  return (
    <div className='home'>
      <div className='UserList'>
        <h2>{title}</h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>User</th>
              <th style={thStyle}>Active</th>
              <th style={thStyle}>Permissions</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={tdStyle}>
                  <div onClick={() => goToUser(user)} style={{ cursor: 'pointer' }}>
                    {user.email}
                  </div>
                </td>
                <td style={tdStyle}>
                  <input type="checkbox" 
                  checked={user.isActive} 
                  onChange={()=>handleCheck(user.id)} 
                  />
                </td>

                <td style={tdStyle}>
                 
                  
                  <select
                    multiple
                    value={user.permissions || []}
                    style={optionStyle}
                    onChange={(e) => handlePermissionChange(user.id, e)}
                  >
                    <option value="Write">Write</option>
                    <option value="Edit">Edit</option>
                    <option value="Delete">Delete</option>
                  </select>
                </td>
                <td style={tdStyle}>
                  <button onClick={() => deleteUser(user.id)}>Delete User</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
 
                  