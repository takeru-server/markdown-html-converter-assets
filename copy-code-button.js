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
	});
});