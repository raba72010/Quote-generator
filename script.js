async function getQuote() {
    const quoteElement = document.getElementById('quote');
    quoteElement.textContent = 'Loading...';

    try {
        // Using quotable API as primary source
        const response = await fetch('https://api.quotable.io/random');
        if (response.ok) {
            const data = await response.json();
            quoteElement.textContent = `"${data.content}" - ${data.author}`;
            return;
        }
    } catch (error) {
        console.error('Primary API failed:', error);
    }

    // Fallback to local quotes if API fails
    const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    quoteElement.textContent = `"${randomQuote.content}" - ${randomQuote.author}`;
}

// Add more fallback quotes
fallbackQuotes.push(
    { content: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { content: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { content: "In three words I can sum up everything I've learned about life: it goes on.", author: "Robert Frost" },
    { content: "The only impossible journey is the one you never begin.", author: "Tony Robbins" }
);
