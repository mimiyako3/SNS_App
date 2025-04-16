import React from 'react';

const Thread :React.FC = () =>{

    return (
    <div>
        <div>
                <div className="board-section">
      <h2>ReactとNode.jsで掲示板作成</h2>
      <div className="thread-list">
        </div>
      </div>
      <form className="form-section" >
        <p>タイトル</p>
        <input type="text" placeholder="タイトル" id="inputTitle" />
        <p>内容</p>
        <textarea id="inputContent" rows={10} cols={30}></textarea>
        <br />
        <button id="submitButton" type="submit">送信</button>
      </form>
    </div>
      
        </div>

        
    );
  };
  
  export default Thread;
  
