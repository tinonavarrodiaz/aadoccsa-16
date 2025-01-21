'use strict';
((d, w) => {
  if (window.location.pathname === '/extraccion.html') {
    // console.log(window.location)
    const menu = d.getElementById('menu');
    const link = menu.querySelector('li:nth-child(5) a');
    link.classList.add('selected');
  }
})(document, window);

(function () {
  sliderSatar();
  // setTimeout(function () {
  // },1);
  function sliderSatar() {
    $('#slider').nivoSlider({
      effect: 'fold',
      controlNav: true,
      pauseTime: 5000,
      pauseOnHover: false,
    });
  }

  // variables globales
  var menu = $('#menu'),
    iconresp = $('#nav'),
    year = $('#year'),
    numte = $('.telefono'),
    ancho = $(window).width();

  if (ancho > 768) {
    numte.removeAttr('href');
  }
  // console.log(numte+"/"+ancho);

  //llamada a funciones
  //aside();
  tabs();

  // obtener año
  year.html('&copy ' + new Date().getFullYear() + ' ');

  //// variables de funciones
  var menuslide = function () {
    menu.slideToggle();
  };

  ////eventos
  iconresp.on('click', menuslide);
})();

function tabs() {
  var linksParent = $('.tabs__links');
  var links = linksParent.find('a');
  var items = $('.tabs__contents__item');
  links.eq(0).add(items.eq(0)).addClass('active');
  linksParent.on('click', 'a', function () {
    var t = $(this);
    var i = t.index();
    t.add(items.eq(i)).addClass('active').siblings().removeClass('active');
  });
}
// (function aside(){

//     var $contacto = $('#contacto')

//         $aside = $('#aside');
//     if (contacto){
//         var rs = $('.redes-container');
//         $aside.hide();
//         rs.removeClass('web-40')
//     }
// })();
//(function telef(){
//    var numerost = $('.telefono'),
//        ancho = $(window).width();
//    numerost.on('click',a, function(e){
//        console.log(numerost);
//    });
//})();

if ($('#one')) {
  (function () {
    var one = $('#one'),
      two = $('#two'),
      products = $('.imagenes-prod'),
      hide = $('.hide');
    one.on('click', function () {
      // alert('hola')
      var t = $(this);
      t.hide();
      products.show();
    });
    two.on('click', function () {
      // alert('hola')
      var t = $(this);
      t.hide();
      hide.show();
    });
  })();
}

(function () {
  const toggleMenu = $('#toggle-menu');
  const menu = $('#menu');
  toggleMenu.click(function () {
    menu.slideToggle();
  });
})();

((d) => {
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
  console.log(linkPhone);
})(document);
