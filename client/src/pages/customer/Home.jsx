import { useState,useEffect, useContext } from 'react'
import Progress from '../../components/Progress.jsx'
import List from '../../components/List.jsx'
import { SearchContext } from '../../context/SearchContextProvider.jsx';
function Home() {
  const {searchText} =useContext(SearchContext)
  const [isLoading,setIsLoading] = useState(false);

 useEffect(()=>{
    if(searchText){
      setIsLoading(true);

      const timer = setTimeout(()=>{
        setIsLoading(false);
      },1000);
      
      //cleanup the timer
      return()=> clearTimeout(timer);

    }
    else{
      // to set the loader to false when we backspace the entered text
      setIsLoading(false);
    }
},[searchText])

  return (
     <>
    {
      isLoading ?  <Progress/> :  <List  />
    }   
     </>
  )
}

export default Home