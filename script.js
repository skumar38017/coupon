const offersData = [
    {
        imageUrl: "https://d3pzq99hz695o4.cloudfront.net/temporary/image/20241113105554-766110-190x260.png",
        storeLogo: "https://d3pzq99hz695o4.cloudfront.net/sitespecific/in/stores/web/a5191baa4fad6125a33902117e5e4847/sanfe-coupons-logo-large.jpg?455795",
        title: "Retinol Body Lotion",
        cashback: "Flat 16.8%",
        price: "₹399",
        startDate: "11/22/2024",
        endDate: "12/31/2024",
        promoCode: "SAVE20",
        details: "Flat 16.8% cashback and additional discounts on this product."
    },
    // Add more objects for dynamic offers
];

let globalTimer; // Global timer to continuously count down
let globalTimeLeft = 5 * 60; // 5 minutes in seconds

function renderOffers() {
    const offerContainer = document.querySelector('.offer-container');

    offersData.forEach((offer, index) => {
        const offerElement = document.createElement('div');
        offerElement.classList.add('offer');
        offerElement.innerHTML = `
            <div class="card-front">
                <div class="product-img-container">
                    <img src="${offer.imageUrl}" alt="Product Image">
                </div>
                <div class="product-details-container">
                    <div class="store-img-container">
                        <img src="${offer.storeLogo}" alt="Store Logo">
                        <div class="date-time">
                            <p id="date-time-${index}">Start Date: ${offer.startDate}</p> <!-- Timer placeholder -->
                            <p>End Date: ${offer.endDate}</p>
                        </div>
                    </div>
                    <div class="offer-card-title">${offer.title}</div>
                    <div class="cb-details">
                        <img src="https://d3mqyttn50wslf.cloudfront.net/modules/mweb/assets/images/svg/cd-cb-icon-new.svg" alt="Cashback" width="26px" height="26px">
                        <div class="cashback-text">${offer.cashback}</div>
                    </div>
                    <div class="price">${offer.price}</div>
                    <div class="small-text">*After Discount & Cashback</div>
                </div>
            </div>
            <div class="card-back">
                <div class="offer-back-content">
                    Use code <strong>${offer.promoCode}</strong> at checkout to get an additional discount. Offer valid till ${offer.endDate}.
                </div>
                <button class="main-btn" onclick="showContent('show-code', ${index})">Show Code</button>
                <button class="detail-cta" onclick="showContent('offer-details', ${index})">Offer Details</button>
            </div>
        `;
        offerContainer.appendChild(offerElement);
    });
}

function showContent(type, index) {
    const modal = document.getElementById('content-modal');
    const overlay = document.getElementById('modal-overlay');
    const title = document.getElementById('modal-title');
    const content = document.getElementById('modal-content');
    const offer = offersData[index];
    const dateTimeElement = document.getElementById(`date-time-${index}`); // Access the correct date-time for the offer

    if (type === 'show-code') {
        title.textContent = 'Promo Code';
        content.innerHTML = `
            Use code <strong>${offer.promoCode}</strong> to avail an additional discount!
        `;

        // Start the timer and replace the start date with the countdown timer for this specific offer
        startOfferTimer(index);

        // Close the modal
        closeModal();

    } else if (type === 'offer-details') {
        title.textContent = 'Offer Details';
        content.textContent = offer.details;
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

// Start a timer for the clicked offer
function startOfferTimer(index) {
    const dateTimeElement = document.getElementById(`date-time-${index}`);
    let offerTimeLeft = 5 * 60; // 5 minutes in seconds

    const offerTimer = setInterval(() => {
        if (offerTimeLeft <= 0) {
            clearInterval(offerTimer);
            dateTimeElement.innerHTML = 'Time Expired'; // Timer expired message
        } else {
            dateTimeElement.innerHTML = `Time Remaining: ${formatTime(offerTimeLeft)}`;
            offerTimeLeft--;
        }
    }, 1000);
}

// Helper to format the time as MM:SS
function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

document.addEventListener('DOMContentLoaded', renderOffers);
