const express = require("express");
const Sequelize = require("sequelize");
const router = express.Router();

const sequelize = new Sequelize("JquNDev7GA", "JquNDev7GA", "vYpSRLmr34", {
    host: "remotemysql.com",
    dialect: "mysql",
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

const Model = Sequelize.Model;
class Users extends Model {
}
Users.init(
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        joinedAt: {
            type: Sequelize.DATE,
            allowNull: true
        },
    },
    {
        sequelize,
        modelName: "users"
    }
);

router.get("/:id", (req, res) => {
    Users.findByPk(req.params.id).then(user => {
        if (user !== null) {
            let base = 10;
            let date = new Date();
            let fullYears = 2;
            let joinedAt = new Date (user.joinedAt.replace(/-/g,'/'));
            res.json(calculateVacation(base, date, fullYears, joinedAt));
        } else {
            res.status(422).send("No user found.");
        }
    });
});

calculateVacation = (base, date, fullYears, joinedAt) => {
    const diffTime = Math.abs(joinedAt - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffYears = diffDays / 365;
    const yearsAdded = diffYears - fullYears > 0 ? Math.ceil(diffYears) : 0;
    let result = {};

    console.log('difference in ms:', diffTime);
    console.log('years:',diffYears);
    console.log('days added:', Math.ceil(diffYears));

    result.final = base + yearsAdded;
    return result;
};

module.exports = router;
