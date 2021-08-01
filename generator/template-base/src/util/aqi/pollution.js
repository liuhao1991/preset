/*
 * @Author: lh@metgs.com
 * @Date: 2021-06-28 14:17:43
 * @LastEditors: lh@metgs.com
 * @LastEditTime: 2021-07-06 13:23:06
 * @Description: 计算首要污染物
 */

const getCalcIAQI = (value, lowI, highI, lowC, highC) => {
  if (value < 0 || highI < 0 || lowI < 0 || highC < 0 || lowC < 0) {
    return -99;
  }
  if (highC == lowC) {
    return lowI;
  }
  const iaqi = ((value - lowC) * (highI - lowI)) / (highC - lowC) + lowI;
  return Math.ceil(iaqi);
};

export const getPM10IAQI = (val) => {
  let param = 0;
  if (0 <= val && val < 50) {
    param = getCalcIAQI(val, 0, 50, 0, 50);
  } else if (50 <= val && val < 150) {
    param = getCalcIAQI(val, 50, 100, 50, 150);
  } else if (150 <= val && val < 250) {
    param = getCalcIAQI(val, 100, 150, 150, 250);
  } else if (250 <= val && val < 350) {
    param = getCalcIAQI(val, 150, 200, 250, 350);
  } else if (350 <= val && val < 420) {
    param = getCalcIAQI(val, 200, 300, 350, 420);
  } else if (420 <= val && val < 500) {
    param = getCalcIAQI(val, 300, 400, 420, 500);
  } else if (500 <= val && val < 600) {
    param = getCalcIAQI(val, 400, 500, 500, 600);
  } else {
    param = -99;
  }
  return param;
};

export const getPM25IAQI = (val) => {
  let pm25 = val;
  let param = 0;
  if (0 <= pm25 && pm25 < 35) {
    param = getCalcIAQI(pm25, 0, 50, 0, 35);
  } else if (35 <= pm25 && pm25 < 75) {
    param = getCalcIAQI(pm25, 50, 100, 35, 75);
  } else if (75 <= pm25 && pm25 < 115) {
    param = getCalcIAQI(pm25, 100, 150, 75, 115);
  } else if (115 <= pm25 && pm25 < 150) {
    param = getCalcIAQI(pm25, 150, 200, 115, 150);
  } else if (150 <= pm25 && pm25 < 250) {
    param = getCalcIAQI(pm25, 200, 300, 150, 250);
  } else if (250 <= pm25 && pm25 < 350) {
    param = getCalcIAQI(pm25, 300, 400, 250, 350);
  } else if (350 <= pm25 && pm25 < 500) {
    param = getCalcIAQI(pm25, 400, 500, 350, 500);
  } else {
    param = -99;
  }
  return param;
};

export const getCOIAQI = (val) => {
  let param = 0;
  if (0 <= val && val < 2) {
    param = getCalcIAQI(val, 0, 50, 0, 2);
  } else if (2 <= val && val < 4) {
    param = getCalcIAQI(val, 50, 100, 2, 4);
  } else if (4 <= val && val < 14) {
    param = getCalcIAQI(val, 100, 150, 4, 14);
  } else if (14 <= val && val < 24) {
    param = getCalcIAQI(val, 150, 200, 14, 24);
  } else if (24 <= val && val < 36) {
    param = getCalcIAQI(val, 200, 300, 24, 36);
  } else if (36 <= val && val < 48) {
    param = getCalcIAQI(val, 300, 400, 36, 48);
  } else if (48 <= val && val < 60) {
    param = getCalcIAQI(val, 400, 500, 48, 60);
  } else {
    param = -99;
  }
  return param;
};

export const getSO2IAQI = (val) => {
  let param = 0;
  if (0 <= val && val < 50) {
    param = getCalcIAQI(val, 0, 50, 0, 50);
  } else if (50 <= val && val < 150) {
    param = getCalcIAQI(val, 50, 100, 50, 150);
  } else if (150 <= val && val < 475) {
    param = getCalcIAQI(val, 100, 150, 150, 475);
  } else if (475 <= val && val < 800) {
    param = getCalcIAQI(val, 150, 200, 475, 800);
  } else if (800 <= val && val < 1600) {
    param = getCalcIAQI(val, 200, 300, 800, 1600);
  } else if (1600 <= val && val < 2100) {
    param = getCalcIAQI(val, 300, 400, 1600, 2100);
  } else if (2100 <= val && val < 2620) {
    param = getCalcIAQI(val, 400, 500, 1600, 2620);
  } else {
    param = -99;
  }
  return param;
};

export const getO3IAQI = (val) => {
  let param = 0;
  if (0 <= val && val < 100) {
    param = getCalcIAQI(val, 0, 50, 0, 100);
  } else if (100 <= val && val < 160) {
    param = getCalcIAQI(val, 50, 100, 100, 160);
  } else if (160 <= val && val < 215) {
    param = getCalcIAQI(val, 100, 150, 160, 215);
  } else if (215 <= val && val < 265) {
    param = getCalcIAQI(val, 150, 200, 215, 265);
  } else if (265 <= val && val < 800) {
    param = getCalcIAQI(val, 200, 300, 265, 800);
  } else {
    param = -99;
  }
  return param;
};

export const getNO2IAQI = (val) => {
  let param = 0;
  if (0 <= val && val < 40) {
    param = getCalcIAQI(val, 0, 50, 0, 40);
  } else if (40 <= val && val < 80) {
    param = getCalcIAQI(val, 50, 100, 40, 80);
  } else if (80 <= val && val < 180) {
    param = getCalcIAQI(val, 100, 150, 80, 180);
  } else if (180 <= val && val < 280) {
    param = getCalcIAQI(val, 150, 200, 180, 280);
  } else if (280 <= val && val < 565) {
    param = getCalcIAQI(val, 200, 300, 280, 565);
  } else if (565 <= val && val < 754) {
    param = getCalcIAQI(val, 300, 400, 565, 754);
  } else if (754 <= val && val < 940) {
    param = getCalcIAQI(val, 400, 500, 754, 940);
  } else {
    param = -99;
  }
  return param;
};
