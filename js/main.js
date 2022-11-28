let _data = [];
const _productList = document.querySelector('.product__list');
const _productSelect = document.querySelector('.product__select');
let _cartData = [];
const _cartList = document.querySelector('.cart__table__tbody');
const _cartTable = document.querySelector('.cart__table');
const _deleteAllBtn = document.querySelector('.deleteAllBtn');
const _addOrderBtn = document.querySelector('.order__form__btn');

function init() {
  getProductData();
  getCartData();
}
init();

// 取得商品清單
function getProductData() {
  axios
    .get(
      `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/products`
    )
    .then(function (response) {
      _data = response.data.products;
      createProductList();
    })
    .catch(function (error) {
      alert('遠端資料異常');
      _productList.innerHTML = '查無資料';
    });
}

function createProductList() {
  let str = '';
  _data.forEach(function (item) {
    str += createProductCard(item);
  });
  _productList.innerHTML = str;
}

function createProductCard(item) {
  let content = `<li class="productCard">
          <h5>新品</h5>
          <div class="description">
            <img src="${item.images}" />
            <p>${item.description}</p>
          </div>
          <button data-id="${item.id}" class="js-addCart">加入購物車</button>
          <h4>${item.title}</h4>
          <del>NT$${item.origin_price}</del>
          <p><span>NT$ </span>${item.price}</p>
        </li>`;
  return content;
}

// 取得購物車清單
function getCartData() {
  axios
    .get(
      `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`
    )
    .then(function (response) {
      _cartData = response.data.carts;
      document.querySelector('.js-total').innerHTML = `<span>NT$</span>${response.data.finalTotal}`;
      if (_cartData.length < 1) {
        _cartList.innerHTML =
          '<tr><td align="center" colspan="5">購物車無商品，趕緊挑個喜歡的！</td></tr>';
        return;
      }
      createCartList();
    })
    .catch(function (error) {
      alert('購物車資料異常');
      _cartList.innerHTML =
        '<tr><td align="center" colspan="5">Sorry!! 購物車資料異常</td></tr>';
    });
}

function createCartList() {
  let str = '';
  _cartData.forEach(function (item) {
    str += createCartCard(item);
  });
  _cartList.innerHTML = str;
}

function createCartCard(item) {
  let content = `<tr>
            <td>
              <div class="cartItem">
                <img src="${item.product.images}" />
                <p>${item.product.title}</p>
              </div>
            </td>
            <td><span>NT$ </span>${item.product.price}</td>
            <td>${item.quantity}</td>
            <td><span>NT$ </span>${item.product.price * item.quantity}</td>
            <td class="deleteBtn">
              <a href="#" class="material-icons"
                data-id="${item.id}"
                data-title="${item.product.title}"> clear </a>
            </td>
          </tr>
          `;
  return content;
}

// 選擇商品類型
_productSelect.addEventListener('change', function () {
  const category = _productSelect.value;
  let str = '';
  let newData = [];
  if (category === '全部') {
    newData = _data;
  } else {
    newData = _data.filter(function (item) {
      return item.category === category;
    });
  }
  newData.forEach(function (item) {
    str += createProductCard(item);
  });
  _productList.innerHTML = str;
});

// 加入購物車
_productList.addEventListener('click', function (e) {
  let addCartClass = e.target.getAttribute('class');
  if (addCartClass !== 'js-addCart') {
    return;
  }
  let productId = e.target.getAttribute('data-id');

  let numCheck = 1;
  _cartData.forEach(function (item) {
    if (item.product.id === productId) {
      numCheck = item.quantity += 1;
    }
  });

  axios
    .post(
      `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`,
      {
        data: {
          productId: productId,
          quantity: numCheck,
        },
      }
    )
    .then(function (response) {
      alert('加入購物車');
      getCartData();
    })
    .catch(function (error) {
      alert('加入購物車失敗');
    });
});

// 刪除單筆商品
_cartList.addEventListener('click', function (e) {
  e.preventDefault();
  const cartId = e.target.getAttribute('data-Id');
  const cartTitle = e.target.getAttribute('data-title');
  if (cartId == null) {
    return;
  }
  axios
    .delete(
      `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts/${cartId}`
    )
    .then(function (response) {
      alert(`刪除 「${cartTitle}」 成功`);
      getCartData();
    });
});

// 刪除全部商品
_deleteAllBtn.addEventListener('click', function (e) {
  e.preventDefault();
  axios
    .delete(
      `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`
    )
    .then(function (response) {
      alert('已清空購物車');
      getCartData();
    })
    .catch(function (error) {
      alert(error.response.data.message);
    });
});

// 新增訂單
function addNewOrder(e) {
  e.preventDefault();
  const customerName = document.querySelector('#customerName').value;
  const customerPhone = document.querySelector('#customerPhone').value;
  const customerEmail = document.querySelector('#customerEmail').value;
  const customerAddress = document.querySelector('#customerAddress').value;
  const tradeWay = document.querySelector('#tradeWay').value;

  let message = '';
  if (customerName === '') {
    message += '請填寫姓名 \n';
  }
  if (customerPhone === '') {
    message += '請填寫電話 \n';
  }
  if (customerEmail === '') {
    message += '請填寫信箱 \n';
  }
  if (customerAddress === '') {
    message += '請填寫地址 \n';
  }
  if (tradeWay === '') {
    message += '請選擇交易方式';
  }
  if (message !== '') {
    alert(message);
    return;
  }
  document.querySelector('.order__form').reset();

  axios
    .post(
      `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/orders`,
      {
        data: {
          user: {
            name: customerName,
            tel: customerPhone,
            email: customerEmail,
            address: customerAddress,
            payment: tradeWay,
          },
        },
      }
    )
    .then(function (response) {
      alert('送出訂單成功');
      getCartData();
    })
    .catch(function (error) {
      alert('購物車無商品');
    });
}
_addOrderBtn.addEventListener('click', addNewOrder);

// 回到上面
$(function () {
  $('#toTop').click(function () {
    $('html,body').animate({ scrollTop: 0 }, 1000);
    return false;
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $('#toTop').fadeIn();
    } else {
      $('#toTop').fadeOut();
    }
  });
});

// 原JS
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
