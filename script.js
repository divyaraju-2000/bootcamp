var products;
var eve = {
  target: {
    value: 1,
  },
};
let productWithIndex = [];
let container = document.getElementById("content");
const createElement = async (
  name,
  price,
  image_link,
  brand,
  description,
  productLink,
  index
) => {
  //Product card
  let card = document.createElement("div");
  card.className = "card";
  card.id = `card-${index}`;
  console.log(container, "contanier");
  container.appendChild(card);
  //image
  let imageElement = document.createElement("img");
  imageElement.id = `pro_img-${index}`;
  imageElement.style.width = "100";
  imageElement.style.height = "100";
  imageElement.alt = "Not Found";
  card.appendChild(imageElement);
  imageElement.style = "color:blue";
  imageElement.src = image_link;
  //brand
  let brandEle = document.createElement("p");
  brandEle.id = `pro_brand-${index}`;
  card.appendChild(brandEle);
  brandEle.style = "font-weight:600;color:gray;text-align:start";
  brandEle.innerHTML = brand;
  //product name
  let nameEle = document.createElement("p");
  nameEle.className = "product_name";
  card.appendChild(nameEle);
  nameEle.id = `pro_name-${index}`;
  nameEle.style = "font-size:20px";
  nameEle.style.textAlign = "start";
  nameEle.innerHTML = name;
  //Product price
  let priceEle = document.createElement("p");
  priceEle.id = `pro_price-${index}`;
  card.appendChild(priceEle);
  priceEle.style = "color:blue;text-align:start";
  priceEle.innerHTML = "₹" + price;

  //desc
  let descriptionEle = document.createElement("p");
  descriptionEle.id = `pro_desc-${index}`;
  card.appendChild(descriptionEle);
  descriptionEle.style = "color:gray;text-align:start";
  descriptionEle.innerHTML = description;
  //Product_link
  let prolinkEle = document.createElement("a");
  prolinkEle.id = `pro_link-${index}`;
  card.appendChild(prolinkEle);

  prolinkEle.href = productLink;
  prolinkEle.innerHTML = "Click here";
  prolinkEle.style = "color:#222;text-align:start;";
};

const removeElements = (index) => {
  var card = document.getElementById(`card-${index}`);
  var pro_name = document.getElementById(`pro_name-${index}`);
  var pro_price = document.getElementById(`pro_price-${index}`);
  var pro_img = document.getElementById(`pro_img-${index}`);
  var pro_brand = document.getElementById(`pro_brand-${index}`);
  var pro_desc = document.getElementById(`pro_desc-${index}`);
  var pro_link = document.getElementById(`pro_link-${index}`);

  // var pro_brand = document.getElementById(`pro_brand-${index}`);
  card.removeChild(pro_name);
  card.removeChild(pro_price);
  card.removeChild(pro_img);
  card.removeChild(pro_brand);
  card.removeChild(pro_desc);
  card.removeChild(pro_link);
  container.removeChild(card);

  // card.removeChild(pro_brand);
};

const getdata = async () => {
  const response = await fetch("http://makeup-api.herokuapp.com/api/v1/products.json");
  const data = await response.json();
  console.log("data", data);
  products = data;
  createPaginationBtn();
  PaginationBtnClick(eve);
  // createPageData();
  // createPageEle();
};
getdata();

var currentPage = 1;
var nextPage = 1;

const PaginationBtnClick = (event) => {
  const previousEle = document.getElementById("active");
  if (previousEle) {
    previousEle.className = "";
    previousEle.id = "";
  }
  const btn = document.getElementById(`btn-${event.target.value}`);
  btn.className = "active";
  btn.id = "active";
  const array = [];
  array.length = 10;

  if (event.target.value != 1)
    for (var i = 0; 9 >= i; i++) {
      removeElements(i);
      console.log(i);
    }

  //creating next page Elelemts
  nextPage = event.target.value * 10;
  var page = products.slice(nextPage - 10, nextPage);
  page.forEach((productDetails, index) => {
    console.log(index);
    const { name, price, image_link, brand, description, product_link } =
      productDetails;
    createElement(
      name,
      price,
      image_link,
      brand,
      description,
      product_link,
      index
    );
  });
};

const createPaginationBtn = () => {
  // getting total page cal...
  const PER_PAGE_COUNT = 25;
  const totalPages = products.length / PER_PAGE_COUNT;
  var paginationEle = document.getElementById("pagination");
  for (var index = 1; totalPages > index; index++) {
    const btn = document.createElement(`button`);
    paginationEle.appendChild(btn);
    btn.onclick = PaginationBtnClick;
    btn.id = `btn-${index}`;
    btn.value = index;
    btn.innerHTML = index;
    if(index>5){
      break;
    }
  }
};

