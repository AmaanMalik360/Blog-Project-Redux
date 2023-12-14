

export const addBlogs = () =>
{

    // Load the blogs in redux
    const loadBlogs = (blogs) => (dispatch) => {

        dispatch({ type: "BLOGS_DATA_REQUEST" });
        
        localStorage.setItem('blogs', JSON.stringify(blogs));
        console.log("Blogs received",blogs);
        if(blogs)
        {
            dispatch({
                type: "BLOGS_DATA_SUCCESS",
                payload: {
                    blogs
                }
            })
        }
        else
        {
            dispatch({
                type: "BLOGS_DATA_FAILURE",                
                payload: {
                    error: "Error Occurred" 
                }
            })
        }
        console.log(blogs);

    }

    return loadBlogs;
}


  
// export const singleBlogData = (id) => {
//     return async (dispatch) => {
//       dispatch({ type: "BLOG_DATA_REQUEST" });
//       try 
//       {
//         const response = await fetch(`http://localhost:8000/blog/${id}`);
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
  
//         const data = await response.json();
  
//         dispatch({
//           type: "SINGLE_BLOG_DATA_SUCCESS",
//           payload: data,
//         });
//       } 
//       catch (error) 
//       {
//         console.error("Error fetching blog data:", error.message);
//         dispatch({
//           type: "BLOG_DATA_FAILURE",
//           payload: error.message,
//         });
//       }
//     };
// };


//   export const deleteBlogData = (id) => {
//     return async (dispatch) => {
//       try {
//         await fetch(`http://localhost:8000/blog/${id}`, {
//           method: "DELETE",
//         });
  
//         dispatch({
//           type: "DELETE_BLOG_DATA",
//           payload: id,
//         });
//       } catch (error) {
//         console.error("Error deleting blog data:", error.message);
//       }
//     };
//   };


//   export const createBlogData = (data) => {
//     return async (dispatch) => {
//       try {
//         fetch("http://localhost:8000/blog", {
//           method: "POST",
//           headers: {
//             "Content-type": "application/json",
//           },
//           body: JSON.stringify(data),
//         });
  
//         dispatch({
//           type: "CREATE_BLOG_DATA",
//           payload: data,
//         });
//       } catch (error) {
//         console.error("Error creating blog data:", error.message);
//       }
//     };
//   };



//   export const updateBlogData = (id, data) => {
//     return async (dispatch) => {
//       dispatch({ type: "BLOG_DATA_REQUEST" });
//       try {
//         const response = await fetch(`http://localhost:8000/blog/${id}`, {
//           method: "PATCH",
//           headers: {
//             "Content-type": "application/json",
//           },
//           body: JSON.stringify(data),
//         });
  
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
  
//         const updatedData = await response.json();
  
//         dispatch({
//           type: "UPDATE_BLOG_DATA",
//           payload: updatedData,
//         });
//       } catch (error) {
//         console.error("Error updating blog data:", error.message);
//         dispatch({
//           type: "BLOG_DATA_FAILURE",
//           payload: error.message,
//         });
//       }
//     };
//   };