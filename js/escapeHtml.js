// 標準入力から HTML を読み込む
fso = new ActiveXObject("Scripting.FileSystemObject");
stdin = fso.GetStandardStream(0);
htmlContent = stdin.ReadAll;

// HTML エスケープ処理と <script> タグの挿入
escapedHtml = escapeHtmlAndInsertScripts(htmlContent);

// 標準出力に結果を出力
stdout = fso.GetStandardStream(1);
stdout.WriteLine(escapedHtml);

function escapeHtmlAndInsertScripts(html) {
  // <script>タグを生成 (複数行に分割)
  jqueryScript = '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js">'
  jqueryScript += '</scr' + 'ipt>';
  copyButtonScript = '<script src="https://takeru-server.github.io/markdown-html-converter-assets/js/copy-button.js">'
  copyButtonScript += '</scr' + 'ipt>';
  copyCodeButtonScript = '<script src="https://takeru-server.github.io/markdown-html-converter-assets/js/copy-code-button.js">'
  copyCodeButtonScript += '</scr' + 'ipt>';

  // </body>タグの直前に挿入
  escapedHtml = html.replace('</body>', jqueryScript + copyButtonScript + copyCodeButtonScript + '</body>');

  // HTML エスケープ処理
  escapedHtml = escapedHtml.replace(/&/g, '&');
  escapedHtml = escapedHtml.replace(/</g, '<');
  escapedHtml = escapedHtml.replace(/>/g, '>');
  escapedHtml = escapedHtml.replace(/"/g, '"');
  escapedHtml = escapedHtml.replace(/'/g, ''');

  return escapedHtml;
}
