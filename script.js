const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
preguntas = 0
maximoPuntaje = localStorage.getItem('maximoPuntaje')
if (maximoPuntaje == null) {
  maximoPuntaje = 0
}
puntaje = document.getElementById('puntaje')
puntajeactual = 0
puntaje.innerHTML = `   <p>Nivel  Inicial  </p>
                     <p>Highscore: ` + maximoPuntaje + ` </p>
                    <p>Score: ` + puntajeactual + ` </p>  ` 


let musica = document.getElementById('youtube-audio');
musica.addEventListener("click", function(e) {
});



function onYouTubeIframeAPIReady(){var e=document.getElementById("youtube-audio"),t=document.createElement("img");t.setAttribute("id","youtube-icon"),t.style.cssText="cursor:pointer;cursor:hand",e.appendChild(t);var a=document.createElement("div");a.setAttribute("id","youtube-player"),e.appendChild(a);var o=function(e){var a=e?"IDzX9gL.png":"quyUPXN.png";t.setAttribute()};e.onclick=function(){r.getPlayerState()===YT.PlayerState.PLAYING||r.getPlayerState()===YT.PlayerState.BUFFERING?(r.pauseVideo(),o(!1)):(r.playVideo(),o(!0))};var r=new YT.Player("youtube-player",{height:"0",width:"0",videoId:e.dataset.video,playerVars:{autoplay:e.dataset.autoplay,loop:e.dataset.loop},events:{onReady:function(e){r.setPlaybackQuality("small"),o(r.getPlayerState()!==YT.PlayerState.CUED)},onStateChange:function(e){e.data===YT.PlayerState.ENDED&&o(!1)}}})}
let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
  
})




function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
  document.getElementById("youtube-audio").click();  
  if (maximoPuntaje <= puntajeactual) { 
    maximoPuntaje = puntajeactual
    localStorage.setItem('maximoPuntaje', puntajeactual)
  } 

  
}

function setNextQuestion() {
  if (puntajeactual == 50) {
    alert('Felicidades, has ganado el juego') 
    window.open("https://www.youtube.com/watch?v=UgBI1F4eXlI", '_blank')
        window.location.reload()  
    
  }
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])

}

function showQuestion(question) {

  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
      
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
    
    button.addEventListener('click', function () {  
      if (button.dataset.correct) {
        currentQuestionIndex++     
        puntajeactual = puntajeactual + 10
        if (maximoPuntaje <= puntajeactual) { 
          maximoPuntaje = puntajeactual
          localStorage.setItem('maximoPuntaje', puntajeactual)
          puntaje.innerHTML = `  <p>Highscore: ` + maximoPuntaje + ` </p>
          <p>Score: ` + puntajeactual + ` </p>  ` 
        }
        puntaje.innerHTML = `  <p>Highscore: ` + maximoPuntaje + ` </p>
        <p>Score: ` + puntajeactual + ` </p>  `       
        setNextQuestion()
      }
      
      else {       
        window.open("https://www.youtube.com/watch?v=BDLj6w9fFaA", '_blank')
        window.location.reload()    

      }
  
    })
    
  })

}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)    
  })



}



function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [ 
  {
    question: " ¿Qué animales son Tom y Jerry?",
    answers: [
      { text: 'Perro y Raton', correct: false },
      { text: 'Camaron y Gato', correct: false },
      { text: 'Gato y Raton', correct: true },
      { text: 'Perro y Gato', correct: false }
    ]
  },
  {
    question: "¿Cómo se llama una forma con ocho lados?",
    answers: [
      { text: 'Octagono', correct: true },
      { text: 'Triangulo', correct: false },
      { text: 'Cuadrado', correct: false },
      { text: 'Hexagono', correct: false }


 
    ]
  },
  {
    question: " Qué mes tiene 28 días?",
    answers: [
      { text: 'Febrero', correct: true },
      { text: 'Marzo', correct: false },
      { text: 'Ninguno', correct: false },
      { text: 'Diciembre', correct: false }
    ]
  },
  {
    question: " ¿Cuántos enanos tenía Blancanieves?",
    answers: [
      { text: '6', correct: false },
      { text: '8', correct: false },
      { text: '7', correct: true },
      { text: '9', correct: false }
      
    ]
  }, 
  {
    question: " En qué continente está Estados Unidos?",
    answers: [
      { text: 'Europa', correct: false },
      { text: 'Asia', correct: false },
      { text: 'América', correct: true },
      { text: 'África', correct: false }
    ]
  }
 

]

// const medio = [ 

//   {
//     question: " ¿Qué animales 213123 Tom y Jerry?",
//     answers: [
//       { text: 'perro y raton', correct: false },
//       { text: 'camaron y gato', correct: false },
//       { text: 'gato y raton', correct: true },
//       { text: 'perro y gato', correct: false }
//     ]
//   },
//   {
//     question: "¿213213?",
//     answers: [
//       { text: 'Octagono', correct: true },
//       { text: 'triangulo', correct: false },
//       { text: 'cuadrado', correct: false },
//       { text: 'hexagono', correct: false }


 
//     ]
//   },
//   {
//     question: " 213?",
//     answers: [
//       { text: 'Febrero', correct: true },
//       { text: 'Marzo', correct: true },
//       { text: 'Ninguno', correct: false },
//       { text: 'Diciembre', correct: false }
//     ]
//   },
//   {
//     question: " ¿213?",
//     answers: [
//       { text: '6', correct: false },
//       { text: '8', correct: false },
//       { text: '7', correct: true },
//       { text: '9', correct: false }
      
//     ]
//   }, 
//   {
//     question: "213?",
//     answers: [
//       { text: 'Europa', correct: false },
//       { text: 'Asia', correct: false },
//       { text: 'América', correct: true },
//       { text: 'África', correct: false }
//     ]
//   }
 

// ]

// const dificil = [ 

//   {
//     question: " ¿Qué animales 213123 Tom y Jerry?",
//     answers: [
//       { text: 'perro y raton', correct: false },
//       { text: 'camaron y gato', correct: false },
//       { text: 'gato y raton', correct: true },
//       { text: 'perro y gato', correct: false }
//     ]
//   },
//   {
//     question: "¿213213123213?",
//     answers: [
//       { text: 'Octagono', correct: true },
//       { text: 'triangulo', correct: false },
//       { text: 'cuadrado', correct: false },
//       { text: 'hexagono', correct: false }


 
//     ]
//   },
//   {
//     question: " 124124?",
//     answers: [
//       { text: 'Febrero', correct: false },
//       { text: 'Marzo', correct: true },
//       { text: 'Ninguno', correct: false },
//       { text: 'Diciembre', correct: false }
//     ]
//   },
//   {
//     question: " 213123123?",
//     answers: [
//       { text: '6', correct: false },
//       { text: '8', correct: false },
//       { text: '7', correct: true },
//       { text: '9', correct: false }
      
//     ]
//   }, 
//   {
//     question: "213?",
//     answers: [
//       { text: 'Europa', correct: false },
//       { text: 'Asia', correct: false },
//       { text: 'América', correct: true },
//       { text: 'África', correct: false }
//     ]
//   }
 

// ]