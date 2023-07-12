const { Router } = require("express");

module.exports = function (Controller, options) {
    const router = Router();

    router.get("/", Controller.cget);
    router.post("/", Controller.post);
    router.get("/:id", Controller.get);
    router.put("/:id", Controller.put);
    router.patch("/:id", Controller.patch);
    router.delete("/:id", Controller.delete);

    //router.get("/:id/products", Controller.getProducts)
    router.post("/:id/product", Controller.addProduct)
    router.delete("/:id/product/:productId", Controller.removeProduct)

    return router;
};