function exporter_ver() {
    return `# HELP exporter_ver Version of the exporter\n# TYPE exporter_ver gauge\nexporter_ver{version=\"1.0.0\",commit="${process.env.GIT_COMMIT}",build_time="${process.env.TIME}"}\n`;
}

module.exports = exporter_ver;
