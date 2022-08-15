import {
  ENUM_HELPER_DATE_DIFF,
  ENUM_HELPER_DATE_FORMAT,
} from './constants/helper.enum.constant';

export interface IHelperJwtVerifyOptions {
  secretKey: string;
}

export interface IHelperJwtOptions {
  expiredIn: string;
  notBefore?: string;
  secretKey: string;
}

export interface IHelperStringRandomOptions {
  uppercase?: boolean;
  safe?: boolean;
  prefix?: string;
}

export interface IHelperGeoCurrent {
  latitude: number;
  langitude: number;
}

export interface IHelperGeoRules extends IHelperGeoCurrent {
  radiusInMeters: number;
}

export interface IHelperDateOptions {
  timezone?: string;
}

export interface IHelperDateOptionsDiff extends IHelperDateOptions {
  format?: ENUM_HELPER_DATE_DIFF;
}

export interface IHelperDateOptionsCreate extends IHelperDateOptions {
  date?: string | number | Date;
}

export interface IHelperDateOptionsFormat extends IHelperDateOptions {
  format?: ENUM_HELPER_DATE_FORMAT | string;
}

export interface IHelperDateOptionsForward extends IHelperDateOptions {
  fromDate?: Date;
}

export type IHelperDateOptionsBackward = IHelperDateOptionsForward;

export interface IHelperDateOptionsMonth extends IHelperDateOptions {
  year?: number;
}

export type IHelperFileExcelRows = Record<string, string | number>;
