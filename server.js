var express             = require("express"),
    app                 = express(),
    // PACKAGES
    mongoose            = require("mongoose"),
    // ROUTES
    indexRoutes         = require("./routes/index"),
    apiRoutes           = require("./routes/api"),
    // SEEDING
    seedingHistorical   = require("./seeds/historical"),
    seedingLatest       = require("./seeds/latest"),
    // ENV
    port                = process.env.PORT || 3000,
    ip                  = process.env.IP || "0.0.0.0",
    // DB
    dbUrl               = process.env.DBURL || "mongodb://localhost/regret_calculator";

// SETUP
mongoose:mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, {useMongoClient: true});
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
//SEED THE DB
seedingHistorical();
seedingLatest();



// ROUTES
app.use("/api", apiRoutes);
app.use("/", indexRoutes);



// LISTENING
app.listen(port, ip, function() {
    console.log('CryptoCalc server just started!');
});
