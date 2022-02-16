export default {
  unit: [
    [
      'SET_UNIT/g',
      'feefc0a2_c0_01_00_c1',
      {
        header: 'feefc0a2',
        type: 192,
        length: 1,
        payload: 0,
        checksum: 193,
      },
    ],
    [
      'SET_UNIT/ml',
      'feefc0a2_c0_01_02_c3',
      {
        header: 'feefc0a2',
        type: 192,
        length: 1,
        payload: 2,
        checksum: 195,
      },
    ],
    [
      'SET_UNIT/mlm',
      'feefc0a2_c0_01_04_c5',
      {
        header: 'feefc0a2',
        type: 192,
        length: 1,
        payload: 4,
        checksum: 197,
      },
    ],
    [
      'UNIT_STATE/g',
      'feefc0a2_d1_01_00_d2',
      {
        header: 'feefc0a2',
        type: 209,
        length: 1,
        payload: 0,
        checksum: 210,
      },
    ],
    [
      'UNIT_STATE/ml',
      'feefc0a2_d1_01_02_d4',
      {
        header: 'feefc0a2',
        type: 209,
        length: 1,
        payload: 2,
        checksum: 212,
      },
    ],
  ],
  tare: [
    [
      'SET_TARE/true',
      'feefc0a2_c1_01_00_c2',
      {
        header: 'feefc0a2',
        type: 193,
        length: 1,
        payload: false,
        checksum: 194,
      },
    ],
    [
      'SET_TARE/false',
      'feefc0a2_c1_01_01_c3',
      {
        header: 'feefc0a2',
        type: 193,
        length: 1,
        payload: true,
        checksum: 195,
      },
    ],
    [
      'TARE_STATE/true',
      'feefc0a2_d3_01_00_d4',
      {
        header: 'feefc0a2',
        type: 211,
        length: 1,
        payload: true,
        checksum: 212,
      },
    ],
    [
      'TARE_STATE/false',
      'feefc0a2_d3_01_01_d5',
      {
        header: 'feefc0a2',
        type: 211,
        length: 1,
        payload: false,
        checksum: 213,
      },
    ],
  ],
  error: [
    [
      'ERROR_STATE/true',
      'feefc0a2_e0_01_00_e1',
      {
        header: 'feefc0a2',
        type: 224,
        length: 1,
        payload: true,
        checksum: 225,
      },
    ],
    [
      'ERROR_STATE/false',
      'feefc0a2_e0_01_01_e2',
      {
        header: 'feefc0a2',
        type: 224,
        length: 1,
        payload: false,
        checksum: 226,
      },
    ],
  ],
  item: [
    [
      'ITEM_STATE/true',
      'feefc0a2_e4_01_00_e5',
      {
        header: 'feefc0a2',
        type: 228,
        length: 1,
        payload: true,
        checksum: 229,
      },
    ],
    [
      'ITEM_STATE/false',
      'feefc0a2_e4_01_01_e6',
      {
        header: 'feefc0a2',
        type: 228,
        length: 1,
        payload: false,
        checksum: 230,
      },
    ],
  ],
  autoOff: [
    [
      'SET_AUTO_OFF/2min',
      'feefc0a2_c4_01_78_3d',
      {
        header: 'feefc0a2',
        type: 196,
        length: 1,
        payload: 120,
        checksum: 61,
      },
    ],
    [
      'AUTO_OFF_STATE/2min',
      'feefc0a2_d5_02_0178_50',
      {
        header: 'feefc0a2',
        type: 213,
        length: 2,
        payload: 376,
        checksum: 80,
      },
    ],
  ],
  measurements: [
    [
      'MEASUREMENT/g/settled/-523',
      'feefc0a2_d0_05_01146e0001_59',
      {
        header: 'feefc0a2',
        type: 208,
        length: 5,
        payload: {
          value: -5230,
          unit: 0,
          settled: true,
        },
        checksum: 89,
      },
    ],
    [
      'MEASUREMENT/mlw/notSettled/1079',
      'feefc0a2_d0_05_002a260200_27',
      {
        header: 'feefc0a2',
        type: 208,
        length: 5,
        payload: {
          value: 10790,
          unit: 2,
          settled: false,
        },
        checksum: 39,
      },
    ],
  ],
};
