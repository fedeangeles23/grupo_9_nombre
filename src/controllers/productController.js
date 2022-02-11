const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const {
    Op
} = require('sequelize')

const Products = db.Product;
const Categories = db.Category;
const Subcategories = db.Subcategory;

let controller = {

    // Detalle de producto
    detail: (req, res) => {
        Products.findOne({
                where: {
                    id: req.params.id
                },
                include: [{
                    association: 'productImages'
                }]
            })
            .then((productdetail) => {
                res.render('products/productDetail', {
                    productdetail,
                    Categories,
                    Subcategories,
                    session: req.session
                })
            })
            .catch(error => console.log(error))
    },

    //----------------------- Categorias ---------------------------//


    category: (req, res) => {
        Categories.findOne({
            where: {
                id: req.params.id
            },
            include: [{ association: 'subcategories',include: [{ association: 'products', include: [{ association: 'productImages'}] }] }] })
            .then((category) => {
                let subcategories = category.subcategories;
                subcategories.forEach((subcategory
                    ))
            })
        },



    gaming: (req, res) => {
        //Filtrando productos que contengan la palabra "Gaming"
        let productsGaming = products.filter(product => product.categoria === "Gaming")

        res.render('products/home', {
            productsGaming,
            session: req.session
        })
    },


    search: (req, res) => {
        let keywords = req.query.keywords.trim().toLowerCase()

        let result = products.filter(product => product.name.includes(keywords))

        res.render('searchResult', {
            result,
            search: keywords,
            session: req.session,
            session: req.session
        })

    }
};

module.exports = controller