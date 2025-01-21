
  const classBody = d.body;
  let city = '';
  if (classBody.classList.contains('page-gdl')) {
    city = [...d.querySelectorAll('.gdl')];
  } else if (classBody.classList.contains('page-leon')) {
    city = [...d.querySelectorAll('.leon')];
  } else if (classBody.classList.contains('page-qrt')) {
    city = [...d.querySelectorAll('.qrt')];
  }
  city.map((el) => {
    el.classList.add('show');
  });
})(document);

((d) => {
  const linkPhone = [...d.querySelectorAll('a[href*="tel"]')];
  // console.log(linkPhone)
  linkPhone.map((el) => {
    el.removeAttribute('href');
    el.addEventListener('click', (e) => {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        e.preventDefault();
      }
    });
  });
})(document);
