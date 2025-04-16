import React,{useState, useEffect, FormEvent} from "react";
import axios from "axios";

//型の定義
type Thread ={
    _id? : string;
    title: string;
    content: string;
};

const Script: React.FC =()=>{
    //Threadの配列
    const [threads, setThreads] = useState<Thread[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");


//最初は、Threadの全てを読み込む
const getAllThreads = async ()=>{
    try{
        const allThreads = await axios.get<Thread[]>("localhost:8000/api/v1/threads");
        setThreads(allThreads.data);
        console.log(allThreads);


    }catch(err){
        console.error("データ取得失敗", err);
    }

    };

    useEffect(()=> {
        getAllThreads();
    })



//postメソッド
//フォーカスが外れるごとに実行される
// inputTextDOM.addEventListener("change", (e)=>{
//      //書き込まれたvalueをinoutTextに入れることが可能
//     inputText = e.target.value;
//     console.log(inputText);
// });

// inputContentDOM.addEventListener("change", (e)=>{
//     //書き込まれたvalueをinoutTextに入れることが可能
//    inputContentText = e.target.value;
// });

// //送信ボタンが押された時
// formDOM.addEventListener("submit", async(e)=>{
//     //リロードしない
//     e.preventDefault();
//     if(inputText && inputContentText){
//         console.log("add data");

//         try{
//             console.log(inputText);
//             await axios.post("/api/v1/thread", {
//                 title: inputText,
//                 content: inputContentText,
//             });
//             getAllThreads();

const threadSubmit = async (e: FormEvent)=>{
    e.preventDefault();
    if(!title || ! content) return;
    try{
        await axios.post("/api/v1/thread", { title, content });
        setTitle("");
        setContent("");
        getAllThreads();

    }catch(error){
        console.error("error",error);
    }
} ;
    //         //投稿したらinputのvalueを削除
    //         inputText = "";
    //         contentText = "";
    //         inputTextDOM.value = "";
    //         inputContentDOM.value = "";

    // }else{
    //     console.log("error");
    // }

    return (
        <div className="thread-section">
          <form className="form-section" onSubmit={threadSubmit}>
            <input
              type="text"
              placeholder="タイトル"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              rows={10}
              cols={30}
              placeholder="内容"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit">投稿</button>
          </form>
    
          <div className="thread-list">
            {threads.map((thread, index) => (
              <div key={thread._id ?? index} className="single-thread">
                <h3>{thread.title}</h3>
                <p>{thread.content}</p>
              </div>
            ))}
          </div>
        </div>
      );
};


export default Script;
