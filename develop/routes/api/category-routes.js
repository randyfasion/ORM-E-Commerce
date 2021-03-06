const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try{
    const allCategories = await Category.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
  const allCategories = await Category.findByPk(req.params.id, {
    include: [{model: Product}],
  });
  if (!allCategories) {
    res.status(404).json({message: "No category found with that id!"});
    return;
  }

  res.status(200).json(allCategories);
} catch (err) {
  res.status(500).json(err);
}
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try {

    const allCategories = await Category.create(req.body);

    res.status(200).json(allCategories);

  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    console.log(`\n Updating category_name to: ${req.body.category_name} \n`)

    const categoryData = await Category.update(
      { category_name: req.body.category_name }, 
      { returning: true, where: {id: req.params.id} }
    )
    res.status(200).json(allCategories);

  } catch (err) {
    res.status(400).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const allCategories = await Category.destroy({
      where: { id: req.params.id}
    });

    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
