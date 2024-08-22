document.addEventListener('DOMContentLoaded', function() {
	// gemini-codeクラスを持つすべてのコードブロックを取得
	const codeBlocks = document.querySelectorAll('.gemini-code');

	// 各コードブロックにコピーボタンを追加
	codeBlocks.forEach(codeBlock => {
		// コピーボタンを作成
		const copyButton = document.createElement('button');
		copyButton.textContent = 'コピー';
		copyButton.classList.add('copy-button');

		// ボタンクリック時の処理
		copyButton.addEventListener('click', () => {
			// コードブロックのテキストを取得
			const codeToCopy = codeBlock.textContent;

			// クリップボードにコピー
			navigator.clipboard.copy(codeToCopy)
				.then(() => {
					// 成功時の処理 (例: ボタンのテキストを変更)
					copyButton.textContent = 'コピー完了!';
					setTimeout(() => {
						copyButton.textContent = 'コピー'; // 1.5秒後に元のテキストに戻す
					}, 1500); 
				})
				.catch(err => {
					// エラー処理 (例: アラートを表示)
					console.error('コピーに失敗しました:', err);
					alert('コピーに失敗しました。');
				});
		});

		// コードブロックの前にボタンを追加
		codeBlock.parentNode.insertBefore(copyButton, codeBlock);
	});
});