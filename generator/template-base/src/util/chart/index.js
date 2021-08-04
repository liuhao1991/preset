/*
 * @Author: lh@metgs.com
 * @Date: 2021-06-24 11:35:08
 * @LastEditors: lh@metgs.com
 * @LastEditTime: 2021-07-06 16:48:25
 * @Description: 绘制曲线工具类
 */
import dayjs from 'dayjs'

const defaultOption = () => ({
  title: {
    text: '折线图堆叠',
    left: 'center',
    subtext: '',
    subtextStyle: {
      rich: {
        lineHeight: '20px',
        color: '#666',
        backgroundColor: '#f5f5f5',
        borderRadius: '3px'
      }
    }
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: [],
    bottom: 0
  },
  grid: {
    left: '5%',
    right: '5%',
    bottom: 30,
    containLabel: true
  },
  xAxis: {},
  yAxis: {
    type: 'value',
    scale: true,
    nameTextStyle: {
      padding: [0, 30, 0, 0]
    },
    nameLocation: 'start',
    nameGap: 15
  },
  series: []
})

const handlerTChart = (data) => {
  const option = defaultOption()
  const today = dayjs().format('MM-DD')
  option.title.text = '今日气温变化'
  option.legend.data = ['昨日气温', '今日气温']
  // option.xAxis.data = new Array(24).fill(null).map((v, i) => i);
  option.xAxis = {
    data: new Array(24).fill(null).map((v, i) => i),
    type: 'category'
  }
  option.yAxis.name = '℃'
  option.tooltip.formatter = (params) => {
    return [
      params[0].name + '时',
      `${params[0].marker}${params[0].seriesName}：${
        params[0].value === undefined ? '-' : params[0].value.toFixed(1) + '℃'
      }`,
      `${params[1].marker}${params[1].seriesName}：${
        params[1].value === undefined ? '-' : params[1].value.toFixed(1) + '℃'
      }`
    ].join('<br>')
  }

  option.visualMap = {
    show: false,
    // dimension: 1,
    pieces: [
      {
        gt: -999,
        lte: -10,
        color: '#66b8f6'
      },
      {
        gt: -10,
        lte: -5,
        color: '#97cff4'
      },
      {
        gt: -5,
        lte: 0,
        color: '#c0e7f9'
      },
      {
        gt: 0,
        lte: 5,
        color: '#e9ffff'
      },
      {
        gt: 5,
        lte: 10,
        color: '#ffffc8'
      },
      {
        gt: 10,
        lte: 15,
        color: '#fbf1a0'
      },
      {
        gt: 15,
        lte: 20,
        color: '#ffe478'
      },
      {
        gt: 20,
        lte: 25,
        color: '#ffcc4f'
      },
      {
        gt: 25,
        lte: 30,
        color: '#f29b00'
      },
      {
        gt: 30,
        lte: 35,
        color: '#f0760a'
      },
      {
        gt: 35,
        lte: 40,
        color: '#e74b1f'
      },
      {
        gt: 40,
        lte: 45,
        color: '#a90210'
      },
      {
        gt: 45,
        lte: 50,
        color: '#660016'
      }
    ],
    outOfRange: {
      color: '#46000d'
    }
  }

  const series = [
    {
      name: '昨日气温',
      type: 'line',
      // smooth: true,
      data: new Array(24).fill(null),
      lineStyle: {
        color: '#7cb5ec',
        width: 2,
        type: 'dashed'
      },
      itemStyle: {
        borderWidth: 0,
        color: '#7cb5ec',
        opacity: 0
      }
    },
    {
      name: '今日气温',
      type: 'line',
      // smooth: true,
      data: new Array(24).fill(null),
      lineStyle: {
        color: '#94C05A'
      },
      itemStyle: {
        borderWidth: 3,
        color: '#94C05A'
      }
    }
  ]
  const [tmax, tmin] = [[], []]
  data.forEach((element) => {
    const md = dayjs(element.time).format('MM-DD')
    const hh = +dayjs(element.time).format('HH')
    if (md !== today) {
      series[0].data[hh] = +element.t
    } else {
      series[1].data[hh] = +element.t
      tmax.push(+element.tmax)
      tmin.push(+element.tmin)
    }
  })
  tmax.sort()
  tmin.sort()
  option.series = series
  const tmaxValue = tmax.pop().toFixed(1)
  const tminValue = tmin[0].toFixed(1)
  option.title.subtext = `最高气温：${tmaxValue}℃，最低气温：${tminValue}℃`
  return option
}

const handlerPrChart = (data) => {
  const option = defaultOption()
  option.title.text = '前24小时降雨量变化图'
  option.series = {
    name: '降雨量',
    type: 'bar',
    color: '#2979ff',
    data: []
  }
  option.legend.data = ['降雨量']
  option.tooltip.formatter = (params) => {
    const { name, marker, value } = params[0]
    return (
      dayjs(+name).format('YYYY-MM-DD HH:mm:ss') +
      '<br>' +
      marker +
      '降雨量：' +
      value.toFixed(1) +
      'mm'
    )
  }
  const validData = data.splice(0, 24).reverse()
  let prSum = 0
  option.xAxis = {
    data: [],
    axisLabel: {
      formatter (value) {
        return dayjs(+value).format('HH')
      }
    }
  }
  option.yAxis.name = 'mm'
  validData.forEach((item) => {
    option.xAxis.data.push(dayjs(item.time).$d.getTime())
    option.series.data.push(+item.pr)
    prSum += +item.pr
  })
  option.title.subtext = `过去24小时总降雨量：${prSum.toFixed(1)}mm`
  return option
}

const handlerRelChart = (data) => {
  const option = defaultOption()
  option.title.text = '前24小时相对湿度变化图'
  option.series = {
    name: '相对湿度',
    type: 'line',
    // smooth: true,
    data: []
  }
  option.legend.data = ['相对湿度']
  option.tooltip.formatter = (params) => {
    const { name, marker, value } = params[0]
    return (
      dayjs(+name).format('YYYY-MM-DD HH:mm:ss') +
      '<br>' +
      marker +
      '相对湿度：' +
      value +
      '%'
    )
  }
  option.visualMap = {
    // top: 50,
    // right: 10,
    show: false,
    // dimension: 0,
    pieces: [
      {
        gt: 0,
        lte: 10,
        color: '#983200'
      },
      {
        gt: 10,
        lte: 20,
        color: '#ea7116'
      },
      {
        gt: 20,
        lte: 30,
        color: '#ff9a2b'
      },
      {
        gt: 30,
        lte: 40,
        color: '#fec350'
      },
      {
        gt: 40,
        lte: 50,
        color: '#fee48f'
      },
      {
        gt: 50,
        lte: 60,
        color: '#bddef0'
      },
      {
        gt: 60,
        lte: 70,
        color: '#7fbad9'
      },
      {
        gt: 70,
        lte: 80,
        color: '#4394c3'
      },
      {
        gt: 80,
        lte: 90,
        color: '#1f63ac'
      },
      {
        gt: 90,
        lte: 100,
        color: '#053160'
      }
    ],
    outOfRange: {
      color: '#999'
    }
  }
  const validData = data.splice(0, 24).reverse()
  const relList = []
  option.xAxis = {
    data: [],
    axisLabel: {
      formatter (value) {
        return dayjs(+value).format('HH')
      }
    }
  }
  option.yAxis.name = '%'
  validData.forEach((item) => {
    option.xAxis.data.push(dayjs(item.time).$d.getTime())
    option.series.data.push(+item.rel)
    relList.push(+item.rel)
  })
  relList.sort()
  const relmax = relList.pop()
  const relmin = relList[0]
  option.title.subtext = `最高湿度：${relmax}%，最低湿度：${relmin}%`
  return option
}

const handlerWindChart = (data) => {
  const option = defaultOption()
  const today = dayjs().format('MM-DD')
  option.title.text = '今日风速变化'
  option.legend.data = ['昨日风速', '今日风速']
  option.xAxis = {
    data: new Array(24).fill(null).map((v, i) => i),
    type: 'category'
  }
  option.yAxis.name = 'm/s'
  option.tooltip.formatter = (params) => {
    return [
      params[0].name + '时',
      `${params[0].marker}${params[0].seriesName}：${
        params[0].value === undefined ? '-' : params[0].value.toFixed(1) + 'm/s'
      }`,
      `${params[1].marker}${params[1].seriesName}：${
        params[1].value === undefined ? '-' : params[1].value.toFixed(1) + 'm/s'
      }`
    ].join('<br>')
  }
  const series = [
    {
      name: '昨日风速',
      type: 'line',
      // smooth: true,
      data: new Array(24).fill(null),
      lineStyle: {
        color: '#7cb5ec',
        width: 2,
        type: 'dashed'
      },
      itemStyle: {
        borderWidth: 0,
        color: '#7cb5ec',
        opacity: 0
      }
    },
    {
      name: '今日风速',
      type: 'line',
      // smooth: true,
      data: new Array(24).fill(null),
      lineStyle: {
        color: '#94C05A'
      },
      itemStyle: {
        borderWidth: 3,
        color: '#94C05A'
      }
    }
  ]
  data.forEach((element) => {
    const md = dayjs(element.time).format('MM-DD')
    const hh = +dayjs(element.time).format('HH')
    if (md !== today) {
      series[0].data[hh] = +element.wv
    } else {
      series[1].data[hh] = +element.wv
    }
  })
  option.series = series
  const list = [...series[1].data].filter((v) => v !== null).sort()
  const max = list.pop().toFixed(1)
  const min = list[0].toFixed(1)
  option.title.subtext = `最大风速：${max}m/s，最小风速：${min}m/s`
  return option
}

const handlerPressChart = (data) => {
  const option = defaultOption()
  const today = dayjs().format('MM-DD')
  option.title.text = '今日气压变化'
  option.legend.data = ['昨日气压', '今日气压']
  // option.visualMap = {
  //   top: 50,
  //   right: 10,
  //   show: false,
  //   pieces: [
  //     {
  //       gt: 0,
  //       lte: 50,
  //       color: "#93CE07",
  //     },
  //     {
  //       gt: 50,
  //       lte: 100,
  //       color: "#FBDB0F",
  //     },
  //     {
  //       gt: 100,
  //       lte: 150,
  //       color: "#FC7D02",
  //     },
  //     {
  //       gt: 150,
  //       lte: 200,
  //       color: "#FD0100",
  //     },
  //     {
  //       gt: 200,
  //       lte: 300,
  //       color: "#AA069F",
  //     },
  //     {
  //       gt: 300,
  //       color: "#AC3B2A",
  //     },
  //   ],
  //   outOfRange: {
  //     color: "#999",
  //   },
  // };
  option.xAxis = {
    data: new Array(24).fill(null).map((v, i) => i),
    type: 'category'
  }
  option.yAxis.name = 'hPa'
  option.yAxis.axisLabel = {
    formatter (value) {
      return value
    }
  }
  option.tooltip.formatter = (params) => {
    return [
      params[0].name + '时',
      `${params[0].marker}${params[0].seriesName}：${
        params[0].value === undefined ? '-' : params[0].value + 'hPa'
      }`,
      `${params[1].marker}${params[1].seriesName}：${
        params[1].value === undefined ? '-' : params[1].value + 'hPa'
      }`
    ].join('<br>')
  }
  const series = [
    {
      name: '昨日气压',
      type: 'line',
      // smooth: true,
      data: new Array(24).fill(null),
      lineStyle: {
        color: '#7cb5ec',
        width: 2,
        type: 'dashed'
      },
      itemStyle: {
        borderWidth: 0,
        color: '#7cb5ec',
        opacity: 0
      }
    },
    {
      name: '今日气压',
      type: 'line',
      // smooth: true,
      data: new Array(24).fill(null),
      lineStyle: {
        color: '#94C05A'
      },
      itemStyle: {
        borderWidth: 3,
        color: '#94C05A'
      }
    }
  ]
  data.forEach((element) => {
    const md = dayjs(element.time).format('MM-DD')
    const hh = +dayjs(element.time).format('HH')
    if (md !== today) {
      series[0].data[hh] = +element.press
    } else {
      series[1].data[hh] = +element.press
    }
  })
  option.series = series
  const list = [...series[1].data].filter((v) => v !== null).sort()
  const max = list.pop()
  const min = list[0]
  option.title.subtext = `最高气压：${max}hPa，最低气压：${min}hPa`
  return option
}

export const handleChartOption = (data, varID) => {
  switch (varID) {
    case 't':
      return handlerTChart(data)
    case 'pr':
      return handlerPrChart(data)
    case 'rel':
      return handlerRelChart(data)
    case 'wind':
      return handlerWindChart(data)
    case 'press':
      return handlerPressChart(data)
    default:
      return handlerTChart(data)
  }
}
