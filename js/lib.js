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
	// Функция управления фокусом
	function trapFocus(modal) {
		const focusableElements = modal.find('a[href], button');
		const firstElement = focusableElements.first();
		const lastElement = focusableElements.last();
		modal.on('keydown', function (e) {
			if (e.key === 'Tab') {
				if (e.shiftKey && document.activeElement === firstElement[0]) {
					e.preventDefault();
					lastElement.focus();
				} else if (!e.shiftKey && document.activeElement === lastElement[0]) {
					e.preventDefault();
					firstElement.focus();
				}
			} else if (e.key === 'Escape') {
				closeModal();
			}
		});
	}

	// Функция закрытия модального окна
	function closeModal() {
		const lastFocusedBtn = $('.modal').data('lastFocusedBtn');

		$('.modal')
			.attr('aria-hidden', 'true')
			.removeAttr('aria-modal role');

		$('.modal.show').css({
			transform: '',
			transition: 'transform 0.3s ease'
		});

		$('.modal-backdrop').fadeOut(200, function () {
			$('.modal')
				.css('transition', '')
				.removeClass('show');
			$(this).remove();
		});

		if (lastFocusedBtn) {
			lastFocusedBtn.focus();
		}
	}

	// Оптимизация обработки открытия модального окна
	$('[data-toggle="modal"]').on('click', function () {
		const target = $(this).data('target');
		const modal = $('#' + target);

		modal
			.css({
				transform: 'translateX(0)',
				transition: 'transform 0.3s ease'
			})
			.removeAttr('aria-hidden')
			.attr({
				'aria-modal': 'true',
				role: 'dialog'
			})
			.addClass('show');

		$('body').append('<div class="modal-backdrop"></div>');
		$('.modal-backdrop').fadeIn(200);

		// Сохраняем ссылку на кнопку
		$('.modal').data('lastFocusedBtn', $(this));

		// Задержка для trapFocus
		setTimeout(() => trapFocus(modal), 300);
	});

	// Объединение обработчиков закрытия
	$('.btn-menu-close, #menuModal .menu__nav a, .modal-backdrop').on('click', closeModal);

	// Оптимизация обработчика клика за пределами модального окна
	$(document).on('click', function (e) {
		if ($(e.target).is('.modal-backdrop')) {
			closeModal();
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

/*
$(document).ready(function () {
	$.fn.animate_Text = function () {
		var string = this.text();
		return this.each(function () {
			var $this = $(this);
			$this.html(string.replace(/./g, '<span class="new">$&</span>'));
			$this.find('span.new').each(function (i, el) {
				setTimeout(function () { $(el).addClass('div_opacity'); }, 20 * i);
			});
		});
	};
	$('#header-h1').css({ 'opacity': '1' });
	$('#header-h1').animate_Text();
	setTimeout(function () {
		$('#header-text').css({ 'opacity': '1' });
		$('#header-text').animate_Text();
	}, 400);
});
*/