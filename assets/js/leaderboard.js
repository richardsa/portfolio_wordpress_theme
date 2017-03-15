var recentURL = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";
var allTimeURL = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";


var LeaderBoard = React.createClass({
  getInitialState: function() {
   return {data: [], recentSort: "glyphicon glyphicon-chevron-down",   allSort: ""};
 },
  componentDidMount:function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }, handleClick: function(e) {
      // e.target.getAttribute('data-value') tip from
      // https://stackoverflow.com/questions/33523241/e-target-is-accessible-but-e-target-value-is-not-in-react-component/33524310#33524310
      console.log( e.target.getAttribute('data-value'))
    $.ajax({
      url: e.target.getAttribute('data-value'),
      dataType: 'json',
      cache: false,
      success: function(data) {

        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {

        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });


    if (e.target.getAttribute('data-value') === recentURL) {
      this.setState({recentSort: "glyphicon glyphicon-chevron-down",   allSort: ""})
    } else if (e.target.getAttribute('data-value') === allTimeURL){
      this.setState({recentSort: "",   allSort: "glyphicon glyphicon-chevron-down"})
    }

  },
  render: function() {
    var iterator = 0;
    var commentNodes = this.state.data.map(function(comment) {
      return (

          <tr>
          <th scope="row">{iterator+=1}</th>
          <td><a href={`https://www.freecodecamp.com/${comment.username}` }><img className="leaderImg" src={`${comment.img}`} />{comment.username}</a></td>
          <td>{comment.recent}</td>
          <td>{comment.alltime}</td>
        </tr>

      );
    });
    return (
      <div className="container">
        <div className="text-center jumbotron">
          <h1>Richie's Camper Leaderboard</h1>
        </div>
      <div className="leaderBoard">
        <table className="table table-striped table-bordered table-responsive">
  <thead>
    <tr>
      <th>#</th>
      <th>Camper Name</th>
      <th className="tableSort" onClick={this.handleClick} data-value={recentURL} >Points in past 30 days <span className={`${this.state.recentSort}`}></span></th>
      <th className="tableSort"  onClick={this.handleClick} data-value={allTimeURL} >All time points <span className={`${this.state.allSort}`}></span> </th>
    </tr>
  </thead>
  <tbody>
        {commentNodes}
    </tbody>  </table></div></div>
    );

  }
});

ReactDOM.render(
  <LeaderBoard url={recentURL} />,
  document.getElementById('app')
);
