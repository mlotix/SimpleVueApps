var templ = `      <div class="tic-wrap">
<div class="tic-header" v-show="!winner">
  <h1>Tic Tac Toe</h1>
  <h5>by Michal Mlotowski</h5>
  <button type="button" v-show="!inProgress" @click.prevent="gameStart" class="btn btn-lg btn-block btn-custom">Start</button>
  <h3 v-show="inProgress">Next move: {{currentMove}}</h3>
  </div>
  <div class="tic-header" v-show="winner">
    <h1>{{winner}} has won the game!</h1>
    <h5>Thank you for playing!</h5>
    <button type="button" @click.prevent="gameRestart" class="btn btn-lg btn-block btn-custom">Play again</button>
    </div>
        <div class="row">
          <div class="col-4" v-for="(square, index) in squares">
            <div class="tic-square" @mouseover="onHover(square)" @mouseleave="offHover(square)" @click="makeMove(square)" :class="square.vueClass">
            <div class="tic-inside">
              <p v-show="square.value"class="tic-value">
                {{square.value}}
                {{square.hoverValue}}
              </p>
              <p v-show="square.hoverValue" class="tic-value">
                {{square.hoverValue}}
              </p>
            </div>
            </div>
          </div>
        </div>
      </div>`


var game = Vue.component('quad', {
  template: templ,
  data: function(){
    return {
      winner: null,
      inProgress: false,
      currentMove: null,
      squares: [
        {id:1, value:'', hoverValue:'', vueClass:''},
        {id:2, value:'', hoverValue:'', vueClass:''},
        {id:3, value:'', hoverValue:'', vueClass:''},
        {id:4, value:'', hoverValue:'', vueClass:''},
        {id:5, value:'', hoverValue:'', vueClass:''},
        {id:6, value:'', hoverValue:'', vueClass:''},
        {id:7, value:'', hoverValue:'', vueClass:''},
        {id:8, value:'', hoverValue:'', vueClass:''},
        {id:9, value:'', hoverValue:'', vueClass:''},
      ]
    }
  },
  methods:{
    gameStart: function() {
      this.inProgress = true;
      this.currentMove = 'X';
    },
    gameRestart: function(){

      this.squares.forEach((square) => {
        square.value = "";
        square.vueClass = "";
        square.hoverValue = "";
      })
      this.winner=null;
      this.inProgress = true;
      this.currentMove = "X";
    },
    isActive: function(){
      if(!this.inProgress){
        return false;
      }
      if(this.inProgress===true && (this.currentMove=="X" || this.currentMove=="O")){
        return true;
      }
      return false;
    },
    onHover: function(square) {
      if(this.isActive() && square.value==''){
        square.hoverValue = this.currentMove;
        square.vueClass = 'tic-hover';
      }

  },
  offHover: function(square){
    if(square.hoverValue!=""){
      square.hoverValue="";
      square.vueClass='';
    }
  },
  makeMove: function (square){
    if(this.isActive() && square.value==''){
      square.hoverValue="";
      square.value = this.currentMove;
      if(this.currentMove=="X"){
        square.vueClass = 'tic-x';
        this.currentMove = 'O';
      }
      else {
        square.vueClass = 'tic-o';
        this.currentMove = 'X';
      }
    }
  }
},
  watch: {
    currentMove: function(){
      const winninglist = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
      ];
      winninglist.forEach((win) => {
        var [a,b,c] = win;
        var aVal = this.squares[a].value;
        var bVal = this.squares[b].value;
        var cVal = this.squares[c].value;

        if(aVal!="" && aVal===bVal && bVal===cVal){
          this.inProgress = "false";
          this.winner = aVal;
          this.currentMove = null;

          this.squares[a].vueClass = 'tic-win';
          this.squares[b].vueClass = 'tic-win';
          this.squares[c].vueClass = 'tic-win';
        }
      })

      var check = 0;

      this.squares.forEach((square) => {
        if(square.value==''){
          check=1;
        }
      })
      if(check===0){
        this.inProgress = "false";
        this.winner = 'nobody';
        this.currentMove = null;
      }

    }
  }
})


var app = new Vue({
  el: '#ticApp'
})
Vue.config.devtools = true;
