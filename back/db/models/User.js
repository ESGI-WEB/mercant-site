const {Model, DataTypes} = require("sequelize");

module.exports = function (connection) {
    class User extends Model {

        static roles = ["Customer", "Administrator"];

        async checkPassword(password) {
            const bcrypt = require("bcryptjs");
            return bcrypt.compare(password, this.password);
        }

        async generateToken() {
            const jwt = require("jsonwebtoken");
            return jwt.sign({
                id: this.id,
                email: this.email,
                role: this.role,
            }, process.env.JWT_SECRET, {
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
                    notNull: {
                        msg: 'Password cannot be null'
                    },
                    // check if password contains at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number
                    is: function (value) {
                        if (!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
                            throw new Error("Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number, and 1 special character among @, $, !, %, *, ?, &");
                        }
                    },
                },
            },
            role: {
                type: DataTypes.ENUM(...User.roles),
                allowNull: false,
                defaultValue: 'Customer',
                validate: {
                    isIn: function (value) {
                        if (!User.roles.includes(value)) {
                            throw new Error(`Role must be one of ${User.roles.join(", ")}`);
                        }
                    },
                }
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
