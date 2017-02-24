import React from 'react';
import ReactDOM from 'react-dom';
import TextData from './components/TextData';
import Editor from './components/Editor';

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Editor />
            </div>
        )
    }
}

ReactDOM.render(
    <App></App>,
    document.getElementById("app")
);