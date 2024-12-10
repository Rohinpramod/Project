import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../config/axiosInstance';


 const useFetch = (url) => {    
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
    const fetchData = async () => {
        try{
            const response = await axiosInstance({
              url:url,
            });
            
            setData(response.data);
            setIsLoading(false)

        }catch(error){
            setError(error);
        }finally{
            setIsLoading(false);
        }
      };

      useEffect(() => {
            fetchData();
    }, []);

    return[data,isLoading,error];

}

export default useFetch;