var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
  
var fs = require('fs');
var path = require('path');
require('dotenv/config');



// Conectando ao DB
const url = "mongodb+srv://BK:%4027Bk2481@cluster0.wnnuf.mongodb.net/Setu?retryWrites=true&w=majority"
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(process.env.MONGO_URL,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

// Set EJS as templating engine 
app.set("view engine", "ejs");


var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });

var imgModel = require('./model');

app.get('/', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    });
});


// Step 8 - the POST handler for processing the uploaded file

app.post('/', upload.array('productImage',2), (req, res, next) => {
var images = []
    for(var i in req.files){
        var data = fs.readFileSync(path.join(__dirname + '/uploads/' + req.files[i].filename))
        images.push(data)
    }

	var obj = {
		productName: req.body.productName,
		productCode: req.body.productCode,
        productHeight: req.body.productHeight,
        productWidth: req.body.productWidth,
        productCostPrice: req.body.productCostPrice,
        productRetailingPrice: req.body.productRetailingPrice,
        additionalComment: req.body.additionalComment, 
		// productImage: {
		// 	data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
		// 	contentType: 'image/png'
		// },
        // autocadImage: {
		// 	data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
		// 	contentType: 'image/png'
		// }
        productImage: images
        
	}
	imgModel.create(obj, (err, item) => {
		if (err) {
			console.log(err);
		}
		else {
			// item.save();
			res.redirect('/');
		}
	});
});


// Rotas


// Step 9 - configure the server's port

var port = process.env.PORT || '8081'
app.listen(port, err => {
	if (err)
		throw err
	console.log('Server listening on port', port)
})
