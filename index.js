require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

// Supabase setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Check Supabase connection
const checkSupabaseConnection = async () => {
    const { data, error } = await supabase
        .from('Bitcoin_Info')
        .select('*')
        .limit(1);
    
    if (error) {
        console.error('Error connecting to Supabase:', error);
    } else {
        console.log('Successfully connected to Supabase:', data);
    }
};

checkSupabaseConnection(); // Call the connection check

const balancesStore = {}; // In-memory store for balances

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Function to scrape data and save to Supabase
const scrapeAndSaveData = async () => {
    try {
        const { data } = await axios.get('https://bitinfocharts.com/top-100-richest-bitcoin-addresses.html');
        const $ = cheerio.load(data);
        const results = [];

        for (const element of $('table tbody tr').toArray()) {
            const address = $(element).find('td > a').text().trim().replace("..", "");
            const balance = $(element).find('td.hidden-phone').text().trim();

            if (address && balance) {
                const balanceValue = parseFloat(balance.replace(/,/g, ''));
                results.push({ address: address, balance: balanceValue });
                balancesStore[address] = balanceValue;

                // Save each balance to Supabase immediately after scraping
                const { data, error } = await supabase
                    .from('Bitcoin_Info')
                    .insert({ 
                        address: address, // Add the address field
                        balance: balanceValue,
                        created_at: new Date().toISOString() // Add created_at with date-time-timezone
                    });

                // Improved error logging
                if (error) {
                    console.error('Error saving balance to Supabase:', error);
                    console.error('Data that failed to save:', { address, balance: balanceValue, created_at: new Date().toISOString() });
                } else {
                    console.log('Data saved successfully:', data);
                }
            }
        }

        console.log('Data scraped and saved successfully');
    } catch (error) {
        console.error('Error occurred while scraping and saving:', error);
    }
};

// Initial scrape and save
scrapeAndSaveData();

// Set interval to scrape data and save every 5 minutes (300000 milliseconds)
setInterval(scrapeAndSaveData, 300000);

// Route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/scrape', async (req, res) => {
    try {
        res.json(Object.entries(balancesStore).map(([address, balance]) => ({ address, balance })));
    } catch (error) {
        res.status(500).send('Error occurred while fetching balances');
    }
});
app.get('/check-balances', async (req, res) => {
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
// module.exports = app;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
