import React from 'react';
import marked from 'marked';
import fileSave from 'file-saver';

class Editor extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            value: this.props.text
        }
    }

    saveToFile(file) {
        fileSave.saveAs(file)
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
                </div>
            </div>
        );
    }
}

export default Editor;