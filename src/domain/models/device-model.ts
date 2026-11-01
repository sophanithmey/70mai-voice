export interface DashcamLedState {
  readonly color: string;
  readonly behavior: string;
  readonly meaning: string;
}

export interface DeviceSpecItem {
  readonly label: string;
  readonly value: string;
  readonly highlight?: boolean;
}

export interface DeviceProfile {
  readonly modelName: string;
  readonly marketingName: string;
  readonly resolution: string;
  readonly fieldOfView: string;
  readonly aperture: string;
  readonly powerInput: string;
  readonly storageSupport: string;
  readonly voiceControlStatus: string;
  readonly criticalAppWarning: string;
  readonly microphoneRange: string;
  readonly specs: readonly DeviceSpecItem[];
  readonly ledStates: readonly DashcamLedState[];
}

export const M310_DEVICE_PROFILE: DeviceProfile = {
  modelName: '70mai M310',
  marketingName: '70mai Dash Cam M310 (Entry Flagship)',
  resolution: '2304 x 1296 (3MP / 1296P QHD)',
  fieldOfView: '130° Wide Angle',
  aperture: 'F2.0',
  powerInput: '5V / 1.5A via Type-C USB',
  storageSupport: 'MicroSD 16GB - 128GB (Class 10+ / U1+)',
  voiceControlStatus: 'Offline On-Device Acoustic Engine (Hardware Micro-controller)',
  criticalAppWarning: 'Voice control is temporarily DISABLED while the 70mai mobile app is actively connected to the dash cam Wi-Fi hotspot.',
  microphoneRange: 'Optimized for vehicle cabin (1.0m - 1.8m from driver seat)',
  specs: [
    { label: 'Video Resolution', value: '1296P (3 Megapixels)', highlight: true },
    { label: 'Voice Control', value: 'Instant Offline DSP Acoustic Matching', highlight: true },
    { label: 'Lens Angle', value: '130° FOV / F2.0 Aperture' },
    { label: 'Interface', value: 'USB Type-C (Reversible)' },
    { label: 'Parking Surveillance', value: 'Supported (Requires 70mai Hardware Kit)' },
    { label: 'Loop Recording', value: '1 / 2 / 3 minutes auto-overwrite' },
    { label: 'App Connection', value: 'Wi-Fi IEEE 802.11 b/g/n 2.4GHz' }
  ],
  ledStates: [
    { color: '#10b981', behavior: 'Solid Green', meaning: 'Normal recording in progress' },
    { color: '#00d2ff', behavior: 'Solid / Breathing Blue', meaning: 'Non-recording mode or Wi-Fi hotspot active' },
    { color: '#ef4444', behavior: 'Flashing Red', meaning: 'Abnormal state (SD card error / write fault)' },
    { color: '#f59e0b', behavior: 'Flashing Amber', meaning: 'Emergency video recording initiated' }
  ]
};

