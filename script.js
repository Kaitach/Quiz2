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
puntaje.innerHTML = `  <p class="titulo2">Nivel  Inicial  </p>
                     <p class="titulo2">Highscore: ` + maximoPuntaje + ` </p>
                    <p class="titulo2" >Score: ` + puntajeactual + ` </p>  ` 


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
          puntaje.innerHTML = `  <p class="titulo2" >Highscore: ` + maximoPuntaje + ` </p>
          <p class="titulo2" >Score: ` + puntajeactual + ` </p>  ` 
        }
        puntaje.innerHTML = `  <p class="titulo2" >Highscore: ` + maximoPuntaje + ` </p>
        <p class="titulo2">Score: ` + puntajeactual + ` </p>  `       
        
      }
      
  
      else {       
        window.open("https://www.youtube.com/watch?v=BDLj6w9fFaA", '_blank')
        window.location.reload()    

      }
      if (puntajeactual == 10) {
        shuffledQuestions = medio.sort(() => Math.random() - .5)
        currentQuestionIndex = 0
        puntaje.innerHTML += `  <p class="titulo2" >Nivel: Medio  </p> `
        

        
      }
      else if (puntajeactual == 20) {
        shuffledQuestions = dificil.sort(() => Math.random() - .5)
        currentQuestionIndex = 0
        puntaje.innerHTML += `  <p class="titulo2" >Nivel: Dificil  </p> `

      
      }
      else if (puntajeactual == 30) {
        shuffledQuestions = epico.sort(() => Math.random() - .5)
        currentQuestionIndex = 0
        puntaje.innerHTML += `  <p class="titulo2">Nivel: Epico  </p> `


      }
      else if (puntajeactual == 40) {
        currentQuestionIndex = 0      
        shuffledQuestions = extremo.sort(() => Math.random() - .5)
        puntaje.innerHTML += `  <p class="titulo2" >Nivel: Extremo  </p> `
    

      }
      setNextQuestion()

  
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
    question: " ??Qu?? animales son Tom y Jerry?",
    answers: [
      { text: 'Perro y rat??n', correct: false },
      { text: 'Camar??n y gato', correct: false },
      { text: 'Gato y rat??n', correct: true },
      { text: 'Perro y gato', correct: false }
    ]
  },
  {
    question: "??C??mo se llama una forma con ocho lados?",
    answers: [
      { text: 'Oct??gono', correct: true },
      { text: 'Tri??ngulo', correct: false },
      { text: 'Cuadrado', correct: false },
      { text: 'Hex??gono', correct: false }


 
    ]
  },
  {
    question: " ??Qu?? mes tiene 28 d??as?",
    answers: [
      { text: 'Febrero', correct: true },
      { text: 'Marzo', correct: false },
      { text: 'Ninguno', correct: false },
      { text: 'Diciembre', correct: false }
    ]
  },
  {
    question: " ??Cu??ntos enanos ten??a Blancanieves?",
    answers: [
      { text: '6', correct: false },
      { text: '8', correct: false },
      { text: '7', correct: true },
      { text: '9', correct: false }
      
    ]
  }, 
  {
    question: " ??En qu?? continente est?? Estados Unidos?",
    answers: [
      { text: 'Europa', correct: false },
      { text: 'Asia', correct: false },
      { text: 'Am??rica', correct: true },
      { text: '??frica', correct: false }
    ]
 
  },
]

const medio = [

  {
    question:  "En Los tres cerditos, ??de qu?? est?? hecha la casa m??s fuerte?",
    answers: [
      { text: 'Madera', correct: false },
      { text: 'Ladrillo', correct: true },
      { text: 'Paja', correct: false },
      { text: 'Cart??n', correct: false }
    ]
  },
  {
    question: "??Qu?? servicio de correo electr??nico es propiedad de Microsoft?",
    answers: [
      { text: 'Gmail', correct: false },
      { text: 'Picante', correct: true },
      { text: 'Yahoo', correct: false },
      { text: 'Outlook', correct: true }


 
    ]
  },
  {
    question: " ??Para qu?? pa??s jug?? David Beckham?",
    answers: [
      { text: 'Inglaterra', correct: true },
      { text: 'Espa??a', correct: false },
      { text: 'Francia', correct: false },
      { text: 'Alemania', correct: false }
    ]
  },
  {
    question: "??Cu??l es el planeta m??s peque??o de nuestro sistema solar?",
    answers: [
      { text: 'Mercurio', correct: true },
      { text: 'Marte', correct: false },
      { text: 'J??piter', correct: false },
      { text: 'Tierra', correct: false }

      
    ]
  },
  {
    question: "??Cu??l es el segundo nombre de Chandler en la comedia Friends?",
    answers: [
      { text: 'Muriel', correct: true },
      { text: 'Miguel', correct: false },
      { text: 'Maurice', correct: false },
      { text: 'Miguel', correct: false }
    ]
  }
 

]

const dificil = [

  {
    question: "??Cu??l es el nombre de la princesa de Disney Frozen?",
    answers: [
      { text: 'Elsa', correct: true },
      { text: 'Aurora', correct: false },
      { text: 'Cenicienta', correct: false },
      { text: 'Bella', correct: false }
      
    ]
  },
  {


    question: "??Qui??n fue el jefe de estado en Jap??n durante la Segunda Guerra Mundial?",
    answers: [
      { text: "Emperador Hirohito", correct: true },
      { text: 'Emperador Mutsuhito', correct: false },
      { text: 'Emperador Akihito', correct: false },
      { text: 'Emperador Yoshihito', correct: false }

 
    ]
  },
  {
    question: "??Cu??nto mide una piscina ol??mpica?",
    answers: [
      { text: '50 metros', correct: true },
      { text: '25 metros', correct: false },
      { text: '48 metros', correct: false },
      { text: '70 metros', correct: false }
    ]
  },
      {
        question: " ??Alrededor de cu??ntas papilas gustativas tiene la lengua humana de promedio?",
        answers: [
          ,
          { text: '1.000', correct: false },
          { text: '100', correct: false },
          { text: '100.000', correct: false },
          { text: '10.000', correct: true }
      
        ]
      },
      {
        question: " ??Cu??l fue la primera pel??cula animada de largometraje que se lanz???",
        answers: [
          { text: 'Cenicienta', correct: false },
          { text: 'Blancanieves', correct: true },
          { text: 'Pinocchio', correct: false },
          { text: 'Bambi', correct: false },
      
        ]
      },
    
 
    ]



const epico = [

      {
        question: "??Cu??l es el nombre del primer hombre en pisar la Luna?",
        answers: [
          { text: 'Buzz Aldrin', correct: false },
          { text: 'Michael Collins', correct: false },
          { text: 'Neil Armstrong', correct: true },
          { text: 'Alan Shepard', correct: false }
        ]
      },
      
      
      {
    
    
        question: "??Qui??n interpret?? al detective Rick Deckard en Blade Runner (1982)?",
        answers: [
          { text: 'Keanu Reeves', correct: false },
          { text: 'Tom Cruise', correct: false },
          { text: 'Harrison Ford', correct: true },
          { text: 'Brad Pitt', correct: false }
    
     
        ]
      },
      {
        question: "Este aclamado cineasta ganador de un Oscar dirigi?? Happy Feet, Babe: Un cerdito en la ciudad y Mad Max: Furia en la carretera.",
        answers: [
          { text: 'Steven Spielberg', correct: false },
          { text: 'Martin Scorsese', correct: false },
          { text: 'Quentin Tarantino', correct: false },
          { text: 'George Miller', correct: true }

        ]
      },
          {
            question: "Julie Andrews hizo su debut cinematogr??fico ??en qu?? pel??cula de Disney?",
            answers: [
              { text: 'Mary Poppins', correct: true },
              { text: 'La Bella y la Bestia', correct: false },
              { text: 'Cenicienta', correct: false },
              { text: 'Blancanieves', correct: false }
          
            ]
          },
          {
            question: " ??La alegr??a, el miedo, la ira, el disgusto y la tristeza gu??an las emociones de qui??n en Del rev??s (Inside Out)?",
            answers: [
              
              { text: 'Riley', correct: true },
              { text: 'Joy', correct: false },
              { text: 'Sadness', correct: false },
              { text: 'Anger', correct: false },
          
            ]
          },
        
     
        ]
    
    
const extremo = [

  {
    question: "??Cu??l es el ave de mayor envergadura que sigue viva actualmente?",
    answers: [
      { text: 'Albatros', correct: true },
      { text: '??guila', correct: false },
      { text: 'C??ndor', correct: false },
      { text: 'Gaviota', correct: false }
    ]
  },
  
  
  {


    question: "??Cu??l es el principal tipo de c??lula que forma parte del sistema nervioso de humanos y otros animales?",
    answers: [
      { text: 'C??lula muscular', correct: false },
      { text: 'C??lula epitelial', correct: false },
      { text: 'C??lula sangu??nea', correct: false },
      { text: 'Neurona', correct: true }


 
    ]
  },
  {
    question: "??C??mo se llama el tipo de c??lula nerviosa m??s abundante en el cerebro humano?",
    answers: [
      { text: 'Celula glial', correct: true },
      { text: 'Celula epitelial', correct: false },
      { text: 'Celula muscular', correct: false },
      { text: 'Celula sangu??nea', correct: false }


    ]
  },
      {
        question: "??En qu?? ciudad italiana naci?? el piloto de motociclismo Valentino Rossi?",
        answers: [       
          { text: 'Roma', correct: false },
          { text: 'Mil??n', correct: false },
          { text: 'Tur??n', correct: false },
          { text: 'Urbino', correct: true }
      
        ]
      },
      {
        question: " ??Qu?? deportista espa??ol se proclam?? Campe??n de las Series Mundiales de Ultra Running en tres a??os consecutivos de 2012 a 2014?",
        answers: [
          
          { text: 'Pau Capell', correct: false },
          { text: 'Miguel Heras', correct: false },
          { text: 'Javier G??mez Noya', correct: false },
          { text: 'Kilian Jornet', correct: true },
        ]
      },
    
 
    ]
    
