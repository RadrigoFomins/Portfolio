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

// modal
$(document).ready(function () {
	// Функция Фокуса в модальном окне
	function trapFocus(boxModal) {
		boxModal.on('keydown', function (e) {
			var focusableElements = boxModal.find('a[href], button');
			var firstElement = focusableElements.first();
			var lastElement = focusableElements.last();
			if (e.key === 'Tab') {
				if (e.shiftKey) {
					if (document.activeElement === firstElement[0]) {
						e.preventDefault();
						lastElement.focus();
					}
				} else {
					if (document.activeElement === lastElement[0]) {
						e.preventDefault();
						firstElement.focus();
					}
				}
			} else if (e.key === 'Escape') {
				functionClose();
			}
		});
	}
	// Функция закрытия модального окна
	function functionClose() {
		// Получаем кнопку, которая открыла модальное окно
		var lastFocusedBtn = $('.modal').data('lastFocusedBtn');
		$('.modal')
			.attr('aria-hidden', 'true')
			.removeAttr('aria-modal')
			.removeAttr('role');
		$('.modal.show').css({ 'transform': '', 'transition': 'transform 0.3s ease' });
		setTimeout(function () {
			$('.modal-backdrop').fadeOut(200);
		}, 150);
		setTimeout(function () {
			$('.modal')
				.css('transition', '')
				.removeClass('show');
			$('.modal-backdrop').remove();
		}, 350);

		if (lastFocusedBtn) {
			lastFocusedBtn.focus();
		}
	}

	$('[data-toggle="modal"]').click(function () {
		var target = $(this).data('target');
		var modalId = $('#' + target);
		modalId
			.css({ 'transform': 'translateX(0)', 'transition': 'transform 0.3s ease' })
			.removeAttr('aria-hidden')
			.attr('aria-modal', 'true')
			.attr('role', 'dialog')
			.addClass('show');
		setTimeout(function () {
			$('.menu').css('transition', '');
			trapFocus(modalId);
		}, 300);
		$('body').append('<div class="modal-backdrop"></div>');
		$('.modal-backdrop').fadeIn(200);
		// Сохраняем кнопку, чтобы вернуть на неё фокус после закрытия
		var lastFocusedBtn = $(this);
		$('.modal').data('lastFocusedBtn', lastFocusedBtn);
	});

	$('.btn-menu-close, .menu__nav a').click(function () {
		functionClose();
	});
	// Закрытие модального окна при клике вне его
	$(document).on('click', function (e) {
		if ($(e.target).is('.modal-backdrop')) {
			functionClose();
		}
	});

});

// Плавный скроллинг к якорю
$(document).ready(function () {
	$("a.scroll").click(function () {
		elementClick = $(this).attr("href")
		destination = $(elementClick).offset().top - 60;
		$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination }, 600);
		return false;
	});
});

// Плавное появление при скроллинге
$(document).ready(function () {
	let animItems = document.querySelectorAll('.animation-element');

	if (animItems.length > 0) {
		window.addEventListener('scroll', animOnScroll);
		function animOnScroll() {
			for (let index = 0; index < animItems.length; index++) {
				const animItem = animItems[index];
				const animItemHeight = animItem.offsetHeight;
				const animItemsOffset = offset(animItem).top;
				const animStart = 5;

				let animItemPoint = window.innerHeight - animItemHeight / animStart;

				if (animItemHeight > window.innerHeight) {
					animItemPoint = window.innerHeight - window.innerHeight / animStart;
				}

				if (pageYOffset > animItemsOffset - animItemPoint && pageYOffset < animItemsOffset + animItemHeight) {
					animItem.classList.add('animation-show');
				}
			}
		}

		function offset(el) {
			const rect = el.getBoundingClientRect(),
				scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
				scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
		}
		animOnScroll();
	}
});