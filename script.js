// Backup quotes in case all APIs fail
const fallbackQuotes = [
    { content: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
    { content: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", author: "Albert Einstein" },
    { content: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi" },
    { content: "No one can make you feel inferior without your consent.", author: "Eleanor Roosevelt" },
    { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" }
];

async function getQuote() {
    const quoteElement = document.getElementById('quote');
    quoteElement.textContent = 'Loading...';

    // List of quote APIs to try
    const apis = [
        {
            url: 'https://api.quotable.io/random',
            transform: data => ({ content: data.content, author: data.author })
        },
        {
            url: 'https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en',
            transform: data => ({ content: data.quoteText, author: data.quoteAuthor || 'Unknown' })
        },
        {
            url: 'https://type.fit/api/quotes',
            transform: data => {
                const randomQuote = data[Math.floor(Math.random() * data.length)];
                return { content: randomQuote.text, author: randomQuote.author || 'Unknown' };
            }
        }
    ];

    for (const api of apis) {
        try {
            const response = await fetch(api.url);
            if (!response.ok) continue;
            
            const data = await response.json();
            const quote = api.transform(data);
            quoteElement.textContent = `"${quote.content}" - ${quote.author}`;
            return;
        } catch (error) {
            console.error('Error fetching from API:', error);
            continue;
        }
    }

    // If all APIs fail, use a random fallback quote
    const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    quoteElement.textContent = `"${randomQuote.content}" - ${randomQuote.author}`;
}

// Rest of the code remains the same...
