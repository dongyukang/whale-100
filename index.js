const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname))); // Serve static files

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const balancesStore = {}; // In-memory store for balances

app.get('/scrape', async (req, res) => {
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

        res.json(results);
    } catch (error) {
        res.status(500).send('Error occurred while scraping');
    }
});

app.get('/check-balances', async (req, res) => {
    try {
        const { data } = await axios.get('https://bitinfocharts.com/top-100-richest-bitcoin-addresses.html');
        const $ = cheerio.load(data);
        const changes = [];

        $('table tbody tr').each((index, element) => {
            const address = $(element).find('td > a').text().trim().replace("..", "");
            const newBalance = parseFloat($(element).find('td.hidden-phone').text().trim().replace(/,/g, ''));

            if (balancesStore[address] !== undefined) {
                const oldBalance = balancesStore[address];
                const change = newBalance - oldBalance;

                if (change !== 0) {
                    changes.push({ address, change });
                }
            }
        });

        res.json(changes);
    } catch (error) {
        res.status(500).send('Error occurred while checking balances');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
