const productList = document.getElementById("productList")

const createCard = (props) => {
    const card = document.createElement("div")
    card.id = props.id;
    card.classList.add('card');

    //title
    const title = document.createElement("div")
    title.textContent = props.title
    title.classList.add('title')

    //thumbnail 
    const thumbnail = document.createElement("div")
    thumbnail.classList.add('thumbnail')
    const thumbnailImg = document.createElement("img")
    thumbnailImg.src = props.thumbnail
    const discountPercentage = document.createElement("div")
    discountPercentage.classList.add("discountPercentage")
    discountPercentage.textContent = "-" + props.discountPercentage + "%"
    thumbnail.appendChild(thumbnailImg)
    thumbnail.appendChild(discountPercentage)

    //details
    const details = document.createElement("div")
    details.classList.add("details")
    const price = document.createElement("div")
    price.classList.add("price")
    price.textContent = props.price + "$"
    const rating = document.createElement("div")
    rating.classList.add("rating")
    rating.textContent = props.rating
    const ratingImg = document.createElement("img")
    ratingImg.src = "assets/star.png"
    rating.appendChild(ratingImg)
    details.appendChild(price)
    details.appendChild(rating)

    //description
    const description = document.createElement("div")
    description.classList.add("description")
    description.textContent = props.description

    //market
    const market = document.createElement("div")
    market.classList.add("market")
    const brand = document.createElement("div")
    brand.classList.add("brand")
    brand.textContent = props.brand
    const more = document.createElement("div")
    more.classList.add("more")
    more.textContent = "See more"
    const stock = document.createElement("div")
    stock.classList.add("stock")
    stock.textContent = "Stock: " + props.stock
    market.appendChild(brand)
    market.appendChild(more)
    market.appendChild(stock)

    card.appendChild(title)
    card.appendChild(thumbnail)
    card.appendChild(details)
    card.appendChild(description)
    card.appendChild(market)
    return card
}

// Function to display products
const displayProducts = (products) => {
    products.forEach(product => {
        productList.appendChild(createCard(product));
    });
};

fetch("https://dummyjson.com/products")
    .then(res => res.json())
    .then(data => {
        displayProducts(data.products); // Display all products initially
    })
    .catch(err => console.log(err));
