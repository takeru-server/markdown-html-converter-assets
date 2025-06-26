document.addEventListener('DOMContentLoaded', function() {
    // Pandocが出力するすべてのソースコードブロックを取得
    const codeBlocks = document.querySelectorAll('pre.sourceCode code');

    codeBlocks.forEach(code => {
        const pre = code.parentElement;
        // preの親要素が存在しない場合はスキップ
        if (!pre.parentNode) {
            return;
        }
        const originalParent = pre.parentNode;

        // --- 1. 新しいコンテナとヘッダーを作成 ---
        const container = document.createElement('div');
        container.className = 'code-block-container';

        const header = document.createElement('div');
        header.className = 'code-header';

        // --- 2. 言語名を取得して表示 ---
        const langName = document.createElement('span');
        langName.className = 'language-name';
        const langClass = Array.from(code.classList).find(cls => cls.startsWith('language-'));
        langName.textContent = langClass ? langClass.replace('language-', '').toUpperCase() : 'CODE';
        
        // --- 3. 新しいコピーボタンを作成 ---
        const copyButton = document.createElement('button');
        copyButton.className = 'new-copy-button';
        const originalIcon = `
            <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true" style="width: 16px; height: 16px; fill: #cccccc;">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
            </svg>`;
        const copiedIcon = `
            <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true" style="width: 16px; height: 16px; fill: #4CAF50;">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
            </svg>`;
        copyButton.innerHTML = originalIcon;

        // --- 4. コピー機能を追加 ---
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
        
        container.appendChild(header);
        container.appendChild(pre); // 元の<pre>をコンテナに移動

        // ★★★★★ 修正点 ★★★★★
        // 元の<pre>要素を、新しいコンテナで置き換える
        originalParent.replaceChild(container, pre);
    });
});
```*(アイコンの色が見やすいように少し調整しました)*

---

### 原因3: その他の外部リソースエラー

**エラー内容:**
