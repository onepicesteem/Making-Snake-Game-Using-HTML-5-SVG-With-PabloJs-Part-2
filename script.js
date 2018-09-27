$(function(){

var svg = Pablo('#ground').svg({ //create svg with height and width
         width: 1095,
        height: 690
      });

var arrayNode=new Array();

var direction=1;
var nodeSize=15;

var speed=200;


var food;
var foodX;//x coordinate of the food
var foodY;//y coordinate of the food
var foodControl=1;


var snakeX;
var snakeY;

var intervalValue;

var arrayColor=new Array("#ef5777","#ffc048","#575fcf","#05c46b","#8e44ad");
var colorIndex=0;

snakeBuilder(4,300,300);

intervalValue=setInterval(function(){

snakeEat();
snakeMove();
snakeDie();

}, speed);




$(document).keydown(function(event){
  //37 left  - 38  up - 39  right - 40  down

     var code =  event.which;

     if(direction==1||direction==3){
       if(code==38) direction=4;
       if(code==40) direction=2;
     }

     if(direction==2||direction==4){
       if(code==39) direction=1;
       if(code==37) direction=3;
     }

});


function snakeMove(){
  var x;
  var y;

  x=arrayNode[arrayNode.length-1].attr('x');
  y=arrayNode[arrayNode.length-1].attr('y');

if(direction==1){
   x=parseInt(x)+nodeSize;
}

if(direction==2){
   y=parseInt(y)+nodeSize;
}

if(direction==3){
   x=parseInt(x)-nodeSize;
}
if(direction==4){
   y=parseInt(y)-nodeSize;
}

var colorIndex=Math.floor(Math.random() * 5);

  var snakeNode=svg.rect({
      x:x, y:y,
      width:nodeSize, height:nodeSize,
      fill:  arrayColor[colorIndex],
      stroke:'#006',
      'stroke-width': 2,
      'stroke-linejoin': 'round'
  });


  arrayNode[0].remove();
  arrayNode.shift();

  arrayNode.push(snakeNode);

}


function snakeEat(){

  if(foodControl==1)
  {

    food=foodBuilder();
    foodControl=0;//food in the playground
    foodX=food.attr('x');
    foodY=food.attr('y');

  }

  snakeX=arrayNode[arrayNode.length-1].attr('x');
  snakeY=arrayNode[arrayNode.length-1].attr('y');

    if(snakeX==foodX && snakeY==foodY)
    {
      food.remove();
      foodControl=1;

      var snakeNode=svg.rect({
          x:snakeX, y:snakeY,
          width:nodeSize, height:nodeSize,
          fill:  arrayColor[colorIndex],
          stroke:'#006',
          'stroke-width': 2,
          'stroke-linejoin': 'round'
      });

      arrayNode.push(snakeNode);
      snakeNode=snakeNode+1;
      if(speed!=30){
        speed=speed-2;
      }

      console.log(speed);
      clearInterval(intervalValue);
      intervalValue=setInterval(function(){
        snakeEat();
        snakeMove();
        snakeDie();

      },speed)

    }
}

function snakeDie(){

  snakeX=arrayNode[arrayNode.length-1].attr('x');
  snakeY=arrayNode[arrayNode.length-1].attr('y');

  if(snakeX<0||snakeX>1080||snakeY<0||snakeY>675){
    if (confirm('Would you like to play again')) {
               window.location.reload(false)
            } else {

            }
  }


  for (var i = 0; i < arrayNode.length-1; i++) {

    if(snakeX==arrayNode[i].attr('x') && snakeY==arrayNode[i].attr('y')){
      if (confirm('Would you like to play again')) {
                 window.location.reload(false)
              } else {

              }

    }
  }

}


function foodBuilder(){

      foodX=(Math.floor(Math.random() * 67) + 1)*15;//15 and multiples of values between 1100px and 0px
      foodY=(Math.floor(Math.random() * 45) + 1)*15;//15 and multiples of values between 700px and 0px

      var food=svg.rect({
          x:foodX, y:foodY,
          width:nodeSize, height:nodeSize,
          fill:  '#2345f6',
          stroke:'#006',
          'stroke-width': 2,
          'stroke-linejoin': 'round'
      });


      return food;
}

function snakeBuilder(node,x,y){

  for (var i = 0; i < node; i++) {

  var colorIndex=Math.floor(Math.random() * 6);

      var snakeNode=svg.rect({
          x:x, y:y,
          width:nodeSize, height:nodeSize,
          fill:  arrayColor[colorIndex],
          stroke:'#006',
          'stroke-width': 2,
          'stroke-linejoin': 'round'
      });

      arrayNode.push(snakeNode);
      x=x+nodeSize;
  }

}

});
