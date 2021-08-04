/*
 * @Author: lh@metgs.com
 * @Date: 2021-06-25 11:58:19
 * @LastEditors: lh@metgs.com
 * @LastEditTime: 2021-06-25 18:16:07
 * @Description: ...
 */
const LEVEL_HTML = ' 级'
const allDesc = {
  CLEAR_DAY: '晴',
  CLEAR_NIGHT: '晴',
  PARTLY_CLOUDY_DAY: '多云',
  PARTLY_CLOUDY_NIGHT: '多云',
  CLOUDY: '阴',
  CLOUDY_NIGHT: '阴',
  RAIN: '雨',
  SNOW: '雪',
  SNOW_NIGHT: '雪',
  WIND: '大风',
  FOG: '雾',
  HAZE: '雾霾',
  LIGHT_HAZE: '轻度雾霾',
  MODERATE_HAZE: '中度雾霾',
  HEAVY_HAZE: '重度雾霾',
  LIGHT_RAIN: '小雨',
  MODERATE_RAIN: '中雨',
  HEAVY_RAIN: '大雨',
  STORM_RAIN: '暴雨',
  LIGHT_SNOW: '小雪',
  MODERATE_SNOW: '中雪',
  HEAVY_SNOW: '大雪',
  STORM_SNOW: '暴雪'
}
const DIRRECTIONS = [
  '北风',
  '东北风',
  '东风',
  '东南风',
  '南风',
  '西南风',
  '西风',
  '西北风',
  '北'
]
const WEEKDAY = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
// function min(first, second) {
//   if (first > second) {
//     return second;
//   } else {
//     return first;
//   }
// }
// function timeToValue(time) {
//   var times = time.split(":");
//   return parseInt(times[0]) * 60 + parseInt(times[1]);
// }
// 获取天气图标名称
function getSkyIconPicName (skycon, prec) {
  const allPicName = {
    CLEAR: 'clear.png',
    CLEAR_NIGHT: 'clear_night.png',
    PARTLY_CLOUDY: 'partly_cloudy.png',
    PARTLY_CLOUDY_DAY: 'partly_cloudy.png',
    PARTLY_CLOUDY_NIGHT: 'partly_cloudy_night.png',
    CLOUDY: 'cloudy.png',
    SNOW: 'snow.png',
    RAIN: 'rain.png',
    FOG: 'fog.png',
    HAZE: 'haze.png',
    WIND: 'wind.png',
    LIGHT_RAIN: 'rain_low.png',
    MODERATE_RAIN: 'rain_middle.png',
    HEAVY_RAIN: 'rain_high.png',
    STORM_RAIN: 'rain_large.png'
  }

  let name =
    allPicName[
      skycon.match(
        /CLEAR_NIGHT|CLEAR|PARTLY_CLOUDY_DAY|PARTLY_CLOUDY_NIGHT|PARTLY_CLOUDY|CLOUDY|SNOW|RAIN|FOG|HAZE|WIND|LIGHT_RAIN|MODERATE_RAIN|HEAVY_RAIN|STORM_RAIN|/
      )[0]
    ] || 'partly_cloudy.png'
  if (prec && prec > 1) {
    if (prec < 10) {
      name = 'rain_low.png'
    } else if (prec < 25) {
      name = 'rain_middle.png'
    } else if (prec < 50) {
      name = 'rain_high.png'
    } else {
      name = 'rain_large.png'
    }
  }

  return '/images/caiyun/' + name
}
// 判断白天或黑夜
// function getDayOrNight(sun) {
//   var DoN = "",
//     sunrise = timeToValue(sun.sunrise.time),
//     sunset = timeToValue(sun.sunset.time),
//     now = new Date(),
//     nowValue = now.getHours() * 60 + now.getMinutes();
//   //   console.log("util forecast daily:" + daily, " sundata:", sun, "  sunrise:", sunrise, "  sunset:", sunset,"   now:", nowValue, nowValue > sunrise && nowValue < sunset);
//   if (nowValue > sunrise && nowValue < sunset) {
//     DoN = "DAY";
//   } else {
//     DoN = "NIGHT";
//   }

//   return DoN;
// }
// 风速转成自然语言描述
function judgeWind (obj) {
  var speeds = [
    { max: 2, desc: '风平浪静', grade: 1 },
    { max: 6, desc: '微风徐徐', grade: 1 },
    { max: 12, desc: '微风拂面', grade: 2 },
    { max: 19, desc: '树叶摇摆', grade: 3 },
    { max: 30, desc: '树枝摇动', grade: 4 },
    { max: 40, desc: '风力强劲', grade: 5 },
    { max: 51, desc: '撑伞困难', grade: 6 },
    { max: 62, desc: '撑伞困难', grade: 7 },
    { max: 75, desc: '行走困难', grade: 8 },
    { max: 87, desc: '强度极烈', grade: 9 },
    { max: 103, desc: '暴风毁树', grade: 10 },
    { max: 117, desc: '暴风毁树', grade: 11 },
    { max: 132, desc: '飓风', grade: 12 },
    { max: 149, desc: '台风', grade: 13 },
    { max: 166, desc: '强台风', grade: 14 },
    { max: 183, desc: '强台风', grade: 15 },
    { max: 201, desc: '超强台风', grade: 16 },
    { max: 220, desc: '超强台风', grade: 17 },
    { desc: '极强台风', grade: 18 }
  ]
  var directions = [
    { max: 22.5, desc: DIRRECTIONS[0], direction: 0 },
    { max: 67.5, desc: DIRRECTIONS[1], direction: 1 },
    { max: 112.5, desc: DIRRECTIONS[2], direction: 2 },
    { max: 157.5, desc: DIRRECTIONS[3], direction: 3 },
    { max: 202.5, desc: DIRRECTIONS[4], direction: 4 },
    { max: 247.5, desc: DIRRECTIONS[5], direction: 5 },
    { max: 292.5, desc: DIRRECTIONS[6], direction: 6 },
    { max: 337.5, desc: DIRRECTIONS[7], direction: 7 },
    { max: 360, desc: DIRRECTIONS[0], direction: 0 }
  ]
  // speedGrades = [
  //   { max: 0.2, grade: 0 }, { max: 1.5, grade: 1 },
  //   { max: 3.3, grade: 2 }, { max: 5.4, grade: 3 },
  //   { max: 7.9, grade: 4 }, { max: 10.7, grade: 5 },
  //   { max: 13.8, grade: 6 }, { max: 17.1, grade: 7 },
  //   { max: 20.7, grade: 8 }, { max: 24.4, grade: 9 },
  //   { max: 28.4, grade: 10 }, { max: 32.6, grade: 11 },
  //   { max: 36.9, grade: 12 }, { max: 41.4, grade: 13 },
  //   { max: 46.1, grade: 14 }, { max: 50.9, grade: 15 },
  // ],
  var speedDesc
  var directionDesc
  var grade
  var _direction
  var result = {}
  if (obj.speed) {
    // 获取风力描述
    for (var i in speeds) {
      if (obj.speed <= speeds[i].max) {
        speedDesc = speeds[i].desc
        grade = speeds[i].grade
        break
      } else if (speeds[i].max === undefined) {
        speedDesc = speeds[i].desc
        grade = speeds[i].grade
      }
    }
  }

  if (obj.direction) {
    // 获取风力方向
    for (const i in directions) {
      if (obj.direction <= directions[i].max) {
        directionDesc = directions[i].desc
        _direction = directions[i].direction
        break
      }
    }
  }

  if (speedDesc) result.speed = speedDesc
  if (grade) result.grade = grade + LEVEL_HTML
  if (directionDesc) result.direction = directionDesc
  if (_direction) result._direction = _direction
  return result
}
// function updateWeatherByLocation(lat, lon, callback) {
//   getWeatherByLocation(lat, lon, function (data) {
//     callback(data);
//   });
// }
// 将时间戳格式化为日期
// function formatDate(timestamp) {
//   var date = new Date(timestamp * 1000);
//   return (
//     date.getMonth() +
//     1 +
//     "月" +
//     date.getDate() +
//     "日 " +
//     formatWeekday(timestamp)
//   );
// }
// //将时间戳格式化为时间
// function formatTime(timestamp) {
//   var date = new Date(timestamp * 1000);
//   return date.getHours() + ":" + date.getMinutes();
// }
// //中文形式的每周日期
// function formatWeekday(timestamp) {
//   var date = new Date(timestamp * 1000);
//   // var weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
//   var index = date.getDay();
//   return WEEKDAY[index];
// }
// 解析天气数据
function parseWeatherData (data) {
  const weather = {}
  weather.current = data.currently
  weather.daily = data.daily
  return weather
}
function parseSkycon (skycon) {
  // var allDesc = {
  //     'CLEAR_DAY': '晴',
  //     'CLEAR_NIGHT': '晴',
  //     'PARTLY_CLOUDY_DAY': '多云',
  //     'PARTLY_CLOUDY_NIGHT': '多云',
  //     'CLOUDY': '阴',
  //     'CLOUDY_NIGHT': '阴',
  //     'RAIN': '雨',
  //     'SNOW': '雪',
  //     'SNOW_NIGHT': '雪',
  //     'WIND': '大风',
  //     'FOG': '雾',
  //     'HAZE': '雾霾'
  // };

  console.log()
  return allDesc[skycon] || allDesc.CLEAR_DAY
}
function parseWeatherName (skycon, DoN) {
  if (DoN === 'NIGHT') {
    var m = skycon.match(/CLOUDY|SNOW|RAIN|FOG|HAZE|WIND|/)
    if (m[0]) {
      skycon = skycon + '_NIGHT'
    }
  }
  return skycon
}
// 获取天气背景图名称
function getBGPicName (skycon) {
  const allPicName = {
    CLEAR: 'bg_clear.jpg',
    CLEAR_NIGHT: 'bg_clear_night.jpg',
    PARTLY_CLOUDY_DAY: 'bg_partly_cloudy.jpg',
    PARTLY_CLOUDY_NIGHT: 'bg_partly_cloudy_night.jpg',
    CLOUDY: 'bg_cloudy.png',
    CLOUDY_NIGHT: 'bg_cloudy_night.png',
    SNOW: 'bg_snow.jpg',
    SNOW_NIGHT: 'bg_snow_night.jpg',
    RAIN: 'bg_rain.jpg',
    RAIN_NIGHT: 'bg_rain_night.jpg',
    FOG: 'bg_fog.jpg',
    FOG_NIGHT: 'bg_fog_night.jpg',
    HAZE: 'bg_fog.jpg',
    HAZE_NIGHT: 'bg_fog_night.jpg',
    WIND: 'bg_wind.jpg',
    WIND_NIGHT: 'bg_wind_night.jpg'
  }

  return (
    allPicName[
      skycon.match(
        /CLEAR_NIGHT|CLEAR|CLOUDY_NIGHT|CLOUDY|PARTLY_CLOUDY_NIGHT|PARTLY_CLOUDY_DAY|SNOW_NIGHT|SNOW|RAIN_NIGHT|RAIN|FOG_NIGHT|FOG|HAZE_NIGHT|HAZE|WIND_NIGHT|WIND/
      )[0]
    ] || 'bg_cloudy.jpg'
  )
}

export const caiyun = {
  getBGPicName,
  parseWeatherName,
  parseSkycon,
  parseWeatherData,
  getSkyIconPicName,
  judgeWind,
  WEEKDAY
}
