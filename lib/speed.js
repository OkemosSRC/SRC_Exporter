class Speed {
    constructor() {
        this.speed = 0;
        this.accel = 0;
    }

    getSpeed() {
        return `# HELP src_vehicle_speed Current Vehicle Speed in MPH\n# TYPE src_vehicle_speed gauge\nsrc_vehicle_speed ${this.speed}\n`;
    }

    getAccel() {
        return `# HELP src_vehicle_accel Current Vehicle Acceleration in m/s^2 \n# TYPE src_vehicle_accel gauge\nsrc_vehicle_accel ${this.accel}\n`;
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    setAccel(accel) {
        this.accel = accel;
    }
}

module.exports = Speed;
