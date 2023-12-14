import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import "../../stylesheets/BlogDetails.css"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addBlogs } from '../../redux/actions/blogsActions';

const BlogDetails = () => {

  
  
  const {id} = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user)
  const blogsRed = useSelector(state => state.blogs)
  // const myuser = JSON.parse(localStorage.getItem('user'))

  
  
  const loadBlogs = addBlogs();
  const move = useNavigate();
  
  // states
  // const [user, setUser] = useState(myuser) // Contains user's information
  const [blog, setBlog] = useState()
  const [blogs, setBlogs] = useState(blogsRed.blogs)
  
  const [pending, setPending] = useState(false)
  // console.log("Blog in Details",blog);
  
  // Permissions 
    const hasEditPermission = user && user.permissions.includes('Edit');
    const hasDeletePermission = user && user.permissions.includes('Delete');

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

    const getBlog = (blogId,userId) =>
    {
        const blogExist = blogs.filter((obj) => obj.id === blogId && obj.userId === userId)
        
        if(blogExist.length === 0)
        {
            const res = {
                matches: false,
                blog: blogExist
            }
            return res
        }
        else{
            const res = {
                matches: true,
                blog: blogExist[0] 
            }
            return res
        }

    }

    useEffect(() => {
        let matchedBlog = getBlog(id,user.id)
        console.log(matchedBlog);
        if(matchedBlog.matches)
        {
            // console.log(matchedBlog.blog);
            setBlog(matchedBlog.blog);
        }
        else
        {
            notify("Access Denied", "info");
            move('/home')
        }

    }, [])
    
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

    const handleDelete = () =>
    {
        setPending(true)

        const newBlogs = blogs.filter((b) => b.id !== id )
        // setBlog(newBlogs)

        handleBlogsLoading(newBlogs)

        notify('Blog Deleted','success')

        setPending(false)
        move('/home')
    }
    
    
    return (
        <div className='blogdetails'>
            {pending && <div>........Loading</div>}
            {/* {error && <div>{error}</div>} */}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written By: {blog.author}</p>
                    <div>{blog.body}</div>

                    {hasDeletePermission && <button onClick={handleDelete} className='b1'>Delete</button>}

                    {hasEditPermission && <Link to= {`/update/${blog.id}`} className='b1 b2'>Update</Link>}
                </article>
            )}

        </div>
    )
}

export default BlogDetails