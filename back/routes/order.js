const { Router } = require("express");

module.exports = function (Controller, options) {
    const router = Router();

    router.post("/:id/products", Controller.post)
    return router;
};