function basic(){
  // 影片ID設定
  const videoId = "aST49yvU3x0";
  // 標題格式設定
  const titleFormat = "有 {views} 個人點進來看我把筆放到貓的左手上";
  // 取得影片資訊
  const videoDetails = YouTube.Videos.list("snippet, statistics", { id: videoId })['items'][0];
  // 更新標題資訊
  videoDetails['snippet']['title'] = titleFormat.replace("{views}", videoDetails['statistics']['viewCount'].toLocaleString('en-US'));
  // 執行更新
  YouTube.Videos.update(videoDetails, "id,snippet,statistics");
}
