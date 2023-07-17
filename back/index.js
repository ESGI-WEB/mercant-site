const express = require("express");
const app = express();
const path = require('path');
const cors = require("cors");

const GenericRouter = require("./routes/genericCRUD");
const SecurityRouter = require("./routes/security");
const OrderRouter = require("./routes/order");
const ProductRouter = require("./routes/product");

const GenericController = require("./controllers/genericCRUD");
const OrderController = require("./controllers/order");
const ProductController = require("./controllers/product");

const userService = require("./services/user");
const productService = require("./services/product");
const refundService = require("./services/refund");
const orderService = require("./services/order");
const orderDetailsService = require("./services/orderDetails");

const errorHandler = require("./middlewares/errorHandler");
const checkAuth = require("./middlewares/check-auth");

app.use(express.json());
app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images')));

/*app.use(function (req, res, next) {
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    if (!req.is("application/json")) {
      return res.sendStatus(400);
    }
  }
  next();
});*/

app.use("/", new SecurityRouter(userService));
app.use("/users", checkAuth('Administrator'), new GenericRouter(new GenericController(userService)));
app.use("/products", checkAuth(), new ProductRouter(new ProductController(productService)));
app.use("/orders", checkAuth(), new OrderRouter(new OrderController(orderService, orderDetailsService, productService, refundService)));

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
