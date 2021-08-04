const codeToWeather = {
  '00': '晴',
  11: '大暴雨',
  22: '中到大雨',
  '01': '多云',
  12: '特大暴雨',
  23: '大到暴雨',
  '02': '阴',
  13: '阵雪',
  24: '暴雨转大暴雨',
  '03': '阵雨',
  14: '小雪',
  25: '大暴雨转特大',
  '04': '雷阵雨',
  15: '中雪',
  26: '小到中雪',
  '05': '雷阵雨伴冰雹',
  16: '大雪',
  27: '中到大雪',
  '06': '雨夹雪',
  17: '暴雪',
  28: '大到暴雪',
  '07': '小雨',
  18: '雾',
  29: '浮尘',
  '08': '中雨',
  19: '冻雨',
  30: '扬沙',
  '09': '大雨',
  20: '沙尘暴',
  31: '强沙尘暴',
  10: '暴雨',
  21: '小到中雨',
  53: '霾'
}
const weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

const CodeToWs = {
  0: '微风',
  1: '3-4级',
  2: '4-5级',
  3: '5-6级',
  4: '6-7级',
  5: '7-8级',
  6: '8-9级',
  7: '9-10级',
  8: '10-11级'
}

const CodeToWd = {
  0: '静风',
  1: '东北风',
  2: '东风',
  3: '东南风',
  4: '南风',
  5: '西南风',
  6: '西风',
  7: '西北风',
  8: '北风'
}

const windDirect = (val) => {
  let direction = '东北风'
  if (val >= 0 && val <= 22.5) {
    direction = '偏北风'
  }
  if (val > 22.5 && val <= 67.5) {
    direction = '东北风'
  }
  if (val > 67.5 && val <= 112.5) {
    direction = '偏东风'
  }
  if (val > 112.5 && val <= 157.5) {
    direction = '东南风'
  }
  if (val > 157.5 && val <= 202.5) {
    direction = '偏南风'
  }
  if (val > 202.5 && val <= 247.5) {
    direction = '西南风'
  }
  if (val > 247.5 && val <= 292.5) {
    direction = '偏西风'
  }
  if (val > 292.5 && val <= 337.5) {
    direction = '西北风'
  }

  if (val > 337.5 && val <= 360) {
    direction = '偏北风'
  }
  return direction
}

const windRating = (val) => {
  const windArr = [
    0.2, 1.5, 3.3, 5.4, 7.9, 10.7, 13.8, 17.1, 20.7, 24.4, 28.4, 32.6, 999
  ]
  for (let i = 0; i < windArr.length; i++) {
    if (val < windArr[i]) return i + '级'
  }
  return windArr.length - 1 + '级'
}

const waveRating = (val) => {
  let waveLevel = '无浪'
  if (val === 0) {
    waveLevel = '无浪'
  }
  if (val > 0 && val < 0.1) {
    waveLevel = '微浪'
  }
  if (val >= 0.1 && val <= 0.4) {
    waveLevel = '小浪'
  }
  if (val >= 0.5 && val <= 1.2) {
    waveLevel = '轻浪'
  }
  if (val >= 1.3 && val <= 2.4) {
    waveLevel = '中浪'
  }
  if (val >= 2.5 && val <= 3.9) {
    waveLevel = '大浪'
  }
  if (val >= 4.0 && val <= 5.9) {
    waveLevel = '巨浪'
  }
  if (val >= 6.0 && val <= 8.9) {
    waveLevel = '狂浪'
  }
  if (val >= 9.0 && val <= 13.9) {
    waveLevel = '狂涛'
  }
  if (val >= 14.0) {
    waveLevel = '怒涛'
  }
  return waveLevel
}

const colorZones = [
  {
    value: 0,
    color: '#ff3737'
  },
  {
    value: 5.4,
    color: '#ff8c37'
  },
  {
    value: 7.9,
    color: '#fff137'
  },
  {
    value: 10.7,
    color: '#ccff37'
  },
  {
    value: 13.8,
    color: '#79ff37'
  },
  {
    value: 17.1,
    color: '#37ff5a'
  },
  {
    value: 20.7,
    color: '#37ffb7'
  },
  {
    value: 24.4,
    color: '#37e2ff'
  },
  {
    value: 28.4,
    color: '#377cff'
  },
  {
    value: 32.6,
    color: '#5737ff'
  },
  {
    value: 36.9,
    color: '#c637ff'
  },
  {
    value: 41.4,
    color: '#ff37dc'
  },
  {
    value: 46.1,
    color: '#ff377f'
  },
  {
    value: 999,
    color: '#ff3764'
  }
]

export const ww = {
  codeToWeather,
  weekDay,
  CodeToWs,
  CodeToWd,
  windDirect,
  windRating,
  waveRating,
  colorZones
}
