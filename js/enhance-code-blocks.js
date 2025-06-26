document.addEventListener('DOMContentLoaded', function() {
    // Pandocが出力するすべてのソースコードブロックを取得
    const codeBlocks = document.querySelectorAll('pre.sourceCode code');

    codeBlocks.forEach(code => {
        const pre = code.parentElement;

        // --- 1. 新しいコンテナとヘッダーを作成 ---
        const container = document.createElement('div');
        container.className = 'code-block-container';

        const header = document.createElement('div');
        header.className = 'code-header';

        // --- 2. 言語名を取得して表示 ---
        const langName = document.createElement('span');
        langName.className = 'language-name';
        // 'language-js' のようなクラス名から 'js' を抽出
        const langClass = Array.from(code.classList).find(cls => cls.startsWith('language-'));
        langName.textContent = langClass ? langClass.replace('language-', '') : 'Code';
        
        // --- 3. 新しいコピーボタンを作成 ---
        const copyButton = document.createElement('button');
        copyButton.className = 'new-copy-button';
        // SVGアイコンを埋め込む
        copyButton.innerHTML = `
            <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
            </svg>`;
        
        // --- 4. コピー機能を追加 ---
        const originalIcon = copyButton.innerHTML;
        const copiedIcon = `
            <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
            </svg>`; // チェックマークのSVG

        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(code.textContent).then(() => {
                copyButton.innerHTML = copiedIcon;
                setTimeout(() => {
                    copyButton.innerHTML = originalIcon;
                }, 2000);
            }).catch(err => {
                console.error('コピーに失敗しました。', err);
            });
        });

        // --- 5. 新しい要素をDOMに組み立てる ---
        header.appendChild(langName);
        header.appendChild(copyButton);
        
        // 元の<pre>をコンテナに移動し、ヘッダーをその前に追加
        container.appendChild(header);
        container.appendChild(pre);

        // ページ上の元の<pre>があった場所に、新しいコンテナを挿入
        pre.parentNode.insertBefore(container, pre);
    });
});
