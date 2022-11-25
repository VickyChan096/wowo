// 原作者JS start ---->
const _menuOpenBtn = document.querySelector('.menuToggle');
const _linkBtn = document.querySelectorAll('.nav__menu a');
const _menu = document.querySelector('.nav__menu');

// 推薦牆滑鼠點擊拖移
document.addEventListener('DOMContentLoaded', function () {
  const element = document.querySelector('.recommendation__wall');
  element.style.cursor = 'grab';
  let position = {
    top: 0,
    left: 0,
    x: 0,
    y: 0,
  };
  const mouseDownHandler = function (e) {
    element.style.cursor = 'grabbing';
    element.style.userSelect = 'none';
    position = {
      left: element.scrollLeft,
      top: element.scrollTop,
      // Get the current mouse position
      x: e.clientX,
      y: e.clientY,
    };
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };
  const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    const dx = e.clientX - position.x;
    const dy = e.clientY - position.y;
    // Scroll the element
    element.scrollTop = position.top - dy;
    element.scrollLeft = position.left - dx;
  };
  const mouseUpHandler = function () {
    element.style.cursor = 'grab';
    element.style.removeProperty('user-select');
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };
  // Attach the handler
  element.addEventListener('mousedown', mouseDownHandler);
});

// 漢堡圖toggle
function menuToggle() {
  if (_menu.classList.contains('openMenu')) {
    _menu.classList.remove('openMenu');
  } else {
    _menu.classList.add('openMenu');
  }
}
_menuOpenBtn.addEventListener('click', menuToggle);

// 點擊menu的選項後關閉menu
_linkBtn.forEach((item) => {
  item.addEventListener('click', closeMenu);
});
function closeMenu() {
  _menu.classList.remove('openMenu');
}
// 原作者JS end <----

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