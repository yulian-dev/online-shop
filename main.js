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

// Create Product Cards
let products = document.getElementById('products');
const productCards = fetchData();

productCards.then(data => {
    let cards = data.map(card => {
            return `<div class="col-md-3 col-sm-6 card-wrapper">
                    <div class="card-item">
                        ${card.discount ? `<span class="discount">${card.discountPercentage}</span>` : ""}
                        <div class="card-image">
                            <img src="${card.image}" alt="${card.image}">
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

