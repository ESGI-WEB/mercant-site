const assert = require("assert");
const sinon = require("sinon");
const { Sequelize } = require("sequelize");
const OrderService = require("../../services/order");
const { Order } = require("../../db/models/Order");
const ValidationError = require("../../errors/ValidationError");

describe("OrderService", () => {
    /*describe("findAll", () => {
        it("should call Sequelize.findAll with correct parameters", async () => {
            const criteria = { status: "Draft" };
            const options = { order: { createdAt: "DESC" } };

            const sequelizeFindAllStub = sinon.stub(Sequelize, "findAll").resolves([]);

            await OrderService.findAll(criteria, options);

            sinon.assert.calledOnceWithExactly(sequelizeFindAllStub, Order, {
                where: criteria,
                ...options,
                order: [["createdAt", "DESC"]],
            });

            sequelizeFindAllStub.restore();
        });
    });

    describe("findById", () => {
        it("should call Sequelize.findByPk with correct parameter", async () => {
            const id = 1;

            const sequelizeFindByPkStub = sinon.stub(Sequelize, "findByPk").resolves(null);

            await OrderService.findById(id);

            sinon.assert.calledOnceWithExactly(sequelizeFindByPkStub, Order, id);

            sequelizeFindByPkStub.restore();
        });
    });

    describe("create", () => {
        it("should call Sequelize.create with correct data", async () => {
            const data = { totalPrice: 10, currency: "EUR", status: "Draft" };

            const sequelizeCreateStub = sinon.stub(Sequelize, "create").resolves({});

            await OrderService.create(data);

            sinon.assert.calledOnceWithExactly(sequelizeCreateStub, Order, data);

            sequelizeCreateStub.restore();
        });

        it("should throw ValidationError when Sequelize validation fails", async () => {
            const data = { totalPrice: 10, currency: "INVALID", status: "Draft" };
            const sequelizeValidationError = new Sequelize.ValidationError();

            const sequelizeCreateStub = sinon.stub(Sequelize, "create").rejects(
                sequelizeValidationError
            );

            try {
                await OrderService.create(data);
                assert.fail("Expected ValidationError to be thrown");
            } catch (error) {
                assert.ok(error instanceof ValidationError);
            }

            sequelizeCreateStub.restore();
        });

        it("should re-throw error when Sequelize validation error is not caught", async () => {
            const data = { totalPrice: 10, currency: "EUR", status: "Draft" };
            const error = new Error("Some error");

            const sequelizeCreateStub = sinon.stub(Sequelize, "create").rejects(error);

            try {
                await OrderService.create(data);
                assert.fail("Expected error to be thrown");
            } catch (err) {
                assert.strictEqual(err, error);
            }

            sequelizeCreateStub.restore();
        });
    });

    describe("update", () => {
        it("should call Sequelize.update with correct parameters", async () => {
            const criteria = { status: "Draft" };
            const data = { status: "Refunded" };

            const sequelizeUpdateStub = sinon.stub(Sequelize, "update").resolves([1, []]);

            await OrderService.update(criteria, data);

            sinon.assert.calledOnceWithExactly(sequelizeUpdateStub, Order, data, {
                where: criteria,
                returning: true,
                individualHooks: true,
            });

            sequelizeUpdateStub.restore();
        });

        it("should throw ValidationError when Sequelize validation fails", async () => {
            const criteria = { status: "Draft" };
            const data = { currency: "INVALID" };
            const sequelizeValidationError = new Sequelize.ValidationError();

            const sequelizeUpdateStub = sinon.stub(Sequelize, "update").rejects(
                sequelizeValidationError
            );

            try {
                await OrderService.update(criteria, data);
                assert.fail("Expected ValidationError to be thrown");
            } catch (error) {
                assert.ok(error instanceof ValidationError);
            }

            sequelizeUpdateStub.restore();
        });

        it("should re-throw error when Sequelize validation error is not caught", async () => {
            const criteria = { status: "Draft" };
            const data = { status: "Refunded" };
            const error = new Error("Some error");

            const sequelizeUpdateStub = sinon.stub(Sequelize, "update").rejects(error);

            try {
                await OrderService.update(criteria, data);
                assert.fail("Expected error to be thrown");
            } catch (err) {
                assert.strictEqual(err, error);
            }

            sequelizeUpdateStub.restore();
        });
    });*/

    describe("remove", () => {
        it("should call Sequelize.destroy with correct criteria", async () => {

            const criteria = { status: "Draft" };

            const sequelizeDestroyStub = sinon.stub(Order, "destroy").resolves(1);

            await OrderService.remove(criteria);

            sinon.assert.calledOnceWithExactly(sequelizeDestroyStub, Order, { where: criteria });

            sequelizeDestroyStub.restore();
        });
    });
});
