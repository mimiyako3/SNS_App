//formDOMのDOM要素が取得可能
const threadSectionDOM = document.querySelector(".thread-section");
const formDOM  = document.querySelector(".form-section");
//inputテキストのDOM要素取得
const inputTextDOM = document.getElementById("inputTitle");
//inpupt内容のDOM要素取得
const inputContentDOM = document.getElementById("inputContent");

//letで再代入できる形にする
let inputText ="";
let inputContentText = "";

//最初は、Threadの全てを読み込む
const getAllThreads = async ()=>{
    try{
        //データを取得するのでgetにする
        //get内にはエンドポイント
        //結果はオブジェクトで返ってくる
        let allThreads = await axios.get("/api/v1/threads");
        console.log(allThreads);

        //allThreads.dataを取り出してdataに代入
        let {data} = allThreads;
        console.log(data);

        //出力
        //threadとして一つずつ取ってくる
        allThreads = data.map((thread) => {
            //取ってきたものを分割代入で記述
            const {title, content} = thread;
            console.log(title , content);
            //${}で変数を入れることが可能
            return`
                  <div class="single-thread">
                    <h3>${title}</h3>
                    <p>${content}</p>
                  </div>
            `;
        })
        .join("");
        threadSectionDOM .innerHTML = allThreads;

    }catch(err){
        console.log(err);
    }

    };
getAllThreads();

//postメソッド
//フォーカスが外れるごとに実行される
inputTextDOM.addEventListener("change", (e)=>{
     //書き込まれたvalueをinoutTextに入れることが可能
    inputText = e.target.value;
    console.log(inputText);
});

inputContentDOM.addEventListener("change", (e)=>{
    //書き込まれたvalueをinoutTextに入れることが可能
   inputContentText = e.target.value;
});

//送信ボタンが押された時
formDOM.addEventListener("submit", async(e)=>{
    //リロードしない
    e.preventDefault();
    if(inputText && inputContentText){
        console.log("add data");

        try{
            console.log(inputText);
            await axios.post("/api/v1/thread", {
                title: inputText,
                content: inputContentText,
            });
            getAllThreads();
    
        }catch(err){
            console.log(err);
        }
            //投稿したらinputのvalueを削除
            inputText = "";
            contentText = "";
            inputTextDOM.value = "";
            inputContentDOM.value = "";

    }else{
        console.log("error");
    }
})

