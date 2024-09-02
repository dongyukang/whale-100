# Bitcoin Whale Address Tracker

## Overview
A web app that tracks the top 100 richest Bitcoin addresses, scraping data in real-time.

## Features
- Displays a table of the top 100 Bitcoin addresses and their balances.
- Real-time data fetching via web scraping.

## Installation
1. Clone the repo:
   ```bash
   git clone <repository-url>
   cd bit100
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Express server:
   ```bash
   node index.js
   ```
4. Open `http://localhost:3000` in your browser.

## API Endpoints
- **GET /**: Serves the main HTML page.
- **GET /scrape**: Fetches the top 100 Bitcoin addresses and balances.
- **GET /check-balances**: Fetches current balances without tracking changes.

## License
MIT License.
