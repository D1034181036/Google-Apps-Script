function main(){
  const lineToken = '{line_token}';
  const apiKey = '{open_weather_api_key}';

  let title = "汐止";
  let lat = '25.068052033569536';
  let lon = '121.66090296899446';
  let weather = getWeather(lat, lon, apiKey);
  let message = formatMessage(weather, title);

  title = "中和";
  lat = '24.999859113365833';
  lon = '121.49242914125578';
  weather = getWeather(lat, lon, apiKey);
  message += formatMessage(weather, title);

  title = "新竹";
  lat = '24.782456336564056';
  lon = '121.0063395412804';
  weather = getWeather(lat, lon, apiKey);
  message += formatMessage(weather, title);

  lineNotifyPush(lineToken, message);
}


function formatMessage(weather, title){
  const today = weather['daily'][0];
  
  const weatherDescription = today['weather'][0]['description'];
  const tempDay = Math.round(today['temp']['day']);
  const tempMin = Math.round(today['temp']['min']);
  const tempMax = Math.round(today['temp']['max']);
  const pop = Math.round(today['pop']*100);
  const humidity = today['humidity'];
  const rainMessage = today['rain'] !== undefined ? "\n降雨量: " + today['rain'] + " mm" : "";

  const message = "\n\n【" + title + "】：" + weatherDescription + "\n"
  + "溫度: " + tempDay + ", 最高: " + tempMax + ", 最低: " + tempMin + "\n"
  + "降雨機率: " + pop + "%, 濕度: " + humidity + "%"
  + rainMessage;

  return message;
}

function getWeather(lat, lon, apiKey){
  const response= UrlFetchApp.fetch('https://api.openweathermap.org/data/2.5/onecall?'
  + 'lat=' + lat
  + '&lon=' + lon
  + '&lang=zh_tw&'
  + '&units=metric&'
  + '&appid=' + apiKey);

  return JSON.parse(response.getContentText());
}

function lineNotifyPush(token, message) {
  UrlFetchApp.fetch('https://notify-api.line.me/api/notify', {
    'headers': {
      'Authorization': 'Bearer ' + token,
    },
    'method': 'post',
    'payload': {
      'message': message
    }
  });
}