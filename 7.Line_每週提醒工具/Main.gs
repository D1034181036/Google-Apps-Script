function sendMessage() {
  const spreadSheet = SpreadsheetApp.openById(Config.sheetId);
  const sheet = spreadSheet.getSheets()[0];
  const data = sheet.getRange(2, 1, sheet.getLastRow()-1, 5).getValues();
  const now = new Date();

  data.forEach((value, index) => {
    if (shouldSendReminder(value, now)) {
      sendNotify(value[0]);
      sheet.getRange(index+2, 5).setValue(now.toString());
    }
  });
}

function shouldSendReminder(value, now) {
  const dayOfWeek = value[1];
  const reminderHour = value[2];
  const reminderMinute = value[3];
  const lastSentTime = value[4] ? new Date(value[4]) : null;

  // 檢查日期
  if (now.getDay() !== dayOfWeek || (lastSentTime && lastSentTime.getDate() == now.getDate())) {
    return false;
  }

  // 檢查時間
  if ( now.getHours() > reminderHour || (now.getHours() === reminderHour && now.getMinutes() >= reminderMinute)) {
    return true;
  }

  return false;
}