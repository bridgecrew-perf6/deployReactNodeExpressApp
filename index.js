const express = require('express');
const cors = require('cors');
const axios= require('axios');
const { path } = require('express/lib/application');
const app= express();
app.use(cors());



app.get("/api", (req, res) => {
    const user= req.query.user || 'swat1508';
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

const serverPort = process.env.PORT || 5000;  

app.listen(serverPort, () => console.log(`Server started on port ${serverPort}`)) 
