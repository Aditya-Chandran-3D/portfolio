// html fetch + loading animation
fetch('all/preloader/preloader.html')
  .then(res => res.text())
  .then(html => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;

    // ==================== PRELOADER SETUP ====================

    // inject styles (optional)
    wrapper.querySelectorAll('style').forEach(style => {
      document.head.appendChild(style.cloneNode(true));
    });

    // inject preloader HTML into placeholder
    const preloaderDiv = wrapper.querySelector('#preloader');
    if (preloaderDiv) {
      document.getElementById('preloader-placeholder').appendChild(preloaderDiv);
    }

    // disable scroll during loading
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // ==================== PRELOADER LOGIC ====================

    const pre = document.getElementById('preloader'),
          fill = document.querySelector('.fill'),
          text = document.getElementById('text');

    let dots = 0, prog = 0;

    const dotter = setInterval(() => {
      dots = (dots + 1) % 4;
      text.textContent = 'Loading' + '.'.repeat(dots);
    }, 400);

    const simulate = setInterval(() => {
      if (prog < 95) {
        prog += Math.random() * 5;
        fill.style.width = `${Math.min(prog, 95)}%`;
      }
    }, 200);

    // on full window load
    window.addEventListener('load', () => {
      clearInterval(dotter);
      clearInterval(simulate);
      fill.style.width = '100%';

      // fade out preloader after slight delay
      setTimeout(() => {
        pre.offsetHeight; // force reflow
        pre.classList.add('fade-out');
      }, 300);

      // after fade, remove preloader & restore scroll
      setTimeout(() => {
        pre.remove();
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';

        // play background videos if available
        const video1 = document.getElementById('video1');
        const video2 = document.getElementById('video2');
        video1?.play().catch(e => console.warn('Video1 play failed', e));
        video2?.play().catch(e => console.warn('Video2 play failed', e));
      }, 1300); //fadeout time= 300 + transition: opacity 0.5s ease, transform 1s ease-in; = 1s = 1000, also change introvideoloadpause value
    });

    // ==================== END ====================
  });