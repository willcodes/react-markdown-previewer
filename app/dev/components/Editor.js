import React from 'react';
import marked from 'marked';
import fileSave from 'file-saver';

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "### Markdown Previewer \n ---- \n Hi, I made this so I can quickly write documentation using markdown at work, there are many other online examples on which I drew inspiration from, enjoy! \n\nLearn how to use markdown here: **[How To Markdown](http://www.markdowntutorial.com/)**"
        }
    }

    saveToFile(file)     {
        fileSave.saveAs(file)
    }

    render() {

        let output = (value) => { 
            let parsedMarkdown = marked(value, {sanitize:true}); 
            return { 
                __html: parsedMarkdown 
            } 
        }

        let markdownFile = new File([this.state.value], 'markdown.md', {type: "text/plain;charset=utf-8"});
        let htmlFile = new File([marked(this.state.value)], 'markdown.html', {type: "text/plain;charset=utf-8"});

        return(
            <div class="container">
                <div className = "flex-container">
                    <textarea className="half-container"rows="20" cols="50" value={this.state.value} onChange={event => this.setState({ value: event.target.value })}>
                    </textarea>
                    <div className="half-container" dangerouslySetInnerHTML={output(this.state.value)}></div>
                </div>
                <div className="btn-control">
                    <button type="" onClick={() => {this.saveToFile(markdownFile)}}> Save as markdown </button>
                    <button type="" onClick={() => {this.saveToFile(htmlFile)}}> Save as html</button>
                </div>
            </div>
        );
    }
 }

 export default Editor;