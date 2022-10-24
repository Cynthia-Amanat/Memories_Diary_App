/** @format */

import {useState, createContext, useContext, useEffect} from "react";
import {useAuth} from "./userContext";

export const PostContext = createContext();

export const PostMemories = () => {
  return useContext(PostContext);
};

export const PostProvider = ({children}) => {
  const {user} = useAuth();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getMemories = async () => {
    const url = `http://localhost:8000/memory/${user._id}`;

    try {
      const request = await fetch(url);
      const response = await request.json();
      if (response.success) {
        setPosts(response.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    getMemories();
  }, [user]);

  const value = {
    posts,
    setPosts,
    error,
    setError,
    isLoading,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
