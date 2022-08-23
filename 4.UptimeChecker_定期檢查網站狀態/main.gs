function main(){
  const lineToken = '';
  const url = '';
  
  try{
    response = UrlFetchApp.fetch(url);
    if(response.getResponseCode() != 200){
      sendNotify(lineToken, "\nGet Status Error");
    }
  }catch(error){
    sendNotify(lineToken, "\nGet Status Error");
  }
}

function sendNotify(token, message) {
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