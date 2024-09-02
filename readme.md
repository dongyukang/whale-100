# Top 100 Whale Address Tracker

## Overview

The Bitcoin Balances Tracker is a web application that displays the top 100 richest Bitcoin addresses along with their balances. It scrapes data from a public website and provides real-time updates on balance changes.

## Features

- Displays a table of the top 100 Bitcoin addresses and their respective balances.
- Shows changes in balances with color-coded badges (green for increases, red for decreases).
- Fetches data from an external source using web scraping.

## Technologies Used

- **Frontend**: HTML, Bootstrap for styling, and JavaScript for dynamic content.
- **Backend**: Node.js with Express for server-side logic, Axios for making HTTP requests, and Cheerio for web scraping.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd bit100
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node index.js
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## API Endpoints

- **GET /**: Serves the main HTML page.
- **GET /scrape**: Scrapes the top 100 Bitcoin addresses and their balances.
- **GET /check-balances**: Checks for changes in balances since the last scrape.

## Usage

- The application will automatically fetch and display the top 100 Bitcoin addresses and their balances upon loading.
- It will also periodically check for any changes in the balances and display them in a badge format.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the ISC License.
