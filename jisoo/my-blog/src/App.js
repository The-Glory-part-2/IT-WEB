import './App.css';
import Header from "./components/Header";
import Main from "./components/Main";
import {useEffect, useRef, useState} from "react";
import Footer from "./components/Footer";
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Post from "./page/Post";
import ErrorPage from "./page/ErrorPage";
import Article from "./page/Article";

const App = () => {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(8);
    const dataId = useRef(101);

    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const currentPosts = (posts) => {
        let currentPosts = 0;
        currentPosts = posts.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    };
    const imgReturn = () => {
        const imgArr = [
            'https://img1.daumcdn.net/thumb/R750x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcSoBnh%2FbtrjT0uGG5m%2F7ISpRJglwE1aqdzwTT0mf1%2Fimg.png',
            'https://img1.daumcdn.net/thumb/R750x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FYGAku%2FbtrHAIEDpKu%2FjkknYI5yagabJK7zZdnZm1%2Fimg.png',
            'https://img1.daumcdn.net/thumb/R750x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fll2rN%2Fbtrjkz5r8Ob%2FtOgJYghI1Km4xuWYjqljq0%2Fimg.png',
            'https://img1.daumcdn.net/thumb/R750x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb23Gc8%2Fbtri0BCp6Yw%2F4k4z0KV6tunClIdYKdlgrk%2Fimg.png',
            'https://img1.daumcdn.net/thumb/R750x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fsd8Hy%2Fbtrg1W1O7J8%2Fkk1UyJQr8rKlum2V58guF1%2Fimg.png',
            'https://img1.daumcdn.net/thumb/R750x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbK4JDq%2FbtrgBICLAg8%2Fr79DKeGBk39boOFEzNOc9k%2Fimg.png',
            'https://img1.daumcdn.net/thumb/R750x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fos5IP%2Fbtrg3rV13gn%2F82UPqQdgsWcNKk87aWKnMk%2Fimg.png',
            'https://img1.daumcdn.net/thumb/R750x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FmNrYp%2FbtrcZtiwLBX%2FgnvmsdKkTj5r2KtnDEvyS0%2Fimg.png',
            'https://img1.daumcdn.net/thumb/R750x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdqRNL7%2FbtrbIcIP4ZY%2FgKHZYrwz5i4dTzhHH5jbi1%2Fimg.png',
            'https://img1.daumcdn.net/thumb/R750x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FmxShG%2FbtraNIwkENN%2FnO6CpEGZPUCpdp1kcWIL11%2Fimg.png',
        ]
        return imgArr.at(Math.floor(Math.random() * 10))
    }

    const dateFormat = (date) => {
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        month = month >= 10 ? month : '0' + month;
        day = day >= 10 ? day : '0' + day;
        hour = hour >= 10 ? hour : '0' + hour;
        minute = minute >= 10 ? minute : '0' + minute;
        return date.getFullYear() + '.' + month + '.' + day + '.' + hour + ':' + minute;
    }

    const getData = async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())

        // const data = res.slice(0,100).map((it) => {
        //     return {
        //         id : it.id,
        //         thumbnailUrl : imgReturn(),
        //         body : it.body,
        //         title: it.title,
        //         date : dateFormat(new Date())
        //     }
        // })
        const data = res.slice(0,100).reduce((acc, cur) => {
            acc = acc ?? [];
            acc.push({
                        id : cur.id,
                        thumbnailUrl : imgReturn(),
                        body : cur.body,
                        title: cur.title,
                        date : dateFormat(new Date())
            })
            return acc
        },[])
        setArticles(data)
    }
    const createArticles = async (title, content) => {
        const newItem ={
            id: dataId.current,
            thumbnailUrl : imgReturn(),
            body : content,
            title: title,
            date : dateFormat(new Date())
        }
        await setArticles([newItem, ...articles]);
        dataId.current += 1;
    }
    const updateArticles = async (title, content, id) => {
        let article = articles.find((it) => it.id === parseInt(id));
        const updateItem = {
            id: parseInt(id),
            thumbnailUrl : article.thumbnailUrl,
            body : content,
            title: title,
            date : article.date
        }
        const newArticles = articles.filter((it) => it.id !== parseInt(id));
        newArticles.unshift(updateItem)
        setArticles(newArticles)
    }
    const deleteArticles = async (id) => {
        const newArticles = articles.filter((it) => it.id !== parseInt(id));
        setArticles(newArticles)
    }

    useEffect(() => {
        getData();
    }, []);
  return (
    <div className="App">
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/'
                       element={
                    <Main dataList={currentPosts(articles)}
                          postsPerPage={postsPerPage}
                          totalPosts={articles.length}
                          paginate={setCurrentPage}/>
                       }/>
                <Route path='/post' element={
                    <Post createArticles={createArticles}/>
                }/>
                <Route path='/article/:id'
                       element={
                           <Article articles={articles}
                                    updateArticles={updateArticles}
                                    deleteArticles={deleteArticles}/>
                       }/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    </div>
  );
}

export default App;
