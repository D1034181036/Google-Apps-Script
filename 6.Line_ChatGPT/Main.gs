function doPost(e) {
    // 接收 Line Request 資料並格式化
    const lineRequest = JSON.parse(e.postData.contents);
    const lineData = lineRequestFormatter(lineRequest);

    // debug: 紀錄 request 資料
    logLineRequest(JSON.stringify(lineRequest)); 
    
    // 僅接收 Line 文字/語音 訊息
    if (!['text', 'audio'].includes(lineData['message_type'])) return;

  try {
    // 處理 Line 語音轉文字
    if (lineData['message_type'] == 'audio') {
      // 取得 Line 語音檔
      const lineAudioResponse = lineGetAudioFile(lineData['message_id']);
      const audioFile = lineAudioResponse.getBlob().setName('audio.m4a');
      
      // 呼叫 OpenAI Whisper 語音轉文字
      lineData['message_text'] = getTranscriptions(audioFile);
    }

    // 呼叫 OpenAI ChatGPT Completion
    completionsData = getCompletions(lineData['message_text']);
    
    // 回傳 Line 訊息
    lineSendReplyMessage(lineData['replyToken'], completionsData['output_message'].trim());

    // 記錄 Sheet Log
    logSheetData(lineData, completionsData);

    // debug: Send Line Notify
    if (typeof LINE_NOTIFICATION_TOKEN !== 'undefined' && LINE_NOTIFICATION_TOKEN) {
      lineSendNotify( lineNotifyMessageFormatter(lineData, completionsData) );
    }
  } catch {
    // 回傳 Line 訊息
    lineSendReplyMessage(lineData['replyToken'], "Sorry, something went wrong.");
  }
}