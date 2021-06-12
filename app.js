var bodyParser     = require("body-parser");
var mongoose       = require("mongoose");
var express        = require("express");
var methodOverride = require("method-override");

var app =  express();

var url = "mongodb://localhost:27017/coursehub";

var indexRoutes = require('./routes/index');
var subjectRoutes = require('./routes/subject');

mongoose.connect(url, {
    useNewUrlParser: true,

    useCreateIndex: true,

    useUnifiedTopology: true,

    useFindAndModify: false
}).then(() => {
    console.log("Connected to Database");
}).catch(err => {
    console.log(err.message);
});

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));




// deleteAllSubjects();

app.use('/', indexRoutes);
app.use('/subject', subjectRoutes);
app.get("/404", (req, res) => {
    res.send("<h1>404 not found</h1>")
});


app.listen(3000, process.env.IP, () => {
    console.log("Server started at Port:3000");
});


