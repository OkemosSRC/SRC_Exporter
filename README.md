# SRC Exporter

OHS Solar Racing Club data exporter for Prometheus and Grafana.

<img src="https://cdn.discordapp.com/attachments/991536650414985338/1001024698919944272/unknown.png" alt="Grafana Dashboard">

## Quick Start

SRC Exporter receives data steams from API endpoints and converts them to Prometheus readable metrics.
It is strongly recommended to run the exporter in a [Docker Container](https://www.docker.com/).

Run SRC Exporter in a Docker Container with the following command:

```bash
docker run -p 8090:8080 --name src-exporter -d ghcr.io/okemossrc/src_exporter:main
```

The SRC Exporter metrics will be available at http://localhost:8090/metrics

## Sample Data Submission

To submit sinusoidal sample data streams to the SRC Exporter for testing, add the API endpoint URL and the authorization
token to the `test.js` file.

Example:

```js
const config = {
    token: "A0b1C2d3E4f5G6", // replace with your token
    endpoint_url: "https://example.com" // replace with your endpoint url 
    // execlding any directory paths but including the protocol (http:// or https://)
}
```

and execute the following command:

```bash
npm test
# or node test.js
```

The sample data generator will then submit sinusoidal data to the SRC Exporter.

### Tokens

Hashes of some tokens are stored in the `lib/hashes.txt` file.

Token - Hash pairs can be generated with the following code:

```node
const {generate_token, hash_token} = require('./lib/auth.js');
const fs = require('fs');

function generate_token_hash_pairs() {
    const token = generate_token();
    fs.appendFileSync('lib/tokens.txt', token + '\n');
    fs.appendFileSync('lib/hashes.txt', hash_token(token) + '\n');
}

generate_token_hash_pairs();
```

## Running the Exporter without Docker

Although not recommended, it is possible to run the SRC Exporter without Docker.

```bash
git clone https://github.com/OkemosSRC/SRC_Exporter.git
cd SRC_Exporter
npm install
npm start
```

The SRC Exporter metrics will be available at http://localhost:8090/metrics

## Prometheus Configuration

After starting the SRC Exporter, you need to configure Prometheus to scrape the SRC Exporter metrics.

Append the following lines to your `prometheus.yml` file, under the `scrape_configs` section:

```yaml
  - job_name: src_exporter
    static_configs:
      - targets: [ 'localhost:8090' ]
```

Then, restart Prometheus:

```bash
sudo systemctl restart prometheus
```

## Grafana Configuration

An importable Grafana dashboard json file can be found [here](grafana/SRC_Grafana_Dashboard.json).

Grafana must be configured to work with Prometheus first.
A detailed guide can be found [here](https://prometheus.io/docs/visualization/grafana/).
