const express = require('express');
const Battery = require('./lib/battery');
const Speed = require('./lib/speed')
const fake_data = require('./lib/fake_data');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

battery_info = new Battery();
speed_info = new Speed();

fake_data(`http://localhost:${port}`);

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
    const data = req.body;
    battery_info.setTemp(data.temp);
    battery_info.setVoltage(data.voltage);
    res.status(200).send("ok");
})


app.post('/api/speed/', (req, res) => {
    const data = req.body;
    speed_info.setSpeed(data.speed);
    speed_info.setAccel(data.accel);
    res.status(200).send("ok");
})


app.get('/metrics', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send(battery_info.getTemp() + battery_info.getVoltage() + speed_info.getSpeed() + speed_info.getAccel());
});


app.listen(port, () => {
    console.log(`SRC App listening on http://localhost:${port}`);
    console.log(`Metrics: http://localhost:${port}/metrics`);
});
