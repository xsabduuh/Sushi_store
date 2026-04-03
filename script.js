// script.js

// Refactored JavaScript Code for Sushi Store

// Sample Functionality: Fetches sushi menu items

// Improved Error Handling
async function fetchMenu() {
    try {
        const response = await fetch('https://api.sushistore.com/menu');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const menuItems = await response.json();
        return menuItems;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        return [];  // Return an empty array on error
    }
}

// Performance Optimized: Use of debounce to limit calls
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

// Example of using debounce
const fetchDebouncedMenu = debounce(fetchMenu, 300);

// Example Usage
fetchDebouncedMenu().then(menuItems => {
    console.log(menuItems);
}).catch(error => {
    console.error('Error fetching menu items:', error);
});
