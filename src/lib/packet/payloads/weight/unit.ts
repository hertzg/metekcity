export const enum Unit {
  GRAM = 0x00,
  POUND_OUNCE = 0x01,
  MILLILITER_WATER = 0x02,
  MILLILITER_MILK = 0x04,
  OUNCE_WATER = 0x06,
  FLUID_OUNCE_WATER = 0x03,
  FLUID_OUNCE_MILK = 0x05,
}

export type SolidUnit = Unit.GRAM | Unit.POUND_OUNCE;
export type LiquidUnit = Exclude<Unit, SolidUnit>;
export type WaterUnit =
  | Unit.MILLILITER_WATER
  | Unit.OUNCE_WATER
  | Unit.FLUID_OUNCE_WATER;
export type MilkUnit = Exclude<LiquidUnit, WaterUnit>;

export type MetricUnit =
  | Unit.GRAM
  | Unit.MILLILITER_WATER
  | Unit.MILLILITER_MILK;
export type ImperialUnit = Exclude<Unit, MetricUnit>;
