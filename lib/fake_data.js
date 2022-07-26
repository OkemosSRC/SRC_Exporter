const request = require("request");

function fake_data(endpoint_url, config) {
    const token = config.token;
    let i = 0;
    setInterval(async function () {
        try {
            if (i > 6.28) {
                i = 0;
            }
            request({
                url: `${endpoint_url}/api/battery`, method: "POST", json: true, body: {
                    "auth": token, "temp": `${Math.sin(i) * 10 + 50}`, "voltage": `${Math.cos(i) * 2 + 48}`
                }
            }, function (error, response, body) {
                if (error) {
                    console.log(error);
                    return;
                }
                if (response.statusCode !== 200) {
                    console.log("Invalid status code: " + response.statusCode);
                    console.log("Body: " + body);
                }
            });

            request({
                url: `${endpoint_url}/api/speed`, method: "POST", json: true, body: {
                    "auth": token, "speed": `${Math.sin(i) * 10 + 45}`, "accel": `${Math.cos(i) * 2}`
                }
            }, function (error, response, body) {
                if (error) {
                    console.log(error);
                    return;
                }
                if (response.statusCode !== 200) {
                    console.log("Invalid status code: " + response.statusCode);
                    console.log("Body: " + body);
                }
            });
            i += 0.05;
        } catch (err) {
            console.log(err);
        }
    }, 1000);
}

module.exports = fake_data;
