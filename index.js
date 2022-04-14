fetch('https://raw.githubusercontent.com/fd-freshjs/serve-json/main/mebel.json')
  .then(r => r.json())
  .then(data => {
    console.log(data)
  })