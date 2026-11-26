'use strict'
let game = {
  elapsedTime: null,
  timerId: null,
  startTime: null,
  countArea: document.getElementById('count-area'),
  colorArea: document.getElementById('color-area'),
  resultArea: document.getElementById('result-area'),
  
  redButton: document.getElementById('red'),
  greenButton: document.getElementById('green'),
  blueButton: document.getElementById('blue'),
  yellowButton: document.getElementById('yellow'),
  brownButton: document.getElementById('brown'),

  colorList: ["赤","緑","青","黄","茶",],
  answerIndex: null,
  answerWords: null,
  start: true,
  rest: 5,
  retryButton: document.getElementById("retryB"),

   get colorButtonList() { 
    return [
      this.redButton ,
      this.greenButton ,
      this.blueButton , 
      this.yellowButton , 
      this.brownButton 
    ]
   },

  countStart: function () {
    game.startTime = Date.now()
    game.timerId=setInterval(game.countTime,50)
  },

  countTime: function() {
    if(game.start===false){
      return
    }
    else{
      game.elapsedTime = (Date.now() - game.startTime)/ 1000
      game.countArea.innerText = game.elapsedTime
    }
  },

  nextQuestion: function () {
    if(game.rest <= 0){
      game.colorArea.innerText="ゲームクリア！"
      game.result()
      return
    }
    game.answerIndex=Math.floor(Math.random()*game.colorList.length)
    game.answerWords=game.colorList[game.answerIndex]
    game.colorArea.innerText="" + game.answerWords +"色\n残り" + game.rest + "回"
  },

  setupButton: function () {

    game.colorButtonList.forEach((colorButton, colorButtonIndex) => {
      colorButton.addEventListener(
        "click",
        ()=>{
          if(game.rest <= 0) return
          
          let clickedColor= game.colorList[colorButtonIndex]
          if(clickedColor === game.answerWords){
            game.rest -= 1
            game.nextQuestion()
          }
        }
      )
    })
  },
 
  result: function () {
    game.start=false
    clearInterval(game.timerId)
    if (game.elapsedTime <= 5) {
      game.resultArea.innerText ='５秒以内にクリアできましたね、すごい！';
    } else {
      game.resultArea.innerText = '５秒以内にクリアできませんでしたね、もう一回！';
    }
  },

  retry: function () {
    if (confirm("リトライしますか?")){
      game.elapsedTime= null
      game.timerId= null
      game.startTime= null
      game.answerIndex= null
      game.answerWords= null
      game.start= true
      game.rest= 5
      game.countStart()
      game.nextQuestion()
    }
  }
};

const questions = [
  "ルール説明をします。",
  "５つの色のうち、ランダムでどれか一つ色が指定されるので、そのボタンを押してください。",
  "５回成功すればゲームクリアです。",
  "それでは、ゲームスタートです。"
]

for (const q of questions) {
  while (!confirm (q) ){

  }
}
        game.countStart()
        game.setupButton()
        game.nextQuestion()
        game.retryButton.addEventListener(
          "click",
          game.retry
        )
      
