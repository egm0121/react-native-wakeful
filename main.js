import { NativeModules, Platform } from 'react-native';

class ImplementedWakeful {
    constructor() {
      this.RNWakeful = NativeModules.RNWakeful;
    }

    isHeld(cb = () => {}) {
        const retVal = this.RNWakeful.isHeld(cb);
        return cb(retVal);
    }

    acquire() {
        return this.RNWakeful.acquire();
    }

    release() {
        return this.RNWakeful.release();
    }
}

class DummyWakeful {
    constructor() {
      this.locksHeld = false;
    }
    acquire() {
        if (this.isHeld()) {
            return;
        }
        this.locksHeld = true;
    }
    release() {
        if (!this.isHeld()) {
            return;
        }
        this.locksHeld = false;
    }
    isHeld(cb = () => {}) {
        return cb(this.locksHeld);
    }
}

let Wakeful;

if (Platform.OS === 'android') {
    Wakeful = ImplementedWakeful;
} else {
    Wakeful = DummyWakeful;
}

module.exports = Wakeful;
