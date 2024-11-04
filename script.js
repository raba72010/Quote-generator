// Updated JavaScript code to load quotes from an external JSON file

// Function to load the quotes JSON file
async function loadQuotes() {
  try {
    const response = await fetch('quotes.json');
    if (!response.ok) {
      throw new Error('Failed to load quotes JSON file');
    }
    const quotesData = await response.json();
    return quotesData;
  } catch (error) {
    console.error('Error loading quotes JSON file:', error);
    document.getElementById('quote').innerText = 'Failed to load quotes. Please try again later.';
  }
}

// Function to fetch a new quote from the loaded JSON data
async function newQuote() {
  try {
    const quotesData = await loadQuotes();
    if (!quotesData) {
      throw new Error('Quotes data is unavailable');
    }

    // Get a random category
    const randomCategoryIndex = Math.floor(Math.random() * quotesData.categories.length);
    const randomCategory = quotesData.categories[randomCategoryIndex];

    // Get a random quote from that category
    const randomQuoteIndex = Math.floor(Math.random() * randomCategory.quotes.length);
    const randomQuote = randomCategory.quotes[randomQuoteIndex];

    // Display the quote
    document.getElementById('quote').innerText = `"${randomQuote}" – ${randomCategory.category}`;
  } catch (error) {
    console.error('Error fetching new quote:', error);
    document.getElementById('quote').innerText = 'Failed to fetch a new quote. Please try again later.';
  }
}

// Function to share the current quote
function shareQuote() {
  const quote = document.getElementById('quote').innerText;
  if (navigator.share) {
    navigator.share({
      title: 'Inspirational Quote',
      text: quote,
    }).catch(() => console.log("Sharing failed or was canceled by the user."));
  } else {
    console.log("Sharing not supported on this browser.");
  }
}

// Function to toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  // Save dark mode preference in local storage
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.removeItem('darkMode');
  }
}

// Check local storage for dark mode preference
window.onload = async () => {
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }
};
