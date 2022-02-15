const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const Users = db.User;
const Products = db.Products;



const controller = {
    login: (req, res) => {
        res.render('users/login', {
            session: req.session
        })
    },

    loginGoogle: (req, res) => {
        res.render('users/loginGoogle', {
            session: req.session
        })
    },

    processLogin: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            Users.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(user => {
                req.session.user = {
                    id: user.id,
                    name: user.name,
                    last_name: user.last_name,
                    email: user.email,
                    avatar: user.avatar,
                    rol: user.rol
                }
    
               if(req.body.remember){
                   const TIME_IN_MILISECONDS = 60000
                   res.cookie("userElectrohogar", req.session.user, {
                       expires: new Date(Date.now() + TIME_IN_MILISECONDS),
                       httpOnly: true,
                       secure: true
                   })
               }
    
                res.locals.user = req.session.user;
    
                res.redirect('/')
            })
        }else{
            res.render('users/login', {
                errors: errors.mapped(),
                session: req.session
            })
        }
    },


    registro: (req, res) => {
        res.render('users/registro', {
            session: req.session
        })
    },

    processRegistro: (req, res) => {


        let errors = validationResult(req);

        if (errors.isEmpty()) {
            let { name,last_name, email, pass1 } = req.body
            Users.create({
                    name,
                    last_name,
                    email,
                    pass: bcrypt.hashSync(pass1, 10),
                    avatar: req.file ? req.file.filename : 'default-image.png',
                    rol: 0
                })
                .then(() => {
                    res.redirect('/users/login')
                })
        }else{
            res.render('users/registro', {
                errors: errors.mapped(),
                old: req.body,
                session: req.session
            })
        }

    },


    perfil: (req, res) => {
        Users.findByPk(req.session.user.id, {
            include: [{association: 'addresses'}]
        })
        .then((user) => {
            res.render('users/perfil', {
                user, 
                session: req.session
                
            })
        })

    },
    logout: (req, res) => {
        req.session.destroy();
        if (req.cookies.userElectroHogar) {
            res.cookie('userElectroHogar', "", {
                maxAge: -1
            })
        }
        res.redirect('/')

    },




}

module.exports = controller