const GenericController = require("./genericCRUD");
const fs = require('fs');

module.exports = function (ProductService) {
  const { cget, get } = GenericController(ProductService);
  return {
    cget,
    get,
    put: async (req, res, next) => {
      try {
        const imageURL = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;
        const nbRemoved = await Service.remove({ id: parseInt(req.params.id) });
        const data = await Service.create({
          id: parseInt(req.params.id),
          ...req.body,
          image: imageURL,
        });
        res.status(nbRemoved ? 200 : 201).json(data);
      } catch (err) {
        next(err);
      }
    },
    post: async (req, res, next) => {
      try {
        const imageURL = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
        const data = await ProductService.create({
          ...req.body,
          image: imageURL,
        });
        res.status(201).json(data);
      } catch (err) {
        next(err);
      }
    },
    patch: async (req, res, next) => {
      try {
        const imageURL = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
        const [data] = await ProductService.update(
            { id: parseInt(req.params.id) },
            { ...req.body, image: imageURL }
        );
        if (!data) return res.sendStatus(404);
        res.json(data);
      } catch (err) {
        next(err);
      }
    },
    delete: async (req, res, next) => {
      try {
        const productId = parseInt(req.params.id);
        const product = await ProductService.findById(productId);
        if (product) {
          const filename = product.image.split('/images/')[1];
          fs.unlink(`images/${filename}`, async (error) => {
            if (error) {
              throw new Error('Failed to delete image file');
            }
            const nbRemoved = await ProductService.remove({ id: parseInt(req.params.id) });
            res.sendStatus(nbRemoved ? 204 : 404);
          });
        } else {
          res.sendStatus(404);
        }
      } catch (err) {
        next(err);
      }
    },
  };
};
