// Fetch Product Cards API
const fetchData = async () => {
    try {
        let api = await fetch(`http://152.69.163.31:31301/products`);
        return await api.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Create Product Cards
const products = document.getElementById('products');

fetchData().then(data => {
    let cards = data.map(card => {
        return `<div class="col-md-3 col-sm-6 card-wrapper">
                    <div id="${card.id}" class="card-item">
                        <a href="product.html?id=${card.id}" target="_self" >
                            ${card.discount ? `<span class="discount">${card.discountPercentage}</span>` : ""}
                            <div class="card-image">
                                <img src="${card.image}" alt="${card.name}">
                            </div>
                            <div class="card-item-body">
                                <h6><strong>${card.name}</strong> <br> ${card.quantity}</h6>
                                <div class="card-item-price">
                                    ${card.discount
                                        ? `<span style="color: coral; font-size: 1.5em; font-weight: 700;">$ ${card.priceWithDiscount}</span>`
                                        : ""}
                                    ${card.discount
                                        ? `<span style="text-decoration: line-through;">Was $ ${card.price}</span>`
                                        : `<span style="font-size: 1.5em;">$ ${card.price}</span>`}
                                </div>
                                <div class="card-brand">
                                    <span>${card.brand}</span>
                                    <img src="${card.nootritionQualityImage}" alt="${card.nootritionQuality}">
                                </div>
                                <div class="card-button">
                                    <button type="button" class="btn btn-outline-danger">Add</button>
                                </div>
                        </div>
                        </a>
                    </div>
                </div>`
    })
    products.innerHTML = cards.join('');
})

// Fetch Product API
const fetchProductData = async (id) => {
    try {
        let api = await fetch(`http://152.69.163.31:31301/products/${id}`);
        console.log(api)
        return await api.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Create Product
const product = document.getElementById('product');

let params = new URLSearchParams(window.location.search);
let id = params.get('id');

fetchProductData(id).then(item => {
    product.innerHTML = `<div class="col-md-6 col-sm-12">
                        <div class="product-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <div class="product-description">
                            <h3>${item.name}</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <button type="button" class="add-to-cart-button">Add to Cart</button>
                        </div>
                    </div>`;
}).catch(error => console.log('Error: ', error))
