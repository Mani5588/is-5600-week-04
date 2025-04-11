const path = require('path')
const Products = require('./products')
const autoCatch = require('./lib/auto-catch')

function handleRoot(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  }
  
  async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query
    try {
        res.json(await Products.list({
        offset: Number(offset),
      limit: Number(limit),
      tag,
    }))
    } 
    catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

async function getProduct (req, res, next) {
    const { id } = req.params
  
    try {
      const product = await Products.get(id)
      if (!product) {
        return next()
      }
  
      return res.json(product)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
}

async function createProduct (req, res) {
    console.log('request body:', req.body)
    res.json(req.body)
  }

  async function deleteProduct(req, res) {
    const { id } = req.params;

    const result = await Products.remove(id);
    if (!result) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ success: true, message: 'Product deleted successfully (simulation)' });
  }

  async function updateProduct(req, res) {
    const { id } = req.params;
    const productData = req.body;

        const result = await Products.update(id, productData);

    if (!result) {
    
      return res.status(404).json({ error: 'Product not found or update failed' });
    }

   
    res.status(200).json({ success: true, message: 'Product updated successfully (simulation)' });
  }

  module.exports = autoCatch({
    handleRoot,
    listProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
  });