const fake_data = require('./lib/fake_data');

const config = {
    token: "", // replace with your token
    endpoint_url: "" // replace with your endpoint url
}

fake_data(config.endpoint_url, {
    token: config.token
});
