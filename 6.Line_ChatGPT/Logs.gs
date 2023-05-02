function logSheetData(lineData, completionsData){
  const spreadSheet = SpreadsheetApp.openById( SHEET_ID );
  const sheet = spreadSheet.getSheets()[0];
  const lastRow = sheet.getLastRow();

  sheet.getRange(lastRow+1, 1).setValue(new Date().toLocaleString('zh-tw', { timeZone: 'Asia/Taipei' }));
  sheet.getRange(lastRow+1, 2).setValue(lineData['user_id']);
  sheet.getRange(lastRow+1, 3).setValue(lineData['user_name']);
  sheet.getRange(lastRow+1, 4).setValue(lineData['group_id']);
  sheet.getRange(lastRow+1, 5).setValue(lineData['message_text']);
  sheet.getRange(lastRow+1, 6).setValue(completionsData['output_role']);
  sheet.getRange(lastRow+1, 7).setValue(completionsData['output_message']);
  sheet.getRange(lastRow+1, 8).setValue(completionsData['prompt_tokens']);
  sheet.getRange(lastRow+1, 9).setValue(completionsData['completion_tokens']);
  sheet.getRange(lastRow+1, 10).setValue(completionsData['total_tokens']);
}

function logLineRequest(log){
  const spreadSheet = SpreadsheetApp.openById( SHEET_ID );
  const sheet = spreadSheet.getSheets()[1];
  const lastRow = sheet.getLastRow();
  sheet.getRange(lastRow+1, 1).setValue(log);
}