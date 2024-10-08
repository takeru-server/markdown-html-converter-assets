// コピーボタン作成	Ver.2.0から、変換バッチから独立して使用する
$(document).ready(function() {
	$('pre code.sourceCode').each(function() {
		const copyButton = $('<button class="copy-button">コピー</button>');
		copyButton.on('click', function() {
			const codeBlock = $(this).parent().find('code');
			const tempTextArea = $('<textarea>');
			$('body').append(tempTextArea);
			tempTextArea.val(codeBlock.text()).select();
			document.execCommand('copy');
			tempTextArea.remove();
			$(this).text('コピー完了！');
			setTimeout(function() {
				copyButton.text('コピー');
			}, 1500);
		});
		$(this).parent().prepend(copyButton);
		$('<br>').insertAfter(copyButton);	// コピーボタンの横にコードの１行目が記載されないように調整	add_2024年8月23日	文法参考：https://qiita.com/nekoneko-wanwan/items/227ccad5f8cc449e91e9
	});
});
