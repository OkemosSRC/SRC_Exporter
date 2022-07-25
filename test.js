const fake_data = require('./lib/fake_data');

const config = {
    token: "", // replace with your token
    endpoint_url: "" // replace with your endpoint url
}


if (config.token === "") {
    console.error("token is empty");
    process.exit(1);
}


if (config.endpoint_url === "") {
    console.error("endpoint_url is empty");
    process.exit(1);
}


if (!config.endpoint_url.startsWith("http")) {
    console.error("endpoint_url must include http or https");
    process.exit(1);
}

fake_data(config.endpoint_url, {
    token: config.token
});
