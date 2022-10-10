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
      const response = await fetch(url);
      const data = await response.json();
      if (response.success) {
      }
      setPosts(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    getMemories();
  }, [posts]);

  const value = {
    posts,
    setPosts,
    error,
    setError,
    isLoading,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};
