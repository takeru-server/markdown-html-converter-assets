@echo off
setlocal EnableDelayedExpansion

:: コマンドプロンプトの文字コードをUTF-8に変更
chcp 65001

REM 「.prettierrc」を感知するためにカレントディレクトリを「このバッチファイルがある場所」にしている
REM （これを指定しない場合、cmdを開いた時にデフォルトでカレントディレクトリになっている場所に「.prettierrc」を配置すれば参照してくれる）

cd /d "%~dp0"

echo Current directory: %cd%

REM --- パスの追加（ローカルインストールの場合のみ） ---
SET PATH=%~dp0\node_modules\.bin;%PATH%
REM 

set "inputMarkdown=%~1"
set "outputHtml=%~dpn1.html"
set "title=%~n1"

REM :: CSSのURL
REM set "geminiCSS=https://takeru-server.github.io/markdown-html-converter-assets/css/gemini-style.css"

REM :: copyButton.jsへのURL
REM set "jqueryJS=https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"
REM set "copyButtonJS=https://takeru-server.github.io/markdown-html-converter-assets/js/copy-button.js"
REM set "copyCodeButtonJS=https://takeru-server.github.io/markdown-html-converter-assets/js/copy-code-button.js"


:: ソースコードの色を変える「--highlight-style」オプションには、pygments, tango, kate, monochrome, espresso, zenburn, haddockなどのスタイルを指定できる	参考：https://qiita.com/kaityo256/items/01176b3c463ba45166f9

REM mod_start_2024年8月26日
REM :: MarkdownをHTMLに変換 (一時ファイルにリダイレクト)
REM pandoc "%inputMarkdown%" ^
REM     --highlight-style=pygments ^
REM     --standalone ^
REM     -M title="%~n1" ^
REM     --css "%geminiCSS%" > "%outputHtml%.tmp"



REM 自作のCSSやJavaScriptは以下のファイルにまとめて記載し、ヘッダーの最後でインクルードする
REM https://takeru-server.github.io/markdown-html-converter-assets/includes/header-includes.inc

:: MarkdownをHTMLに変換 (一時ファイルにリダイレクト)
pandoc "%inputMarkdown%" -s --toc ^
    --template=https://takeru-server.github.io/markdown-html-converter-assets/elegant_bootstrap_menu.html ^
    --include-in-header=https://takeru-server.github.io/markdown-html-converter-assets/includes/header-includes.inc ^
    --include-after-body=https://takeru-server.github.io/markdown-html-converter-assets/includes/body-includes.inc ^
    --highlight-style=pygments ^
    --standalone ^
    --mathjax ^
    -M title="%title%" > "%outputHtml%"

REM mod_end_2024年8月26日

REM ↑テンプレート「https://raw.githubusercontent.com/ryangrose/easy-pandoc-templates/master/html/elegant_bootstrap_menu.html」を利用してもいいかも	参考：https://dev.classmethod.jp/articles/pandoc-markdown2html/#HTML%25E3%2583%2595%25E3%2582%25A1%25E3%2582%25A4%25E3%2583%25AB%25E3%2581%25A8%25E3%2581%2597%25E3%2581%25A6%25E3%2581%25AE%25E5%2587%25BA%25E5%258A%259B

REM mod_end_2025年2月10日
REM 出力されたHTMLファイルを整形する
REM node "node_modules\prettier\bin\prettier.cjs" --write --plugin-search-dir=%~dp0\node_modules "%outputHtml%"
node "node_modules\prettier\bin\prettier.cjs" --write "%outputHtml%"
REM mod_end_2025年2月10日

echo.
echo 変換が完了しました: "%outputHtml%"
pause

endlocal