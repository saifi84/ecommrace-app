
// Page Load Event
document.addEventListener("DOMContentLoaded", (event) => {
  getAllProduct();
  getAllCategories();
});

// Check user is login or not

let name=localStorage.getItem('UserName')?localStorage.getItem('UserName'):''
  console.log(name);
  if(name=='')
  {
    alert('login first');
    window.location.href="login.html";
  }

  // Detail Page
function detailScreen(productId){    
    window.location ='detail.html?productId='+productId;
}

// Add New products page

function newProductScreen(){    
    window.location ='addproduct.html';
}

// For logout user
function logout()
{
  localStorage.clear();
  window.location.href="login.html";
}

// For Remove products
function setRemoval(id) {
  var element = document.querySelector(".row_" + id) 
  element.remove(id);
}

// For Edit products
function setEdit(id) {
 if( document.getElementById("task-edit_"+id)){
  document.getElementById("task-edit_"+id).contentEditable = true;
 }

}
