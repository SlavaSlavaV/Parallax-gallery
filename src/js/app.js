// Слайдер Swiper

import Swiper from 'swiper/bundle';

document.addEventListener('DOMContentLoaded', () => {

	// slider main

	const sliderMain = new Swiper('#slider-main', {
		freeMode: true,
		centeredSlides: true,
		mousewheel: true,
		parallax: true,
		breakpoints: {
			0: {
				slidesPerView: 2.5,
				spaceBetween: 20
			},
			680: {
				slidesPerView: 3.5,
				spaceBetween: 60
			}
		}
	});

	sliderMain.Swiper

	// slider bg

	const sliderBg = new Swiper('#slider-bg', {
		centeredSlides: true,
		parallax: true,
		spaceBetween: 60,
		slidesPerView: 3.5
	});

	sliderMain.controller.control = sliderBg;

	document.querySelectorAll('.slider__item').forEach(item => {
		item.addEventListener('click', event => {
			event.preventDefault();
			item.classList.toggle('opened');
			console.log('opened');
		});
	});

	const desc = document.querySelector('.description');

	sliderMain.on('slideChange', e => {
		sliderMain.activeIndex > 0 ? desc.classList.add('hidden') : desc.classList.remove('hidden');
	});

});