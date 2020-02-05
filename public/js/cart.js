/*
Jag vill ladda in cart från server.js
Jag vill ha en wrapper för hela sidan som visar all produkter i en flex-column eller grid-row-auto
Jag vill att alla produkter ska vara en article som visas som en lista i min wrapper
Jag vill att produkt boxen ska vara uppdelad i 2 stycken grid-template-columns
I varje grid ruta ska det fet finnas två figures som är på varsin sidan av produkt boxen
Figur(vänster) ska ha namn på produkt, dess pris och carname. Detta ska visas i en flex-direction column.
Figur(höger) ska vara en klickar symbol för att kunna ta bort produkten från varukorgen
*/

removeCartItem = async (event) => {
    let id = event.target.id;
    let parent = event.target.parentNode;
    parent.classList.remove("cart-article");
    parent.classList.add("hide");
    console.log("Test:" + id);

    const URL = "http://localhost:3400/api/remove?id=";
    const PARAM = id;
    let response = await fetch(URL + PARAM, {method: "DELETE"});
}

refresh = async () => {
    let cart = await getCart();
    showCart(cart)
}

getCart = async () => {
    const URL = "http://localhost:3400/api/cart";

    let response = await fetch(URL, {method: "GET"});
    let data = response.json();
    return data
}

showCart = async (cart) => {
    const COUNT = await cart.length;
    
    for (let i = 0; i < COUNT; i++) {
        let team = cart[i].Team;
        let car = cart[i].Name;
        let price = cart[i].Price;
        let id = cart[i].Id;
        //let info = cart[i].Info;
        let pic = cart[i].Picture;

        let article = document.createElement("article");
        article.classList.add("cart-article");
        let urlString = 'url('+pic+')';
        article.style.backgroundImage = urlString;
        let productBox = document.createElement("figure");
        productBox.classList.add("cart-article-product-box");
        let remove = document.createElement("button");
        remove.setAttribute("id", id);
        remove.addEventListener("click", removeCartItem);
        remove.classList.add("cart-article-remove-button");
        remove.innerHTML = "X";
        let title = document.createElement("h2");
        title.classList.add("cart-title");
        title.innerHTML = team;
        let carName = document.createElement("h3");
        carName.classList.add("cart-undertitle");
        carName.innerHTML = "Car: " + car;
        let carPrice = document.createElement("h3");
        carPrice.classList.add("cart-undertitle");
        carPrice.innerHTML = "Price: " + price;

        let main = document.querySelector("main");
        main.appendChild(article);
        article.appendChild(productBox);
        article.appendChild(remove);
        productBox.appendChild(title)
        productBox.appendChild(carName);
        productBox.appendChild(carPrice);
    }
}

refresh();