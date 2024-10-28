function doPost(e) {
  // 接收 Line Request 資料並格式化
  const lineRequest = JSON.parse(e.postData.contents);
  const lineData = lineRequestFormatter(lineRequest);
  
  // 僅接收 Line 文字 訊息
  if (['text'].includes(lineData['message_type'])) {
    result = searchImage(lineData['message_text']);

    try {
      // 回傳 Line 訊息
      if (result['image'].length > 0) {
        lineSendReplyImage(lineData['replyToken'], result['image'][2], result['image'][3]);
      } else {
        lineSendReplyMessage(lineData['replyToken'], result['image_list']);
      }
    } catch {
      // 回傳 Line 訊息
      lineSendReplyMessage(lineData['replyToken'], "Sorry, something went wrong.");
    }
  }
}

function searchImage(text="貓") {
  const spreadSheet = SpreadsheetApp.openById(SHEET_ID);
  const sheet = spreadSheet.getSheets()[0];
  const data = sheet.getRange(2, 1, sheet.getLastRow()-1, 4).getValues();

  let result = {
      image: [],
      image_list: ''
  };

  data.forEach(function(row) {
    if (text === row[0].toString() || text === row[1].toString()) {
      result['image'] = row;
    }
    if (row[0].toString().includes(text) || row[1].toString().includes(text)) {
      result['image_list'] += `\n${row[0]}：${row[1]}`;
    }
  });

  if (result['image_list'].length === 0) {
    result['image_list'] = `沒有搜尋結果\n列表：${SHEET_URL}`
  } else {
    result['image_list'] = "搜尋結果：" + result['image_list'];
  }

  return result;
}

