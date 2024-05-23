// Define allData array to store item data
let allData = [];

// Iterate through localStorage to retrieve item data
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const data = localStorage.getItem(key);
    const parsedData = JSON.parse(data); 

    // Generate a unique ID for each item
    parsedData.forEach((item, index) => {
        item.id = key + '_' + index;
    });

    // Push parsed data into allData array
    allData.push(...parsedData);
}

// Get reference to search input field
const searchInput = document.querySelector('#search');

// Add event listener for input event on search input field
searchInput.addEventListener('input', () => {
    // Get the search query entered by the user
    const searchTerm = searchInput.value.trim().toLowerCase();

    // Filter the data based on the search query
    const matchingCakes = allData.filter(cake => cake.ItemName.toLowerCase().includes(searchTerm));
    
    // Display the matching cakes or clear the display if no match found
    displayMatchingCakes(matchingCakes);
});

// Get reference to cake buttons
const cakeButtons = document.querySelectorAll('.btn');

// Add event listener for click event on cake buttons
cakeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const cakeName = button.getAttribute('data-cname');
        let matchingCakes;
        if (cakeName === 'ALL') {
            // If "All" button is clicked, show all images
            matchingCakes = allData;
        } else {
            // Otherwise, filter cake data by cake name
            matchingCakes = allData.filter(cake => cake.Cname === cakeName);
        }
        displayMatchingCakes(matchingCakes);
    });
});

// Function to display matching cakes
function displayMatchingCakes(matchingCakes) {
    const imgContainer = document.querySelector('.items');
    imgContainer.innerHTML = '';
    matchingCakes.forEach(cake => {
        const cakeElement = document.createElement('div');
        cakeElement.classList.add('don');
        cakeElement.innerHTML = `
            <img src="${cake.image}" alt="${cake.ItemName}">
            <div class="donut-price">
                <p>${cake.ItemName}</p>
                <p>${cake.Price}</p>
                <button class="add_to_cart" data-item-id="${cake.id}">Add-to-Cart</button>
            </div>
        `;
        imgContainer.appendChild(cakeElement);
    });
}

// Array to store items in the cart
let cartItems = [];

// Event listener for adding items to cart when the "Add to Cart" button is clicked
const imgContainer = document.querySelector('.items');
imgContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('add_to_cart')) {
        const itemId = event.target.getAttribute('data-item-id');
        const selectedItem = allData.find(item => item.id === itemId);
        if (selectedItem) {
            addToCart(selectedItem);
            updateCart();
        }
    }
});

// Function to add an item to the cart
function addToCart(item) {
    cartItems.push(item);
    updateCart();
}

// Function to update the cart icon's display
function updateCart() {
    const cartIcon = document.querySelector('.cart_icon');
    cartIcon.textContent = cartItems.length;
}

// Event listener for removing items from the cart when delete icon is clicked
const cartContainer = document.querySelector('.cart_container');
cartContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('fa-trash')) {
        // Get the parent element of the trash icon, which is the cart item
        const cartItem = event.target.closest('.cart_item');
        if (cartItem) {
            // Get the data-item-id attribute value
            const itemId = cartItem.dataset.itemId;
            // Remove the item from the cart
            removeFromCart(itemId);
        }
    }
});

// Function to remove an item from the cart
function removeFromCart(itemId) {
    // Find the index of the item in the cartItems array
    const index = cartItems.findIndex(item => item.id === itemId);
    if (index !== -1) {
        // Remove the item from the cartItems array
        cartItems.splice(index, 1);
        // Update the cart display
        displayCartDetails();
        // Update the cart icon
        updateCart();
    }
}

// Event listener for displaying cart details when the cart icon is clicked
const cartIcon = document.querySelector('.cart_icon');
cartIcon.addEventListener('click', () => {
    // Toggle the display of the cart container
    const cartContainer = document.querySelector('.cart_container');
    cartContainer.style.display = cartContainer.style.display === 'none' ? 'block' : 'none';
    // If the container is displayed, show cart details
    if (cartContainer.style.display === 'block') {
        displayCartDetails();
    }
});

// Function to display cart details
function displayCartDetails() {
    const cartContainer = document.querySelector('.cart_container');
     
    cartContainer.innerHTML = '';
    let totalPrice = 0;
    
     // Add the cross button to close the cart container
     const closeButton = document.createElement('button');
     closeButton.textContent = '✖';
     closeButton.classList.add('close-cart');
     cartContainer.appendChild(closeButton);

    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart_item');
        cartItemElement.dataset.itemId = item.id; // Set the data-item-id attribute
        cartItemElement.innerHTML = `
            <div>
                <img src="${item.image}" alt="${item.ItemName}" width="50">
                <span>${item.ItemName} - $${item.Price}</span>
                <span class="trash"><i class="fa-solid fa-trash"></i></span>
            </div>
        `;
        cartContainer.appendChild(cartItemElement);
        totalPrice += parseFloat(item.Price);
    });
    const totalPriceElement = document.createElement('div');
    totalPriceElement.textContent = `Total Price: $${parseFloat(totalPrice).toFixed(2)}`;
    cartContainer.appendChild(totalPriceElement);
    
   
   
}

// Event listener for closing the cart container when the close button is clicked
cartContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('close-cart')) {
        cartContainer.style.display = 'none';
    }
});
