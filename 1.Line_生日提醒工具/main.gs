function main(){
  const sheetId = '';
  const lineToken = '';
  const notifyDays = 2;

  const spreadSheet = SpreadsheetApp.openById(sheetId);
  const sheet = spreadSheet.getSheets()[0];
  const data = sheet.getRange(2,1,sheet.getLastRow()-1,3).getValues();

  const now = new Date();
  let message = '';
  data.forEach(item => {
    let birthday = new Date(now.getFullYear(), item[0]-1, item[1], 23, 59, 59);
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
    sendNotify(lineToken, message);
  }
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
