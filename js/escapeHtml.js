// 引数からファイルパスを取得
inputFile = WScript.Arguments(0);
outputFile = WScript.Arguments(1);

// 入力ファイルを読み込み
fso = new ActiveXObject("Scripting.FileSystemObject");
file = fso.OpenTextFile(inputFile, 1); 
htmlContent = file.ReadAll();
file.Close();

// HTML エスケープ処理と <script> タグの挿入
escapedHtml = escapeHtmlAndInsertScripts(htmlContent);

// 結果を出力ファイルに書き込み
// 第2引数(フォーマット)を削除
outFile = fso.CreateTextFile(outputFile, true); 
outFile.WriteLine(escapedHtml);
outFile.Close();

function escapeHtmlAndInsertScripts(html) {
  // <script>タグを生成 (エスケープを修正)
  jqueryScript = '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></scr' + 'ipt>';
  copyButtonScript = '<script src="https://takeru-server.github.io/markdown-html-converter-assets/js/copy-button.js"></scr' + 'ipt>';
  copyCodeButtonScript = '<script src="https://takeru-server.github.io/markdown-html-converter-assets/js/copy-code-button.js"></scr' + 'ipt>';

  // </body>タグの直前に挿入
  escapedHtml = html.replace('</body>', jqueryScript + copyButtonScript + copyCodeButtonScript + '</body>');

  // HTML エスケープ処理
  escapedHtml = escapedHtml.replace(/\&/g, '&')
                          .replace(/</g, '<')
                          .replace(/>/g, '>')
                          .replace(/"/g, '"')
                          .replace(/'/g, ''');
  
  return escapedHtml;
}
