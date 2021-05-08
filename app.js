const http = require('http');
let ap = http.createServer((req, res)=> {
    res.writeHead(200, {'Content-Type': 'text/plan'});
})


var bodyParser            = require("body-parser");
const passport            = require('passport');
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    ObjectID              = require("mongodb").ObjectID,
    mongoose              = require("mongoose"),
    express               = require("express"),
    Schema                = mongoose.Schema,
    app                   = express(),
    User                  = require("./views/models/user"),
    Article               = require("./views/models/news"),
    seedDB                = require("./views/models/seed")
    Comment               = require("./views/models/comment")
     


    
//APP
mongoose.connect(
    'mongodb+srv://kbxtws:123789@cluster0.y7lpa.mongodb.net/newspartal', 
    {
    useNewUrlParser: true ,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('SSTTAARRTT');
    })
   .catch(err => {
       console.error('App starting error:', err.stack);
       process.exit(1)
    });

seedDB();
app.set("view engine", "ejs");
app.set('views','views');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : false}));

//app.use(express.static(__dirname + "/public" ));


//Passpotr
app.use(require("express-session")({
    secret: "BIIN BIIIN BIIIN ",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize()); 
app.use(passport.session());
passport.use(new LocalStrategy (User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//

app.get("/", function(req,res){
   res.redirect("/portal");
});

app.get("/portal", function(req,res){
    console.log (req.user);
    Article.find({},function(err, portal){
        if(err){
            console.log(err);            
        } else {
            res.render("home", {portal : portal});
        }
   })
 });

app.get("/news/:id", function(req,res){
    Article.findById(req.params.id).populate("comments").exec(function(err, foundArticle){
        if (err){
            console.log(err);
        } else {
            console.log(foundArticle);
            res.render("article", {article: foundArticle});
        }
    });
});

app.get("/news/:id/comments/new", isLoggedIn, function(req,res){
    Article.findById(req.params.id, function(err, article){
        if(err){
            console.log(err);
        } else {
            res.render( "comments/new", {article: Article});
        };
    });
});

 app.post("/news/:id/comments",  function(req,res){
    Article.findById(req.params.id, function(err, article){
        if(err){
            console.log(err);
            res.redirect("/news/:id");
        } else {
            Comment.create(req.bobe.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    Article.comments.push(comment);
                    Article.save();
                    res.redirect("/news/" + article._id);
                };
            });  
        };
    });
 });
//AUTH
app.get("/register", function(req,res){
    res.render("regist");
});

app.post("/register", function(req,res){
    console.log(req.body);
    var newUser = new User({
        Name: req.body.username,
        Surname : req.boby.name2,
        Email: req.body.email
        //Gender: 
    });
    User.register(newUser, req.body.password, function(err,user){
        console.log(user);
        if(err){
            console.log(err);
            return res.render("regist");
        }
        res.redirect("/portal");         
    });
});

//login
app.get("/login", function(req,res){
    res.render("login");
});

app.post("/login", function(req,res, next){
    console.log(req.body);
    passport.authenticate("local",function(err,user,info){
        if(err){
            console.log(err);
            return next(err);
        } 
        if (!user) {
            console.log("Пользователь не найдет");
            return res.redirect("/login");
        }
        console.log("Код успешен");
        return res.redirect("/portal");
        
    })(req,res,next);
});

app.get("/logout", function(req,res){
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

app.listen(3000, '127.0.0.1', function(){
    console.log("Server started");
});