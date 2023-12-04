const productList = document.getElementById("productList")
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");

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
    more.onclick = () => {
        window.location = "./product.html?id=" + props.id
    }
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

var productsData = [];
var currentPage = 1;
const productsPerPage = 8;

// Function to populate categories in the select dropdown
const populateCategories = (categories) => {
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
};

// Function to filter and display products
const filterProducts = () => {
    const searchKeyword = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value;

    const filteredProducts = productsData.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchKeyword) ||
        product.brand.toLowerCase().includes(searchKeyword) ||
            product.description.toLowerCase().includes(searchKeyword) ||
            (product.category && product.category.toLowerCase().includes(searchKeyword));
        const matchesCategory = !selectedCategory || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    if(filteredProducts.length + productsPerPage  <= currentPage * productsPerPage) currentPage = 1 
    displayProducts(filteredProducts);
};

// Function to display products
const displayProducts = (products) => {
    productList.innerHTML = ''; // Clear current products
    const startIndex = (currentPage - 1) * productsPerPage;
    const selectedProducts = products.slice(startIndex, startIndex + productsPerPage);
    selectedProducts.forEach(product => {
        productList.appendChild(createCard(product));
    });

    updatePaginationControls(products.length);
};

//Pagination controls
const updatePaginationControls = (totalProducts) => {
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const pageNumbersContainer = document.getElementById('pageNumbers');
    pageNumbersContainer.innerHTML = ''; // Clear existing page numbers

    for (let i = 1; i <= totalPages; i++) {
        const pageNumber = document.createElement('button');
        pageNumber.textContent = i;
        pageNumber.classList.add('page-number');
        if (i === currentPage) {
            pageNumber.classList.add('active');
        }
        pageNumber.addEventListener('click', () => {
            currentPage = i;
            filterProducts();
        });
        pageNumbersContainer.appendChild(pageNumber);
    }

    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
};

document.getElementById("prevPage").onclick = () => {
    if (currentPage > 1) {
        currentPage--;
        filterProducts();
    }
}

document.getElementById("nextPage").onclick = () => {
    if (currentPage * productsPerPage < productsData.length) {
        currentPage++;
        filterProducts();
    }
}

// Event listeners for search and category filter
searchInput.addEventListener('input', filterProducts);
categorySelect.addEventListener('change', filterProducts);

// Fetch categories and products data
fetch("https://dummyjson.com/products/categories")
    .then(res => res.json())
    .then(data => {
        populateCategories(data);
    })
    .catch(err => console.log(err));

fetch("https://dummyjson.com/products?limit=100")
    .then(res => res.json())
    .then(data => {
        productsData = data.products;
        displayProducts(productsData); // Display all products initially
    })
    .catch(err => console.log(err));
