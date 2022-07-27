const start_date = Math.floor(new Date() / 1000);

function exporter_ver() {
    return `# HELP exporter_ver Version of the exporter\n# TYPE exporter_ver gauge\nexporter_ver{version=\"1.0.0\",commit="${process.env.GIT_COMMIT}",started_on="${start_date}"}\n`;
}

module.exports = exporter_ver;
