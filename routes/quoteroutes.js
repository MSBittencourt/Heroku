    const jsonfile = require("jsonfile");
    const Quote = require("../models/quote.js");
    const mongoose = require("mongoose");

    module.exports = app => {

        app.get('/', (req, res) => {
            res.render('index')
        });

        app.get("/quotes", (req, res) => {
            console.log("fetching all quotes");
            Quote.find((err, quotes) => {
                res.send(quotes)
            });
        }); 

        app.post("/quotes/new", (req, res) => {
            const aquote = new Quote({
                _id: new mongoose.Types.ObjectId(),
                quote: req.body.quote,
                author: req.body.author
            });
            aquote.save().then(result => {
                    console.log(result);
                })
                .catch(err => console.log(err));
            res.sendStatus(200);
        });

        app.delete("/quotes/destroy", (req, res) => {
            Quote.findOneAndDelete({
                _id: req.body._id
            }).then(quote => {
                if(!quote) {
                    return res.status(404).send({
                        message: "Quote not found with id " + req.params.quoteId
                    });
                }
                res.send({message: "Quote deleted successfully!"});
            }).catch(err => {
                if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: "Quote not found with id " + req.params.quoteId
                    });                
                }
                return res.status(500).send({
                    message: "Could not delete note with id " + req.params.quoteId
                });
            });
        });

        app.put("/quotes", (req, res) => {
            Quote.findOneAndUpdate({
                _id: req.body._id
            }, {
                quote: req.body.quote,
                author: req.body.author
            }).then(doc => {
                console.log(doc)
                res.send(doc)
            })
        })

        app.get("/quote", (req, res) => {
            const id = req.body._id
            Quote.find({
                _id: id
            }).then(doc => {
                console.log(doc)
                res.send(doc)
            });
        });
    };