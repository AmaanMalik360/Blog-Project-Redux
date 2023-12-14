import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../common/Navbar';
import Create from '../components/Blogs/Create';
import BlogDetails from '../components/Blogs/BlogDetails';
import BlogUpdate from '../components/Blogs/BlogUpdate';
import Signup from '../components/Auth/Signup';
import Signin from '../components/Auth/Signin';
import blogCollection from '../collections/blogCollection';
import userCollection from '../collections/userCollection';
import UserList from '../components/Admin/UserList';
import NotFound from '../routes/NotFound';
import Displayer from '../routes/Displayer';
import PrivateRoute from '../routes/PrivateRoute';
import { useDispatch } from 'react-redux';
import { addUsers } from '../redux/actions/usersActions';
import { addBlogs } from '../redux/actions/blogsActions'; 
import BlogList from '../components/User/BlogList';
import CreatePermission from '../routes/CreatePermission';
import UpdatePermission from '../routes/UpdatePermission';


function App() {

  const dispatch = useDispatch();
  const loadUsers = addUsers()
  const loadBlogs = addBlogs();

  // (1) User are stored in allUsers state
  const [allUsers, setAllUsers] = useState(() => {
    const users = JSON.parse(localStorage.getItem('users'));
  
    // If users in localStorage are empty or undefined, use default data
    if (!users || users.length === 0) {
      const defaultUsers = userCollection; // Provide your default users data here
      localStorage.setItem('users', JSON.stringify(defaultUsers));
      return defaultUsers;
    }
  
    return users;
  });
  // Continuosly update the storage for users if changes are made in allUser State
  const handleLoading = async (users) => {
    try {
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
  useEffect(() => {

      if(allUsers.length > 0)
      {
        handleLoading(allUsers)

      }

  }, [allUsers]);

  // (2) Blogs are stored in data state
  const [data, setData] = useState(() => {
    const blogs = JSON.parse(localStorage.getItem('blogs'));
  
    // If blogs in localStorage are empty or undefined, use default data
    if (!blogs || blogs.length === 0) {
      const defaultBlogs = blogCollection; // Provide your default blogs data here
      localStorage.setItem('blogs', JSON.stringify(defaultBlogs));
      return defaultBlogs;
    }
  
    return blogs;
  });
 

  // Continuosly update the storage for blogs
  const handleBlogsLoading = async (blogs) => {
    try {
      // Dispatch the loadUsers action and wait for it to complete
      await dispatch(loadBlogs(blogs));
  
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

  useEffect(() => {

      if(data.length > 0)
      {
        handleBlogsLoading(data)
        
      }

  }, [data]);



  return (
    <Router>

    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>

          <Route path = '/' element = {<Displayer/>}>

            <Route path='/' element={<Signup />}/>
            <Route path='/signin' element={<Signin/>}/>

            <Route element={<PrivateRoute/>}>

                <Route path='/userlist' element={<UserList title="All Users!" />}/>
                <Route path='/home' element={<BlogList title={"All Your Blogs"} />}/>
                <Route element = {<CreatePermission/>}>
                  <Route path='/create' element={<Create />}/>
                </Route>
                <Route path='/blog/:id' element={<BlogDetails  />}/>
                <Route element = {<UpdatePermission/>}>

                  <Route path='/update/:id' element={<BlogUpdate />}/>
                </Route>


            </Route>


            <Route path='*' element={<NotFound/>}/>

          </Route>

        </Routes>

      </div>
      <ToastContainer />
    </div>
    </Router>
  );
}

export default App;
