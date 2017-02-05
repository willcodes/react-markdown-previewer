import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Editor from './components/Editor';

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Header />
                <Editor />
            </div>
        )
    }
}

ReactDOM.render(
    <App></App>,
    document.getElementById("app")
);