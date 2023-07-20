import React from 'react';
import Pagination from "./Pagination";
import {Link} from "react-router-dom";

const Main = ({dataList, postsPerPage, totalPosts, paginate}) => {
    return (
        <div className="main-wrapper">
            <h2 className="tit_section">전체글</h2>
            <div className="main-component">
                {dataList.map((article) => (
                    <Link key={article.id} to={"/article/" + article.id} className="main-anchor">
                        <div key={article.id} className="article">
                            <img src={article.thumbnailUrl} alt={article.title} className="article-image" />
                            <h2 className="article-title">{article.title}</h2>
                            <p className="article-date">
                                {new Date(article.createdAt).toLocaleString("ko-KR", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                })}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="inner-component">
                {dataList.map((article) => (
                    <Link key={article.id} to={"/article/" + article.id} className="inner-anchor">
                        <div key={article.id} className="content-article-item">
                            <div className="content-article-content">
                                <h2 className="content-article-title">{article.title}</h2>
                                <p className="content-article-preview">{article.content.substring(0, 30)}...</p>
                                <p className="content-article-date">
                                    {new Date(article.createdAt).toLocaleString("ko-KR", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                    })}
                                </p>
                            </div>
                            <img src={article.thumbnailUrl} alt={article.title} className="content-article-image" />
                        </div>
                    </Link>
                ))}
            </div>
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={totalPosts}
                paginate={paginate}
            ></Pagination>
        </div>
    );
}

export default Main;
// https://chanhuiseok.github.io/posts/react-13/
