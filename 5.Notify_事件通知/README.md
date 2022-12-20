###### tags: `web`

# Notify - 事件通知

## Preview
![](https://i.imgur.com/KqRzYKJ.png)

## Codes
```javascript=
function getConfigs(){
  return {
    'sheetId': '',
    'lineToken': '',
    'notifyMinutes': 5,
  }
}

function main(){
  const config = getConfigs();

  // Import Data
  const spreadSheet = SpreadsheetApp.openById(config['sheetId']);
  const sheet = spreadSheet.getSheets()[0];
  const data = sheet.getRange(2, 1, sheet.getLastRow()-1, 4).getValues();

  // Main
  const checkDateTime = new Date();
  checkDateTime.setMinutes(checkDateTime.getMinutes() + config['notifyMinutes']);

  data.forEach((value, index) => {
    const status = sheet.getRange(index+2, 4);
    const eventDateTime = new Date(value[0]);

    if(status.getValue() === 0 && checkDateTime >= eventDateTime){
      const content = contentFormatter(eventDateTime, value);
      sendNotify(config['lineToken'], content);
      status.setValue(1);
    }
  });
}

function contentFormatter(eventDateTime, value){
  let content = '';

  content += `${(eventDateTime.getMonth()+1)}/${eventDateTime.getDate()} (${eventDateTime.toLocaleString('zh-tw', {  weekday: 'short' })})`;
  content += '\n' + `時間：${eventDateTime.toTimeString().split(' ')[0].substring(0,5)}`;
  content += '\n' + `標題：${value[1]}`;
  content += '\n' + `內容：${value[2]}`;
  
  return content;
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
```


