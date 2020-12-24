const getProducts = async () => {
  try {
    const results = await fetch("./../data/products.json");
    const data = await results.json();
    const products = data.products;
    return products;
  } catch (err) {
    console.log(err);
  }
};

/*
=============
Load Category Products
=============
 */


window.addEventListener("DOMContentLoaded", async () => {
  const products = await getProducts();
  console.log(products);
  displayProductItems(products);
});



const categoryCenter = document.querySelector(".category__center");
const displayProductItems = (items) => {
  let displayProduct = items.map(product =>
    ` 
    <div class="product">
    <div class="product__header">
      <img src=${product.image} alt="product">
    </div>
    <div class="product__footer">
      <h3>${product.title}</h3>
      <div class="rating">
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="far fa-star"></i>
      </div>
      <div class="product__price">
        <h4>${product.price}</h4>
      </div>
      <a href="#"><button type="submit" class="product__btn">Add To Cart</button></a>
    </div>
    <ul>
      <li>
        <a data-tip="Quick View" data-place="left" href="#">
          <i class="fas fa-eye"></i>
        </a>
      </li>
      <li>
        <a data-tip="Add To Wishlist" data-place="left" href="#">
          <i class="fas fa-heart"></i>
        </a>
      </li>
      <li>
        <a data-tip="Add To Compare" data-place="left" href="#">
          <i class="fas fa-undo"></i>
        </a>
      </li>
    </ul>
  </div>
                  `
  );

  displayProduct = displayProduct.join("");
  // có tồn tại cái class này
  if (categoryCenter) {
    categoryCenter.innerHTML = displayProduct;
  }
};

/*
=============
Filtering
=============
 */

const filterBtn = document.querySelectorAll(".filter-btn");
const categoryContainer = document.getElementById("category");
// nếu tồn tại cái class này
if (categoryContainer) {
  categoryContainer.addEventListener("click", async e => {
    const target = e.target.closest(".section__title");
    if (!target) return;
    // lấy dc data-id khi click vào
    const id = target.dataset.id;
    // chứa array của all product
    const products = await getProducts();
    // nếu user click vào và đã lấy dc data-id
    if (id) {
      // hiển thị hiệu ứng người dùng đang chọn cái nào thôi
      // hay nói cách khác là trạng thái btn lọc
      Array.from(filterBtn).forEach(btn => {
        btn.classList.remove("active");
      });
      target.classList.add("active");

      // Load Products
      let menuCategory = products.filter(product => {
        if (product.category === id) {
          return product;
        }
      });
      // thêm điều kiện id = all product vì trong product k có loại all product
      if (id === "All Products") {
        displayProductItems(products);
      } else {
        displayProductItems(menuCategory);
      }
    }
  });
}

/*
=============
Product Details Left
=============
 */
const pic1 = document.getElementById("pic1");
const pic2 = document.getElementById("pic2");
const pic3 = document.getElementById("pic3");
const pic4 = document.getElementById("pic4");
const pic5 = document.getElementById("pic5");
const picContainer = document.querySelector(".product__pictures");
const zoom = document.getElementById("zoom");
const pic = document.getElementById("pic");

// Picture List
const picList = [pic1, pic2, pic3, pic4, pic5];

// Active Picture
let picActive = 1;
// khi người dùng rê chuột vào
["mouseover", "touchstart"].forEach(event => {
  // 1 trong 5 ảnh
  if (picContainer) {
    picContainer.addEventListener(event, e => {
      const target = e.target.closest("img");
      if (!target) return;
      // slice(3) là lấy từ vị trí 3 của id trở đi
      const id = target.id.slice(3);
      console.log(id);
      changeImage(`./images/products/iPhone/iphone${id}.jpeg`, id);
    });
  }
});

// change active image
const changeImage = (imgSrc, n) => {
  // thay đổi đường dẫn của ảnh lớn
  pic.src = imgSrc;
  // change the background-image
  zoom.style.backgroundImage = `url(${imgSrc})`;
  //   remove the border from the previous active side image
  picList[picActive - 1].classList.remove("img-active");
  // add to the active image
  picList[n - 1].classList.add("img-active");
  //   update the active side picture
  picActive = n;
};

/*
=============
Product Details Bottom
=============
 */

const btns = document.querySelectorAll(".detail-btn");
const detail = document.querySelector(".product-detail__bottom");
const contents = document.querySelectorAll(".content");

if (detail) {
  detail.addEventListener("click", e => {
    const target = e.target.closest(".detail-btn");
    if (!target) return;

    const id = target.dataset.id;
    if (id) {
      // trạng thái 3 nút lọc
      Array.from(btns).forEach(btn => {
        // remove active from all btn
        btn.classList.remove("active");
        e.target.closest(".detail-btn").classList.add("active");
      });
      // lần đầu tiên active nội dung (là hiện nội dung lên) 1 thằng đầu tiên (trước đó đã ẩn hết)
      // sau đó xóa hết all active trong contents đi
      // sao khi user click vào btn lọc sẽ tìm dc 1 id
      // tiến hành quét toàn bộ detail để tìm id này
      // thêm .active vào id này
      Array.from(contents).forEach(content => {
        content.classList.remove("active");
      });
      const element = document.getElementById(id);
      element.classList.add("active");
    }
  });
}
