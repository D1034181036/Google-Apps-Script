function main(){
  const lineToken = '';
  const url = '';
  
  try{
    response = UrlFetchApp.fetch(url, {muteHttpExceptions: true});
    if(response.getResponseCode() != 200){
      sendNotify(lineToken, `\nGet HTTP Status: ${response.getResponseCode()}`);
    }
  }catch(error){
    sendNotify(lineToken, "\nGet Status Error");
  }
}

function sendNotify(lineToken, message) {
  UrlFetchApp.fetch('https://notify-api.line.me/api/notify', {
    'headers': {
      'Authorization': `Bearer ${lineToken}`
    },
    'method': 'post',
    'payload': {
      'message': message
    }
  });
}