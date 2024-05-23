// Fetch API
const fetchData = async () => {
    try {
        let api = await fetch('http://192.168.4.40:8084/products');
        return await api.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// 5% Discount Counter
const discountCounter = (price) => {
    return price - (price * 0.05).toFixed(2);
}

// Create Product Cards
let products = document.getElementById('products');
const productCards = fetchData();

productCards.then(data => {
    let cards = data.map(card => {
        let discountedPrice = discountCounter(card.price);
        return `<div class="col-md-3 col-sm-6 card-wrapper">
                    <div class="card-item">
                    <span class="discount">-5%</span>
                        <div class="card-image">
                            <img src="${card.image}" alt="${card.image}">
                        </div>
                        <div class="card-item-body">
                            <h6><strong>${card.name}</strong> <br> ${card.quantity}</h6>
                            <div class="card-item-price">
                                <span>$ ${discountedPrice.toFixed(2)}</span>
                                <span>Was $ ${card.price}</span>
                            </div>
                            <div class="card-brand">
                                <p>${card.brand}</p>
                            </div>
                            <div class="card-button">
                                <button type="button" class="btn btn-outline-danger">Add</button>
                            </div>
                        </div>
                    </div>
                </div>`
    })

    products.innerHTML = cards.join('');
})

