import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { addBlogs } from '../../redux/actions/blogsActions';
import { useDispatch, useSelector } from 'react-redux';

const BlogUpdate = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    const blogsRed = useSelector(state => state.blogs)

    const loadBlogs = addBlogs();

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
    
    
    // Finding the blog using its id and setBlog
    const [blog, setBlog] = useState()
    const [blogs, setBlogs] = useState(blogsRed.blogs)
    
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
    

    // new data
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [author, setAuthor] = useState("")
    const [pending, setPending] = useState(false)


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

    const handleUpdate = (e) =>{
        e.preventDefault();
        const id = blog.id;
        const newblog = { id , title, body, author};
        console.log(newblog);
        setPending(true)

        const newBlogs = blogs.map((obj) => obj.id === newblog.id?{...obj, 
            ...newblog
          }
          : obj )
        handleBlogsLoading(newBlogs)

        notify('Blog Updated', 'success');
        setPending(false)
        move("/home")
    }

    return (
        <div className='create'>
            <h2>Update the Blog</h2>

            <form onSubmit={handleUpdate}>
                <label >Title: </label>
                <input
                    type='text'
                    required
                    placeholder= {blog?.title}
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                />
                
                <label >Type Your Blog: </label>
                <textarea 
                placeholder= {blog?.body}
                value={body}
                onChange={(e)=>setBody(e.target.value)}
                >
                    
                </textarea>

                {/* <h3>Old Author: {data.author}</h3> */}
                <label >Update Author: </label>
                <input 
                    type='text'
                    required
                    placeholder={blog?.author}
                    value={author}
                    onChange={(e)=> setAuthor(e.target.value)}
                   
                />


                {!pending && <button >Update Blog</button>}
                {pending && <button disabled>Updating Blog.....</button>}
            
            </form>
        </div>

              
    )
}

export default BlogUpdate