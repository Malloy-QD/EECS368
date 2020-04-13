var Board = new Array();
var flag = 1;
var count = 0;
var player = 1;
constructor();
setArr();
rotate(flag);
//constructe the game board with circle without any color
function constructor(){
  //set canvas element
  this.c = document.getElementById("myCanvas");
  this.ctx = this.c.getContext("2d");
  //draw circle using 2d ARRAY
  for (var i = 0; i< 7;i++){
    for(var j = 0; j <6; j ++){
      this.ctx.beginPath();
      this.ctx.arc(i*100+100, j*100+100, 50, 0, 2 * Math.PI);
      this.ctx.fillStyle = "white";
      this.ctx.fill();
      this.ctx.stroke();
    }
  }
  //print  1 2 3 4 5 6 7 at the bottom part(Programing only)
  //Might using this in the furture
  // this.ctx.font = "30px Arial";
  // this.ctx.strokeText("1", 90, 700);
  // this.ctx.strokeText("2", 190, 700);
  // this.ctx.strokeText("3", 290, 700);
  // this.ctx.strokeText("4", 390, 700);
  // this.ctx.strokeText("5", 490, 700);
  // this.ctx.strokeText("6", 590, 700);
  // this.ctx.strokeText("7", 690, 700);

}

//set the actual board to store 2d array
function setArr()
{
  for(var i =0;i<6;i++){
    Board[i] = new Array();
    for(var j = 0;j < 7;j++){
      Board[i].push(0);
    }
  }
  //set Board =[[0,0,0,0,0,0,0],
  //            [0,0,0,0,0,0,0],
  //            [0,0,0,0,0,0,0],
  //            [0,0,0,0,0,0,0],
  //            [0,0,0,0,0,0,0],
  //            [0,0,0,0,0,0,0]]
  // 7*6 2d array with 0

}


//Took a value parameter as argurment
//value is the value at the 2d ARRAY
//if value matches condition inside the function, then one player wins
function Win(value){
  var temp = value;
  var count = 0;

  //HORIZONTAL WIN
  for(var i = 0;i<6;i++){
    for(var j = 0; j< 7;j++){

      if(temp==Board[i][j] && Board[i][j]!=0){
        count = count + 1;
      }
      else{
        count = 0;
      }
      if(count == 4){
        count = 0;
        return true;
        break;
      }
    }
  }

    //Vertical WIN
    for(var i = 0;i<7;i++){
      for(var j = 0; j< 6;j++){
        if(Board[j][i]==temp && Board[j][i]!=0){
          count = count + 1;
        }
        else{
          count = 0;
        }
        if(count == 4){
          return true;
          break;
        }
      }
    }

    //Sideling Win
    for(var i = 0;i<3;i++){
      for(var j = 0; j<4;j++){
        if (Board[i][j] == Board[i+1][j+1] && Board[i+1][j+1] == Board[i+2][j+2]
          && Board[i+2][j+2] == Board[i+3][j+3] && Board[i+3][j+3]==temp)
      {
        return true;
      }
      if (Board[i][6-j] == Board[i+1][5-j] && Board[i+1][5-j] == Board[i+2][4-j]
                    && Board[i+2][4-j] == Board[i+3][3-j] && Board[i+3][3-j]==temp)
      {
        return true;
      }
      }
    }
  return false;
}

//Make sure player can only place on 0 value's coordinate
function CheckValid(row,col){
  if(Board[row][col] == 0){
    return true;
  }
  else{
    return false;
  }
}

/*
The code below is the core function that play while user interact with button in html
It takes choice, which is the button inside the HTML file, player is the user id, which will rotate everytime after user make a valid choice
*/
function place(choice,player){
  //Dont need the boundry condition since user can only choose from given choice
  //Might need it in furture version
  // if(choice>=0 && choice<=7){
    this.c = document.getElementById("myCanvas");
    this.ctx = this.c.getContext("2d");
    for (var i = 0; i< 7;i++){
      for(var j = 0; j <6; j ++){
        // choice value is the x location that user wants to place, make it happens at i= choice
        if(choice == i ){
          //if the player arguement is 1
          if(player == 1){
            //check whether it is an empty array
            if(CheckValid(j,i)){
              //draw circle again but fill with player 1's color
              this.ctx.beginPath();
              this.ctx.arc(i*100+100, (7-j)*100-100, 50, 0, 2 * Math.PI);
              this.ctx.fillStyle = "red";
              this.ctx.fill();
              this.ctx.stroke();
              //set the 2d array's value to 1
              Board[j][i] = 1;
              //rotate player
              flag = 2;
              //Using win function and try to look whether value 1 is win
              if(Win(1)){
                Swal.fire(
                  'Good job!',
                  'Player One Wins!',
                  'success'
                )
                break;
              }
              //after player success place choice break out
              break;
            }
          }
      else{
        //same as before
          if(CheckValid(j,i)){
            this.ctx.beginPath();
            this.ctx.arc(i*100+100, (7-j)*100-100, 50, 0, 2 * Math.PI);
            this.ctx.fillStyle = "yellow";
            this.ctx.fill();
            this.ctx.stroke();
            Board[j][i] = -1;
            flag = 1;
            if(Win(-1)){
              Swal.fire(
                'Good job!',
                'Player Two Wins',
                'success'
              )
              this.c = document.getElementById("playerarea");
              this.ctx = this.c.getContext("2d");
              this.ctx.clearRect (300, 300 , 630, 430 );
              break;
            }
            break;
          }
      }
    }

      }
    }

}

//onclick function that used by html, simulate the process that user interact with button
function gameLoop(temp){
place(temp-1,flag);
if(Win(1) || Win(-1)){
  this.c = document.getElementById("playerarea");
  this.ctx = this.c.getContext("2d");
  this.ctx.clearRect (300, 300 , 630, 430 );
  this.ctx.font = "30px Arial";
  this.ctx.strokeText("Game!", 490, 430);
}
else {
  rotate(flag);
}
}

//reset function, draw the board again and set
function destructor(){
  Swal.fire({
  title: 'Are you sure?',
  text: "You will start a new game!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Hell Yeah!'
}).then((result) => {
  if (result.value) {
    Swal.fire(
      'Reset',
      'New Game Start.',
      'success'
    )
    constructor();
    setArr();
    flag = 1;
    count = 0;
    rotate(flag);
  }
})
}

function rotate(flag){
  if (flag == 1){

              this.c = document.getElementById("playerarea");
              this.ctx = this.c.getContext("2d");
              this.ctx.clearRect (300, 300 , 630, 430 );
              this.ctx.beginPath();
              this.ctx.arc(600, 500, 50, 0, 2 * Math.PI);
              this.ctx.fillStyle = "red";
              this.ctx.fill();
              this.ctx.stroke();
              this.ctx.font = "30px Arial";
              this.ctx.strokeText("PlayerOne's Turn", 490, 430);

  }
  else if(flag == 2){
    this.c = document.getElementById("playerarea");
    this.ctx = this.c.getContext("2d");
                  this.ctx.clearRect (300, 300 , 630, 430 );
    this.ctx.beginPath();
    this.ctx.arc(600, 500, 50, 0, 2 * Math.PI);
    this.ctx.fillStyle = "yellow";
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.font = "30px Arial";
    this.ctx.strokeText("PlayerTwo's Turn", 490, 430);
  }
}
