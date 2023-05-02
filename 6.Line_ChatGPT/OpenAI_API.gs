// Get Completions
function getCompletions(inputMessage = "你是誰?") {
  const response = UrlFetchApp.fetch('https://api.openai.com/v1/chat/completions', {
    'method': 'post',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_ACCESS_TOKEN}`,
    },
    'payload': JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {'role': 'system', 'content': '請你扮演成一隻會講話的貓助理，你的名字叫做牛牛'},
        {'role': 'user', 'content': inputMessage}
      ]
    }),
  });

  const data = JSON.parse( response.getContentText() );

  return {
    'output_role': data['choices'][0]['message']['role'],
    'output_message': data['choices'][0]['message']['content'],
    'prompt_tokens': data['usage']['prompt_tokens'],
    'completion_tokens': data['usage']['completion_tokens'],
    'total_tokens': data['usage']['total_tokens'],
  };
}

// Get Transcriptions
function getTranscriptions(audioFile) {
  const response = UrlFetchApp.fetch('https://api.openai.com/v1/audio/transcriptions', {
    'method': 'post',
    'headers': {
      'Authorization': `Bearer ${OPENAI_ACCESS_TOKEN}`,
    },
    'payload': {
      'model': 'whisper-1',
      'file': audioFile,
    },
  });

  return JSON.parse(response.getContentText()).text;
}