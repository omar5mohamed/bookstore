// select data form inputs
let Title = document.getElementById("bookTitle");
let author = document.getElementById("bookAuthor");
let price = document.getElementById("bookPrice");
let image = document.getElementById("bookImage");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit")
let final = document.getElementById("final")

// get total
function getTotal()
{
    if (price.value != ""){
        let finalprice = ( price.value - discount.value);
        final.innerHTML = finalprice;
        console.log(finalprice)
        return finalprice;
    }
}

// save in local storage
let databook ;
if (localStorage.product != null){
    databook =JSON.parse(localStorage.product)
}else{
    databook = [];
}

// create cart base in localstorage
let cartdata ;
if (localStorage.cart != null){
    cartdata =JSON.parse(localStorage.cart)
}else{
    cartdata = [];
}

// create book
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.href.includes('admin')) {
        console.log('This is the store admin');
        submit.onclick = function( ){
            let finalprices = getTotal();
        
            let newbook = {
                Title:Title.value,
                author:author.value,
                price:price.value,
                image:image.value,
                discount:discount.value,
                count:count.value,
                category:category.value,
                final:finalprices,
        
            }
            databook.push(newbook);
            localStorage.setItem('product', JSON.stringify(databook));
            console.log(databook);
            cleardata();
            showdata()
        }

    } else if (window.location.href.includes('store')){
        console.log('This is the store page');
        showstoredata();

    }
});

// clear after submit
function cleardata(){
    Title.value = '';
    price.value = '';
    author.value = '';
    image.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    final.innerHTML = '';
    
}

// read data


function showdata()
{
    let table = "" ;
    for (let i = 0; i <databook.length;i++){
        table +=`
         <tr>
                <td>${i}</td>
                <td>${databook[i].Title}</td>
                <td>${databook[i].author}</td>
                <td>${databook[i].price}$</td>
                <td>${databook[i].discount}$</td>
                <td>${databook[i].final}$</td>
                <td><a href="${databook[i].image}" target="_blank">book photo</a></td>
                <td>
                <button onclick="deletedata(${i})" class="btn btn-action red">Delete</button>
                </td>
                </tr>
                `
                //<button class="btn btn-action indigo accent-3">Edit</button>
    }
    document.getElementById("tbody").innerHTML= table;
}




//show store data

function showstoredata()
{
    let store = "" ;
    for (let i = 0; i <databook.length;i++){
        if ( (databook[i].final) == (databook[i].price))
        {
        store +=`
            <div class="col s12 m6 l4">
                <div class="book-card">
                    <img src="${databook[i].image}" alt="Book 1">
                    <h5>${databook[i].Title}</h5>
                    <p>Author: ${databook[i].author}</p>
                    <br>
                    <p>Price: <b style="color: green;">${databook[i].price}$</b></p>
                    <button onclick="addcart(${i})" class="btn indigo accent-3">Add to Cart</button>
                </div>
                </div>
        `
        }
        else{
            store +=`
            <div class="col s12 m6 l4">
                <div class="book-card">
                    <img src="${databook[i].image}" alt="Book 1">
                    <h5>${databook[i].Title}</h5>
                    <p>Author: ${databook[i].author}</p>
                    <p>Price: <del style="color: red;">${databook[i].price}$</del></p>
                    <p>Price after discount: <b style="color: green;">${databook[i].final}</b></p>
                    <button onclick="addcart(${i})" class="btn indigo accent-3">Add to Cart</button>
                </div>
                </div>
        `
        }
    }
    document.getElementById("storebooks").innerHTML= store;     
}

// call store data
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.href.includes('admin')) {
        console.log('This is the store admin');
        showdata();

    } else if (window.location.href.includes('store')){
        console.log('This is the store page');
        showstoredata();

    }
});

// delete
function deletedata(i){
    console.log("delete");
    databook.splice(i,1);
    localStorage.product = JSON.stringify(databook);
    showdata();

}


//create cart object
function addcart(i)
{

    let newcart = {
        Titlecart:databook[i].Title,
        authorcart:databook[i].author,
        pricecart:databook[i].price,
        imagecart:databook[i].image,
        discountcart:databook[i].discount,
        // countcart:databook[i].count,
        finalcart:databook[i].final,
    }
    cartdata.push(newcart);
    localStorage.setItem('cart', JSON.stringify(cartdata));
    console.log(cartdata);
}


function showcartdata() {
    let cartrows = "";
    for (let i = 0; i < cartdata.length; i++) {
        cartrows += `
            <tr>
                <td>${cartdata[i].Titlecart}</td>
                <td>${cartdata[i].authorcart}</td>
                <td>${cartdata[i].finalcart}</td>
                <td>
                    <a onclick="removeFromCart(${i})" class="btn btn-action red">remove</a>
                </td>
            </tr>
        `;
    }
    document.getElementById("tcart").innerHTML = cartrows;
}
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.href.includes('cart')) {
        console.log('This is the store cart');
        // console.log(cartdata)
        showcartdata()

    }
    else
    {
        console.log('This is the not cart');

    }
})

// remove from cart
function removeFromCart(i){
    console.log("delete");
    cartdata.splice(i,1);
    localStorage.cart = JSON.stringify(cartdata);
    showcartdata();
    finalcost();
}

// final price

function finalcost(){
    let cost = 0;
    for (let i = 0; i < cartdata.length; i++) {
        cost += cartdata[i].finalcart;
        console.log(cost);
    }
    document.getElementById("finalcost").innerHTML = cost;  
    document.getElementById("finalcount").innerHTML = cartdata.length;          
}
finalcost()
// count
// update
// clean data