// Get UserName
function lineGetUserName(user_id) {
  const response = UrlFetchApp.fetch(`https://api.line.me/v2/bot/profile/${user_id}`, {
    "method": "GET",
    "headers": {
      "Authorization": `Bearer ${LINE_ACCESS_TOKEN}`,
      "Content-Type": "application/json"
    },
  });

  return JSON.parse(response).displayName;
}

// Request Formatter
function lineRequestFormatter(request){
  return {
    'event_type': request.events[0].type,
    'user_id': request.events[0].source.userId,
    'user_name': lineGetUserName(request.events[0].source.userId),
    'group_id': request.events[0].source.groupId,
    'message_type': request.events[0].message.type,
    'message_text': request.events[0].message.text,
    'message_id': request.events[0].message.id,
    'replyToken': request.events[0].replyToken,
  };
}

// Send Reply Message
function lineSendReplyMessage(replyToken, message) {
  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer ${LINE_ACCESS_TOKEN}`,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': [
        {'type': 'text', 'text': message}
      ]
    }),
  });
}

// Send Reply Image
function lineSendReplyImage(replyToken, imgUrl, previewImgUrl) {
  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer ${LINE_ACCESS_TOKEN}`,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': [
        {
            "type": "image",
            "originalContentUrl": imgUrl,
            "previewImageUrl": previewImgUrl
        }
      ]
    }),
  });
}