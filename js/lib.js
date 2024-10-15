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
// Мобильное меню
$(document).ready(function () {
	function functionCloseMenu() {
		$('.menu.show').css({ 'transform': '', 'transition': 'transform 0.3s ease' });
		setTimeout(function () {
			$('.menu-backdrop').fadeOut(200);
		}, 150);
		setTimeout(function () {
			$('.menu')
				.css('transition', '')
				.removeClass('show');
			$('.menu-backdrop').remove();
		}, 350);
	}
	$('.btn-menu').click(function () {
		$('.menu')
			.css({ 'transform': 'translateX(0)', 'transition': 'transform 0.3s ease' })
			.addClass('show');
		setTimeout(function () {
			$('.menu').css('transition', '');
		}, 300);
		$('body').append('<div class="menu-backdrop"></div>');
		$('.menu-backdrop').fadeIn(200);
	});
	$('.btn-menu-close, .menu__nav a').click(function () {
		functionCloseMenu();
	});
	$(document).click(function (event) {
		if (!$(event.target).closest('.menu').length && !$(event.target).closest('.btn-menu').length) {
			functionCloseMenu();
		}
	});
});