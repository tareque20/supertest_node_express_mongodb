var express = require('express');
var router = express.Router();
var Joi = require('joi');

Book = require('../models/book');

router.get('/api/books', function (req, res) {
    Book.getBooks(function (err, books) {
        if (err) {
            return res.status(400).json(err);
        }
        console.log(books);
        return res.status(200).json(books);
        //res.render('books', books);
    });
});

router.get('/api/books/:_id', function (req, res) {
    Book.getBookById(req.params._id, function (err, book) {
        if (err) {
            return res.status(400).json(err);
        }
        return res.status(200).json(book);
    });
});

router.post('/api/books', function (req, res) {
    var book = req.body;
    const schema = {
        title: Joi.string().min(3).required(),
        genres: Joi.string().min(3).required(),
        description: Joi.string().min(3).required(),
        author: Joi.string().min(3).required()
    };

    const result = Joi.validate(book, schema);
    if(result.error){
        console.log(result.error);
        return res.status(400).json(result.error);

    }

    Book.addBook(book, function (err, book) {
        /*if (err) {
            res.status(400).json(err);
        }*/
        res.status(201).json(book);
    });
});

router.put('/api/books/:_id', function (req, res) {
    var id = req.params._id;
    var book = req.body;
    const schema = {
        title: Joi.string().min(3).required(),
        genres: Joi.string().min(3).required(),
        description: Joi.string().min(3).required(),
        author: Joi.string().min(3).required()
    };

    const result = Joi.validate(book, schema);
    if(result.error){
        return res.status(400).send(result.error.details[0].message);
    }
    Book.updateBook(id, book, {}, function (err, book) {
        if (err) {
            return res.status(400).json(err);
        }
        res.json(book);
    });
});

router.delete('/api/books/:_id', function (req, res) {
    var id = req.params._id;
    Book.removeBook(id, function (err, book) {
        if (err) {
            return res.status(400).json(err);
        }
        res.json(book);
    });
});

module.exports = router;