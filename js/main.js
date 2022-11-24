// toTop
$(function () {
  // toTop
  $('#toTop').click(function () {
    $('html,body').animate({ scrollTop: 0 }, 1000);
    return false;
  });

  // toTop按鈕淡入淡出
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $('#toTop').fadeIn();
    } else {
      $('#toTop').fadeOut();
    }
  });
});

// document.addEventListener('DOMContentLoaded', function () {
//   const ele = document.querySelector('.recommendation-wall');
//   ele.style.cursor = 'grab';
//   let pos = {
//     top: 0,
//     left: 0,
//     x: 0,
//     y: 0,
//   };
//   const mouseDownHandler = function (e) {
//     ele.style.cursor = 'grabbing';
//     ele.style.userSelect = 'none';
//     pos = {
//       left: ele.scrollLeft,
//       top: ele.scrollTop,
//       // Get the current mouse position
//       x: e.clientX,
//       y: e.clientY,
//     };
//     document.addEventListener('mousemove', mouseMoveHandler);
//     document.addEventListener('mouseup', mouseUpHandler);
//   };
//   const mouseMoveHandler = function (e) {
//     // How far the mouse has been moved
//     const dx = e.clientX - pos.x;
//     const dy = e.clientY - pos.y;
//     // Scroll the element
//     ele.scrollTop = pos.top - dy;
//     ele.scrollLeft = pos.left - dx;
//   };
//   const mouseUpHandler = function () {
//     ele.style.cursor = 'grab';
//     ele.style.removeProperty('user-select');
//     document.removeEventListener('mousemove', mouseMoveHandler);
//     document.removeEventListener('mouseup', mouseUpHandler);
//   };
//   // Attach the handler
//   ele.addEventListener('mousedown', mouseDownHandler);
// });


// menu 切換
let menuOpenBtn = document.querySelector('.menuToggle');
let linkBtn = document.querySelectorAll('.nav__menu a');
let menu = document.querySelector('.nav__menu');
menuOpenBtn.addEventListener('click', menuToggle);
linkBtn.forEach((item) => {
  item.addEventListener('click', closeMenu);
});

function menuToggle() {
  if (menu.classList.contains('openMenu')) {
    menu.classList.remove('openMenu');
  } else {
    menu.classList.add('openMenu');
  }
}

function closeMenu() {
  menu.classList.remove('openMenu');
}

function getProductData() {
  axios
    .get(
      `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/products`
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getProductData();
