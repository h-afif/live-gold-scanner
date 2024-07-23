const API_URL = "https://www.goldapi.io/api/XAU/USD";
const API_KEY = "goldapi-1crfslyvq161q-io";

// Function to format the timestamp into a readable format
function formatTimestamp(timestamp) {
    const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
    return date.toLocaleString(); // Returns a localized date string
}

// Function to fetch live gold data from the API
async function fetchGoldData() {
    try {
        const response = await fetch(API_URL, {
            headers: {
                'x-access-token': API_KEY
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        updateUI(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('data').innerHTML = '<p>Error loading data. Please try again later.</p>';
    }
}

// Function to update the user interface with fetched data
function updateUI(data) {
    document.getElementById('timestamp').textContent = formatTimestamp(data.timestamp);
    document.getElementById('metal').textContent = data.metal;
    document.getElementById('currency').textContent = data.currency;
    document.getElementById('exchange').textContent = data.exchange;
    document.getElementById('symbol').textContent = data.symbol;
    document.getElementById('prev_close_price').textContent = data.prev_close_price.toFixed(2);
    document.getElementById('open_price').textContent = data.open_price.toFixed(2);
    document.getElementById('low_price').textContent = data.low_price.toFixed(2);
    document.getElementById('high_price').textContent = data.high_price.toFixed(2);
    document.getElementById('price').textContent = data.price.toFixed(2);
    document.getElementById('change').textContent = data.ch.toFixed(2);
    document.getElementById('change_percent').textContent = data.chp.toFixed(2) + '%';
    document.getElementById('ask').textContent = data.ask.toFixed(2);
    document.getElementById('bid').textContent = data.bid.toFixed(2);
    document.getElementById('price_gram_24k').textContent = data.price_gram_24k.toFixed(2);
    document.getElementById('price_gram_22k').textContent = data.price_gram_22k.toFixed(2);
    document.getElementById('price_gram_21k').textContent = data.price_gram_21k.toFixed(2);
    document.getElementById('price_gram_20k').textContent = data.price_gram_20k.toFixed(2);
    document.getElementById('price_gram_18k').textContent = data.price_gram_18k.toFixed(2);
    document.getElementById('price_gram_16k').textContent = data.price_gram_16k.toFixed(2);
    document.getElementById('price_gram_14k').textContent = data.price_gram_14k.toFixed(2);
    document.getElementById('price_gram_10k').textContent = data.price_gram_10k.toFixed(2);
}

// Function to convert JSON data to CSV format and trigger a download
function downloadExcel() {
    const data = {
        'Timestamp': new Date(document.getElementById('timestamp').textContent).toLocaleString(),
        'Metal': document.getElementById('metal').textContent,
        'Currency': document.getElementById('currency').textContent,
        'Exchange': document.getElementById('exchange').textContent,
        'Symbol': document.getElementById('symbol').textContent,
        'Previous Close Price': document.getElementById('prev_close_price').textContent,
        'Open Price': document.getElementById('open_price').textContent,
        'Low Price': document.getElementById('low_price').textContent,
        'High Price': document.getElementById('high_price').textContent,
        'Current Price': document.getElementById('price').textContent,
        'Change': document.getElementById('change').textContent,
        'Change %': document.getElementById('change_percent').textContent,
        'Ask Price': document.getElementById('ask').textContent,
        'Bid Price': document.getElementById('bid').textContent,
        'Price per Gram 24k': document.getElementById('price_gram_24k').textContent,
        'Price per Gram 22k': document.getElementById('price_gram_22k').textContent,
        'Price per Gram 21k': document.getElementById('price_gram_21k').textContent,
        'Price per Gram 20k': document.getElementById('price_gram_20k').textContent,
        'Price per Gram 18k': document.getElementById('price_gram_18k').textContent,
        'Price per Gram 16k': document.getElementById('price_gram_16k').textContent,
        'Price per Gram 14k': document.getElementById('price_gram_14k').textContent,
        'Price per Gram 10k': document.getElementById('price_gram_10k').textContent
    };

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += Object.keys(data).join(",") + "\r\n";
    csvContent += Object.values(data).join(",") + "\r\n";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "gold_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Add event listener for the download button
document.getElementById('download').addEventListener('click', downloadExcel);

// Fetch data on page load and then every minute
fetchGoldData();
setInterval(fetchGoldData, 60000); // 60 seconds
