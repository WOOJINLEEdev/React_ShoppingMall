import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import styled from "styled-components";
import { useHistory } from "react-router";
import jwt_decode from "jwt-decode";
import axios from "axios";

const BoardEditor = () => {
  const inputRef = useRef();
  const editorRef = useRef();
  const [inputTitle, setInputTitle] = useState("");
  const history = useHistory();

  const token = localStorage.getItem("token");
  const boardLocalStorage = localStorage.getItem("board");
  const decoded = jwt_decode(token);
  const userId = decoded.user.user_id;
  let isFocusTitle = false;

  useEffect(() => {
    inputRef.current.focus();
  });

  const eventHandler = {
    focus: () => {
      console.log("포커스 훅 확인");
      if (!isFocusTitle) {
        inputRef.current.focus();
        isFocusTitle = true;
      }
    },
  };

  const moveBoard = () => {
    if (boardLocalStorage === "first") {
      history.push("/selectBoard1");
    } else {
      history.push("/selectBoard2");
    }
  };

  const handleEditorSave = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        userId: userId,
        id: "101",
        title: inputTitle,
        body: "",
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleEditorTitle = (e) => {
    setInputTitle(e.target.value);
  };

  return (
    <EditorWrap>
      <div className="board_editor_top">
        <div className="editor_user_btn_wrapper">
          <div className="editor_user">
            작성자: <span style={{ color: "#333" }}>{userId}</span>
          </div>
          <div className="editor_top_btn_group">
            <button
              type="button"
              className="editor_back_btn"
              onClick={moveBoard}
            >
              목록
            </button>
            <button
              type="button"
              className="editor_save_btn"
              onClick={boardLocalStorage === "second" ? handleEditorSave : null}
            >
              저장하기
            </button>
          </div>
        </div>
        <input
          type="text"
          className="board_editor_input_title"
          placeholder="제목"
          onChange={handleEditorTitle}
          ref={inputRef}
        />
      </div>
      <Editor
        previewStyle="vertical"
        height="400px"
        initialEditType="wysiwyg"
        initialValue=""
        placeholder="말은 우리 내면을 비추는 거울입니다."
        language="ko"
        ref={editorRef}
        events={eventHandler}
      />
    </EditorWrap>
  );
};

export default BoardEditor;

const EditorWrap = styled.div`
  padding: 50px;
  height: 100%;
`;