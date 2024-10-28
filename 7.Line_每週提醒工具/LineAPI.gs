function sendNotify(content){
  UrlFetchApp.fetch('https://notify-api.line.me/api/notify', {
    'headers': {
      'Authorization': `Bearer ${Config.lineToken}`
    },
    'method': 'post',
    'payload': {
      'message': content
    }
  });
}