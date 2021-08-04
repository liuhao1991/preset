/*
 * @Author: lh@metgs.com
 * @Date: 2021-07-06 16:10:32
 * @LastEditors: lh@metgs.com
 * @LastEditTime: 2021-07-10 20:05:48
 * @Description: ...
 */
import dayjs from 'dayjs'
import { aqi } from '@/util'

export const setGaugeChartOption = (option, pollution, location) => {
  return {
    backgroundColor: 'transparent',
    series: [
      {
        type: 'gauge',
        silent: false,
        progress: {
          show: true,
          width: location === 'home' ? 20 : 15,
          itemStyle: {
            color: option.color,
            borderWidth: 1,
            borderColor: '#FFF'
          },
          roundCap: location !== 'home',
          borderWidth: 2,
          borderColor: '#FFF'
        },
        center: ['50%', '85%'],
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 300,
        radius: location === 'home' ? '110%' : '118%',
        splitNumber: 6,
        axisLine: {
          roundCap: location !== 'home',
          lineStyle: {
            width: location === 'home' ? 20 : 15,
            color: [[300, '#eee']]
          }
        },
        pointer: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: true,
          color: location === 'home' ? '#333' : '#fff',
          fontSize: 12,
          distance: -65,
          textalign: 'center',
          formatter: function (v) {
            return v === 0
              ? '        ' + v + '\n' + '       ' + '无'
              : v <= 50
                ? '      ' + v + '\n' + '      ' + '优'
                : v <= 100
                  ? v + '\n' + '  ' + '良'
                  : v <= 150
                    ? v + '\n' + '轻度污染'
                    : v <= 200
                      ? v + '   ' + '\n' + '中度污染'
                      : v <= 250
                        ? v + '   ' + '\n' + '重度污染'
                        : v + '   ' + '\n' + '严重污染'
          }
        },
        title: {
          offsetCenter: [0, '-16%'],
          fontSize: 14,
          color: location === 'home' ? '#333' : '#fff',
          rich: {
            a: {
              fontSize: 16,
              fontWeight: 600,
              color: location === 'home' ? '#333' : '#fff',
              padding: [4, 0, 16, 0]
            }
          }
        },
        detail: {
          fontSize: 36,
          offsetCenter: [0, '-50%'],
          valueAnimation: true,
          color: location === 'home' ? option.color : '#fff',
          formatter: function (value) {
            return value || '-'
          }
        },
        data: [
          {
            value: option.AQI,
            name:
              '{a|' + option.levelCN + '}' + '\n' + '首要污染物: ' + pollution
          }
        ]
      }
    ]
  }
}
const AQIList = [50, 100, 150, 200, 250, 300]
const PM25List = [35, 75, 115, 150, 250, 999]
const PM10List = [50, 150, 250, 350, 420, 999]
const O3List = [100, 160, 215, 265, 800, 9999]
const NO2List = [40, 80, 280, 565, 754, 9999]
const SO2List = [50, 150, 475, 800, 1600, 9999]
const COList = [2, 4, 14, 24, 36, 999]
const defaultOption = () => ({
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    show: false,
    left: '0%',
    right: '4%',
    bottom: 20,
    top: 25,
    containLabel: true,
    backgroundColor: '#fff',
    borderColor: '#fff'
  },
  xAxis: {
    type: 'category',
    alignWithLabel: true,
    boundaryGap: false,
    axisTick: {
      show: true,
      lineStyle: {
        // 使用深浅的间隔色
        color: ['#aaa', '#ddd']
      },
      dashOffset: 50
    },
    axisLabel: {
      show: true,
      color: '#333'
    },
    splitLine: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    scale: true,
    onZero: false,
    nameLocation: 'start',
    axisLine: {
      show: true,
      lineStyle: {
        color: '#eee'
      },
      dashOffset: 50
    },
    axisTick: {
      show: true,
      lineStyle: {
        // 使用深浅的间隔色
        color: ['#aaa', '#ddd']
      }
    },
    axisLabel: {
      show: true,
      color: '#333'
    },
    splitLine: {
      show: false
    }
  },
  series: []
})
const marklineConfig = (tp = 'aqi') => {
  const airLevelConfig = aqi.airLevelConfig
  return {
    symbol: 'none',
    silent: true,
    lineStyle: { type: 'dashed' },
    label: { position: 'start' },
    data: airLevelConfig.map((alc) => {
      return {
        yAxis: alc[tp],
        lineStyle: { color: alc.color },
        label: {
          show: true,
          position: 'insideEndBottom',
          formatter: alc.label,
          color: alc.color
        }
      }
    })
  }
}

const pirceConfig = (tp = 'aqi') => {
  const type = tp
  const airLevelConfig = aqi.airLevelConfig
  return {
    show: false,
    pieces: airLevelConfig.map((pi, index) => {
      return {
        gt: index === 0 ? 0 : airLevelConfig[index - 1][type],
        lte: pi[type],
        color: pi.color
      }
    }),
    outOfRange: {
      color: '#999'
    }
  }
}

const handlerAqiChart = (data) => {
  const option = defaultOption()
  option.series = {
    name: 'AQI',
    type: 'line',
    // smooth: true,
    data: [],
    markLine: {}
  }
  option.tooltip.formatter = (params) => {
    const { name, marker, value } = params[0]
    return (
      dayjs(+name).format('YYYY-MM-DD HH:mm') +
      '<br>' +
      marker +
      'AQI：' +
      value
    )
  }

  option.visualMap = pirceConfig('aqi')
  option.series.markLine = marklineConfig('aqi')

  const validData = data.splice(0, 24).reverse()

  const relList = []
  option.xAxis.data = []
  option.xAxis.axisLabel = {
    formatter (value) {
      return dayjs(+value).format('HH时')
    }
  }
  option.xAxis.splitNumber = 8
  validData.forEach((item) => {
    option.xAxis.data.push(dayjs(item.time).$d.getTime())
    option.series.data.push(+item.value)
    relList.push(+item.value)
  })
  const aqiList = (value) => {
    const itemx = AQIList.find((item, index) => {
      if (Math.max(...value) > item) {
        if (index === 5) {
          return AQIList[index + 1]
        }
      } else {
        return item
      }
    })
    return itemx
  }
  option.yAxis.max = aqiList(option.series.data)
  relList.sort()
  return option
}

const handlerPM25Chart = (data) => {
  const option = defaultOption()
  option.series = {
    name: 'PM25',
    type: 'line',
    // smooth: true,
    data: [],
    markLine: {}
  }
  option.tooltip.formatter = (params) => {
    const { name, marker, value } = params[0]
    return (
      dayjs(+name).format('YYYY-MM-DD HH:mm') +
      '<br>' +
      marker +
      'PM25：' +
      value
    )
  }
  option.visualMap = pirceConfig('pm25')
  option.series.markLine = marklineConfig('pm25')
  const validData = data.splice(0, 24).reverse()

  const relList = []
  option.xAxis = {
    data: [],
    axisLabel: {
      formatter (value) {
        return dayjs(+value).format('HH时')
      }
    }
  }
  // option.yAxis.name = "%";
  validData.forEach((item) => {
    option.xAxis.data.push(dayjs(item.time).$d.getTime())
    option.series.data.push(+item.value)
    relList.push(+item.value)
  })
  const pm25List = (value) => {
    // let itemx = ''
    const itemx = PM25List.find((item, index) => {
      if (Math.max(...value) > item) {
        if (index === 5) {
          return AQIList[index + 1]
        }
        // return AQIList[index+1];
        // console.log(itemx);
      } else {
        return item
        // console.log(itemx);
        // return item;
      }
    })
    // console.log(itemx);
    return itemx
  }
  option.yAxis.max = pm25List(option.series.data)
  relList.sort()
  return option
}

const handlerPM10Chart = (data) => {
  const option = defaultOption()
  option.series = {
    name: 'PM10',
    type: 'line',
    // smooth: true,
    data: [],
    markLine: {}
  }
  option.tooltip.formatter = (params) => {
    const { name, marker, value } = params[0]
    return (
      dayjs(+name).format('YYYY-MM-DD HH:mm') +
      '<br>' +
      marker +
      'PM10：' +
      value
    )
  }
  option.visualMap = pirceConfig('pm10')
  option.series.markLine = marklineConfig('pm10')
  const validData = data.splice(0, 24).reverse()

  const relList = []
  option.xAxis = {
    data: [],
    axisLabel: {
      formatter (value) {
        return dayjs(+value).format('HH时')
      }
    }
  }
  // option.yAxis.name = "%";
  validData.forEach((item) => {
    option.xAxis.data.push(dayjs(item.time).$d.getTime())
    option.series.data.push(+item.value)
    relList.push(+item.value)
  })
  const pm10List = (value) => {
    // let itemx = ''
    const itemx = PM10List.find((item, index) => {
      if (Math.max(...value) > item) {
        if (index === 5) {
          return AQIList[index + 1]
        }
        // return AQIList[index+1];
        // console.log(itemx);
      } else {
        return item
        // console.log(itemx);
        // return item;
      }
    })
    // console.log(itemx);
    return itemx
  }
  option.yAxis.max = pm10List(option.series.data)
  relList.sort()
  return option
}

const handlerO3Chart = (data) => {
  const option = defaultOption()
  option.series = {
    name: 'O3',
    type: 'line',
    // smooth: true,
    data: [],
    markLine: {}
  }
  option.tooltip.formatter = (params) => {
    const { name, marker, value } = params[0]
    return (
      dayjs(+name).format('YYYY-MM-DD HH:mm') + '<br>' + marker + 'O3：' + value
    )
  }
  // option.legend.data = ["相对湿度"];
  option.visualMap = pirceConfig('o3')
  option.series.markLine = marklineConfig('o3')

  const validData = data.splice(0, 24).reverse()

  const relList = []
  option.xAxis = {
    data: [],
    axisLabel: {
      formatter (value) {
        return dayjs(+value).format('HH时')
      }
    }
  }
  validData.forEach((item) => {
    option.xAxis.data.push(dayjs(item.time).$d.getTime())
    option.series.data.push(+item.value)
    relList.push(+item.value)
  })
  const o3List = (value) => {
    // let itemx = ''
    const itemx = O3List.find((item, index) => {
      if (Math.max(...value) > item) {
        if (index === 5) {
          return AQIList[index + 1]
        }
        // return AQIList[index+1];
        // console.log(itemx);
      } else {
        return item
        // console.log(itemx);
        // return item;
      }
    })
    // console.log(itemx);
    return itemx
  }
  option.yAxis.max = o3List(option.series.data)
  relList.sort()
  return option
}

const handlerNO2Chart = (data) => {
  const option = defaultOption()
  option.series = {
    name: 'NO2',
    type: 'line',
    // smooth: true,
    data: [],
    markLine: {}
  }
  option.tooltip.formatter = (params) => {
    const { name, marker, value } = params[0]
    return (
      dayjs(+name).format('YYYY-MM-DD HH:mm') +
      '<br>' +
      marker +
      'NO2：' +
      value
    )
  }
  option.visualMap = pirceConfig('no2')
  option.series.markLine = marklineConfig('no2')

  const validData = data.splice(0, 24).reverse()
  const relList = []
  option.xAxis = {
    data: [],
    axisLabel: {
      formatter (value) {
        return dayjs(+value).format('HH时')
      }
    }
  }
  validData.forEach((item) => {
    option.xAxis.data.push(dayjs(item.time).$d.getTime())
    option.series.data.push(+item.value)
    relList.push(+item.value)
  })
  const no2List = (value) => {
    // let itemx = ''
    const itemx = NO2List.find((item, index) => {
      if (Math.max(...value) > item) {
        if (index === 5) {
          return AQIList[index + 1]
        }
        // return AQIList[index+1];
        // console.log(itemx);
      } else {
        return item
        // console.log(itemx);
        // return item;
      }
    })
    // console.log(itemx);
    return itemx
  }
  option.yAxis.max = no2List(option.series.data)
  relList.sort()
  return option
}

const handlerSO2Chart = (data) => {
  const option = defaultOption()
  option.series = {
    name: 'SO2',
    type: 'line',
    // smooth: true,
    data: [],
    markLine: {}
  }
  option.tooltip.formatter = (params) => {
    const { name, marker, value } = params[0]
    return (
      dayjs(+name).format('YYYY-MM-DD HH:mm') +
      '<br>' +
      marker +
      'SO2：' +
      value
    )
  }
  option.visualMap = pirceConfig('so2')
  option.series.markLine = marklineConfig('so2')

  const validData = data.splice(0, 24).reverse()
  const relList = []
  option.xAxis = {
    data: [],
    axisLabel: {
      formatter (value) {
        return dayjs(+value).format('HH时')
      }
    }
  }
  validData.forEach((item) => {
    option.xAxis.data.push(dayjs(item.time).$d.getTime())
    option.series.data.push(+item.value)
    relList.push(+item.value)
  })
  const so2List = (value) => {
    // let itemx = ''
    const itemx = SO2List.find((item, index) => {
      if (Math.max(...value) > item) {
        if (index === 5) {
          return AQIList[index + 1]
        }
      } else {
        return item
      }
    })
    return itemx
  }
  option.yAxis.max = so2List(option.series.data)
  relList.sort()
  return option
}

const handlerCOChart = (data) => {
  const option = defaultOption()
  option.series = {
    name: 'CO',
    type: 'line',
    // smooth: true,
    data: [],
    markLine: {}
  }
  option.tooltip.formatter = (params) => {
    const { name, marker, value } = params[0]
    return (
      dayjs(+name).format('YYYY-MM-DD HH:mm') + '<br>' + marker + 'CO：' + value
    )
  }
  // option.legend.data = ["相对湿度"];
  option.visualMap = pirceConfig('co')
  option.series.markLine = marklineConfig('co')

  const validData = data.splice(0, 24).reverse()

  const relList = []
  option.xAxis = {
    data: [],
    axisLabel: {
      formatter (value) {
        return dayjs(+value).format('HH时')
      }
    }
  }
  validData.forEach((item) => {
    option.xAxis.data.push(dayjs(item.time).$d.getTime())
    option.series.data.push(+item.value)
    relList.push(+item.value)
  })
  const coList = (value) => {
    const itemx = COList.find((item, index) => {
      if (Math.max(...value) > item) {
        if (index === 5) {
          return AQIList[index + 1]
        }
        // return AQIList[index+1];
        // console.log(itemx);
      } else {
        return item
        // console.log(itemx);
        // return item;
      }
    })
    // console.log(itemx);
    return itemx
  }
  option.yAxis.max = coList(option.series.data)
  relList.sort()
  return option
}

export const handleAirLineChartOption = (data, varID) => {
  switch (varID) {
  case 'AQI':
    return handlerAqiChart(data)
  case 'PM25':
    return handlerPM25Chart(data)
  case 'PM10':
    return handlerPM10Chart(data)
  case 'O3':
    return handlerO3Chart(data)
  case 'NO2':
    return handlerNO2Chart(data)
  case 'SO2':
    return handlerSO2Chart(data)
  case 'CO':
    return handlerCOChart(data)
  default:
    return handlerAqiChart(data)
  }
}
