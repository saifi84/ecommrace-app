
// Check user is login or not
let UserName=localStorage.getItem('UserName')?localStorage.getItem('UserName'):''
  console.log(UserName);
  if(UserName=='')
  {
    alert('login first');
    window.location.href="login.html";
  }

    // For Add New products
  function addNewProduct(){
    const product_name = document.getElementById('name').value;
    const product_price = document.getElementById('price').value;
    const product_description = document.getElementById('description').value;
    const product_rating = document.getElementById('rating').value;
    
    let data=new Array();
        data=JSON.parse(localStorage.getItem("products"))?JSON.parse(localStorage.getItem("products")):[]
        if(data)
        {
          data.push({
          "name":product_name,
          "price":product_price,
          "description":product_description,
          "rating": product_rating
          
        })
        alert("Add Product Successfully ✅");
        localStorage.setItem("products",JSON.stringify(data));
        window.location.href="home.html"
        }
}

// Show Added New products

let products = localStorage.getItem("products");
const data= JSON.parse(products);
let result ='';

data.map(item => {
  
  result +=`
  <div class="col-sm-12 col-md-6 col-lg-3 my-3">
  <div class="card p-3 rounded">
    <img
      class="card-img-top mx-auto"
      src=""
    />
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">
        <a href="">${item.name}</a>
      </h5>
      <div class="ratings mt-auto">
        <div class="rating-outer">
          <div class="rating-inner"></div>
        </div>
        <span id="no_of_reviews">(${item.rating})</span>
      </div>
      <p class="card-text">${item.price}</p>
      <a href="#" id="view_btn" class="btn btn-block" type ="button" >View Details</a>
    </div>
  </div>
</div>
  `
});
document.getElementById("add-products").innerHTML= result;