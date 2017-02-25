// import React from 'react';
// import Editor from './Editor';

// class TextData extends React.Component {
//   constructor() {
//     super();
//     this.state = { text: '' }
//   }
//   componentWillMount() {
//     let path = window.location.search;

//     if (path.indexOf('?query=') > -1) {
//         var id = path.split('?query=')[1];

//         fetch('/' + id).then((res) => {
//             return res.text();
//         }).then((myRes) => {
//             this.setState({
//                 text:'myRes'
//             })
//         })
//         }
//     else {
//         this.setState({text: 
//         })
//     }
//   }

//     render() {
//         return(
//             <Editor text={this.state.text} />
//         );
//     }
//  }

// export default TextData;

