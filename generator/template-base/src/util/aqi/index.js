/*
 * @Author: lh@metgs.com
 * @Date: 2021-06-24 17:59:12
 * @LastEditors: lh@metgs.com
 * @LastEditTime: 2021-07-06 17:47:23
 * @Description: AQI
 */

import * as pollution from './pollution'
import * as chart from './chart'

const getPMLevel = (val) => {
  if (val == null) {
    return '- -'
  }
  const value = +val
  let level = 0
  if (value <= 35) {
    level = 1
  } else if (value <= 75) {
    level = 2
  } else if (value <= 115) {
    level = 3
  } else if (value <= 150) {
    level = 4
  } else if (value <= 250) {
    level = 5
  } else if (value <= 999) {
    level = 6
  }
  return level
}

const getNagativeLevel = (val) => {
  const value = +val
  let level = {}
  if (value >= 0 && value < 100) {
    level = {
      levelText: 'IV',
      levelNumer: '4',
      text: '不够清新'
    }
  }
  if (value >= 100 && value < 500) {
    level = {
      levelText: 'III',
      levelNumer: '3',
      text: '一般'
    }
  }
  if (value >= 500 && value < 1200) {
    level = {
      levelText: 'II',
      levelNumer: '2',
      text: '较清新'
    }
  }
  if (value >= 1200) {
    level = {
      levelText: 'I',
      levelNumer: '1',
      text: '清新'
    }
  }
  return level
}

const getAqiLevel = (val) => {
  if (!val) {
    return ''
  }
  const value = +val
  let level = 1
  if (value <= 50) {
    level = 1
  } else if (value <= 100) {
    level = 2
  } else if (value <= 150) {
    level = 3
  } else if (value <= 200) {
    level = 4
  } else if (value <= 300) {
    level = 5
  } else {
    level = 6
  }
  return level
}

const getAqiLevelCN = (val) => {
  const value = +val
  let level = '一级'
  if (value <= 50) {
    level = '一级'
  } else if (value <= 100) {
    level = '二级'
  } else if (value <= 150) {
    level = '三级'
  } else if (value <= 200) {
    level = '四级'
  } else if (value <= 300) {
    level = '五级'
  } else {
    level = '六级'
  }
  return level
}

const conditions = [
  {
    level: '一级',
    text: '非常有利于空气污染物稀释、扩散和清除。'
  },
  {
    level: '二级',
    text: '较有利于空气污染物稀释、扩散和清除。'
  },
  {
    level: '三级',
    text: '对空气污染物稀释、扩散和清除无明显影响。'
  },
  {
    level: '四级',
    text: '不利于空气污染物稀释、扩散和清除。'
  },
  {
    level: '五级',
    text: '很不利于空气污染物稀释、扩散和清除。'
  },
  {
    level: '六级',
    text: '极不利于空气污染物稀释、扩散和清除。'
  }
]

const airLevelConfig = [
  {
    label: '优',
    level: 1,
    aqi: 50,
    pm25: 35,
    o3: 100,
    pm10: 50,
    so2: 50,
    co: 2,
    no2: 40,
    color: '#6DD400'
  },
  {
    label: '良',
    level: 2,
    aqi: 100,
    pm25: 75,
    o3: 160,
    pm10: 150,
    so2: 150,
    co: 4,
    no2: 80,
    color: '#f7da64'
  },
  {
    label: '轻度污染',
    level: 3,
    aqi: 150,
    pm25: 115,
    o3: 215,
    pm10: 250,
    so2: 475,
    co: 14,
    no2: 280,
    color: '#f29e39'
  },
  {
    label: '中度污染',
    level: 4,
    aqi: 200,
    pm25: 150,
    o3: 265,
    pm10: 350,
    so2: 800,
    co: 24,
    no2: 565,
    color: '#da555d'
  },
  {
    label: '重度污染',
    level: 5,
    aqi: 300,
    pm25: 250,
    o3: 800,
    pm10: 420,
    so2: 1600,
    co: 36,
    no2: 754,
    color: '#b9377a'
  },
  {
    label: '严重污染',
    level: 6,
    aqi: 9999,
    pm25: 999,
    o3: 9999,
    pm10: 999,
    so2: 9999,
    co: 999,
    no2: 9999,
    color: '#881326'
  }
]
const getAqiInfo = (val) => {
  if (val == null) {
    return '-'
  }
  const value = +val
  let info = '优'
  if (value <= 50) {
    info = '优'
  } else if (value <= 100) {
    info = '良'
  } else if (value <= 150) {
    info = '轻度污染'
  } else if (value <= 200) {
    info = '中度污染'
  } else if (value <= 300) {
    info = '重度污染'
  } else {
    info = '严重污染'
  }
  return info
}

const getPM10Level = (val) => {
  const value = +val
  let level = 0
  if (value <= 50) {
    level = 1
  } else if (value <= 150) {
    level = 2
  } else if (value <= 250) {
    level = 3
  } else if (value <= 350) {
    level = 4
  } else if (value <= 420) {
    level = 5
  } else if (value <= 999) {
    level = 6
  }
  return level
}

const getCOLevel = (val) => {
  const value = +val
  let level = 0
  if (value <= 2) {
    level = 1
  } else if (value <= 4) {
    level = 2
  } else if (value <= 14) {
    level = 3
  } else if (value <= 24) {
    level = 4
  } else if (value <= 36) {
    level = 5
  } else if (value <= 999) {
    level = 6
  }
  return level
}

const getSO2Level = (val) => {
  const value = +val
  let level = 0
  if (value <= 50) {
    level = 1
  } else if (value <= 150) {
    level = 2
  } else if (value <= 475) {
    level = 3
  } else if (value <= 800) {
    level = 4
  } else if (value <= 1600) {
    level = 5
  } else if (value <= 9999) {
    level = 6
  }
  return level
}

const getO3Level = (val) => {
  const value = +val
  let level = 0
  if (value <= 100) {
    level = 1
  } else if (value <= 160) {
    level = 2
  } else if (value <= 215) {
    level = 3
  } else if (value <= 265) {
    level = 4
  } else if (value <= 800) {
    level = 5
  } else if (value <= 9999) {
    level = 6
  }
  return level
}

const getNO2Level = (val) => {
  const value = +val
  let level = 0
  if (value <= 40) {
    level = 1
  } else if (value <= 80) {
    level = 2
  } else if (value <= 280) {
    level = 3
  } else if (value <= 565) {
    level = 4
  } else if (value <= 754) {
    level = 5
  } else if (value <= 9999) {
    level = 6
  }
  return level
}

const airItems = [
  {
    label: '-',
    value: 'aqi',
    unit: 'μg/m³',
    name: 'AQI',
    mName: 'AQI',
    toFixed: 0,
    cnName: '空气质量',
    type: 'Hour',
    time: 24
  },
  {
    label: '-',
    value: 'pm25',
    unit: 'μg/m³',
    name: 'PM25',
    mName: 'PM2.5',
    toFixed: 0,
    cnName: '细颗粒物',
    type: 'Hour',
    time: 24
  },
  {
    label: '-',
    value: 'pm10',
    unit: 'μg/m³',
    name: 'PM10',
    mName: 'PM10',
    toFixed: 0,
    cnName: '可吸入颗粒物',
    type: 'Hour',
    time: 24
  },
  {
    label: '-',
    value: 'o3',
    unit: 'μg/m³',
    name: 'O3',
    mName: 'O3',
    toFixed: 0,
    cnName: '臭氧',
    type: 'Hour',
    time: 24
  },
  {
    label: '-',
    value: 'so2',
    unit: 'μg/m³',
    name: 'SO2',
    mName: 'SO2',
    toFixed: 0,
    cnName: '二氧化硫',
    type: 'Hour',
    time: 24
  },
  {
    label: '-',
    value: 'no2',
    unit: 'μg/m³',
    name: 'NO2',
    mName: 'NO2',
    toFixed: 0,
    cnName: '二氧化氮',
    type: 'Hour',
    time: 24
  },
  {
    label: '-',
    value: 'co',
    unit: 'μg/m³',
    name: 'CO',
    mName: 'CO',
    toFixed: 1,
    cnName: '一氧化碳',
    type: 'Hour',
    time: 24
  }
]

export const aqi = {
  ...chart,
  ...pollution,
  getPMLevel,
  getNagativeLevel,
  getAqiLevel,
  getAqiInfo,
  airLevelConfig,
  conditions,
  getAqiLevelCN,
  getPM10Level,
  getCOLevel,
  getSO2Level,
  getO3Level,
  getNO2Level,
  airItems
}
