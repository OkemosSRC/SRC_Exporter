const request = require("request");

async function fake_data(endpoint_url) {
    let i = 0;
    setInterval(async function () {
        i += 0.05;
        request({
            url: `${endpoint_url}/api/battery`, method: "POST", json: true, body: {
                "temp": `${Math.sin(i) * 10 + 70}`, "voltage": `${Math.cos(i) * 2 + 48}`
            }
        }, function (error, response, body) {
            if (error) {
                console.log(error);
            }
            if (response.statusCode !== 200) {
                console.log("Invalid status code: " + response.statusCode);
                console.log("Body: " + body);
            }
        });

        request({
            url: `${endpoint_url}/api/speed`, method: "POST", json: true, body: {
                "speed": `${Math.sin(i) * 10 + 45}`, "accel": `${Math.cos(i) * 2}`
            }
        }, function (error, response, body) {
            if (error) {
                console.log(error);
            }
            if (response.statusCode !== 200) {
                console.log("Invalid status code: " + response.statusCode);
                console.log("Body: " + body);
            }
        });
    }, 1000);
}

module.exports = fake_data;
