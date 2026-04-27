$(() => {
	// Observer API
	const boxes = document.querySelectorAll('.lazyload')

	function scrollTracking(entries) {
		for (const entry of entries) {
			if (entry.intersectionRatio > 0 && entry.target.getAttribute('data-src') && !entry.target.classList.contains('loaded')) {
				entry.target.classList.add('loaded')

				entry.target.src = entry.target.getAttribute('data-src')
			}
		}
	}

	const observer = new IntersectionObserver(scrollTracking, {
		threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
	})

	boxes.forEach(element => observer.observe(element))

	// Моб. меню
	$('body').on('click', '.mob-menu-btn', function(e) {
		e.preventDefault()

		if ( $(this).hasClass('_active') ){
			$('.mob-menu-btn').removeClass('_active')
			$('.heade__wrap').removeClass('_show')
			$('body').removeClass('_lock-menu')
		} else{
			$('.mob-menu-btn').addClass('_active')
			$('.heade__wrap').addClass('_show')
			$('body').addClass('_lock-menu')
		}
	})

	$('.scroll-btn').click(function(e) {
		e.preventDefault();
		let href = $(this).data('anchor');
		let element = document.querySelector(href);

		if (element) {
			window.scrollTo({
				top: element.offsetTop,
				behavior: 'smooth' // Нативний браузерний скрол
			});
		}

		if ($(this).closest('.header')) {
			$('.mob-menu-btn').removeClass('_active')
			$('.heade__wrap').removeClass('_show')
			$('body').removeClass('_lock-menu')
		}
	});

	// Кастомный select
	$('select').niceSelect()

	// Маска ввода
	$('input[type=tel]').each(function(){
		let datamask = $(this).data('mask');

		$(this).inputmask(`${datamask}`, {
			showMaskOnHover: false
		})
	})


	const openModalButtons = document.querySelectorAll('[data-open-modal]');
	const closeModalButtons = document.querySelectorAll('[data-close-modal]');
	const modals = document.querySelectorAll('.modal');

	openModalButtons.forEach(button => {
		button.addEventListener('click', () => {
			const openedModal = document.querySelector('.modal._show');

			openModal(button.dataset.content);
		});
	});

	closeModalButtons.forEach(button => {
		button.addEventListener('click', () => {
			const modal = button.closest('.modal');
			closeModal(modal);
		});
	});

	modals.forEach(modal => {
		modal.addEventListener('click', (e) => {
			if (e.target === modal) {
				closeModal(modal);
			}
		});
	});
})


// Вспомогательные функции
const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

document.documentElement.style.setProperty(
	"--scroll_width",
	`${scrollbarWidth}px`
);


function openModal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	if (!modal) return;

	modal.classList.add('_show');
	document.querySelector('body').classList.add('_modal-look')
}

function closeModal(modal) {
	if (!modal) return;

	modal.classList.remove('_show');
	document.querySelector('body').classList.remove('_modal-look')
}