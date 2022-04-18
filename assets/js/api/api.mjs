export async function loadProducts() {
  const response = await fetch('https://raw.githubusercontent.com/fd-freshjs/serve-json/main/mebel.json')
  const data = await response.json();

  return data;
}