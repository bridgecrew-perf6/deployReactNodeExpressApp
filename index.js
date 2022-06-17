const express = require('express');
const cors = require('cors');
const axios= require('axios');
const { path } = require('express/lib/application');
const app= express();
app.use(cors());
const expressip = require('express-ip');

app.use((req,res,nextMiddleware) => {
    console.log('********* before usimg express-ip ******');
    console.log('req.ip earlier is : ', req?.ipInfo);
    nextMiddleware();
  })


app.use(expressip().getIpInfoMiddleware);

app.use((req,res,nextMiddleware) => {
    console.log('++++++++++++ after usimg express-ip ******');
    console.log('req.ip now is : ', req?.ipInfo);
    nextMiddleware();
})


app.get("/api", (req, res) => {
    const user= req.query.user || 'swat1508';
    console.log('req is : ', req);
    axios.get(`https://api.github.com/users/${user}`)
    .then(response => {
        res.json({user: response.data});
    });
});

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
  }

  app.get('/client-cokkie-handler', function (req, res) {
    console.log('req.ipInfo ===>>>>> ', req?.ip);

    res.json({
        ipData: req.ip
    })
  })

const serverPort = process.env.PORT || 5000;  

app.listen(serverPort, () => console.log(`Server started on port ${serverPort}`)) 
