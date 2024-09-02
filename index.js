const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const balancesStore = {}; // In-memory store for balances

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Function to scrape data
const scrapeData = async () => {
    try {
        const { data } = await axios.get('https://bitinfocharts.com/top-100-richest-bitcoin-addresses.html');
        const $ = cheerio.load(data);
        const results = [];

        $('table tbody tr').each((index, element) => {
            const address = $(element).find('td > a').text().trim().replace("..", "");
            const balance = $(element).find('td.hidden-phone').text().trim();

            if (address && balance) {
                results.push({ address: address, balance: parseFloat(balance.replace(/,/g, '')) });
                balancesStore[address] = parseFloat(balance.replace(/,/g, '')); // Store balance
            }
        });

        console.log('Data scraped successfully:');
    } catch (error) {
        console.error('Error occurred while scraping:', error);
    }
};

// Initial scrape
scrapeData();

// Set interval to scrape data every 5 minutes (300000 milliseconds)
// setInterval(scrapeData, 30000);

// Route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/scrape', async (req, res) => {
    try {
        res.json(Object.entries(balancesStore).map(([address, balance]) => ({ address, balance })));
    } catch (error) {
        res.status(500).send('Error occurred while fetching balances');
    }
});

app.get('/api/check-balances', async (req, res) => {
    try {
        const { data } = await axios.get('https://bitinfocharts.com/top-100-richest-bitcoin-addresses.html');
        const $ = cheerio.load(data);
        const balances = [];

        $('table tbody tr').each((index, element) => {
            const address = $(element).find('td > a').text().trim().replace("..", "");
            const balance = parseFloat($(element).find('td.hidden-phone').text().trim().replace(/,/g, ''));

            if (address && !isNaN(balance)) {
                balances.push({ address, balance }); // Store address and balance
            }
        });

        // Update the balancesStore with the latest balances
        balances.forEach(({ address, balance }) => {
            balancesStore[address] = { balance, timestamp: Date.now() };
        });

        console.log(balances);
        res.json(balances); // Return the current balances
    } catch (error) {
        res.status(500).send('Error occurred while fetching balances');
    }
});

// Export the app for Vercel
module.exports = app;
