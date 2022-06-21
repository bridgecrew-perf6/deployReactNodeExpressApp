const express = require('express');
const cors = require('cors');
const { path } = require('path');
const app= express();
app.use(cors());
const expressip = require('express-ip');

const WebServiceClient = require('@maxmind/geoip2-node').WebServiceClient;
/*
app.use((req,res,nextMiddleware) => {
    console.log('********* before usimg express-ip ******');
    console.log('req.ipInfo earlier is : ', req?.ipInfo);
    nextMiddleware();
  })
 */ 


app.use(expressip().getIpInfoMiddleware);
/*
app.use((req,res,nextMiddleware) => {
    console.log('++++++++++++ after usimg express-ip ******');
    console.log('req.ipInfo now is : ', req?.ipInfo);
    nextMiddleware();
})
*/


if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    // express-ip
    app.get('/get-express-ip-data', function (req, res) {
      console.log('first button clicked !!!!');
      res.json({
          expressIpFetchedData: req?.ipInfo
      })
    })

  // GeoLite2
    app.get('/get-geoIpLite2-data', function (req, res) {
      console.log('second button clicked !!!!');

      // To query the GeoLite2 web service, you must set the optional `host` parameter
      const client = new WebServiceClient('732637', 'xBcsGDYo5ZHlDtEx', {host: 'geolite.info'});
      console.log('req-ip is : ', req?.ip);
      console.log('req-ipInfo is : ', req?.ipInfo);
      console.log('req-ipInfo-ip is : ', req?.ipInfo?.ip);

      client.country(req?.ipInfo?.ip).then(response => {
        console.log('get-geoIpLite2-data ==>> country - isoCode ==>> ', response?.country?.isoCode);
        res.json({
          geoIpLite2FetchedData: response
      })
      });
         
    });


    // GeoIp2
    app.get('/get-geoIp2-data', function (req, res) {
      console.log('third button clicked !!!!');

      // To query the GeoLite2 web service, you must set the optional `host` parameter
      const client = new WebServiceClient('732637', 'xBcsGDYo5ZHlDtEx');
      console.log('req-ip is : ', req?.ip);
      console.log('req-ipInfo is : ', req?.ipInfo);
      console.log('req-ipInfo-ip is : ', req?.ipInfo?.ip);

      client.country(req?.ipInfo?.ip).then(response => {
        console.log('get-geoIp2-data ==> response ==>> ', response);
        res.json({
          geoIp2FetchedData: response
      })
      });
         
    });
 







    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
  }



const serverPort = process.env.PORT || 5000;  

app.listen(serverPort, () => console.log(`Server started on port ${serverPort}`)) 
