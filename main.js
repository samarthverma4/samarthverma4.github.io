// Cover click transition with previous animation
const cover = document.getElementById('cover');
const mainContent = document.getElementById('mainContent');
cover.addEventListener('click', () => {
  cover.classList.add('tilt-animate');
  setTimeout(() => {
    cover.style.display = 'none';
    mainContent.classList.add('visible');
    setTimeout(showBookFlip, 800);
  }, 1100); // match animation duration
});
let aboutPageAnimated = false;
function showBookFlip() {
  const welcome = document.getElementById('welcome');
  const book = document.getElementById('bookFlip');
  welcome.style.transition = "opacity 0.7s";
  welcome.style.opacity = 0;
  setTimeout(() => {
    welcome.style.display = "none";
    book.style.display = "flex";
    book.style.opacity = "0";
    book.style.transition = "opacity 0.8s ease-out";
    // Trigger fade in after a small delay
    setTimeout(() => {
      book.style.opacity = "1";
      // Animate about page only after book is fully visible, and only once
      setTimeout(() => {
        if (pages[0].classList.contains('active') && !aboutPageAnimated) {
          animateAboutPage();
          aboutPageAnimated = true;
        }
      }, 800); // match book fade duration
    }, 50);
  }, 700);
}
const pages = [
  document.getElementById('page1'),
  document.getElementById('page2'),
  document.getElementById('page3'),
  document.getElementById('page4')
];
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let current = 0;
function updatePages() {
  pages.forEach((page, i) => {
    page.classList.remove('left', 'active', 'right');
    if (i < current) page.classList.add('left');
    else if (i === current) page.classList.add('active');
    else page.classList.add('right');
  });
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === pages.length - 1;
}
prevBtn.addEventListener('click', () => {
  if (current > 0) {
    current--;
    updatePages();
  }
});
nextBtn.addEventListener('click', () => {
  if (current < pages.length - 1) {
    current++;
    updatePages();
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'ArrowRight') nextBtn.click();
});
let startX = null;
document.getElementById('bookFlip').addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});
document.getElementById('bookFlip').addEventListener('touchend', e => {
  if (startX !== null) {
    let dx = e.changedTouches[0].clientX - startX;
    if (dx > 40) prevBtn.click();
    if (dx < -40) nextBtn.click();
    startX = null;
  }
});
updatePages();

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.about-center-grid');
  if (grid) {
    Array.from(grid.children).forEach(el => el.classList.add('about-animate-hide'));
  }
  const nav = document.querySelector('.about-nav');
  const footer = document.querySelector('.about-footer');
  if (nav) nav.classList.add('about-animate-hide');
  if (footer) footer.classList.add('about-animate-hide');
});

// Function to animate the about page elements
function animateAboutPage() {
  const grid = document.querySelector('.about-center-grid');
  if (!grid) return;

  // Add hide class to all grid items, nav, and footer
  const items = Array.from(grid.children);
  items.forEach(el => el.classList.add('about-animate-hide'));
  const nav = document.querySelector('.about-nav');
  const footer = document.querySelector('.about-footer');
  if (nav) nav.classList.add('about-animate-hide');
  if (footer) footer.classList.add('about-animate-hide');

  // Also add hide class to all descendants of nav and footer
  if (nav) nav.querySelectorAll('*').forEach(el => el.classList.add('about-animate-hide'));
  if (footer) footer.querySelectorAll('*').forEach(el => el.classList.add('about-animate-hide'));

  // Force reflow
  void grid.offsetWidth;

  // Start animations immediately (no outer delay)
  // Animate navigation first
  if (nav) {
    nav.classList.remove('about-animate-hide');
    nav.style.transition = 'opacity 0.6s ease-out, transform 0.8s ease-out';
    nav.style.opacity = '1';
    nav.style.transform = 'translateY(0)';
    // Reveal all nav descendants
    nav.querySelectorAll('*').forEach(el => {
      el.classList.remove('about-animate-hide');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }
  // Animate footer
  if (footer) {
    setTimeout(() => {
      footer.classList.remove('about-animate-hide');
      footer.style.transition = 'opacity 0.6s ease-out, transform 0.8s ease-out';
      footer.style.opacity = '1';
      footer.style.transform = 'translateY(0)';
      // Reveal all footer descendants
      footer.querySelectorAll('*').forEach(el => {
        el.classList.remove('about-animate-hide');
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }, 60);
  }
  // Animate each grid element with minimal stagger
  items.forEach((el, i) => {
    setTimeout(() => {
      el.classList.remove('about-animate-hide');
      el.style.transition = 'opacity 0.4s cubic-bezier(.77,0,.18,1), transform 0.5s cubic-bezier(.77,0,.18,1)';
      el.style.opacity = '1';
      el.style.transform = 'scale(1) translateY(0)';
      setTimeout(() => {
        el.style.transform = 'scale(1.05) translateY(0)';
        setTimeout(() => {
          el.style.transform = 'scale(1) translateY(0)';
        }, 80);
      }, 180);
    }, i * 40);
  });
}

// Custom slider bar logic for About page (horizontal and vertical)
(function() {
  const sliderContainer = document.querySelector('.about-slider-bar-container');
  const slider = document.querySelector('.about-slider-bar-draggable');
  const aboutPage = document.querySelector('.dark-about');
  if (!sliderContainer || !slider || !aboutPage) return;

  // Detect scroll direction: horizontal if content is wider, vertical if taller
  function getScrollMode() {
    if (aboutPage.scrollWidth > aboutPage.clientWidth + 10) return 'horizontal';
    if (aboutPage.scrollHeight > aboutPage.clientHeight + 10) return 'vertical';
    return null;
  }

  function updateSliderVisibility() {
    const mode = getScrollMode();
    if (mode) {
      sliderContainer.style.display = 'flex';
      sliderContainer.classList.toggle('vertical', mode === 'vertical');
    } else {
      sliderContainer.style.display = 'none';
    }
  }
  updateSliderVisibility();
  window.addEventListener('resize', updateSliderVisibility);

  // Drag logic
  let isDragging = false;
  let startCoord = 0;
  let startScroll = 0;

  slider.addEventListener('mousedown', function(e) {
    isDragging = true;
    const mode = getScrollMode();
    startCoord = mode === 'vertical' ? e.clientY : e.clientX;
    startScroll = mode === 'vertical' ? aboutPage.scrollTop : aboutPage.scrollLeft;
    document.body.style.userSelect = 'none';
  });
  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    const mode = getScrollMode();
    const dCoord = mode === 'vertical' ? e.clientY - startCoord : e.clientX - startCoord;
    const maxScroll = mode === 'vertical' ? aboutPage.scrollHeight - aboutPage.clientHeight : aboutPage.scrollWidth - aboutPage.clientWidth;
    const maxSliderMove = (mode === 'vertical' ? sliderContainer.clientHeight : sliderContainer.clientWidth) - (mode === 'vertical' ? slider.clientHeight : slider.clientWidth);
    const scrollRatio = maxScroll / maxSliderMove;
    if (mode === 'vertical') {
      aboutPage.scrollTop = Math.min(maxScroll, Math.max(0, startScroll + dCoord * scrollRatio));
    } else {
      aboutPage.scrollLeft = Math.min(maxScroll, Math.max(0, startScroll + dCoord * scrollRatio));
    }
    updateSliderPosition();
  });
  document.addEventListener('mouseup', function() {
    isDragging = false;
    document.body.style.userSelect = '';
  });

  // Sync slider position with scroll
  function updateSliderPosition() {
    const mode = getScrollMode();
    const maxScroll = mode === 'vertical' ? aboutPage.scrollHeight - aboutPage.clientHeight : aboutPage.scrollWidth - aboutPage.clientWidth;
    const maxSliderMove = (mode === 'vertical' ? sliderContainer.clientHeight : sliderContainer.clientWidth) - (mode === 'vertical' ? slider.clientHeight : slider.clientWidth);
    const scrollPos = mode === 'vertical' ? aboutPage.scrollTop : aboutPage.scrollLeft;
    const pos = (scrollPos / maxScroll) * maxSliderMove;
    if (mode === 'vertical') {
      slider.style.top = (isNaN(pos) ? 0 : pos) + 'px';
      slider.style.left = '';
    } else {
      slider.style.left = (isNaN(pos) ? 0 : pos) + 'px';
      slider.style.top = '';
    }
  }
  aboutPage.addEventListener('scroll', updateSliderPosition);
  window.addEventListener('resize', updateSliderPosition);
  setTimeout(updateSliderPosition, 100);
})();