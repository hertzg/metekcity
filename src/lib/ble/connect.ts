import Noble from "noble";
import Debug from "debug";
import isEqual from "lodash-ts/isEqual";

const debug = Debug("ble");

const enum Scanning {
  STARTING,
  STARTED,
  STOPPING,
  STOPPED,
}

class BLE {
  #uuidsToScan: string[];
  #initialized = false;

  #lastScanningStateError: Error | null = null;
  #scanningState = Scanning.STOPPED;

  constructor(uuids: string[]) {
    this.#uuidsToScan = uuids;
  }

  #ensureInitialized = async () => {
    return new Promise((resolve) => {
      if (this.#initialized) {
        resolve();
        return;
      }

      Noble.on("stateChange", this.#onReadyStateChange);
      Noble.on("discover", this.#onDiscover);
      this.#initialized = true;
      resolve();
    });
  };

  #onReadyStateChange = (newState: string) => {
    if (newState === "poweredOn") {
      this.#onPoweredOn();
    } else {
      this.#onPoweredOff();
    }
  };

  #onPoweredOn = () => {
    this.startScanning();
  };

  #onPoweredOff = () => {
    this.stopScanning();
  };

  #scanStartingPromise: Promise<void> | null = null;

  async startScanning() {
    await this.#ensureInitialized();
    if (this.#scanningState === Scanning.STARTED) {
      return;
    } else if (this.#scanningState === Scanning.STARTING) {
      return this.#scanStartingPromise;
    } else if (this.#scanningState === Scanning.STOPPING) {
      await this.#scanStoppingPromise;
    }

    this.#scanStartingPromise = new Promise((resolve, reject) => {
      this.#scanningState = Scanning.STARTING;
      Noble.startScanning(this.#uuidsToScan, true, (error: Error | null) => {
        this.#scanStoppingPromise = null;
        this.#lastScanningStateError = error;
        this.#scanningState = error ? Scanning.STOPPED : Scanning.STARTED;

        if (error) {
          this.#scanningState = Scanning.STOPPED;
          reject(error);
        } else {
          this.#scanningState = Scanning.STARTED;
          resolve();
        }
      });
    });
    return this.#scanStartingPromise;
  }

  #scanStoppingPromise: Promise<void> | null = null;

  async stopScanning() {
    await this.#ensureInitialized();
    if (this.#scanningState === Scanning.STOPPED) {
      return;
    } else if (this.#scanningState === Scanning.STOPPING) {
      return this.#scanStoppingPromise;
    } else if (this.#scanningState === Scanning.STARTING) {
      await this.#scanStartingPromise;
    }

    this.#scanStoppingPromise = new Promise((resolve) => {
      this.#scanningState = Scanning.STOPPING;
      Noble.stopScanning(() => {
        this.#scanStoppingPromise = null;
        this.#lastScanningStateError = null;
        this.#scanningState = Scanning.STOPPED;
        resolve();
      });
    });

    return this.#scanStoppingPromise;
  }

  #onDiscover = async (p: Noble.Peripheral) => {
    await this.stopScanning();
    const peripheral = new BLEPeripheral(p);

    try {
        await peripheral.connect()
    }
  };
}

class BLEPeripheral {
  #peripheral: Noble.Peripheral;

  constructor(peripheral: Noble.Peripheral) {
    this.#peripheral = peripheral;
  }
}

let instance: BLE | null = null;
export const createConnection = async (uuids: string[] = []) => {
  if (!instance) {
    instance = new BLE(uuids);
  }

  return uuids;
};
