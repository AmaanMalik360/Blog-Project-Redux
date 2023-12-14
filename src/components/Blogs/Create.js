import React, { useState, useEffect } from 'react'
import "../../stylesheets/Create.css"
import {useNavigate, useLocation} from 'react-router-dom'
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from 'react-redux';
import { addBlogs } from '../../redux/actions/blogsActions';
import { toast } from 'react-toastify';

const Create = () => {

    const dispatch = useDispatch();
    // const auth = useSelector(state => state.auth.user)
    const blogsRed = useSelector(state => state.blogs)
    const myuser = JSON.parse(localStorage.getItem('user'))


    const loadBlogs = addBlogs();
    const [user, setUser] = useState(myuser) // Contains user's information
    const [blogs, setBlogs] = useState(blogsRed.blogs)
    const [data, setData] = useState( blogs.filter((obj) => obj.userId === user.id)) // Contains all the blogs made the user
    
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [author, setAuthor] = useState("")
    const [pending, setPending] = useState(false)
    const move = useNavigate();
    // const location = useLocation();   
    

    console.log("BlogsRed from Redux State",blogsRed.blogs);
    console.log("Blogs in data State",data);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user.permissions.includes('Write'));
        if(user.permissions.includes('Write'))
        {

          let id = uuid().slice(0,8);
          let userId = user.id;
          
          const newblog = {id, title, body, author, userId};
          console.log(newblog);
          
          setPending(true)

          // Update state directly and use it in the function
          setBlogs((prev) => [...prev, newblog]);

          // Use the updated state in the function
          handleBlogsLoading([...blogs, newblog]);
              
          notify('Blog Added', 'success');
          setPending(false);
          move("/home");
        }
        else
        {
          notify("Not Allowed to Create Blogs", "error");

        }

        
    }


  

    return (
        <div className='create'>
            <h2>Add a New Blog</h2>

            <form onSubmit={handleSubmit}>
                <label >Title: </label>
                <input
                    type='text'
                    required
                    placeholder='Type Blog Title'
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                />
                
                <label >Type Your Blog: </label>
                <textarea 
                placeholder='Start Typing Here' 
                value={body}
                onChange={(e)=>setBody(e.target.value)}
                >
                    
                </textarea>

                <label >Blog Author: </label>
                <input 
                    type='text'
                    required
                    placeholder='Type Author Name'
                    value={author}
                    onChange={(e)=> setAuthor(e.target.value)}
                   
                />

                {!pending && <button >Add Blog</button>}
                {pending && <button disabled>Adding Blog.....</button>}

            </form>
        </div>
    )
}

export default Create