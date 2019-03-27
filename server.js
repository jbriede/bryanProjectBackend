var express = require('express');
var app = express();
var http = require('http').Server(app);
//  var gpio = require('rpi-gpio');
//  var gpiop = gpio.promise;

var motorOpenPin = 15;
var motorClosedPin = 16;

var OpenSensorPin = 17;
var ClosedSensorPin = 18;

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var status = "closed";

/* Check the sensor to see if the door has fully opened yet */
var isOpen = function()
{
    /* Read Pin */
    // gpio.setup(OpenSensorPin, gpio.DIR_IN, function(err)
    // {
    //     if (err) throw err;
    //     gpio.read(7, function(err, value) {
    //         if (err) throw err;
    //         return value;
    //     });
    // });
    return true;

}

/* Check the sensor to see if the door has fully closed yet */
var isClosed = function()
{
    /* Read Pin */
    // gpio.setup(ClosedSensorPin, gpio.DIR_IN, function(err)
    // {
    //     if (err) throw err;
    //     gpio.read(7, function(err, value) {
    //         if (err) throw err;
    //         return value;
    //     });
    // });
    return true;
}

var openDoor = function()
{
    status = "opening";

    /* turn on pen */
    // gpiop.setup(motorOpenPin, gpio.DIR_OUT).then(() =>
	// {
	// 	return gpio.write(motorOpenPin, true)
	// }).catch((err) => {
	// 	console.log("CANT USE PIN", this.pin)
	// 	console.log(err)
    // })
    
    /* Check if door is open ever couple ms */
    function checkIfOpen() {
        if (!isOpen())
        {
            setTimeout(checkIfOpen, 200);  
        }
        else
        {
            /* turn off pen */
            // gpiop.setup(motorOpenPin, gpio.DIR_OUT).then(() =>
            // {
            // 	return gpio.write(motorOpenPin, false)
            // }).catch((err) => {
            // 	console.log("CANT USE PIN", this.pin)
            // 	console.log(err)
            // })
            status = "Open";
        }
    }
    checkIfOpen();
}

var closeDoor = function()
{
    status = "closing";

    /* turn on pen */
    // gpiop.setup(motorClosenPin, gpio.DIR_OUT).then(() =>
	// {
	// 	return gpio.write(motorClosenPin, true)
	// }).catch((err) => {
	// 	console.log("CANT USE PIN", this.pin)
	// 	console.log(err)
    // })
    
    /* Check if door is open ever couple ms */
    function checkIfClosed() {
        if (!isClosed())
        {
            setTimeout(checkIfClosed, 200);  
        }
        else
        {
            /* turn off pen */
            // gpiop.setup(motorClosePin, gpio.DIR_OUT).then(() =>
            // {
            // 	return gpio.write(motorClosePin, false)
            // }).catch((err) => {
            // 	console.log("CANT USE PIN", this.pin)
            // 	console.log(err)
            // })
            status = "Closed";
        }
    }
    checkIfClosed();
}

app.post('/getStatus', function(req, res) {
    res.send(status);
});

app.post('/setPosition', function(req, res) {
    if (req.body.open == true)
    {
        openDoor();
    }
    else
    {
        closeDoor();
    }
    res.send(true);
});

http.listen(3000, function(){
    console.log('listening on *:3000');
  
  });
