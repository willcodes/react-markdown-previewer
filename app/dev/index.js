import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Editor from './components/Editor';

function getQuery() {
    let path = window.location.search;
    if (path.indexOf('?query=') === 0) {
        var id = path.split('?query=')[1];
        $.ajax({
            url: '/' + id
        }).then((res) => {
            console.log(res)
            if (res !== '') {
                return res;
            }
        })
    }
    return "### Markdown Previewer \n ---- \n Hi, I made this so I can quickly write documentation using markdown at work, there are many other online examples on which I drew inspiration from, enjoy! \n\nLearn how to use markdown here: **[How To Markdown](http://www.markdowntutorial.com/)**";
}

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Header />
                <Editor initialText={getQuery()} />
            </div>
        )
    }
}

ReactDOM.render(
    <App></App>,
    document.getElementById("app")
);