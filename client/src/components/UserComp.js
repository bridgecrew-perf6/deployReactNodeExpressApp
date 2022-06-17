import React, { useEffect, useState } from 'react'
import axios from 'axios';


const UserComp = () =>  {

    const [userData, setUserData] = useState({});

    useEffect(() => {

    axios.get('/api')
        .then(response => {
            setUserData(response.data)
        })
    

    }, [])

    const getUserIpData = () => {
      console.log('getUserIpData');
      /*
      fetch('/api')
      .then(res => res.json())
      .then(data =>  console.log('data from server is : ' ,  data?.users) );
      */
      fetch('/client-cokkie-handler')
      .then(res => {
        console.log('res is : ',  res);
        return res.json()
      }
        )
      .then(data =>  console.log('data from server is : ' ,  data?.ipData) );

    }
    
  return (
    <div>
     <h2> This is User Component </h2>
     {
         userData && (
             <>
                <p>{userData?.user?.login}</p>
                <p> <img src={userData?.user?.avatar_url} alt="logo" /> </p>
            </>
         )
     }
  

      
      <button onClick={() => getUserIpData()} > Click to see Ip Data </button>
     
      {/* {
          userData && JSON.stringify(userData)
      } */}

    </div>

  )
}


export default UserComp;
