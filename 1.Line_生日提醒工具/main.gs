function main(){
  //sheetId可以從網址複製 ->https://docs.google.com/spreadsheets/d/{sheet_id}/
  const sheetId = '';
  const token = '';
  const notifyDays = 7;

  const spreadSheet = SpreadsheetApp.openById(sheetId);
  const sheet = spreadSheet.getSheets()[0];
  const data = sheet.getRange(2,1,sheet.getLastRow()-1,3).getValues();

  const now = new Date();
  let message = '';
  data.forEach(item => {
    let birthday = new Date();
    birthday.setMonth(item[0]-1);
    birthday.setDate(item[1]);
    if(now > birthday){
      birthday.setFullYear(birthday.getFullYear()+1);
    }

    let check_date = new Date();
    check_date.setDate(now.getDate() + notifyDays);

    if(check_date >= birthday){
      message += '\n' + item[0] + '/' + item[1] + ' - ' + item[2];
    }
  });
  
  if(message !== ''){
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