import React from 'react';
import Editor from './Editor';

class TextData extends React.Component {
  constructor() {
    super();
    this.state = { text: '' }
  }
  componentDidMount() {
    let path = window.location.search;
    if (path.indexOf('?query=') === 0) {
        var id = path.split('?query=')[1];
        $.ajax({
            url: "/" + id,
            success: function(text) {
                this.setState({text: text});
            }.bind(this)
            });
        }
    else {
        console.log(this)
        this.setState({text: "### Markdown Previewer \n ---- \n Hi, I made this so I can quickly write documentation using markdown at work, there are many other online examples on which I drew inspiration from, enjoy! \n\nLearn how to use markdown here: **[How To Markdown](http://www.markdowntutorial.com/)**"
        })
    }
  }

    render() {
        return(
            <Editor text={this.state.text} />
        );
    }
 }

export default TextData;