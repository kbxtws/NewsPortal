var mongoose = require("mongoose");
    Article  = require("./news");
    Comment  = require("./comment");
   var data = [
       {
           title:"Игра в имитацию",
           image:"https://img.tv3.ru/67/21/58604.jpg",
           body: "Английский математик и логик Алан Тьюринг пытается взломать код немецкой шифровальной машины Enigma во время Второй мировой войны.",
       },
        {
            title:"Мойор Гром: Чумной Доктор",
            image:"https://cinemax.ru/wp-content/uploads/2021/03/вароофвор.jpg",
            body:"Майор полиции Игорь Гром известен всему Санкт-Петербургу пробивным характером и непримиримой позицией по отношению к преступникам всех мастей. Неимоверная сила, аналитический склад ума и неподкупность — всё это делает майора Грома идеальным полицейским. Но всё резко меняется с появлением человека в маске Чумного Доктора. Заявив, что его город «болен чумой беззакония», он принимается за «лечение», убивая людей, которые в своё время избежали наказания при помощи денег и влияния. Общество взбудоражено. Полиция бессильна. Игорь впервые сталкивается с трудностями в расследовании, от итогов которого может зависеть судьба всего города.",
        },
        {
            title: "Воздушное такси в Гомеле: как летали на «кукурузниках» за малиной и что сделал Мулявин, когда опоздал на рейс",
            image: "https://gomel.today/wp-content/uploads/2021/04/letchiki5.jpg",
            body: "Оказывается, хоть в нашем городе и не было своего трамвая, но существовали такие виды транспорта, как речное такси и регулярные авиаперелеты в райцентры и деревни. Первые аэропланы появляются в Гомеле во время Первой мировой войны. В 20-е годы тут уже действует военный аэродром, потом начинают выполняться и пассажирские рейсы.",
        },
        {
            title:"Гомельский суд признал телеграм-канал «Черная книга Беларуси» и ее региональные «дочки» экстремистскими",
            image: "https://gomel.today/wp-content/uploads/2021/04/3-17-17.jpg",
            body:"29 апреля суд Железнодорожного района Гомеля внес телеграмм-каналы «Черная книга Беларуси», «ЧКБ Витебск и область», «ЧКБ Могилев и область», «ЧКБ Гомель и область», «ЧКБ Брест и область», «ЧКБ Гродно и область» в список экстремистских.",
        },
        {
            title: "Британцы шокированы необычным пасхальным яйцом в форме баклажана", 
            image: "https://kedem.ru/photo/news/2021/04/big/nphoto1619614655.jpg",
            body: "Британская компания M&S представила новое шоколадное пасхальное яйцо в форме баклажана, входящее в ассортимент Plant Kitchen. Яйцо, получившее название «Кухня из яичных растений» (американское название баклажана), является полностью веганским.",
        },
        {
            title: "Диетолог назвала лучший маринад для шашлыка",
            image:"https://cdn.iz.ru/sites/default/files/styles/900x506/public/news-2021-04/KAZ_7685%204_0.jpg?itok=iEdiP-EC",
            body: "Лучшим маринадом для шашлыка врач-диетолог Маргарита Королева назвала гранатовый сок. По ее словам, он делает мясо мягким, сохраняя всю его питательную ценность.Ы",
        }
        
   ];

   function seedDB(){
        Article.deleteMany({}, function(err){
            if (err){
              console.log(err);
            }
            console.log ("Удалены все новости");
            data.forEach(function(seed){
                Article.create(seed, function(err, data){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("Добавлена новая новость");
                        Comment.deleteMany({}, function(err){
                            if (err){
                              console.log(err);
                            }
                            console.log ("Удалены comm");
                            Comment.create(
                            {
                                text: "Очень интересно",
                                author: "Xenia"
                            }, function(err,comment){
                                if(err){
                                 console.log(err);
                                } else {
                                Article.comments = [comment];
                                //Article.save();
                                console.log("Добавлен кооментарий");
                            }
                        });
                     });
                    };
                });
            });
        });
    };
     
    

    module.exports = seedDB
