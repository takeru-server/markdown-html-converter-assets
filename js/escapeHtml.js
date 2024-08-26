// 引数からファイルパスを取得
var inputFile = WScript.Arguments(0);
var outputFile = WScript.Arguments(1);

// 入力ファイルを読み込み
var fso = new ActiveXObject("Scripting.FileSystemObject");
var file = fso.OpenTextFile(inputFile, 1);
var htmlContent = file.ReadAll();
file.Close();

// HTML エスケープ処理と <script> タグの挿入
var escapedHtml = escapeHtmlAndInsertScripts(htmlContent);

// 結果を出力ファイルに書き込み
var outFile = fso.CreateTextFile(outputFile, true);
outFile.WriteLine(escapedHtml);
outFile.Close();

function escapeHtmlAndInsertScripts(html) {
  // <script>タグを生成
  var jqueryScript = '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"><\/script>';
  var copyButtonScript = '<script src="https://takeru-server.github.io/markdown-html-converter-assets/js/copy-button.js"><\/script>';
  var copyCodeButtonScript = '<script src="https://takeru-server.github.io/markdown-html-converter-assets/js/copy-code-button.js"><\/script>';

  // </body>タグの直前に挿入
  var escapedHtml = html.replace('</body>', jqueryScript + copyButtonScript + copyCodeButtonScript + '</body>');

  // HTML エスケープ処理
  escapedHtml = escapedHtml.replace(/&/g, '&')
                          .replace(/</g, '<')
                          .replace(/>/g, '>')
                          .replace(/"/g, '"')
                          .replace(/'/g, ''');
  
  return escapedHtml;
}
