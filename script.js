const wrapper = document.querySelector(".wrapper");
let products = [];

// for API compatibility
const loadProducts = async () => {
  try {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    products = await data.products;
    dispalyProducts(products);
  } catch (err) {
    console.log(err);
  }
};
// get all products from the API
const dispalyProducts = (products) => {
  const htmlString = products.map((product) => {
    return `
        <div class="box">
            <img src="${product.images[1]}" alt="">
            <h3>${product.title}</h3>
          
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">add to cart</button>
       </div>
        `;
  });
  wrapper.innerHTML = htmlString.join("");
  localStorage.setItem("products", JSON.stringify(products));
};
loadProducts();

const btnShop = document.querySelector(".shop i");
const lengthDom = document.querySelector(".shop span");
const AllProducts = document.querySelector(".shop .hide");

btnShop.addEventListener("click", (eo) => {
    window.location = "cart.html";
});


let added = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

if (added) {
  added.map((item) => {
    AllProducts.innerHTML += `<p>${item.title}</p>`;
    lengthDom.innerHTML = added.length;
  });

}


let cart = [];



function addToCart(id) {
  if (cart.some((item) => item.id === id)) {
    alert("the product in cart");
  } else {
    let ckliedItem = products.find((item) => item.id === id);
    added = [...added, ckliedItem];
    AllProducts.innerHTML += `<p>${ckliedItem.title}</p>`;
    const productsLength = document.querySelectorAll(".shop .hide p");
    lengthDom.innerHTML = productsLength.length;
    cart.push({
      ...ckliedItem,
      qty: 1,
    });
    localStorage.setItem("carts", JSON.stringify(cart))
  }
}

