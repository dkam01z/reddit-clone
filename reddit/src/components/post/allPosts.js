import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPost } from '../../slice/Hotslice';
import Posts from './posts';

const PostList = () => {
    const dispatch = useDispatch();
    const { posts, loading, error } = useSelector((state) => state.post || { posts: [], loading: false, error: null });
  
    useEffect(() => {
      dispatch(fetchPost());
    }, [dispatch]);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    console.log(posts)
    return (
        <div> 
          {posts && posts.map(post => (
            <Posts 
              key={post.id} 
              title={post.title} 
              time = {post.time}
              content={post.content} 
              author={post.author} 
              comments={post.comments}
              votes={post.votes}
              
            />
          ))}
        </div>
      );
      
  };
  

export default PostList;
