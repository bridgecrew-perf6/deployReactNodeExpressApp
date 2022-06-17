import React, { useEffect, useState } from 'react'
import axios from 'axios';


const UserComp = () =>  {

    const [userIpData, setUserIpData] = useState({});

    const getUserIpData = () => {
      console.log('getUserIpData');

      fetch('/client-cokkie-handler')
      .then(res => res.json())
      // .then(data =>  {}console.log('data from server is : ' ,  data?.ipData) );
      .then(data => {
        console.log('data from server is : ' ,  data?.ipData);
        setUserIpData(data?.ipData);
      })

    }
    
  return (
    <div>
     <h2> User Ip Data will display Below :</h2>
     {
         userIpData && (
             <>
              {JSON.stringify(userIpData)}
            </>
         )
     }
  
      <button onClick={() => getUserIpData()} > Click to see Ip Data </button>
    </div>

  )
}


export default UserComp;
