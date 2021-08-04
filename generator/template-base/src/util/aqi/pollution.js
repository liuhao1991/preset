/*
 * @Author: lh@metgs.com
 * @Date: 2021-06-28 14:17:43
 * @LastEditors: lh@metgs.com
 * @LastEditTime: 2021-07-06 13:23:06
 * @Description: 计算首要污染物
 */

const getCalcIAQI = (value, lowI, highI, lowC, highC) => {
  if (value < 0 || highI < 0 || lowI < 0 || highC < 0 || lowC < 0) {
    return -99
  }
  if (highC === lowC) {
    return lowI
  }
  const iaqi = ((value - lowC) * (highI - lowI)) / (highC - lowC) + lowI
  return Math.ceil(iaqi)
}

export const getPM10IAQI = (val) => {
  let param = 0
  if (val >= 0 && val < 50) {
    param = getCalcIAQI(val, 0, 50, 0, 50)
  } else if (val >= 50 && val < 150) {
    param = getCalcIAQI(val, 50, 100, 50, 150)
  } else if (val >= 150 && val < 250) {
    param = getCalcIAQI(val, 100, 150, 150, 250)
  } else if (val >= 250 && val < 350) {
    param = getCalcIAQI(val, 150, 200, 250, 350)
  } else if (val >= 350 && val < 420) {
    param = getCalcIAQI(val, 200, 300, 350, 420)
  } else if (val >= 420 && val < 500) {
    param = getCalcIAQI(val, 300, 400, 420, 500)
  } else if (val >= 500 && val < 600) {
    param = getCalcIAQI(val, 400, 500, 500, 600)
  } else {
    param = -99
  }
  return param
}

export const getPM25IAQI = (val) => {
  const pm25 = val
  let param = 0
  if (pm25 >= 0 && pm25 < 35) {
    param = getCalcIAQI(pm25, 0, 50, 0, 35)
  } else if (pm25 >= 35 && pm25 < 75) {
    param = getCalcIAQI(pm25, 50, 100, 35, 75)
  } else if (pm25 >= 75 && pm25 < 115) {
    param = getCalcIAQI(pm25, 100, 150, 75, 115)
  } else if (pm25 >= 115 && pm25 < 150) {
    param = getCalcIAQI(pm25, 150, 200, 115, 150)
  } else if (pm25 >= 150 && pm25 < 250) {
    param = getCalcIAQI(pm25, 200, 300, 150, 250)
  } else if (pm25 >= 250 && pm25 < 350) {
    param = getCalcIAQI(pm25, 300, 400, 250, 350)
  } else if (pm25 >= 350 && pm25 < 500) {
    param = getCalcIAQI(pm25, 400, 500, 350, 500)
  } else {
    param = -99
  }
  return param
}

export const getCOIAQI = (val) => {
  let param = 0
  if (val >= 0 && val < 2) {
    param = getCalcIAQI(val, 0, 50, 0, 2)
  } else if (val >= 2 && val < 4) {
    param = getCalcIAQI(val, 50, 100, 2, 4)
  } else if (val >= 4 && val < 14) {
    param = getCalcIAQI(val, 100, 150, 4, 14)
  } else if (val >= 14 && val < 24) {
    param = getCalcIAQI(val, 150, 200, 14, 24)
  } else if (val >= 24 && val < 36) {
    param = getCalcIAQI(val, 200, 300, 24, 36)
  } else if (val >= 36 && val < 48) {
    param = getCalcIAQI(val, 300, 400, 36, 48)
  } else if (val >= 48 && val < 60) {
    param = getCalcIAQI(val, 400, 500, 48, 60)
  } else {
    param = -99
  }
  return param
}

export const getSO2IAQI = (val) => {
  let param = 0
  if (val >= 0 && val < 50) {
    param = getCalcIAQI(val, 0, 50, 0, 50)
  } else if (val >= 50 && val < 150) {
    param = getCalcIAQI(val, 50, 100, 50, 150)
  } else if (val >= 150 && val < 475) {
    param = getCalcIAQI(val, 100, 150, 150, 475)
  } else if (val >= 475 && val < 800) {
    param = getCalcIAQI(val, 150, 200, 475, 800)
  } else if (val >= 800 && val < 1600) {
    param = getCalcIAQI(val, 200, 300, 800, 1600)
  } else if (val >= 1600 && val < 2100) {
    param = getCalcIAQI(val, 300, 400, 1600, 2100)
  } else if (val >= 2100 && val < 2620) {
    param = getCalcIAQI(val, 400, 500, 1600, 2620)
  } else {
    param = -99
  }
  return param
}

export const getO3IAQI = (val) => {
  let param = 0
  if (val >= 0 && val < 100) {
    param = getCalcIAQI(val, 0, 50, 0, 100)
  } else if (val >= 100 && val < 160) {
    param = getCalcIAQI(val, 50, 100, 100, 160)
  } else if (val >= 160 && val < 215) {
    param = getCalcIAQI(val, 100, 150, 160, 215)
  } else if (val >= 215 && val < 265) {
    param = getCalcIAQI(val, 150, 200, 215, 265)
  } else if (val >= 265 && val < 800) {
    param = getCalcIAQI(val, 200, 300, 265, 800)
  } else {
    param = -99
  }
  return param
}

export const getNO2IAQI = (val) => {
  let param = 0
  if (val >= 0 && val < 40) {
    param = getCalcIAQI(val, 0, 50, 0, 40)
  } else if (val >= 40 && val < 80) {
    param = getCalcIAQI(val, 50, 100, 40, 80)
  } else if (val >= 80 && val < 180) {
    param = getCalcIAQI(val, 100, 150, 80, 180)
  } else if (val >= 180 && val < 280) {
    param = getCalcIAQI(val, 150, 200, 180, 280)
  } else if (val >= 280 && val < 565) {
    param = getCalcIAQI(val, 200, 300, 280, 565)
  } else if (val >= 565 && val < 754) {
    param = getCalcIAQI(val, 300, 400, 565, 754)
  } else if (val >= 754 && val < 940) {
    param = getCalcIAQI(val, 400, 500, 754, 940)
  } else {
    param = -99
  }
  return param
}
