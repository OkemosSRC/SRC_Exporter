function exporter_build() {
    return `# HELP src_exporter_build_info SRC Exporter build information\n# TYPE src_exporter_build_info gauge\nsrc_exporter_build_info{commit="${process.env.GIT_COMMIT}",date="${process.env.TIME}",version="1.0.0"} 1\n`;
}

module.exports = exporter_build;
