// bodyタグのコンテンツを取得
var bodyContent = document.body.innerHTML;

// bodyタグの中身を空にする
document.body.innerHTML = '';

// scriptタグを生成
var jqueryScript = document.createElement('script');
jqueryScript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js';
var copyButtonScript = document.createElement('script');
copyButtonScript.src = 'https://takeru-server.github.io/markdown-html-converter-assets/js/copy-button.js';
var copyCodeButtonScript = document.createElement('script');
copyCodeButtonScript.src = 'https://takeru-server.github.io/markdown-html-converter-assets/js/copy-code-button.js';

// scriptタグをbodyタグに追加
document.body.appendChild(jqueryScript);
document.body.appendChild(copyButtonScript);
document.body.appendChild(copyCodeButtonScript);

// エスケープ処理を行ったbodyタグのコンテンツを追加
document.body.innerHTML += (function escapeHtml(unsafe) {
    return unsafe
           .replace(/&/g, '&')
           .replace(/</g, '<')
           .replace(/>/g, '>')
           .replace(/"/g, '"')
           .replace(/'/g, ''');
})(bodyContent);
