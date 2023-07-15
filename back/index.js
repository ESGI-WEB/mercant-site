const express = require("express");
const app = express();
const GenericRouter = require("./routes/genericCRUD");
const OrderRouter = require("./routes/order");
const GenericController = require("./controllers/genericCRUD");
const OrderController = require("./controllers/order");
const userService = require("./services/user");
const productService = require("./services/product");
const refundService = require("./services/refund");
const orderService = require("./services/order");
const orderDetailsService = require("./services/orderDetails");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use(function (req, res, next) {
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    if (!req.is("application/json")) {
      return res.sendStatus(400);
    }
  }
  next();
});

app.use("/users", new GenericRouter(new GenericController(userService)));
app.use("/products", new GenericRouter(new GenericController(productService)));
app.use("/orders", new OrderRouter(new OrderController(orderService, orderDetailsService, productService, refundService)));

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});