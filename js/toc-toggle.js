$(document).ready(function() {
	// TOC Hamburger Menu Toggle
	$('.toc-toggle-button').on('click', function(e) {
		e.stopPropagation();
		$('body').toggleClass('toc-active');
	});

	// Close TOC if clicking outside of it (on the overlay or content)
	$(document).on('click', function(e) {
		if ($('body').hasClass('toc-active') &&
			!$(e.target).closest('#TOC').length &&
			!$(e.target).closest('.toc-toggle-button').length) {
			$('body').removeClass('toc-active');
		}
	});

	// Optional: Close TOC when a link inside it is clicked
	$('#TOC a').on('click', function() {
		if ($('body').hasClass('toc-active')) {
			 $('body').removeClass('toc-active');
		}
	});
});