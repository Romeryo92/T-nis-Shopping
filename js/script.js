const openShopping = document.querySelector(".shopping");
const closeShopping = document.querySelector(".closeShopping");
const list = document.querySelector(".list");
const listCard = document.querySelector(".listCard");
const total = document.querySelector(".total");
const body = document.querySelector("body");
const quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
    body.classList.add('active')
});

closeShopping.addEventListener("click", () => {
    body.classList.remove('active')
});

let produtos = [
    {
        id: 1,
        name: "PRODUTO 1",
        imagem: "1.png",
        price: 220
    },
    {
        id: 2,
        name: "PRODUTO 2",
        imagem: "2.png",
        price: 320
    },
    {
        id: 3,
        name: "PRODUTO 3",
        imagem: "3.png",
        price: 190
    },
    {
        id: 4,
        name: "PRODUTO 4",
        imagem: "4.png",
        price: 240
    },
    {
        id: 5,
        name: "PRODUTO 5",
        imagem: "5.png",
        price: 200
    },
    {
        id: 6,
        name: "PRODUTO 6",
        imagem: "6.png",
        price: 240
    },
    {
        id: 7,
        name: "PRODUTO 7",
        imagem: "7.png",
        price: 225
    },
    {
        id: 8,
        name: "PRODUTO 8",
        imagem: "8.png",
        price: 215
    },
    {
        id: 9,
        name: "PRODUTO 9",
        imagem: "9.png",
        price: 220
    },
]

let listCards = [];

const initApp = () => {
    produtos.forEach((value, key) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
        <img src="img/${value.imagem}"/>
        <div class="title">${value.name}</div>
        <div class="price">${value.price.toLocaleString()}</div>
        <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv)
    })
}

initApp()

const addToCard = (key) => {
    if(listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(produtos[key]));
        listCards[key].quantity = 1
    }

    reloadCard();
}

const reloadCard = () => {
    listCard.innerHTML = "";
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;

        if(value != null){
            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
            <div><img src="img/${value.imagem}"></div>
            <div class="cardTitle">${value.name}</div>
            <div class="cardPrice">${value.price.toLocaleString()}</div>
            
            <div>
                <button style="background-color:#560bad;" class="cardButton" onClick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                <div class="count">${value.quantity}</div>
                <button style="background-color:#560bad;" class="cardButton" onClick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
            </div>`

            listCard.appendChild(newDiv);
        }

        total.innerText = totalPrice.toLocaleString();
        quantity.innerText = count;
    })
}

const changeQuantity = (key, quantity) => {
    if(quantity == 0){
        delete listCards[key]
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * produtos[key].price
    }

    reloadCard()
}
