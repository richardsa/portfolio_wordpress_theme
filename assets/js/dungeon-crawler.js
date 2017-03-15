/*jshint esversion: 6 */
// key press listener function http://stackoverflow.com/a/9310900
var width = 50;
var height = 30;
var canvasData = [];
for (var i = 0; i < height; i++) {
  for (var j = 0; j < width; j++){
    var cellState = (Math.random() <= 0.95) ? "space" : "wall";
    canvasData.push({cellState: cellState, row: i, column: j, position: 0, cellValue: ""});
  }
}

var TitleBar = React.createClass({
  getInitialState: function() {
    return {weapon: this.props.weapon, health: this.props.health, level: this.props.level, dungeon: this.props.dungeon, xp: this.props.xp};
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      // from https://github.com/reactjs/react-modal/issues/106
      weapon: nextProps.weapon,
      dungeon: nextProps.dungeon,
      health: nextProps.health,
      xp: nextProps.xp,
      level: nextProps.level
    });
  },
  onClick: function() {
    $(".darkness").toggle();
  },
  render: function() {
    return (
      <div className="titleBar">
        <h1>Richies FCC Dungeon Crawler</h1>
        <p>Kill the boss in Dungeon 4!</p>
        <div className="stats">
          <ul>
            <li>Health: {this.state.health}</li>
            <li>Level: {this.state.level}</li>
            <li>XP: {this.state.xp}</li>
            <li>Weapon: {this.state.weapon}</li>
            <li>Dungeon: {this.state.dungeon}</li>
          </ul>
          <ul>
            <li>Hero:
              <span className="boardSquare hero"></span>
            </li>
            <li>Weapon:
              <span className="boardSquare weapon"></span>
            </li>
            <li>Portal:
              <span className="boardSquare portal"></span>
            </li>
            <li>Potion:
              <span className="boardSquare potion"></span>
            </li>
            <li>Enemy:
              <span className="boardSquare enemy"></span>
            </li>
            <li>Boss:
              <span className="boardSquare boss"></span>
            </li>
          </ul>
        </div>
        <button type="button" onClick={this.onClick}>Toggle Darkness</button>
        <p>This project was created as part of the FreeCodeCamp curriculum (<a href="https://www.freecodecamp.com/challenges/build-a-roguelike-dungeon-crawler-game">Instructions</a>,
          <a href="https://codepen.io/FreeCodeCamp/full/PNJRyd/">Example</a>).</p>
      </div>
    );
  }
});

var Darkness = React.createClass({
  render: function() {
  return (
    <div className="darkness">
    </div>
  );
  }
});


var DungeonCanvas = React.createClass({
  getInitialState: function() {
    return {canvasData: this.props.data, weapon: this.props.weapon, heroLocation: '', health: this.props.health, level: this.props.level, dungeon: this.props.dungeon, xp: this.props.xp, multiplier: 1, bossHealth: 100, bossLocation: []};
  },
  componentDidMount: function() {
    this.getHero();
    this.getWeapons();
    this.getPortal();
    this.getEnemies();
    this.getPotions();
    key('left',this.getMovement.bind(this, "left"));
    key('right',this.getMovement.bind(this, "right"));
    key('up',this.getMovement.bind(this, "up"));
    key('down',this.getMovement.bind(this, "down"));
  },
  getMovement: function(direction){
    var placeHolder = this.state.canvasData;
    var heroLocation = this.state.heroLocation;
    var weapon = this.state.weapon;
    var level = this.state.level;
    var dungeon = this.state.dungeon;
    var newHeroLocation = null;
    var keepLevel = true;
    var health = this.state.health;
    var battleAction = false;
    var bossHealth = this.state.bossHealth;
    var xp = this.state.xp;
    var potionAction = false;
    var boss = false;
    var newGame = false;
    var multiplier = this.state.multiplier;
    var bossLocation = this.state.bossLocation;
    var winner = false;

    function strike (level, weapon=null){
      var strikeCeiling = level * 15;
      if(weapon !== null) Math.floor(strikeCeiling = strikeCeiling * weapon);
      var strikeFloor = strikeCeiling * 0.75;
      return Math.random() * (strikeCeiling - strikeFloor + 1) + strikeFloor;
    }

    function damageMultiplier(weapon){
      var multiplier;
      switch (weapon) {
        case "sword":
          multiplier = 1.3;
          break;
        case "knife":
            multiplier = 1.2;
          break;
        case "bat":
          multiplier = 1.1;
          break;
        case "axe":
          multiplier = 1.4;
          break;
      }
      return multiplier;
    }


    function battle(enemyHealth, direction, boss=false){
      var enemyMultiplier;
      if (boss === true){
        enemyMultiplier = 5;
      } else {
        enemyMultiplier = dungeon;
      }

      enemyHealth = enemyHealth - Math.floor(strike(level, multiplier));

      if (boss===true && enemyHealth < 0){
        winner = true;
        return winner;
      }
      else if(enemyHealth > 0){
        health = health - Math.floor(strike(enemyMultiplier));
        if(health > 0) {
          battleAction = true;
          newHeroLocation = null;

        } else if (health <= 0){
          newGame = true;
        }
      } else {
        xp += 25;
        if ((xp % 100) === 0) level += 1;
        move(direction);
      }

      if(boss === true){
        bossHealth = enemyHealth;
      }

     return enemyHealth;
    }

    function move(dir){
      placeHolder[heroLocation + dir].cellState = "hero";
      placeHolder[heroLocation + dir].position = 2;
      placeHolder[heroLocation].cellState = "space";
      placeHolder[heroLocation].position = 0;
      newHeroLocation = heroLocation + dir;
    }

    function takePotion(dir){
      if(health === (100)){
        return health;
      } else {
        move(dir);
        return 100;
      }
    }

    // movement function
    function movement(dir) {
      if (placeHolder[heroLocation + dir].cellState !== "wall" && placeHolder[heroLocation + dir].cellState === "portal") {
        keepLevel = false;
      }
      else if (placeHolder[heroLocation + dir].cellState !== "wall" && placeHolder[heroLocation + dir].cellState === "enemy"){
        placeHolder[heroLocation + dir].cellValue = battle(placeHolder[heroLocation + dir].cellValue, dir);
      }
      else if (placeHolder[heroLocation + dir].cellState !== "wall" && placeHolder[heroLocation + dir].cellState === "boss"){
        boss = true;
        placeHolder[heroLocation + dir].cellValue = battle(bossHealth, dir, boss);
      }
      else if (placeHolder[heroLocation + dir].cellState !== "wall" && placeHolder[heroLocation + dir].cellState === "potion"){
        health = takePotion(dir);

      }
      else if (placeHolder[heroLocation + dir].cellState !== "wall") {
        if (placeHolder[heroLocation + dir].cellState == "weapon") {
          weapon = placeHolder[heroLocation + dir].cellValue;
          multiplier = damageMultiplier(weapon);
        }
        move(dir);
      }
    }

    if(direction === "left" && placeHolder[heroLocation].column >= 1) {
      movement(-1);
    } else if (direction === "right" && placeHolder[heroLocation].column <= 48){
      movement(1);
    } else if (direction === "up" && placeHolder[heroLocation].row >= 1){
      movement(-50);
    } else if (direction === "down" && placeHolder[heroLocation].row <= 28 ){
      movement(50);
    }

    if (keepLevel === false) {
      placeHolder = this.newLevel();
      this.setState({canvasData: placeHolder});
      this.getPortal();
      this.getHero();
      this.getWeapons();
      this.getEnemies();
      this.getPotions();
      var newDungeonLevel = this.state.dungeon + 1;
      this.setState({dungeon: newDungeonLevel});
      this.props.onDungeonChange(newDungeonLevel);
    }
    else if (winner === true){
      this.newGame("You slayed the Boss!!!!! Click ok to try again!");

    }
    else if (battleAction === true || potionAction === true){
      this.setState({health: health, bossHealth: bossHealth});
      this.props.onHealthChange(this.state.health);
    }
    else if (newGame === true){
      this.newGame("You were defeated! Click ok to try again");
    }
    else if(newHeroLocation !== null){
      placeHolder = this.getOpacity(placeHolder, newHeroLocation);
      this.props.onWeaponChange(weapon);
      this.props.onXPChange(xp);
      this.props.onLevelChange(level);
      this.setState({weapon: weapon, canvasData: placeHolder, heroLocation: newHeroLocation, health: health, xp: xp, level: level, multiplier: multiplier});
      this.props.onHealthChange(this.state.health);
    }
  },
  newGame: function(message){
    var placeHolder = this.newLevel();
    this.getPortal(true);
    this.getHero();
    this.getWeapons();
    this.getEnemies();
    this.getPotions();
    this.setState({dungeon: 1, health: 100, weapon: "fist", canvasData: placeHolder, level: 1, xp: 0});
    this.props.onDungeonChange(1);
    this.props.onWeaponChange("fist");
    this.props.onHealthChange(100);
    this.props.onLevelChange(1);
    this.props.onXPChange(0);
    alert(message);
  },

  newLevel: function(){
    var placeHolder = this.state.canvasData;
    var returnValue = [];
    placeHolder.map(function(cell) {
          cell.position  = 0;
          var cellState = (Math.random() <= 0.95) ? "space" : "wall";
          cell.cellState = cellState;
          returnValue.push(cell);
      });

    return returnValue;
  },
  checkPosition: function(array){
    var keepLooping = true;
    var placeHolder = array;
    var x;
    do {
      x = Math.floor(Math.random() * (placeHolder.length - 0 + 1)) + 0;
      if (placeHolder[x].cellState === "space"){
        keepLooping = false;
      }
      } while (keepLooping);
     return x;
  },
  getHero: function(){
    var placeHolder = this.state.canvasData;
    // generate random whole number from http://stackoverflow.com/a/1527834
    var x = this.checkPosition(placeHolder);
    placeHolder[x].cellState = "hero";
    placeHolder[x].position = 1;
    placeHolder = this.getOpacity(placeHolder, x);
    this.setState({canvasData: placeHolder, heroLocation: x});
  },
  getWeapons: function(){
    var placeHolder = this.state.canvasData;
    var weapons = ["sword", "knife", "bat", "axe"];
    $.each(weapons, function( index, value ) {
      var x = this.checkPosition(placeHolder);
      placeHolder[x].cellState = "weapon";
      placeHolder[x].cellValue = value;

    }.bind(this));
    this.setState({canvasData: placeHolder});
  },
  getBoss: function(){
    var keepLooping = true;
    var bossLocation = [];
    var placeHolder = this.state.canvasData;
    do {
        var x = this.checkPosition(placeHolder);
        if (placeHolder[x].row !== 29 && placeHolder[x].row !== 49){
          placeHolder[x].cellState = "boss";
          placeHolder[x+1].cellState = "boss";
          placeHolder[x+50].cellState = "boss";
          placeHolder[x+51].cellState = "boss";
          bossLocation = [x, x+1, x+50, x+51];
          keepLooping = false;
        }
      } while (keepLooping);
     this.setState({canvasData: placeHolder, bossLocation: bossLocation});
  },
  getPortal: function(newGame = false){
   if (this.state.dungeon === 3 && newGame === false){
      this.getBoss();
      return;
    }
    var placeHolder = this.state.canvasData;
    var x = this.checkPosition(placeHolder);
    placeHolder[x].cellState = "portal";
    this.setState({canvasData: placeHolder});
  },
  getEnemies: function(){
    var placeHolder = this.state.canvasData;
    for(var i = 0; i < 5; i++){
      var x = this.checkPosition(placeHolder);
      placeHolder[x].cellState = "enemy";
      placeHolder[x].cellValue = 100;
    }
    this.setState({canvasData: placeHolder});
  },
  getPotions: function(){
    var placeHolder = this.state.canvasData;
    for(var i = 0; i < 5; i++){
      var x = this.checkPosition(placeHolder);
      placeHolder[x].cellState = "potion";
    }
  },
  getOpacity: function(placeHolder, heroLocation){
    var returnValue = [];
    placeHolder.map(function(cell) {
          cell.position  = 0;
          returnValue.push(cell);
      });
    var adjacentArray = [[-1, -1, -51], [-1, 0, -50], [-1, 1, -49], [0, -1, -1], [0,0,0], [0, 1, 1], [1, -1, 49], [1, 0, 50], [1, 1, 51]];
    adjacentArray.map(function(position){
      var checkPosition = heroLocation + position[2];
      var checkRow = parseInt(position[0]);
      var checkColumn = parseInt(position[1]);
      if(placeHolder[checkPosition] && parseInt(placeHolder[checkPosition].column) === parseInt(placeHolder[heroLocation].column) + checkColumn){
        returnValue[checkPosition].position = 1;
      }

    });
     return returnValue;

  },
  render: function() {
    var cellBlocks = this.state.canvasData.map(function(cell) {
    return (
          <div  style={{zIndex: cell.position}} id={`col${cell.column}row${cell.row}`} className={`boardSquare ${cell.cellState}`}></div>
        );
      });

    return (
      <div className="lifeCanvas">
        {cellBlocks}
      </div>
    );
}
});

// main component
var DungeonContainer = React.createClass({
  getInitialState: function() {
    return {canvasData: this.props.canvasData, weapon: this.props.weapon, health: this.props.health, level: this.props.level, dungeon: this.props.dungeon, xp: 0};
  },
  handleHealthChange: function(health){
    this.setState({health: health});
  },
  handleWeaponChange: function(weapon) {
    this.setState({weapon: weapon});
  },
  handleDungeonChange: function(newDungeon) {
    this.setState({dungeon: newDungeon});
  },
  handleXPChange: function(newXP){
    this.setState({xp: newXP});
  },
  handleLevelChange: function(level){
    this.setState({level: level});
  },
  render: function() {
    return (
      <div className="appContainer" >
        <TitleBar xp={this.state.xp} weapon={this.state.weapon} health={this.state.health} level={this.state.level} dungeon={this.state.dungeon} />
        <Darkness  />
        <DungeonCanvas onHealthChange={this.handleHealthChange} onXPChange={this.handleXPChange} onDungeonChange={this.handleDungeonChange} onLevelChange={this.handleLevelChange} onWeaponChange={this.handleWeaponChange} weapon={this.state.weapon} data={this.state.canvasData} health={this.state.health} level={this.state.level} dungeon={this.state.dungeon} xp={this.state.xp}/>
    </div>
    );

  }
});

ReactDOM.render(
  <DungeonContainer canvasData={canvasData} weapon={"fists"} health={100} level={1} dungeon={1} / >, document.getElementById('app'));
