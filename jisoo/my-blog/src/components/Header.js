import { BrowserRouter as Router, Link } from 'react-router-dom';
import React from "react";
import Post from "../page/Post";
import Main from "./Main";

const Header = () => {
    return (
            <div className="container">
                <nav className="navigation">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/post">글쓰기</Link>
                        </li>
                    </ul>
                </nav>
            </div>
    );
}

export default Header;
