//expresnpのモジュールを読み込む
const express = require("express");

const mongoose = require("mongoose");

//expressをインスタンス化
const app =express();

//ThreadSchemaのインポート
//データの所得や作成が可能になる
const Thread = require("./models/Thread");

//PORT番号を設定
const PORT = 8000;



//静的なファイルはpublicファイルを見に行ってという宣言
app.use(express.static("public"));
app.use(express.json());

mongoose.connect(
    "mongodb+srv://miyako3:3CXW44321@cluster0.9xw1iwj.mongodb.net/threads?retryWrites=true&w=majority&appName=Cluster0"
)
.then(()=>console.log("DB connected"))
.catch((err) => console.log(err));

////DBのデータを全て取得する
app.get("/api/v1/threads", async(req, res) =>{   
    try {     
        const allThreads = await Thread.find({});
        res.status(200).json(allThreads);

    }catch(err){
        console.log(err);
    }
});

//DBに書き込む
app.post("/api/v1/thread", async(req, res) =>{   
    try {
        //Thread.create(req.body)で新しいデータの登録
        const createThreads = await Thread.create(req.body);
        res.status(200).json(createThreads);      
    }catch(err){
        console.log(err);
    }
});

//いいねに追加
app.post("addLikes", async(req, res) =>{
    const userId = req.body.userId;
    const postId = req.body.postId;

    try{
        const allLikesThreads = await LikesThreads.find({});
        res.status(200).json(likesThreads);   

    }catch{
        console.log(err);

    }

});


//listenイベントで8000番ポートでサーバーを起動する
//consoleで確認
app.listen(PORT, console.log("server running"));