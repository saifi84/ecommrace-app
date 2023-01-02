
var apiToken ='';
var apiToken = localStorage.getItem('Token');

// Login Auth Api
function loginAuth(userName,password,callback){
  fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: userName,
      password: password
    })
  })
  .then(response =>  response.json())
  .then((data) => {
    console.log(data);
    callback(data);
    return data;
  });
              
}

// Fetch products Api
   function getAllProduct(pageNumber){

    if(document.getElementById("getAllProduct")) {
      document.getElementById("getAllProduct").innerHTML=('');
    }

    var limit = 12;
    pageNumber = pageNumber - 1;
    var skip = (pageNumber == null || pageNumber == undefined)  ? 0 :  pageNumber * limit;
    var url = 'https://dummyjson.com/products?limit=12'

    if(skip > 0){
      url +="&skip=" + skip;
    }
    fetch(url, {
        headers: {Authentication: apiToken}
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        let result = "";
        data.products.map((item) => {
            
            result += `
            
              <div class="col-sm-6 col-md-3 my-3 row_${ item.id } tasks task-delete " id="task-delete task-edit_${ item.id } ">
              
                <div class="card p-3 rounded">
                <div style="text-align: right;  ">
                <button class="btn" onclick="setRemoval(${item.id})"><i class="fa fa-trash"></i></button>
                <button class="btn"  onclick="setEdit(${item.id})"><i class="fa fa-edit"></i></button>
                </div>
                  <img
                    class="card-img-top mx-auto"
                    src="${item.thumbnail}"
                  />
                  <div class="card-body d-flex flex-column" id="task-edit_${ item.id }">
                    <h5 class="card-title">
                      <a ">${item.title}</a>
                    </h5>
                    <div class="ratings mt-auto">
                      <div class="rating-outer">
                        <div class="rating-inner"></div>
                      </div>
                      <span id="no_of_reviews">(${item.rating})</span>
                    </div>
                    <p class="card-text">RS: ${item.price}</p>
                    <a href="#" id="view_btn" class="btn btn-block" type ="button" onclick ="detailScreen(${item.id})">View Details</a>
                  </div>
                </div>
              </div>

`;
        });
        if(document.getElementById("getAllProduct")) {
          document.getElementById("getAllProduct").insertAdjacentHTML('beforeend',result);
        }
        
    });
    
}

// Fetch detail products Api
function getProductDetail(productId){
    fetch('https://dummyjson.com/products/'+ productId +'', {
        headers: {Authentication: apiToken}
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        result = data;
        result = `
         <div class="container container-fluid">
         <div class="row f-flex justify-content-around">
             <div class="col-12 col-lg-5 img-fluid" id="product_image">
                 <img src="${data.thumbnail}" alt="sdf" height="500" width="500">
             </div>
             <div class="col-12 col-lg-5 mt-5">
                 <h3>${data.title}</h3>
                 <p id="product_id">Product # ${data.id}</p>
                 <hr>
                 <div class="rating-outer">
                     <div class="rating-inner"></div>
                 </div>
                 <span id="no_of_reviews">(${data.rating})</span>
                 <hr>
                 <p id="product_price">Rs: ${data.price}</p>
                 <div class="stockCounter d-inline">
                     <span class="btn btn-danger minus">-</span>
 
                     <input type="number" class="form-control count d-inline" value="1" readOnly />
 
                     <span class="btn btn-primary plus">+</span>
                 </div>
                  <button type="button" id="cart_btn" class="btn btn-primary d-inline ml-4">Add to Cart</button>
                 <hr>
                 <p>Status: <span id="stock_status">In Stock</span></p>
                 <hr>
                 <h4 class="mt-2">Description:</h4>
                 <p>${data.description}</p>
                 <hr>
                 <p id="product_seller mb-3">Sold by: <strong>Amazon</strong></p>
                 
                 <button id="review_btn" type="button" class="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                             Submit Your Review
                 </button>
                 
                 <div class="row mt-2 mb-5">
                     <div class="rating w-50">
 
                         <div class="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                             <div class="modal-dialog" role="document">
                                 <div class="modal-content">
                                     <div class="modal-header">
                                         <h5 class="modal-title" id="ratingModalLabel">Submit Review</h5>
                                         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                             <span aria-hidden="true">&times;</span>
                                         </button>
                                     </div>
                                     <div class="modal-body">
 
                                         <ul class="stars" >
                                             <li class="star"><i class="fa fa-star"></i></li>
                                             <li class="star"><i class="fa fa-star"></i></li>
                                             <li class="star"><i class="fa fa-star"></i></li>
                                             <li class="star"><i class="fa fa-star"></i></li>
                                             <li class="star"><i class="fa fa-star"></i></li>
                                         </ul>
 
                                         <textarea name="review" id="review" class="form-control mt-3">
 
                                         </textarea>
 
                                         <button class="btn my-3 float-right review-btn px-4 text-white"} data-dismiss="modal" aria-label="Close">Submit</button>
                                     </div>
                                 </div>
                             </div>
                         </div>
 
                     </div>
                     </div>
 
                     </div>
                         
             </div>
 
         </div>

`;
        document.getElementById("getProductDetail").insertAdjacentHTML('beforeend',result) ;
    }).catch((error) => console.error("FETCH ERROR:", error));
    
}

// Fetch all Categories Api
function getAllCategories(){
  fetch('https://dummyjson.com/products/categories', {
      headers: {Authentication: apiToken}
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let result = "";
      data.map((item) => {      
          result += `
            <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile" onclick="getSerachCategories('${item}')">${item}</a>


`;
      });
      document.getElementById("getAllCategories").insertAdjacentHTML('beforeend',result);
  });
  
}


//  Search by categoiess Api
function getSerachCategories(categoriesId){

  document.getElementById("getAllProduct").innerHTML=('');
  document.getElementById("getSerachCategories").innerHTML=('');
  document.getElementById("searchField").innerHTML=('');

  fetch('https://dummyjson.com/products/category/'+categoriesId+'', {
      headers: {Authentication: apiToken}
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      let result = "";
      data.products.map((item) => {
          
          result += `
          <div class="col-sm-12 col-md-6 col-lg-3 my-3">
          <div class="card p-3 rounded">
            <img
              class="card-img-top mx-auto"
              src="${item.thumbnail}"
            />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">
                <a href="">${item.title}</a>
              </h5>
              <div class="ratings mt-auto">
                <div class="rating-outer">
                  <div class="rating-inner"></div>
                </div>
                <span id="no_of_reviews">(${item.rating})</span>
              </div>
              <p class="card-text">${item.price}</p>
              <a href="#" id="view_btn" class="btn btn-block" type ="button" onclick ="detailScreen(${item.id})">View Details</a>
            </div>
          </div>
        </div>



`;
      });
      document.getElementById("getSerachCategories").insertAdjacentHTML('beforeend',result);
  });
  
}

// Search by search bar Api
function searchField(x) {
    var x = document.getElementById("search_field").value;
    
    document.getElementById("getAllProduct").innerHTML=('');
    document.getElementById("getSerachCategories").innerHTML=('');
    document.getElementById("searchField").innerHTML=('');

    fetch('https://dummyjson.com/products/search?q='+x+'', {
      headers: {Authentication: apiToken}
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      let result = "";
      data.products.map((item) => {
          
          result += `
          

          <div class="col-sm-12 col-md-6 col-lg-3 my-3">
          <div class="card p-3 rounded">
            <img
              class="card-img-top mx-auto"
              src="${item.thumbnail}"
            />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">
                <a href="">${item.title}</a>
              </h5>
              <div class="ratings mt-auto">
                <div class="rating-outer">
                  <div class="rating-inner"></div>
                </div>
                <span id="no_of_reviews">(${item.rating})</span>
              </div>
              <p class="card-text">${item.price}</p>
              <a href="#" id="view_btn" class="btn btn-block" type ="button" onclick ="detailScreen(${item.id})">View Details</a>
            </div>
          </div>
        </div>



`;
      });
      if(document.getElementById("searchField"))
      {
        document.getElementById("searchField").insertAdjacentHTML('beforeend',result);
      }
      
  });

}

// Add New Product Api
function addNew(productTitle){

  fetch('https://dummyjson.com/products/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: productTitle,

  })
})
.then(res => res.json())
.then(console.log);
then((data) => {
  console.log(data);
  localStorage.setItem("newItem")
});
            
}
