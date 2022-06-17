import React, { useState } from "react";

const UserComp = () => {
  const [userIpData, setUserIpData] = useState(null);

  const getUserIpData = () => {
    console.log("getUserIpData");

    fetch("/client-cokkie-handler")
      .then((res) => res.json())
      .then((data) => {
        console.log("data from server is : ", data?.ipData);
        setUserIpData(data?.ipData);
      });
  };

  return (
    <div>
      <h2> User Ip Data will display Below :</h2>
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

      <button onClick={() => getUserIpData()}> Click to see Ip Data </button>
    </div>
  );
};

export default UserComp;
