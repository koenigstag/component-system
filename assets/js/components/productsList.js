function ProductsList() {
  const sectionElem = document.createElement('section');

  loadProducts().then(({ data: products }) => {
    const articles = []
    for (const prod of products) {
      const articleElem = document.createElement('article');

      const card = JSON.stringify(prod);

      articleElem.append(card);
      articles.push(articleElem);
    }
    sectionElem.append(...articles);
  });

  return sectionElem;
}