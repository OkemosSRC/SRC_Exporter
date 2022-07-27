class Timeout {
    constructor() {
        this.time = new Date() - 100000;
        // set time to some time in the past to start
    }

    resetTimeout() {
        this.time = new Date();
    }

    timedOut() {
        if (new Date() - this.time > 15000) {
            return true;
        }
    }

    getTimeout() {
        if (this.timedOut()) {
            return `# HELP src_exporter_timeout Timeout\n# TYPE src_exporter_timeout gauge\nsrc_exporter_timeout 1\n`;
        } else {
            return `# HELP src_exporter_timeout Timeout\n# TYPE src_exporter_timeout gauge\nsrc_exporter_timeout 0\n`;
        }
    }

}

module.exports = Timeout;
