import './UserComp.css';
import React, { useState } from "react";

const UserComp = () => {
  const [userIpData, setUserIpData] = useState(null);
  const [userIpData2, setUserIpData2] = useState(null);

  const getUserIpData = () => {
    fetch("/client-cookie-handler")
      .then((res) => res.json())
      .then((data) => {
        console.log("data from server is : ", data?.ipData);
        setUserIpData(data?.ipData);
      });
  };

  const getUserIpData2 = () => {
    console.log('getUserIpData2 !!!!');
    fetch("/client-cookie-handler2")
    .then((res) => res.json())
    .then((data) => {
      console.log("data from server is : ", data?.ipData2);
      setUserIpData2(data?.ipData2);
      
    });
  };

  return (
    <div>
      <h2>Click on Button - Display Ip Data from express-ip using geoip-lite</h2>
      <h3>User Ip Data will display Below :</h3>

      {userIpData && (
        <div className="user-data-display">
          <div className="user-label-value">
            <span className="user-data-label">Ip Address :</span>
            <span className="user-data-value">{userIpData?.ip}</span>
          </div>

          <div className="user-label-value">
            <span className="user-data-label">Country : </span>
            <span className="user-data-value"> {userIpData?.country}</span>
          </div>

          <div className="user-label-value">
            <span className="user-data-label"> City : </span>
            <span className="user-data-value">{userIpData?.city} </span>
          </div>

          <div className="user-label-value">
            <span className="user-data-label"> Region : </span>
            <span className="user-data-value"> {userIpData?.region} </span>
          </div>
        </div>
      )}

      <button className='display-ip-data-btn' onClick={() => getUserIpData()}> Display Ip Data </button>

      <hr/>
      <button className='display-ip-data-btn' onClick={() => getUserIpData2()}> Display Ip Data2 </button>
      <h2>Click on Button - Display Ip Data from GeoIpLite2 </h2>
      <h3> Data will display Below :</h3>
      {userIpData2 && (
        <div className="user-data-display">
          <div className="user-label-value">
            <span className="user-data-label">Ip Address from GeoIpLite2 :</span>
            <span className="user-data-value">{userIpData?.traits?.ipAddress}</span>
          </div>

          <div className="user-label-value">
            <span className="user-data-label">Country : </span>
            <span className="user-data-value"> {userIpData2?.country?.isoCode}</span>
          </div>

          <div className="user-label-value">
            <span className="user-data-label"> Region : </span>
            <span className="user-data-value">{userIpData?.continent?.code} </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserComp;
