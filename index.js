const express = require('express');
const cors = require('cors');
const { path } = require('path');
const app= express();
app.use(cors());
const expressip = require('express-ip');

app.use((req,res,nextMiddleware) => {
    console.log('********* before usimg express-ip ******');
    console.log('req.ipInfo earlier is : ', req?.ipInfo);
    nextMiddleware();
  })


app.use(expressip().getIpInfoMiddleware);

app.use((req,res,nextMiddleware) => {
    console.log('++++++++++++ after usimg express-ip ******');
    console.log('req.ipInfo now is : ', req?.ipInfo);
    nextMiddleware();
})


if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('/client-cokkie-handler', function (req, res) {
        console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
        console.log('req.ipInfo ===>>>>> ', req?.ipInfo);
        const sampleData= ['user1', 'user2', 'user3'];
    
        res.json({
            ipData: req?.ipInfo
        })
      })


    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
  }



const serverPort = process.env.PORT || 5000;  

app.listen(serverPort, () => console.log(`Server started on port ${serverPort}`)) 
