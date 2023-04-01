var http = require("http");
const ZKLib = require('node-zklib')
const express = require('express');
const app = express();

// DEVICE IP AND PORT SETUP
const deviceIP = '192.168.0.201'
const devicePORT = '4370'

var userData;
var userAttendences = [];


// Defining get request at '/' route
app.get('/', async function (req, res) {
    var data = await getDeviceData();
    res.json({
        "status": "true"
    });
});

// // User List
app.get('/user-list', async function (req, res) {
    var data = await getDeviceData();
    // console.log(userData)
    res.send(userData)
});
app.get('/attendence-list', async function (req, res) {
    var data = await getDeviceAttendenceData();
    // console.log(userAttendences)
    res.send(userAttendences)
});


const getDeviceData = async () => {
    let zkInstance = new ZKLib(deviceIP, devicePORT, 5200, 5000);
    try {
        // Create socket to machine 
        await zkInstance.createSocket()

    } catch (e) {
    }

    const users = await zkInstance.getUsers();
    userData = users.data;
    
    await zkInstance.disconnect()

}
const getDeviceAttendenceData = async () => {
    let zkInstance = new ZKLib(deviceIP, devicePORT, 5200, 5000);
    try {
        // Create socket to machine 
        await zkInstance.createSocket()
    } catch (e) {
    }

    const attendences = await zkInstance.getAttendances();
    // userAttendences = attendences.data.filter(obj =>  new Date(obj.recordTime).toISOString().substring(0, 10) === new Date().toISOString().substring(0, 10));

    userAttendences = attendences.data

    await zkInstance.disconnect()

}

// Setting the server to listen at port 3999
app.listen(3999, function (req, res) {
    console.log("Server is running at port 3999");
});

