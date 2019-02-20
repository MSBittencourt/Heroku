const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const path = require('path');

const exphbs = require('express-handlebars')


let app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'));
/* //npm i express-hbs
app.set('views', path.join(__dirname, '/views/'));
app.engine('ejs', exphbs({extname: 'ejs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts'}))
app.set('view engine', 'hbs');
 */

app.use(bodyParser.json());
// require("./models/quote.js")(app);
require("./routes/quoteroutes")(app);

const URI = process.env.MONGODB_URI || 'mongodb+srv://root:12345@cluster0-0ylfu.mongodb.net/Quotes'
mongoose.connect(
    URI, {useNewUrlParser: true}, (err) => {
    if (!err){
        console.log('MongoDB Conection Succeeded.')
    }
    else {
        console.log('Error in DB connection: ' + err)
    }
});


const PORT = process.env.PORT || 3000;
/* app.get('/', (req, res) => {
    res.render('./layouts/mainLayout.hbs')
});
 */

app.listen(PORT, () => {
    console.log(`Server running ` + PORT);

});