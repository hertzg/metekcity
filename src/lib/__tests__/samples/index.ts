import ERROR_CASES from './error';
import UNIT_CASES from './unit';
import AUTO_OFF_CASES from './autoOff';
import TARE_CASES from './tare';
import ITEM_CASES from './item';
import MEASUREMENT_CASES from './measurement';

const CASES = [
  ...UNIT_CASES,
  ...TARE_CASES,
  ...ERROR_CASES,
  ...ITEM_CASES,
  ...AUTO_OFF_CASES,
  ...MEASUREMENT_CASES,
];
export default CASES;
