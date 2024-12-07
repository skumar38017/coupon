// 


function showContent(type) {
    const modal = document.getElementById('content-modal');
    const overlay = document.getElementById('modal-overlay');
    const title = document.getElementById('modal-title');
    const content = document.getElementById('modal-content');

    if (type === 'show-code') {
        title.textContent = 'Promo Code';
        content.textContent = 'Use code SAVE20 to avail an additional discount!';
    } else if (type === 'offer-details') {
        title.textContent = 'Offer Details';
        content.textContent = 'Flat 16.8% cashback and additional discounts on this product. Offer valid till 31st Dec 2024.';
    }

    modal.style.display = 'block';
    overlay.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('content-modal');
    const overlay = document.getElementById('modal-overlay');
    modal.style.display = 'none';
    overlay.style.display = 'none';
}