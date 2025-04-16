//データスキーマーでデータ構造を定義する
//今回はタイトルと本文(内容)
const mongoose = require("mongoose");

//データスキーマ〜の構築にはmongoose.Schemaを用いる
const ThreadSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, //絶対に書き込まないといけない
        maxlength: 20,

    },
    content:{
        type: String,
        required:true,

    },
});

module.exports = mongoose.model("Thread", ThreadSchema);