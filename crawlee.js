import { CheerioCrawler, Dataset } from "crawlee";

const crawler = new CheerioCrawler({
  requestHandler: async ({ $, request, enqueueLinks }) => {
    console.log(`Fetching URL: ${request.url}`);

    if (request.label === "start-url") {
      await enqueueLinks({
        selector: "a.product-item__title",
      });
      // When on the start URL, we don't want to
      // extract any data after we extract the links.
      return;
    }

    // The extraction code
    const title = $("h1").text().trim();
    const vendor = $("a.product-meta__vendor").text().trim();
    const price = $("span.price").contents()[2].nodeValue;
    const reviewCount = parseInt($("span.rating__caption").text(), 10);
    const description = $('div[class*="description"] div.rte').text().trim();

    // Save everything to a file.
    await Dataset.pushData({
      title,
      vendor,
      price,
      reviewCount,
      description,
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
