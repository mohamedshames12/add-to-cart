const wrapper = document.querySelector(".wrapper");
const btnShop = document.querySelector(".shop i");
const lengthDom = document.querySelector(".shop span");
const AllProducts = document.querySelector(".shop .hide");
const subtatol = document.querySelector(".subtatol");

let cart = JSON.parse(localStorage.getItem("carts"));

let added = localStorage.getItem("carts")
  ? JSON.parse(localStorage.getItem("carts"))
  : [];

if (added) {
  added.map((item) => {
    AllProducts.innerHTML += `<p>${item.title}</p>`;
    lengthDom.innerHTML = added.length;
  });
}


function retderCartItems() {
  cart.forEach((product) => {
    wrapper.innerHTML += `
    <div class="box">
    <img src="${product.images[1]}" alt="">
    <h3>${product.title}</h3>

    <p>$${product.price}</p>
    <button onclick="removeToCart(${product.id})">Remove to cart</button>
</div>
      `;
  });
}
retderCartItems()


  function removeToCart(id){
    let items = localStorage.getItem("carts");
    if(items){
      let products = JSON.parse(items)
      let product = products.filter((item) => item.id !== id);
      localStorage.setItem("carts", JSON.stringify(product));
    }
  
  }


let totalPrice = 0,
totalItems = 0;

function subtatolPrice(){ 
  cart.forEach(item => {
    totalPrice += item.price * item.qty;
    totalItems += item.qty; 
  });

  subtatol.innerHTML = `subtatol <h3>items (${totalItems}) $${totalPrice.toFixed(2)}</h3>`;
  
}

subtatolPrice()