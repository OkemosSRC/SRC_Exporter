class Battery {
    constructor() {
        this.temp = 0;
        this.voltage = 0;
    }

    getTemp() {
        return `# HELP src_battery_temp Current Battery Temperature in Degrees Fahrenheit\n# TYPE src_battery_temp gauge\nsrc_battery_temp ${this.temp}\n`;
    }

    getVoltage() {
        return `# HELP src_battery_voltage Current Battery Voltage in Volts\n# TYPE src_battery_voltage gauge\nsrc_battery_voltage ${this.voltage}\n`;
    }

    setTemp(temp) {
        this.temp = temp;
    }

    setVoltage(voltage) {
        this.voltage = voltage;
    }

}

module.exports = Battery;
