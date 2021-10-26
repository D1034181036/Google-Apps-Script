function main(){
  //sheetId可以從網址複製 ->https://docs.google.com/spreadsheets/d/{sheet_id}/
  const sheetId = '{sheet_id}';
  const token = '{line_notify_token}';

  const spreadSheet = SpreadsheetApp.openById(sheetId);
  const sheet = spreadSheet.getSheets()[0];
  const data = sheet.getRange(2,1,sheet.getLastRow()-1,3).getValues();

  const now = new Date();
  let message = '';
  data.forEach(item => {
    if(item[0]===now.getMonth()+1 && item[1]===now.getDate()){
      message += '\n' + item[2];
    }
  });
  
  if(message !== ''){
    message = now.getMonth()+1 + '/' + now.getDate() + message;
    doPost(token, message);
  }
}

function doPost(token, message) {
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
