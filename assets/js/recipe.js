var recipes = JSON.parse(localStorage.getItem("_username_recipes"));
var editContext = "Add Recipe";

if (recipes === null || recipes === undefined) {
  recipes = [
    {
      "id": 1473119932614,
      "recipeName": "bisgetti",
      "recipeIngredients": "bisgetti noodles, bisgetti sauce"
    }, {
      "id": 1473119947060,
      "recipeName": "peanut butter and jelly",
      "recipeIngredients": "peanut butter, jelly, bread"
    }
  ];
  window.localStorage.setItem("_username_recipes", JSON.stringify(recipes));
}

var i = 0;
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
});

var Jumbotron = React.createClass({
  render: function() {
    return (
      <div className="row text-center jumbotron">
        <h1>Richie's Recipe Box</h1>
      </div>
    );
  }
});

var RecipeModal = React.createClass({
  getInitialState: function() {
    return {editContext: this.props.editContext, recipeName: this.props.recipeName, ingredientList: this.props.ingredientList, recipeId: this.props.recipeId};
  },
  handleNameChange: function(e) {
    this.setState({recipeName: e.target.value});
  },
  handleIngredientChange: function(e) {
    this.setState({ingredientList: e.target.value});
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      // from https://github.com/reactjs/react-modal/issues/106
      editContext: nextProps.editContext,
      recipeName: nextProps.recipeName,
      ingredientList: nextProps.ingredientList,
      recipeId: nextProps.recipeId
    });
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var recipeName = this.state.recipeName.trim();
    var ingredientList = this.state.ingredientList.trim();
    if (!recipeName || !ingredientList) {
      return;
    } else {
      if (this.state.editContext == "Edit Recipe") {
        for (var i = 0; i < recipes.length; i++) {
          for (var prop in recipes[i]) {
            if (prop === "id" && recipes[i][prop] === this.state.recipeId) {
              recipes[i].recipeName = recipeName
              recipes[i].recipeIngredients = ingredientList

            }
          }
        }
      } else {
        recipes.push({id: Date.now(), recipeName: recipeName, recipeIngredients: ingredientList});
      }
      window.localStorage.setItem("_username_recipes", JSON.stringify(recipes));
      this.props.onRecipeSubmit(recipes);
      this.setState({recipeName: '', ingredientList: ''});
     $('#addRecipe').modal('toggle');
     // $('.panel-collapse.in').collapse('hide');
    }

  },
  render: function() {
    return (
      <div className="modal fade" id="addRecipe" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">{this.state.editContext}</h4>
            </div>
            <div className="modal-body">
              <form id="modalForm" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label for="recipeNameInput">Recipe</label>
                  <input type="text" className="form-control" id="recipeNameInput" aria-describedby="recipeName" placeholder="Recipe Name" value={this.state.recipeName} onChange={this.handleNameChange}/>
                </div>
                <div className="form-group">
                  <label for="ingredientsInput">Ingredients</label>
                  <input type="text" className="form-control" id="ingredientsInput" placeholder="Enter Ingredients, Separated, By Commas" value={this.state.ingredientList} onChange={this.handleIngredientChange}/>
                </div>
                <input type="submit" id="mainModal" className="btn btn-primary" value={`${this.state.editContext}`}/>
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

// function to return formatted ingredient list data-dismiss="modal"
var IngredientList = React.createClass({
  getInitialState: function() {
    return {recipes: this.props.data.split(',')};
  },  componentWillReceiveProps: function(nextProps) {
    this.setState({
        // from https://github.com/reactjs/react-modal/issues/106
        recipes: nextProps.data.split(',')
      });
    },
  render: function() {
    var ingredients = this.state.recipes.map(function(ingredient) {

      return (
        <span>
          <li className="list-group-item">{ingredient}</li>
        </span>
      );
    })
    return (
      <div className="ingredientList">

        <h3 className="text-center">Ingredients</h3>
        <ul className="list-group">
          {ingredients}
        </ul>

      </div>
    );
  }
})

// main function for returning recipe list
// arrow function to prevent onclick being called on render from: http://stackoverflow.com/a/34226188
// splice - remove from array by index: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
var RecipeList = React.createClass({
  getInitialState: function() {

    return {recipes: this.props.data};
  },
  handleDelete: function(deleteMe) {

    var deleteId = deleteMe;
    for (var i = 0; i < recipes.length; i++) {
      for (var prop in recipes[i]) {
        if (prop === "id" && recipes[i][prop] === deleteId) {
          var removed = recipes.splice(i, 1);
          window.localStorage.setItem("_username_recipes", JSON.stringify(recipes));
          this.props.onRecipeSubmit(recipes);
          return;
        }
      }
    }

  },
  handleEdit: function(editMe) {
    var editId = editMe;
    for (var i = 0; i < recipes.length; i++) {
      for (var prop in recipes[i]) {
        if (prop === "id" && recipes[i][prop] === editId) {
          this.props.onRecipeEdit(recipes[i]);
          return;
        }
      }
    }

  },
  render: function() {
    var iterator = 0;
    var recipeNodes = this.state.recipes.map(function(recipe) {
      iterator += 1;
      return (

          <div className="panel panel-success">
            <div className="panel-heading" role="tab" id={`heading${iterator}`}>
              <h4 className="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href={`#collapse${iterator}`} aria-expanded="false" aria-controls={`collapse${iterator}`}>
                  {recipe.recipeName}
                </a>
              </h4>
            </div>
            <div id={`collapse${iterator}`} className="panel-collapse collapse" role="tabpanel" aria-labelledby={`heading${iterator}`}>
              <IngredientList data={recipe.recipeIngredients}/>

              <input type="button" className="btn btn-success" onClick={() => this.handleEdit(recipe.id)} value="Edit Recipe" data-toggle="modal" data-target="#addRecipe"/>
              <input type="button" className="btn btn-danger" onClick={() => this.handleDelete(recipe.id)} value="Delete Recipe"/>
            </div>
          </div>


      );
    }.bind(this));
    return (

      <div className="recipeList">
        <div id="accordion" className="panel-group" role="tablist" aria-multiselectable="true">

          {recipeNodes}

        </div>
      </div>

    );
  }
})

// main component
var RecipeBox = React.createClass({
  getInitialState: function() {
    return {recipes: this.props.data, editContext: "Add Recipe", recipeName: '', ingredientList: '', recipeId: ''};
  },
  handleRecipeSubmit: function(comment) {
    this.setState({recipes: comment, recipeName: '', ingredientList: '', recipeId: ''});
  },
  setAddRecipe: function(context) {
    this.setState({editContext: context})
  },
  handleRecipeEdit: function(comment) {
    return this.setState({editContext: "Edit Recipe", recipeName: comment.recipeName, ingredientList: comment.recipeIngredients, recipeId: comment.id})
  },
  render: function() {
    return (
      <div className="container">
        <Jumbotron/>
        <div className="recipeContainer row">
        <RecipeList data={this.state.recipes} onRecipeSubmit={this.handleRecipeSubmit} onRecipeEdit={this.handleRecipeEdit.bind(this)}/>
        <RecipeModal editContext={this.state.editContext} recipeName={this.state.recipeName} ingredientList={this.state.ingredientList} recipeId={this.state.recipeId} onRecipeSubmit={this.handleRecipeSubmit}/>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addRecipe" onClick={() => this.setAddRecipe("Add Recipe")}>Add Recipe</button>
        </div>
      </div>
    );

  }
});

ReactDOM.render(
  <RecipeBox data={recipes}/>, document.getElementById('app'));
