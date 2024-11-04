async function getQuote() {
    const quoteElement = document.getElementById('quote');
    try {
        const response = await fetch('https://api.quotable.io/random');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        quoteElement.textContent = `"${data.content}" - ${data.author}`;
    } catch (error) {
        quoteElement.textContent = 'Failed to fetch a new quote. Please try again later.';
        console.error('Error fetching quote:', error);
    }
}

function shareQuote() {
    const quote = document.getElementById('quote').textContent;
    if (navigator.share) {
        navigator.share({
            title: 'Quote of the Day',
            text: quote
        }).catch(error => {
            console.error('Error sharing quote:', error);
            fallbackShare(quote);
        });
    } else {
        fallbackShare(quote);
    }
}

function fallbackShare(quote) {
    navigator.clipboard.writeText(quote)
        .then(() => alert('Quote copied to clipboard!'))
        .catch(() => alert('Failed to copy quote'));
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
    
    // Save preference to localStorage
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// Load dark mode preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.querySelector('.container').classList.add('dark-mode');
    }
});
