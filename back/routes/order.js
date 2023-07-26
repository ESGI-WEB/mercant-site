const { Router } = require("express");
const checkAuth = require("../middlewares/check-auth");
const checkOrder = require("../middlewares/checkOrder");

module.exports = function (Controller, options) {
  const router = Router();

  router.get("/", checkAuth('Administrator'), Controller.cget);
  router.post("/", checkAuth('Administrator'), Controller.post);
  router.post("/find-or-create-cart", Controller.findOrCreate);
  router.get("/:id", checkOrder(), Controller.get);
  router.put("/:id", checkOrder('Draft'), Controller.put);
  router.patch("/:id", checkOrder('Draft'), Controller.patch);
  router.delete("/:id", checkAuth("Administrator"), checkOrder('Draft'), Controller.delete);
  router.post("/:id/checkout", checkOrder('Draft'), Controller.checkout);

  router.get("/:id/products", checkOrder(), Controller.getProducts);
  router.post("/:id/product", checkOrder('Draft'), Controller.addProduct);
  router.delete("/:id/product/:productId", checkOrder('Draft'), Controller.removeProduct);
  router.patch("/:id/product/:productId", checkOrder('Draft'), Controller.editProduct);

  router.get("/:id/refund", checkOrder(), Controller.getRefund);
  router.post("/:id/refund", checkAuth("Administrator"), Controller.addRefund);

  return router;
};
