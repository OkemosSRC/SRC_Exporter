const express = require('express');
const Battery = require('./lib/battery');
const Speed = require('./lib/speed');
const {verify_token_from_file} = require('./lib/auth');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
battery_info = new Battery();
speed_info = new Speed();


app.get('/', (req, res) => {
    res.send(`
        <html lang="en">
            <head>
                <title>Metrics</title>
            </head>
            <body>
                <a href="/metrics">Metrics</a>
            </body>
        </html>
    `);
});


app.post('/api/battery/', (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            res.status(400).send('request body is required');
        }
        if (!data.auth) {
            res.status(403).send('token is required');
        }
        if (!data.temp) {
            res.status(400).send('temp is required');
        }
        if (!data.voltage) {
            res.status(400).send('voltage is required');
        }
        if (isNaN(data.temp)) {
            res.status(400).send('temp must be a number');
        }
        if (isNaN(data.voltage)) {
            res.status(400).send('voltage must be a number');
        }
        if (verify_token_from_file(data.auth)) {
            battery_info.setTemp(data.temp);
            battery_info.setVoltage(data.voltage);
            res.status(200).send("ok");
        } else {
            res.status(403).send('invalid token');
        }
    } catch (err) {
        res.status(500).send(err);
    }
})


app.post('/api/speed/', (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            res.status(400).send('request body is required');
        }
        if (!data.auth) {
            res.status(403).send('token is required');
        }
        if (!data.speed) {
            res.status(400).send('speed is required');
        }
        if (!data.accel) {
            res.status(400).send('accel is required');
        }
        if (isNaN(data.speed)) {
            res.status(400).send('speed must be a number');
        }
        if (isNaN(data.accel)) {
            res.status(400).send('accel must be a number');
        }
        if (verify_token_from_file(data.auth)) {
            speed_info.setSpeed(data.speed);
            speed_info.setAccel(data.accel);
            res.status(200).send("ok");
        } else {
            res.status(403).send('invalid token');
        }
    } catch (err) {
        res.status(500).send(err);
    }
})


app.get('/metrics', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send(battery_info.getTemp() + battery_info.getVoltage() + speed_info.getSpeed() + speed_info.getAccel());
});


app.listen(port, () => {
    console.log(`SRC Exporter listening on http://localhost:${port}`);
    console.log(`Metrics: http://localhost:${port}/metrics`);
});
