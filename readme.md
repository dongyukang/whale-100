# Top 100 Whale Address Tracker

## Overview

Welcome to the Bitcoin Balances Tracker! This web app showcases the top 100 richest Bitcoin addresses and their balances. It scrapes data from a public site and keeps you updated in real-time on any balance changes.


## Features

- Displays a slick table of the top 100 Bitcoin addresses and their balances.
- Color-coded badges show balance changes (green for gains, red for losses).
- Fetches data from an external source using web scraping magic.

## Technologies Used

- **Frontend**: HTML, Bootstrap for styling, and JavaScript for some dynamic flair.
- **Backend**: Node.js with Express for server-side awesomeness, Axios for HTTP requests, and Cheerio for web scraping wizardry.

## Installation

1. Clone the repo:
   ```bash
   git clone <repository-url>
   cd bit100
   ```

2. Install the goodies:
   ```bash
   npm install
   ```

3. Fire up the server:
   ```bash
   node index.js
   ```

4. Open your browser and cruise over to `http://localhost:3000`.

## API Endpoints

- **GET /**: Serves up the main HTML page.
- **GET /scrape**: Grabs the top 100 Bitcoin addresses and their balances.
- **GET /check-balances**: Checks for any balance changes since the last scrape.

## Usage

- The app automatically fetches and displays the top 100 Bitcoin addresses and their balances when you load it up.
- It also keeps an eye on balance changes and shows them in a cool badge format.

## Contributing

We’d love your contributions! Feel free to submit a pull request or open an issue with any suggestions or improvements.

## License

This project is rocking the ISC License.
