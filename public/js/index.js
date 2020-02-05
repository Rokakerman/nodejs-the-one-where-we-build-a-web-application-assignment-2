//let productGlobal;
let cartList = [];
let cartCount

refresh = async () => {
    await checkCart();
    // document.getElementById("home-button").addEventListener("click", loadCatalogue);
    loadCatalogue();
}

checkCart = async () => {
    const URL = "http://localhost:3400/api/cart";
    let response = await fetch(URL, {method: "GET"});
    let data = await response.json();
    cartCount = data.length;
    //console.log("Test:" + count);
    let id;

    for (let i = 0; i < cartCount; i++) {
        id = data[i].Id;
        //console.log("Test1: " + id);
        cartList.push(id);
    }
    console.log("Här är arrayen: " + cartList); 
}

getCatalogue = async () => {
    const URL ="http://localhost:3400/api/catalogue";
    document.getElementById("home-button").removeEventListener("click", loadCatalogue);

    let response = await fetch(URL, {method: "GET"});
    let data = response.json();
    return data
}

// Geta din shopingcart i en funktion som räknar antaler produkter som är där, spara det i en global sen

createProducts = async (products) => {
    const COUNT= products.length;

    for (let i = 0; i < COUNT; i++) {
        let team = products[i].Team;
        let car = products[i].Name;
        let price = products[i].Price;
        let id = products[i].Id;
        let info = products[i].Info;
        let pic = products[i].Picture;
        let urlString = 'url('+pic+')';

        let section = document.createElement("section");
        section.style.backgroundImage = urlString;
        let imageBox = document.createElement("figure");
        imageBox.style.backgroundImage = urlString;
        //section.setAttribute("src", pic);
        section.classList.add("product-wrapper");
        let title = document.createElement("h1");
        title.innerHTML = team;
        let box = document.createElement("figure");
        let carName = document.createElement("h2");
        carName.innerHTML = "CAR: " + car;
        let carPrice= document.createElement("h2");
        carPrice.innerHTML = "PRICE: " + price;
        let bread = document.createElement("p");
        bread.innerHTML = info;
        let button = document.createElement("button");
        let buttonTitle = document.createElement("h2");
        button.setAttribute("id", id);

            if (cartList.indexOf(id) == -1) {
                button.addEventListener("mousedown", addToCart);
                button.addEventListener("mouseup", iSistaMinutenBa);
                buttonTitle.innerHTML = "BUY";
            } else {
        
                buttonTitle.innerHTML = "BUY";
                console.log("Inuti IF satsen " + cartList[i]);
                buttonTitle.innerHTML = "In Cart";
            }

        let body = document.querySelector("body");
        body.appendChild(section);
        section.appendChild(imageBox);
        section.appendChild(box);
        section.appendChild(button);
        box.appendChild(title);
        box.appendChild(carName);
        box.appendChild(carPrice);
        box.appendChild(bread);
        button.appendChild(buttonTitle);

        section.classList.add("product-wrapper");
        imageBox.classList.add("product-wrapper-image");
        title.classList.add("product-wrapper-title");
        box.classList.add("product-wrapper-figure");
        carName.classList.add("product-wrapper-undertitle");
        carPrice.classList.add("product-wrapper-undertitle");
        bread.classList.add("product-wrapper-bread");
        button.classList.add("product-wrapper-button");
        buttonTitle.classList.add("product-wrapper-button-title");
        
    }
}

addToCart = async (event) => {
    let id = await event.currentTarget.id;
    //console.log("Test:" + id);

    const URL = "http://localhost:3400/api/add?id=";
    const PARAM = id;

    await fetch(URL + PARAM, {method: "POST"});
    //console.log(response);
}

loadCatalogue = async () => {
    let products = await getCatalogue()
    //productGlobal = await products;
    await createProducts(products)
};

iSistaMinutenBa = async (event) => {
    let id = await event.currentTarget.id;
    //console.log(id);
    let thisButton = document.getElementById(id);
    thisButton.removeEventListener("mousedown", addToCart);
    thisButton.innerHTML = "Added To Cart";
}

refresh();



