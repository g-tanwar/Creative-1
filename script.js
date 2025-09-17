function init() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
      el: document.querySelector(".main"),
      smooth: true
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(".main", {
      scrollTop(value) {
          return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
  });


  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();

  // In case assets/fonts push layout: re-run after load
  window.addEventListener('load', function(){
    setTimeout(function(){
      locoScroll.update();
      ScrollTrigger.refresh();
    }, 100);
  });

}

init()

var crsr = document.querySelector(".cursor")
var main = document.querySelector(".main")
document.addEventListener("mousemove",function(dets){
  crsr.style.left = dets.x + 20+"px"
  crsr.style.top = dets.y + 20+"px"
})

// Page-specific intro animation
if (document.body && document.body.getAttribute('data-page') === 'work') {
  gsap.set(".work-hero-title span", {opacity: 0, y: 40, rotate: 8});
  gsap.set(".work-hero-sub", {opacity: 0, y: 20});
  gsap.timeline()
    .to(".work-hero-title span", {opacity: 1, y: 0, rotate: 0, stagger: 0.1, duration: 0.6, ease: "power3.out"})
    .to(".work-hero-sub", {opacity: 1, y: 0, duration: 0.5, ease: "power2.out"}, "<0.1");
} else if (document.body && document.body.getAttribute('data-page') === 'studio') {
  gsap.set('.studio-title', {opacity: 0, y: 30});
  gsap.set('.studio-sub', {opacity: 0, y: 20});
  gsap.timeline()
    .to('.studio-title', {opacity: 1, y: 0, duration: 0.7, ease: 'power3.out'})
    .to('.studio-sub', {opacity: 1, y: 0, duration: 0.6, ease: 'power2.out'}, '<0.1');
} else {
  gsap.from(".page1 h1,.page1 h2", {
    y: 10,
    rotate: 10,
    opacity: 0,
    delay: 0.3,
    duration: 0.7
  })
}
var tl = gsap.timeline({
  scrollTrigger: {
      trigger: ".page1 h1",
      scroller: ".main",
      // markers:true,
      start: "top 27%",
      end: "top 0",
      scrub: 3
  }
})
if (document.body && document.body.getAttribute('data-page') === 'work') {
  tl.to(".page1 img", { scale: 1.05, filter: "contrast(110%) brightness(110%)" }, "anim")
    .to(".work-hero-title", { x: -40 }, "anim")
    .to(".work-hero-sub", { x: 40 }, "anim");
} else if (document.body && document.body.getAttribute('data-page') === 'studio') {
  tl.to('.studio-blob', { scale: 1.05 }, 'anim');
  tl.to('.studio-title', { x: -30 }, 'anim');
  tl.to('.studio-sub', { x: 30 }, 'anim');
} else {
  tl.to(".page1 h1", { x: -100 }, "anim")
    .to(".page1 h2", { x: 100 }, "anim")
    .to(".page1 img", { width: "90%" }, "anim")
}

var tl2 = gsap.timeline({
  scrollTrigger: {
      trigger: ".page1 h1",
      scroller: ".main",
      // markers:true,
      start: "top -115%",
      end: "top -120%",
      scrub: 3
  }
})
tl2.to(".main", {
  backgroundColor: "#fff",
})

var tl3 = gsap.timeline({
  scrollTrigger: {
      trigger: ".page1 h1",
      scroller: ".main",
      // markers:true,
      start: "top -280%",
      end: "top -300%",
      scrub: 3
  }
})

tl3.to(".main",{
  backgroundColor:"#0F0D0D"
})


// Home page footer animations
if (!document.body.getAttribute('data-page')) {
  // Set current year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Split footer title words for subtle stagger
  var ft = document.querySelector('.footer-title');
  if (ft && !ft.dataset.split) {
    ft.innerHTML = ft.textContent.split(' ').map(function(w){ return '<span class="word">'+w+'</span>'; }).join(' ');
    ft.dataset.split = 'true';
  }
  if (ft) {
    gsap.set('.footer-title .word', {opacity: 0, y: 20});
    gsap.to('.footer-title .word', {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08,
      scrollTrigger: { trigger: '.site-footer', scroller: '.main', start: 'top 85%' }
    });
  }

  // CTA button pop
  gsap.from('.footer-cta', {
    opacity: 0, y: 16, duration: 0.5, ease: 'power2.out',
    scrollTrigger: { trigger: '.site-footer', scroller: '.main', start: 'top 80%' }
  });

  // Footer grid columns reveal
  gsap.utils.toArray('.footer-col').forEach(function(col, i){
    gsap.from(col, {
      opacity: 0, y: 16, duration: 0.5, ease: 'power2.out', delay: i * 0.05,
      scrollTrigger: { trigger: col, scroller: '.main', start: 'top 92%' }
    });
  });

  // Parallax blob
  var fb = document.querySelector('.footer-blob');
  if (fb) {
    gsap.to(fb, {
      yPercent: 10, rotation: 10, ease: 'none',
      scrollTrigger: { trigger: '.site-footer', scroller: '.main', start: 'top bottom', end: 'bottom top', scrub: true }
    });
  }
}
var boxes = document.querySelectorAll(".box")
boxes.forEach(function(elem){
  elem.addEventListener("mouseenter",function(){
      var att = elem.getAttribute("data-image")
      crsr.style.width = "470px"
      crsr.style.height = "370px"
      crsr.style.borderRadius = "0"
      crsr.style.backgroundImage = `url(${att})`
  })
  elem.addEventListener("mouseleave",function(){
      elem.style.backgroundColor = "transparent"
      crsr.style.width = "20px"
      crsr.style.height = "20px"
      crsr.style.borderRadius = "50%"
      crsr.style.backgroundImage = `none`
  })
})

// Work page: project card parallax hover
if (document.body && document.body.getAttribute('data-page') === 'work') {
  var cards = document.querySelectorAll('.project-card');
  cards.forEach(function(card){
    card.addEventListener('mousemove', function(e){
      var rect = card.getBoundingClientRect();
      var cx = e.clientX - rect.left;
      var cy = e.clientY - rect.top;
      var rx = ((cy - rect.height/2) / rect.height) * -10;
      var ry = ((cx - rect.width/2) / rect.width) * 10;
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', function(){
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  });
}

// Removed nav hover overlay effect

// =====================
// Additional pages logic
// =====================

// Magnetic hover effect for navbar links (subtle)
(function(){
  var links = document.querySelectorAll('#nav a');
  links.forEach(function(link){
    var bounds;
    function onMove(e){
      bounds = bounds || link.getBoundingClientRect();
      var x = e.clientX - (bounds.left + bounds.width/2);
      var y = e.clientY - (bounds.top + bounds.height/2);
      gsap.to(link, { x: x*0.06, y: y*0.12, rotate: x*0.02, duration: 0.25, ease: 'power3.out' });
    }
    function onLeave(){
      bounds = null;
      gsap.to(link, { x: 0, y: 0, rotate: 0, duration: 0.35, ease: 'power3.out' });
    }
    link.addEventListener('mousemove', onMove);
    link.addEventListener('mouseleave', onLeave);
  });
})();

// Services page hero + reveals + parallax
if (document.body && document.body.getAttribute('data-page') === 'services') {
  var titleServices = document.querySelector('.hero__title');
  if (titleServices && !titleServices.dataset.split) {
    titleServices.innerHTML = titleServices.textContent.split(' ').map(function(w){ return '<span class="word">'+w+'</span>'; }).join(' ');
    titleServices.dataset.split = 'true';
  }
  gsap.set('.hero__title .word', {opacity: 0, y: 40, rotate: 6});
  gsap.set('.hero__sub', {opacity: 0, y: 20});
  gsap.timeline()
    .to('.hero__title .word', {opacity: 1, y: 0, rotate: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out'})
    .to('.hero__sub', {opacity: 1, y: 0, duration: 0.6, ease: 'power2.out'}, '<0.1');

  gsap.utils.toArray('.service-card.reveal').forEach(function(el){
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, scroller: '.main', start: 'top 84%', toggleActions: 'play none none reverse' }
    });
  });

  var bg = document.querySelector('[data-parallax]');
  if (bg) {
    gsap.to(bg, {
      yPercent: 15, ease: 'none',
      scrollTrigger: { trigger: '.parallax-band', scroller: '.main', start: 'top bottom', end: 'bottom top', scrub: true }
    });
  }
}

// Blog page hero + reveals + lazy load + transition
if (document.body && document.body.getAttribute('data-page') === 'blog') {
  var titleBlog = document.querySelector('.hero__title');
  if (titleBlog && !titleBlog.dataset.split) {
    titleBlog.innerHTML = titleBlog.textContent.split(' ').map(function(w){ return '<span class="word">'+w+'</span>'; }).join(' ');
    titleBlog.dataset.split = 'true';
  }
  gsap.set('.hero__title .word', {opacity: 0, y: 40, rotate: 6});
  gsap.set('.hero__sub', {opacity: 0, y: 20});
  gsap.timeline()
    .to('.hero__title .word', {opacity: 1, y: 0, rotate: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out'})
    .to('.hero__sub', {opacity: 1, y: 0, duration: 0.6, ease: 'power2.out'}, '<0.1');

  var lazyDivs = document.querySelectorAll('.post-card .lazy');
  var rootEl = document.querySelector('.main');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function(entries, obs){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          var div = entry.target;
          var src = div.getAttribute('data-src');
          if (src) { div.style.backgroundImage = 'url('+src+')'; div.removeAttribute('data-src'); }
          obs.unobserve(div);
        }
      });
    }, { root: rootEl, rootMargin: '100px' });
    lazyDivs.forEach(function(div){ io.observe(div); });
  } else {
    lazyDivs.forEach(function(div){ var src = div.getAttribute('data-src'); if (src) { div.style.backgroundImage = 'url('+src+')'; } });
  }

  ScrollTrigger.batch('.post-card.reveal', {
    scroller: '.main', start: 'top 88%',
    onEnter: function(batch){ gsap.to(batch, {opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08}); },
    onLeaveBack: function(batch){ gsap.to(batch, {opacity: 0, y: 24, duration: 0.4, ease: 'power1.out'}); }
  });

  document.querySelectorAll('.post-card').forEach(function(link){
    link.addEventListener('click', function(e){
      e.preventDefault();
      var href = link.getAttribute('href');
      gsap.to('.main', {opacity: 0, duration: 0.35, ease: 'power2.inOut', onComplete: function(){ window.location.href = href; }});
    });
  });
}

// Post page: basic content reveal
if (document.body && document.body.getAttribute('data-page') === 'post') {
  var titlePost = document.querySelector('.hero__title');
  if (titlePost && !titlePost.dataset.split) {
    titlePost.innerHTML = titlePost.textContent.split(' ').map(function(w){ return '<span class="word">'+w+'</span>'; }).join(' ');
    titlePost.dataset.split = 'true';
  }
  gsap.set('.hero__title .word', {opacity: 0, y: 40, rotate: 6});
  gsap.set('.hero__sub', {opacity: 0, y: 20});
  gsap.timeline()
    .to('.hero__title .word', {opacity: 1, y: 0, rotate: 0, stagger: 0.08})
    .to('.hero__sub', {opacity: 1, y: 0}, '<0.1');
  gsap.utils.toArray('.post__content .reveal').forEach(function(el){
    gsap.to(el, {opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: {trigger: el, scroller: '.main', start: 'top 90%'}});
  });
}

// About page: hero split + card reveals
if (document.body && document.body.getAttribute('data-page') === 'about') {
  var titleAbout = document.querySelector('.hero__title');
  if (titleAbout && !titleAbout.dataset.split) {
    titleAbout.innerHTML = titleAbout.textContent.split(' ').map(function(w){ return '<span class="word">'+w+'</span>'; }).join(' ');
    titleAbout.dataset.split = 'true';
  }
  gsap.set('.hero__title .word', {opacity: 0, y: 40, rotate: 6});
  gsap.set('.hero__sub', {opacity: 0, y: 20});
  gsap.timeline()
    .to('.hero__title .word', {opacity: 1, y: 0, rotate: 0, stagger: 0.08})
    .to('.hero__sub', {opacity: 1, y: 0}, '<0.1');
  gsap.utils.toArray('.reveal, .glass-card').forEach(function(el){
    gsap.to(el, {opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', scrollTrigger: {trigger: el, scroller: '.main', start: 'top 86%'}});
  });
}

// Contact page: hero split + form validate + shake on invalid
if (document.body && document.body.getAttribute('data-page') === 'contact') {
  var titleContact = document.querySelector('.hero__title');
  if (titleContact && !titleContact.dataset.split) {
    titleContact.innerHTML = titleContact.textContent.split(' ').map(function(w){ return '<span class="word">'+w+'</span>'; }).join(' ');
    titleContact.dataset.split = 'true';
  }
  gsap.set('.hero__title .word', {opacity: 0, y: 40, rotate: 6});
  gsap.set('.hero__sub', {opacity: 0, y: 20});
  gsap.timeline()
    .to('.hero__title .word', {opacity: 1, y: 0, rotate: 0, stagger: 0.08})
    .to('.hero__sub', {opacity: 1, y: 0}, '<0.1');
  var formEl = document.querySelector('form');
  if (formEl) {
    formEl.addEventListener('submit', function(e){
      var required = formEl.querySelectorAll('[required]');
      var invalid = false;
      required.forEach(function(input){
        if (!input.value.trim()) {
          input.classList.add('input--error');
          invalid = true;
          setTimeout(function(){ input.classList.remove('input--error'); }, 1200);
        }
      });
      if (invalid) {
        e.preventDefault();
        gsap.fromTo(formEl, {x: -8}, {x: 0, duration: 0.06, repeat: 3, yoyo: true, ease: 'power1.inOut'});
      }
    });
  }
}