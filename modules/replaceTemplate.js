module.exports = function (template, product) {
  let output = template.replace(/{%ProductName%}/g, product.productName);
  output = output.replace(/{%From%}/g, product.from);
  output = output.replace(/{%Nutrients%}/g, product.nutrients);
  output = output.replace(/{%Quantity%}/g, product.quantity);
  output = output.replace(/{%Price%}/g, product.price);
  output = output.replace(/{%Id%}/g, product.id);
  output = output.replace(/{%Image%}/g, product.image);
  output = output.replace(/{%Description%}/g, product.description);
  output = output.replace(
    /{%NotOrganic%}/g,
    `${product.organic ? `` : not-organic}`
  );
  return output;
};
