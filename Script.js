
// ==================================Smooth scroll script==================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});


// ==================================Scroll objects animation==================================

document.addEventListener('DOMContentLoaded', function() {
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length === 0) return;

  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  fadeElements.forEach(element => {
    observer.observe(element);
  });
});

// ==================================Statistic Animation==================================

let statistic = document.querySelector('.statistic__body');
let numbers = document.querySelectorAll('.statistic__value');
let arr = [];
let stop = null;
let max = 0;

if (numbers) {
	numbers.forEach((item) => {
		arr.push(+item.textContent);
		item.textContent = 0;
	});

	arr.forEach(function (item) {
		if (item > max)
			max = item;
	});
}

if (statistic && numbers) {
	window.addEventListener('scroll', setNumbers);
	window.addEventListener('load', setNumbers);
}

function setNumbers() {
	if (statistic.getBoundingClientRect().top <= window.innerHeight) {
		if (stop == null) {
			stop = setInterval(function () {
				for (let i = 0; i < arr.length; i++) {
					let cof = Math.ceil(arr[i] / 100);
					if (numbers[i].textContent < arr[i]) {
						numbers[i].textContent = +numbers[i].textContent + cof;
					} else if (numbers[i].textContent > arr[i]) {
						numbers[i].textContent = arr[i];
					} else if (numbers[i].textContent >= max) {
						clearInterval(stop);
					}
				}
			}, 50);
		}
	}
}