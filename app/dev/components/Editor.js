//main logic for editor lives here.

import React from 'react';
import marked from 'marked';
import fileSave from 'file-saver';

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }
    
    componentDidMount() {

        let defaultText = "### Markdown Previewer \n ---- \n Hi, I made this so I can quickly write documentation using markdown at work, there are many other online examples on which I drew inspiration from, enjoy! \n\nLearn how to use markdown here: **[How To Markdown](http://www.markdowntutorial.com/)**";
        
        if (window.location.search.indexOf('?query=') > -1) {
            var id = window.location.search.split('?query=')[1];
            fetch('/' + id).then((res) => {
                return res.text();
            }).then((myRes) => {
                console.log(myRes)
                if(myRes!== '') {
                    this.setState({
                        value: myRes
                    })
                }
                else {
                    this.setState({
                        value: defaultText
                    })                    
                }
            })
        }

        else {
            this.setState({
                value: defaultText
            })
        }
    }
    

    saveToFile(file) {
        fileSave.saveAs(file)
    }

    _saveDocument() {
        let shouldSave = window.location.search.indexOf('?query=');
        if(shouldSave !== -1) {
            console.log(window.location.search.indexOf('?query='))
            let docName = window.location.search.split('?query=')[1];

            let request = new Request('/save', {
                method: 'POST', 
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body:JSON.stringify({ 
                    docName,
                    docContent:this.state.value
                })
            });
            fetch(request).then(function(res) { 
                console.log(res);
            });
        }
        else {
            console.log('err');
            window.location = '?query='+Math.random().toString(36).substring(7);
        }
    }

    render() {

        let output = (value) => {
            let parsedMarkdown = marked(value, { sanitize: true });
            return {
                __html: parsedMarkdown
            }
        }

        let markdownFile = new File([this.state.value], 'markdown.md', { type: "text/plain;charset=utf-8" });
        let htmlFile = new File([marked(this.state.value)], 'markdown.html', { type: "text/plain;charset=utf-8" });

        return (
            <div className="container">
                <header>
                    <h1>Markdown Previewer</h1>
                </header>
                <div className="flex-container">
                    <textarea className="half-container" rows="20" cols="50" value={this.state.value} onChange={event => this.setState({ value: event.target.value })}>
                    </textarea>
                    <div className="half-container" dangerouslySetInnerHTML={output(this.state.value)}></div>
                </div>
                <div className="btn-control">
                    <button type="" onClick={() => { this.saveToFile(markdownFile) }}> Save as markdown </button>
                    <button type="" onClick={() => { this.saveToFile(htmlFile) }}> Save as html</button>
                    <button type="" onClick={() => { this._saveDocument() }}> Save&Share</button>
                </div>
            </div>
        );
    }
}

export default Editor;