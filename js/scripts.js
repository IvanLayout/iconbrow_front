// Ширина окна для ресайза
WW = window.innerWidth || document.clientWidth || document.querySelector('body')[0].clientWidth

// Моб. версия
fakeResize = false
fakeResize2 = true

if (document.body.clientWidth < 400) {
	document.getElementsByTagName('meta')['viewport'].content = 'width=400, user-scalable=no'
}

$(() => {
	if ($('.section-socials__slider').length) {
		new Swiper('.section-socials__slider', {
			loop: true,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 10,
			slidesPerView: 'auto',
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			navigation: {
				nextEl: '.slider-button-next',
				prevEl: '.slider-button-prev'
			},
			breakpoints: {
				'320': {
					spaceBetween: 10,
					slidesPerView: 'auto'
				},
				'480': {
					spaceBetween: 10,
					slidesPerView: 'auto'
				},
				'768': {
					spaceBetween: 10,
					slidesPerView: 4
				},
				'1024': {
					spaceBetween: 10,
					slidesPerView: 5,
				},
				'1300': {
					spaceBetween: 10,
					slidesPerView: 6,
				},
			},
			on: {
				init: function (swiper) {
					$(swiper.el).find('.swiper-wrapper').wrap('<div class="swiper-overflow"></div>')
					swiper.slides.forEach(slide => {
						slide.classList.remove('_last');
					});

					const visibleSlides = Array.from(swiper.slides).filter(slide =>
						slide.classList.contains('swiper-slide-visible')
					);

					const lastVisible = visibleSlides[visibleSlides.length - 1];

					if (lastVisible) {
						lastVisible.classList.add('_last');
					}
				},
				slideChange: function (swiper) {
					swiper.slides.forEach(slide => {
						slide.classList.remove('_last');
					});

					const visibleSlides = Array.from(swiper.slides).filter(slide =>
						slide.classList.contains('swiper-slide-visible')
					);

					const lastVisible = visibleSlides[visibleSlides.length - 1];

					if (lastVisible) {
						lastVisible.classList.add('_last');
					}
				}
			}
		})
	}

	// if ($('.products__slider').length) {
	// 	new Swiper('.products__slider', {
	// 		loop: true,
	// 		watchSlidesProgress: true,
	// 		watchOverflow: true,
	// 		centeredSlides: true,
	// 		spaceBetween: -40,
	// 		slidesPerView: 'auto',
	// 		preloadImages: false,
	// 		lazy: {
	// 			loadPrevNext: true,
	// 			elementClass: 'lazyload',
	// 			enabled: true,
	// 			loadedClass: 'loaded',
	// 			checkInView: true,
	// 			loadOnTransitionStart: true
	// 		},
			// effect: "creative",
			// creativeEffect: {
			// 	limitProgress: 2,
			// 	prev: {
			// 		shadow: false,
			// 		translate: ["-100%", 0, 0],
			// 		scale: 0.82,
			// 	},
			// 	next: {
			// 		shadow: false,
			// 		translate: ["100%", 0, 0],
			// 		scale: 0.82,
			// 	},
			// },
			// effect: "coverflow",
			// coverflowEffect: {
			// 	rotate: 0,
			// 	stretch: 0,
			// 	depth: 0,
			// 	modifier: 1,
			// 	scale: .833,
			// 	slideShadows: false,
			// },
			// effect: 'cards',
			// cardsEffect: {
			// 	perSlideOffset: 2,
			// 	perSlideRotate: 0,

			// },
	// 		navigation: {
	// 			nextEl: '.slider-button-next',
	// 			prevEl: '.slider-button-prev'
	// 		},
	// 	})
	// }

	// if ($('.products__slider').length) {
	// 	$('.products__slider .wheelSlider-container').wheelSlider({
	// 	})
	// }

	if ($('.products__slider').length){
		productsSlider()
	}
});


$(window).on('resize', () => {
	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Перезапись ширины окна
		WW = window.innerWidth || document.clientWidth || document.querySelector('body')[0].clientWidth

		// Моб. версия
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 400) document.getElementsByTagName('meta')['viewport'].content = 'width=400, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}

	if ($('.products__slider').length){
		productsSlider()
	}
});

function productsSlider(){
	if ( $(window).width() < 1024 && !$('.products__slider').hasClass('swiper-initialized') ) {
		if ($('.products__slider-wrap').hasClass('loaded')) {
			const instance = $('.products__slider-wrap').data('wheelSlider');
			if (instance) {
				instance.destroy();
			}
		}

		$('.products__slider').addClass('swiper')
		$('.products__slider-wrap').addClass('swiper-wrapper').removeClass('wheelSlider-container')
		$('.products__slider .product').addClass('swiper-slide').removeClass('wheelSlider-item')

		productsSwiperSlider = new Swiper('.products__slider', {
			loop: true,
			loopAdditionalSlides: 2,
			watchSlidesProgress: true,
			watchOverflow: true,
			spaceBetween: 0,
			slidesPerView: 1,
			preloadImages: false,
			centeredSlides: true,
			lazy: {
				loadPrevNext: true,
				elementClass: 'lazyload',
				enabled: true,
				loadedClass: 'loaded',
				checkInView: true,
				loadOnTransitionStart: true
			},
			effect: 'creative',
			creativeEffect: {
				prev: {
					translate: ['-100%', 0, 0],
					rotate: [0, 0, 0],
					scale: .86
					// opacity: 0.1,
				},
				next: {
					translate: ['100%', 0, -0],
					rotate: [0, 0, 0],
					scale: .86
					// opacity: 0.1,
				},
				limitProgress: 3
			},
		})
	} else if ($(window).width() > 1023 && !$('.products__slider-wrap').hasClass('loaded')) {
		if ($('.products__slider').length === 1 && $('.products__slider').hasClass('swiper-initialized')) {
			productsSwiperSlider.destroy(true, true)
		} else if ($('.products__slider').length >= 2 && $('.products__slider').hasClass('swiper-initialized')) {
			productsSwiperSlider.forEach(function (element) {
				element.destroy(true, true)
			})
		}

		$('.products__slider').removeClass('swiper')
		$('.products__slider-wrap').removeClass('swiper-wrapper').addClass('wheelSlider-container')
		$('.products__slider .product').removeClass('swiper-slide').addClass('wheelSlider-item')

		if (!$('.products__slider-wrap').hasClass('loaded')) {
			$('.products__slider-wrap').wheelSlider({
				controls: true,
				dots: false,
				items: 7,
				arrowPrevHtml : '<svg><use xlink:href="#ic_arrow1"></use></svg>',
				arrowNextHtml : '<svg><use xlink:href="#ic_arrow1"></use></svg>',
			})
		}
	}
}