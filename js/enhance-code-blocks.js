document.addEventListener('DOMContentLoaded', function() {
    const codeBlocks = document.querySelectorAll('pre.sourceCode');

    codeBlocks.forEach(pre => {
        const code = pre.querySelector('code');
        if (!code || !pre.parentNode) {
            return;
        }
        const originalParent = pre.parentNode;

        const container = document.createElement('div');
        container.className = 'code-block-container';

        const header = document.createElement('div');
        header.className = 'code-header';

        const langNameSpan = document.createElement('span');
        langNameSpan.className = 'language-name';

        // ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
        // ★★★      ここからが新しいロジックです     ★★★
        // ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★

        // 1. 言語クラスを探す (例: .javascript)
        const langClass = Array.from(code.classList).find(cls => cls.startsWith('language-'));
        const lang = langClass ? langClass.replace('language-', '').toUpperCase() : '';

        // 2. title属性を探す (例: title="Sample.js")
        const title = pre.getAttribute('title') || '';

        // 3. 表示するテキストを組み立てる
        let headerText = '';
        if (lang && title) {
            headerText = `${lang} : ${title}`; // 言語とタイトルの両方がある場合
        } else {
            headerText = lang || title; // どちらか片方だけがある場合
        }
        langNameSpan.textContent = headerText;

        // ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
        // ★★★      ここまでのロジックが新しくなりました     ★★★
        // ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★


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

        header.appendChild(langNameSpan);
        header.appendChild(copyButton);
        container.appendChild(header);

        originalParent.replaceChild(container, pre);
        container.appendChild(pre);
    });
});
