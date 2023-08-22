# What is this?
This repo contains the files used for the course of *Web Scraping and Automation* from [Apyfy](https://docs.apify.com/academy/web-scraping-for-beginners). The most part of the course focus on scrape data from a [Shopify E-Commerce template](https://warehouse-theme-metal.myshopify.com).

# Files explanation
- `crawler.js` using *Got Scraping* and *Cheerio*, extract some product info from a single product.
- `extractor.js` using *Got Scraping* and *Cheerio* again, crawl the product URLs to extract info from all products, and save them into a *CSV* file.
- `crawlee.js` using *Crawlee*, extract again all the products info, but this time using a more automated process.
- `browser.js` using *Crawlee* and *Playwright*, extract the product info plus dynamic associated info to each product, and save it into a *CSV* file.

# Requirements
Node v18