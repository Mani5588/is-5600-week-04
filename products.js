const fs = require('fs').promises
const path = require('path')

const productsFile = path.join(__dirname, 'data/full-products.json')

module.exports = {
  list,
  get,
  remove,
  update
}


async function list (options = {}) {
    const { offset = 0, limit = 25, tag } = options
    const data = await fs.readFile(productsFile)
  
    return JSON.parse(data)
    .filter(product=>{
        if(!tag){
            return product
        }
        return product.tags.find(( { title } ) => title == tag)
    })
    .slice(offset, offset + limit) // Slice the products
}

async function get (id) {
    const products = JSON.parse(await fs.readFile(productsFile))
  
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        return products[i]
      }
    }
  
         return null;
}   

async function remove(id) {
    const data = await fs.readFile(productsFile);
    const products = JSON.parse(data);

    const productExists = products.some((product) => product.id === id);

    if (!productExists) {
      return null;
    }

    
    return true;
  }
  async function update(id, productData) {
    
    console.log(`Product with ID ${id} would be updated with data:`, productData);
    return true;
  }