// Скролинг
$(document).ready(function () {
	$(window).scroll(function () {
		if ($(this).scrollTop() > 1) {
			$('body').addClass("scrolled");
		} else {
			$('body').removeClass("scrolled");
		}
	});
});