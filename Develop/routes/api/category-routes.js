const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoriesData = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  try {
    const categoriesData = await Category.findByPk(req.params.id, {
      // JOIN with travellers, using the Trip through table
      include: [{ model: Product}]
    });

    if (!categoriesData) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }

    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  const categoriesData = await Category.create(req.body);

  return res.json(categoriesData);
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  const categoriesData = await Category.update(
    {
      where: {
        category_id: req.params.category_id,
      }
    }
  )
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  const categoriesData = await Category.destroy({
    where: {
      category_id: req.params.category_id,
    }
  })
});

module.exports = router;
