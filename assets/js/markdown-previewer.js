// replace new line characters for proper display in text area
// http://stackoverflow.com/a/28106346
function ReplaceNewLine(input) {
    var newline = String.fromCharCode(13, 10);
    return input.replace('\\n', newline);
};

// intiial markdown text
var unformatted = ("[Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) \n # Headers \n # H1 \n ## H2 \n ### H3 \n # Lists \n 1. First ordered list item \n 2. Another item")
var formatted = ReplaceNewLine(unformatted);
var markedFormatted = marked(unformatted);


var FormattedText = React.createClass({
  getInitialState: function() {
      return {markedText: this.props.data, formattedText: this.props.textData};
   },   handleTextChange: function(e) {
       this.setState({formattedText: e.target.value, markedText: marked(e.target.value)});
       console.log(this.state.markedText);
     },
createMarkup: function (){
                      return { __html: this.state.markedText };
                },
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className='col-md-6'>
              <textarea className="rawInput" rows="25" cols="50" value={this.state.formattedText} onChange={this.handleTextChange}>
              </textarea>

          </div>
          <div className='col-md-6 comentList'>
            <span dangerouslySetInnerHTML={this.createMarkup()} />
          </div>
        </div>
      </div>
    );
  }
})


ReactDOM.render(
      <FormattedText data={markedFormatted} textData={formatted}/>,
  document.getElementById('app')
);
