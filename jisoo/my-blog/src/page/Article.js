import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Article = ({ articles, updateArticles, deleteArticles }) => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const dataGet = async () => {
        const res = await fetch(`http://localhost:3001/posts/${id}`)
            .then((response) => response.json())
        const article = res.data
        console.log(article)
        setAuthor(article)
        setName(article.author.name)
        setTitle(article.title);
        setContent(article.content);
    }

    useEffect(() => {
        dataGet();
    }, [id]);

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
            <div style={{ textAlign: 'center' }}>
                <h1 className="post-title">작성자 : {name}</h1>
                <img className="container-img" src={author.thumbnailUrl} alt="My Image" />
            </div>
            <div style={{float: "right", margin: "10px"}}>
                조회수: {author.viewCnt}
            </div>
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
