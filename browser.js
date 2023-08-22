import { PlaywrightCrawler, Dataset } from "crawlee";

const crawler = new PlaywrightCrawler({
  // We removed the headless: false option to hide the browser windows.
  requestHandler: async ({ parseWithCheerio, request, enqueueLinks }) => {
    console.log(`Fetching URL: ${request.url}`);

    if (request.label === "start-url") {
      await enqueueLinks({
        selector: "a.product-item__title",
      });
      return;
    }

    const $ = await parseWithCheerio();

    const title = $("h1").text().trim();
    const vendor = $("a.product-meta__vendor").text().trim();
    const price = $("span.price").contents()[2].nodeValue;
    const reviewCount = parseInt($("span.rating__caption").text(), 10);
    const description = $('div[class*="description"] div.rte').text().trim();
    // We added one more extractor to get all the recommended products.
    const recommendedProducts = $(
      ".product-recommendations a.product-item__title"
    )
      .map((i, el) => $(el).text().trim())
      .toArray();

    await Dataset.pushData({
      title,
      vendor,
      price,
      reviewCount,
      description,
      // And we saved the extracted product names.
      recommendedProducts,
    });
  },
});

await crawler.addRequests([
  {
    url: "https://warehouse-theme-metal.myshopify.com/collections/sales",
    label: "start-url",
  },
]);

await crawler.run();

await Dataset.exportToCSV("results");