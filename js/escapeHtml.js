// 標準入力から HTML を読み込む
var fso = new ActiveXObject("Scripting.FileSystemObject");
var stdin = fso.GetStandardStream(0);
var htmlContent = stdin.ReadAll();

// HTML エスケープ処理と <script> タグの挿入
escapedHtml = escapeHtmlAndInsertScripts(htmlContent);

// 標準出力に結果を出力
var stdout = fso.GetStandardStream(1);
stdout.WriteLine(escapedHtml);

function escapeHtmlAndInsertScripts(html) {
  // <script>タグを生成
  jqueryScript = '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></scr' + 'ipt>';
  copyButtonScript = '<script src="https://takeru-server.github.io/markdown-html-converter-assets/js/copy-button.js"></scr' + 'ipt>';
  copyCodeButtonScript = '<script src="https://takeru-server.github.io/markdown-html-converter-assets/js/copy-code-button.js"></scr' + 'ipt>';

  // </body>タグの直前に挿入
  escapedHtml = html.replace('</body>', jqueryScript + copyButtonScript + copyCodeButtonScript + '</body>');

  // HTML エスケープ処理 
  escapedHtml = escapedHtml.replace(/&/g, '&')
                          .replace(/</g, '<')
                          .replace(/>/g, '>')
                          .replace(/"/g, '"')
                          .replace(/'/g, ''');

  return escapedHtml;
}
