const {Model, DataTypes} = require("sequelize");

module.exports = function (connection) {
    class User extends Model {
        async checkPassword(password) {
            const bcrypt = require("bcryptjs");
            return bcrypt.compare(password, this.password);
        }

        generateToken() {
            const jwt = require("jsonwebtoken");
            return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });
        }
    }

    User.init(
        {
            lastname: DataTypes.STRING,
            firstname: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    isEmail: true,
                    notNull: {
                        msg: 'Email cannot be null'
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    min: 8,
                    notNull: {
                        msg: 'Password cannot be null'
                    },
                },
            },
            role: {
                type: DataTypes.ENUM('Customer', 'Administrator'),
                allowNull: false,
                defaultValue: 'Customer',
                validate: {
                    notNull: {
                        msg: 'Role cannot be null'
                    },
                },
            }
        },
        {
            underscored: true,
            sequelize: connection,
            tableName: "users",
        }
    );

    async function encryptPassword(user, options) {
        if (!options?.fields.includes("password")) {
            return;
        }
        const bcrypt = require("bcryptjs");
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }

    User.addHook("beforeCreate", encryptPassword);
    User.addHook("beforeUpdate", encryptPassword);

    return User;
};
