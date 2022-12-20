function main(){
  const lineToken = '';
  const apiKey = '';

  const data = [
    {
      'title': "汐止",
      'lat': '25.068052033569536',
      'lon': '121.66090296899446'
    },{
      'title': "西湖",
      'lat': '25.081991796648595',
      'lon': '121.56686671972881'
    },{
      'title': "中和",
      'lat': '24.999859113365833',
      'lon': '121.49242914125578'
    },{
      'title': "新竹",
      'lat': '24.782456336564056',
      'lon': '121.0063395412804'
    }
  ];

  message = '';

  data.forEach(function(row){
    weather = getWeather(row['lat'], row['lon'], apiKey);
    message += formatMessage(weather, row['title']);
  });

  if (message !== '') {
    sendNotify(lineToken, message);
  }
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

  const message = `\n\n【${title}】：${weatherDescription}`
  + `\n溫度: ${tempDay}, 最高: ${tempMax}, 最低: ${tempMin}`
  + `\n降雨機率: ${pop}%, 濕度: ${humidity}%`
  + rainMessage;

  return message;
}

function getWeather(lat, lon, apiKey){
  url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=zh_tw&units=metric&appid=${apiKey}`;
  const response= UrlFetchApp.fetch(url);

  return JSON.parse(response.getContentText());
}

function sendNotify(lineToken, content){
  UrlFetchApp.fetch('https://notify-api.line.me/api/notify', {
    'headers': {
      'Authorization': `Bearer ${lineToken}`
    },
    'method': 'post',
    'payload': {
      'message': content
    }
  });
}