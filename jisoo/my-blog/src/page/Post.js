import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Post = ({createArticles}) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleSave = async () => {
        await createArticles(title, content);
        navigate(-1);
    };

    return (
        <div className="post-container">
            <h1 className="post-title">글쓰기</h1>
            <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="제목"
                className="post-input"
            />
            <textarea
                value={content}
                onChange={handleContentChange}
                placeholder="내용"
                className="post-textarea"
            ></textarea>
            <div className="button-container">
                <button onClick={handleCancel} className="cancel-button">
                    취소
                </button>
                <button onClick={handleSave} className="save-button">
                    저장
                </button>
            </div>
        </div>
    );
};

export default Post;
