/*jshint esversion: 6 */
var intervalID;
var width = 50;
var height = 50;
var canvasData = [];
for (var i = 0; i < height; i++) {
  for (var j = 0; j < width; j++){
    var cellState = (Math.random() <= 0.75) ? "dead" : "alive";
  //  canvasData.push(cellState);
  canvasData.push({cellState: cellState, row: i, column: j});
  }
}

var TitleBar = React.createClass({
  render: function() {
  return (
    <div className="titleBar">
      <a href="https://www.math.cornell.edu/~lipa/mec/lesson6.html" target="_blank" >Richie's ReactJS Game of Life (click to learn more)</a>
    </div>
  );
}
});

var LifeCanvas = React.createClass({
  getInitialState: function() {
    return {canvasData: this.props.data, generation: 1, intervalID: 0};
  },
  componentDidMount: function() {
  this.handleStart();
},
 handleStop: function(){
  clearInterval(this.state.intervalID);
 },
 handleStart: function(){
  if (this.state.generation !== 0){
     intervalID = setInterval(this.rerenderCanvasData, 1000);
     this.setState({intervalID: intervalID });
   }
 },
 handleClear: function(){
   this.handleStop();
   var placeHolder = [];
   this.state.canvasData.map(function(cell){
     cell.cellState = "dead";
     placeHolder.push(cell);
   });
   this.setState({canvasData: placeHolder, generation: 0});
 },
 handleRestart: function(){
   this.handleStop();
   var placeHolder = [];
   this.state.canvasData.map(function(cell){
     //cell.cellState = "dead";
     if(Math.random() <= 0.75 ){
       cell.cellState = "dead";
     } else {
       cell.cellState = "alive";
     }
    // Math.random() <= 0.75 ? cell.cellState = "dead" : cell.cellState = "alive";
     placeHolder.push(cell);
   });
   this.setState({canvasData: placeHolder, generation: 1}, this.handleStart);
  // this.handleStart();
 },
 rerenderCanvasData: function(){
   var placeHolder = [];
   this.state.canvasData.map(function(cell){
     var adjacentArray = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
     var neighbors = 0;
     adjacentArray.map(function(position){
       var testCol = cell.column + position[0];
       var testRow = cell.row + position[1];
       var test = "col" + testCol + "row" + testRow;

       if (document.getElementById(test)){
        if ($('#' + test).hasClass( "alive" )){
          neighbors+=1;
        }
       } else {

       }
     });

     if(cell.cellState === "dead" && (neighbors === 3)){
       cell.cellState = "alive";
    } else if (cell.cellState === "alive" && (neighbors === 2 || neighbors === 3)){
       cell.cellState = "alive";
     } else {
       cell.cellState = "dead";
    }
     placeHolder.push(cell);
  });
   this.setState({canvasData: placeHolder, generation: this.state.generation + 1 });
 },
  render: function() {
    var cellBlocks = this.state.canvasData.map(function(cell) {

        return (
          <div id={`col${cell.column}row${cell.row}`} className={`divClass ${cell.cellState}`}></div>
        );
      });

    return (
      <div className="lifeCanvas">
        <div className="buttonRow">
        <button onClick={this.handleStop} type="button">Stop</button>
        <button onClick={this.handleStart} type="button">Start</button>
        <button onClick={this.handleClear} type="button">Clear</button>
        <button onClick={this.handleRestart} type="button">Restart</button>
        <div className="generation">
        Generation: {this.state.generation}
      </div>
        </div>
          {cellBlocks}
      </div>
    );

}
});


// main component
var LifeContainer = React.createClass({
  render: function() {
    return (
      <div className="container1">
        <TitleBar />
        <LifeCanvas data={canvasData}/>
      </div>
    );

  }
});

ReactDOM.render(
  <LifeContainer / >, document.getElementById('app'));
