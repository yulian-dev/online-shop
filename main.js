// Fetch Product Cards API
const getProducts = async () => {
    try {
        let api = await fetch(`http://152.69.163.31/shop/products`);
        return await api.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Create HTML Product Cards
const createCards = (data) => {
    return data.map(item => {
        return `<div class="col-md-3 col-sm-6 card-wrapper">
                        <div id="${item.id}" class="card-item">
                            <a href="product.html?id=${item.id}&name=${item.name}&brand=${item.brand}" target="_self" >
                                ${item.discount ? `<span class="discount">${item.discountPercentage}</span>` : ""}
                                <div class="card-image">
                                    <img src="${item.image}" alt="${item.name}">
                                </div>
                                <div class="card-item-body">
                                    <h6><strong>${item.name}</strong> <br> ${item.quantity}</h6>
                                    <div class="card-item-price">
                                        ${item.discount
                                            ? `<span style="color: coral; font-size: 1.5em; font-weight: 700;">$ ${item.priceWithDiscount}</span>`
                                            : ""}
                                        ${item.discount
                                            ? `<span style="text-decoration: line-through;">Was $ ${item.price}</span>`
                                            : `<span style="font-size: 1.5em;">$ ${item.price}</span>`}
                                    </div>
                                    <div class="card-brand">
                                        <span>${item.brand}</span>
                                        <img src="${item.nootritionQualityImage}" alt="${item.nootritionQuality}">
                                    </div>
                                    <div class="card-button">
                                        <button type="button" class="btn btn-outline-danger">Add</button>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>`
    }).join('');
}

const products = document.getElementById('products');

if (products) {
    getProducts().then(data => {
        products.innerHTML = createCards(data);
    })
}

// Fetch Product API
const getProduct = async (id) => {
    try {
        let api = await fetch(`http://152.69.163.31/shop/products/${id}`);
        return await api.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Create HTML Product Card
const product = document.getElementById('product');

if (product) {
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');

    getProduct(id).then(item => {
        product.innerHTML = `<div class="col-md-6 col-sm-12">
                                <div class="product-card">
                                    <div class="product-card-image">
                                        <img src="${item.image}" alt="${item.name}">
                                    </div>
                                </div>
                             </div>
                                <div class="col-md-6 col-sm-12">
                                    <div class="d-flex flex-column h-100 product-card-body">
                                        ${item.discount ? `<span class="discount">special</span>` : ""}
                                        <div class="product-card-brand">
                                            <span>${item.brand}</span>
                                            <img src="${item.nootritionQualityImage}" alt="${item.nootritionQuality}">
                                        </div>
                                        <h2>${item.name}</h2>
                                        <div class="product-card-price">
                                            ${item.discount
                                                ? `<span style="color: coral; font-size: 2em; font-weight: 700;">$ ${item.priceWithDiscount}</span>`
                                                : ""}
                                            ${item.discount
                                                ? `<span style="text-decoration: line-through;">Was $ ${item.price}</span>`
                                                : `<span style="font-size: 2em;">$ ${item.price}</span>`}
                                        </div>
                                        <hr class="flex-grow-1">
                                        <div class="product-card-button">
                                            <button type="button" class="btn btn-outline-danger">Add to Cart</button>
                                        </div>
                                    </div>
                                </div>`;
    }).catch(error => console.log('Error: ', error))
}

// Filtering Tabs
const filterProducts = (value) => {
    const products = document.getElementById('products');

    if (value.toLowerCase() === 'discount') {
        getProducts().then(data => {
            const filteredData = data.filter(item => item.discount);
            products.innerHTML = createCards(filteredData);
        })
    } else {
        getProducts().then(data => {
            products.innerHTML = createCards(data);
        })
    }
}

const setActiveTab = (value) => {
    const tabs = document.querySelectorAll('.search-tab-btn');

    tabs.forEach(tab => {
        if (value.toUpperCase() === tab.innerText.toUpperCase()) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    })
}
setActiveTab('all');

const tabs = document.querySelectorAll('.search-tab-btn');

tabs.forEach(tab => {
    tab.addEventListener('click', event => {
        const value = event.target.innerText;
        setActiveTab(value);
        filterProducts(value);
    })
})

// Live Search
const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', (event) => {
    const value = event.target.value;
    getProducts().then(data => {
        const filteredData = data.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
        products.innerHTML = createCards(filteredData);
    })
});
