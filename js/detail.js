
document.addEventListener("DOMContentLoaded", (event) => {
    debugger;
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    if(productId){
        getProductDetail(productId); 
    } 
  });
