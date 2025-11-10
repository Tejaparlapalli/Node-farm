const http = require("http");
const url = require("url");
const fs = require("fs");
const replaceTemplate = require("./modules/replaceTemplate");

const data = fs.readFileSync(${__dirname}/dev-data/data.json, "utf-8");
const dataObj = JSON.parse(data);

const templateOverview = fs.readFileSync(
  ${__dirname}/templates/template-overview.html,
  "utf-8"
);
const templateProduct = fs.readFileSync(
  ${__dirname}/templates/template-product.html,
  "utf-8"
);
const templateCard = fs.readFileSync(
  ${__dirname}/templates/template-card.html,
  "utf-8"
);

const server = http.createServer((request, response) => {
  const { query, pathname } = url.parse(request.url, true);

  if (pathname === "/" || pathname === "/overview") {
    response.writeHead(200, { "content-type": "text/html" });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(templateCard, el))
      .join("");
    const output = templateOverview.replace(/{%ProductCards%}/g, cardsHtml);
    response.end(output);
  } else if (pathname === /product && +query.id < dataObj.length) {
    response.writeHead(200, { "content-type": "text/html" });
    const productHtml = replaceTemplate(templateProduct, dataObj[+query.id]);
    response.end(productHtml);
  } else if (pathname === "/api") {
    response.writeHead(200, { "content-type": "application/json" });
    response.end(data);
  } else {
    response.writeHead(404, { "content-type": "text/html" });
    response.end("<h1>Page not found, yeahh sad lyf :((</h1>");
  }
});
server.listen(5000, "127.0.0.1", () =>
  console.log("Listening to the server on the port 5000 :D")
);
