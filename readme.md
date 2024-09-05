# Bitcoin Whale Address Tracker

## Overview
A web app that tracks the top 100 richest Bitcoin addresses, scraping data in real-time and storing it in Supabase.

You can check out live [here](https://whale-100.vercel.app/).

## Features
- Displays a table of the top 100 Bitcoin addresses and their balances.
- Real-time data fetching via web scraping.
- Stores balance data in Supabase every 5 minutes.

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
3. Set up environment variables:
   Create a `.env` file in the root directory and add:
   ```bash
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_anon_key
   ```
4. Start the Express server:
   ```bash
   node index.js
   ```
5. Open `http://localhost:3000` in your browser.

## API Endpoints
- **GET /**: Serves the main HTML page.
- **GET /scrape**: Fetches the top 100 Bitcoin addresses and balances.
- **GET /check-balances**: Fetches current balances without tracking changes.

## Supabase Setup
1. Create a new project in Supabase.
2. Create a table named `balances` with columns:
   - `id` (auto-generated)
   - `created_at` (timestamp with time zone, default: now())
   - `address` (text)
   - `balance` (numeric)
3. Get your Supabase project URL and anon key from the project settings.
4. Add these to your `.env` file and Vercel environment variables.

## License
MIT License.
