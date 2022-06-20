const express = require('express');
const cors = require('cors');
const { path } = require('path');
const app= express();
app.use(cors());
const expressip = require('express-ip');

// const WebServiceClient = require('@maxmind/geoip2-node').WebServiceClient;
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


    app.get('/client-cookie-handler2', function (req, res) {
      console.log('second button clicked !!!!');

      // To query the GeoLite2 web service, you must set the optional `host` parameter
      const client = new WebServiceClient('732637', 'xBcsGDYo5ZHlDtEx', {host: 'geolite.info'});
      
      client.country('23.108.96.79').then(response => {
        console.log(response?.country?.isoCode); // 'CA'
      });
         
    });
 


    app.get('/client-cookie-handler', function (req, res) {
        
        res.json({
            ipData: req?.ipInfo
        })
      })

      app.get('/client-cookie-handler2', function (req, res) {

        console.log('server file ===>> client-cookie-handler2 !!!!!');
      })


    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
  }



const serverPort = process.env.PORT || 5000;  

app.listen(serverPort, () => console.log(`Server started on port ${serverPort}`)) 
