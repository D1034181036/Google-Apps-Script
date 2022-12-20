function main(){
  const videoId = "aST49yvU3x0";
  const sheetId = "";
  const titleFormat = "有 {views} 個人點進來看我把筆放到貓的左手上";

  const response = YouTube.Videos.list("snippet, statistics", { id: videoId });
  const videoDetails = response['items'][0];

  const currentTitle = videoDetails['snippet']['title'];
  const currentViews = videoDetails['statistics']['viewCount'];
  const newTitle = titleFormat.replace("{views}", currentViews.toLocaleString('en-US'));

  if(currentTitle !== newTitle){
    videoDetails['snippet']['title'] = newTitle;
    YouTube.Videos.update(videoDetails, "id,snippet,statistics");
    Logger.log(`Update completed: ${newTitle}`);
    sheetLog(sheetId, currentViews);
  }else{
    Logger.log("No need to update");
  }
}

function sheetLog(sheetId, views){
  const spreadSheet = SpreadsheetApp.openById(sheetId);
  const sheet = spreadSheet.getSheets()[0];

  const lastRow = sheet.getLastRow();
  const currentDate = new Date();

  sheet.getRange(lastRow+1, 1).setValue(currentDate.toLocaleString('zh-tw', { timeZone: 'Asia/Taipei' }));
  sheet.getRange(lastRow+1, 2).setValue(views);
  sheet.getRange(lastRow+1, 3).setValue(currentDate.getTime());
}

//author: Kevin Chen - 2021/08/29
//idea: https://www.youtube.com/watch?v=BxV14h0kFs0
//code reference: https://github.com/KelviNosse/this-video-has-x-views
