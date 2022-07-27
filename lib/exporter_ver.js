function exporter_ver() {
    return "# HELP exporter_ver Version of the exporter\n# TYPE exporter_ver gauge\nexporter_ver 1.0\n";
}

module.exports = exporter_ver;
