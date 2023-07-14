import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Article = ({ articles, updateArticles, deleteArticles }) => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        let article = articles.find((it) => it.id === parseInt(id));
        setTitle(article.title);
        setContent(article.body);
    }, [articles, id]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleSave = () => {
        updateArticles(title, content, id);
        navigate('/');
    };
    const handleDelete = () => {
        let con = window.confirm('삭제하시겠습니까?')
        if(!con){
            return
        }
        deleteArticles(id);
        navigate('/');
    }

    if (title === null || content === null) {
        return <div>Loading...</div>;
    }

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
                <button onClick={handleDelete} className="cancel-button">
                    삭제
                </button>
                <button onClick={handleSave} className="save-button">
                    저장
                </button>
            </div>
        </div>
    );
};

export default Article;
