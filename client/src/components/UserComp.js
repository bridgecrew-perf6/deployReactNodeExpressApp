import './UserComp.css';
import React, { useState } from "react";

const UserComp = () => {
  const [expressIpData, setUserIpData] = useState(null);
  const [geoIpLite2Data, setGeoIpLite2Data] = useState(null);
  const [geoIp2Data, setGeoIp2Data] = useState(null);

  const getExpressIpData = () => {
    console.log('getExpressIpData !!!');
    fetch("/get-express-ip-data")
      .then((res) => res.json())
      .then((data) => {
        console.log("express ip data from server is : ", data?.expressIpFetchedData);
        setUserIpData(data?.expressIpFetchedData);
      });
  };

  const getGeoIpLite2Data = () => {
    console.log('getGeoIpLite2Data !!!!');
    fetch("/get-geoIpLite2-data")
    .then((res) => res.json())
    .then((data) => {
      console.log("geoIpLite2 data from server is : ", data?.geoIpLite2FetchedData);
      setGeoIpLite2Data(data?.geoIpLite2FetchedData);
      
    });
  };

  const getGeoIp2Data = () => {
    console.log('getGeoIp2Data !!!!');
    fetch("/get-geoIp2-data")
    .then((res) => res.json())
    .then((data) => {
      console.log("geoIp2 data from server is : ", data?.geoIp2FetchedData);
      // setGeoIp2Data(data?.ipData2);
      
    });
  };

  return (
    <div>
      <h2>Click on Button - Display express-ip data to display data form express-ip using geoip-lite</h2>
      {/* <h3>User Ip Data will display Below :</h3> */}

      {expressIpData && (
        <div className="user-data-display">
          <div className="user-label-value">
            <span className="user-data-label">Ip Address :</span>
            <span className="user-data-value">{expressIpData?.ip}</span>
          </div>

          <div className="user-label-value">
            <span className="user-data-label">Country : </span>
            <span className="user-data-value"> {expressIpData?.country}</span>
          </div>

          <div className="user-label-value">
            <span className="user-data-label"> City : </span>
            <span className="user-data-value">{expressIpData?.city} </span>
          </div>

          <div className="user-label-value">
            <span className="user-data-label"> Region : </span>
            <span className="user-data-value"> {expressIpData?.region} </span>
          </div>
        </div>
      )}

      <button className='display-ip-data-btn' onClick={() => getExpressIpData()}> Display express-ip data </button>

      <hr/>
      <h2>Click on Button - Display GeoIpLite2 Data </h2>
      {/* <h3> Data will display Below :</h3> */}
      {geoIpLite2Data && (
        <div className="user-data-display">
          <div className="user-label-value">
            <span className="user-data-label">Ip Address from GeoIpLite2 :</span>
            <span className="user-data-value">{geoIpLite2Data?.traits?.ipAddress}</span>
          </div>

          <div className="user-label-value">
            <span className="user-data-label">Country : </span>
            <span className="user-data-value"> {geoIpLite2Data?.country?.isoCode}</span>
          </div>

          <div className="user-label-value">
            <span className="user-data-label"> Region : </span>
            <span className="user-data-value">{geoIpLite2Data?.continent?.code} </span>
          </div>
        </div>
      )}
       <button className='display-ip-data-btn' onClick={() => getGeoIpLite2Data()}> Display GeoIpLite2 Data </button>

      <hr/>
      
      <h2>Click on Button - Display GeoIp2 Data  </h2>
      {/* <h3> Data will display Below :</h3> */}

      <button className='display-ip-data-btn' onClick={() => getGeoIp2Data()}> Display GeoIp2 Data </button>
    </div>
  );
};

export default UserComp;
