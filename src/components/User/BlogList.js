import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
// import "../../stylesheets/"

const BlogList = ({ title }) => {
  const blogsRed = useSelector(state => state.blogs);
  const auth = useSelector(state => state.auth.user);
  const myuser = JSON.parse(localStorage.getItem('user'))

  const [user, setUser] = useState(myuser); // Contains user's information
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Filter blogs based on the user's id
    if (user && blogsRed.blogs) {
      const userBlogs = blogsRed.blogs.filter(obj => obj.userId === user.id);
      console.log("user Blogs",userBlogs);
      setBlogs(userBlogs);
    }
  }, [user, blogsRed.blogs]);

  console.log("blogs in BlogList:", blogs);

  // Styles
  const divStyle = {
    backgroundColor: '',
    borderRadius: '10px',
    padding: '10px',
    border: '1px solid darkblue',
    cursor: 'pointer',
  };

  return (
    // <div className='home'>
      <div className='bloglist'>
        {user && <h1>{user.name}</h1>}
        <h2>{title}</h2>
        {blogs.map(blog => (
          <div className="blogpreview" key={blog.id} style={divStyle}>
            <Link to={`/blog/${blog.id}`}>
              <h2>{blog.title}</h2>
              <p>Written by {blog.author}</p>
            </Link>
          </div>
        ))}
      </div>
    // </div>
  );
};

export default BlogList;
