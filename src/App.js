import React from 'react';
import './App.css';
import questions from './questions.json'

const TIME_LIMIT = 10
const TITLE_STATE = 0
const QUESTION_STATE = 1
const FINAL_STATE = 2


class QuizQuestion extends React.Component {
  render () {
    return <>
      <h1>{this.props.question}</h1>
      {this.props.answers.map((v, i) => 
      <input className="answerButton" onClick={() => this.props.nextQuestion(v.correct)} type="button" key={i} value={v.text} />)}
    </>
  }
}


class TitlePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      titleText: "Welcome to our Quiz!",
      counter: 0,
      currentState: TITLE_STATE,
      currentQuestion: 0,
      score: 0
    }
    this.timeLimit = TIME_LIMIT
  }

  nextQuestion (correct) {
    if (correct) {
      this.setState({score: this.state.score+1})
    }
    if (this.state.currentQuestion === questions.length - 1) {
      this.setState({
        titleText: "Done!",
        currentState: FINAL_STATE
      })
    } else {
      clearInterval(this.timer)
      this.setState({
        titleText: "You answered early!!!",
        currentState: QUESTION_STATE,
        currentQuestion: this.state.currentQuestion + 1
      })
    }
  }

  countdown () {
    if (this.state.counter < this.timeLimit) {
      this.setState({
        titleText: 'Starting the quiz!',
        counter: this.state.counter + 1
      })
    } else {
      this.setState({
        titleText: "Beginning quiz!",
        currentState: QUESTION_STATE,
        counter: 0
      })
      if(this.state.currentState === TITLE_STATE){ 
        this.timer = setInterval(() => this.countdown(), 1000)
        clearInterval(this.timer)
      }
    }
}

  
  start () {
    this.setState({titleText: 'Starting the quiz!', counter: 0})
    this.timer = setInterval(() => this.countdown(), 1000)
  }

  render () {
    return (
      <>
        <p>{this.timeLimit - this.state.counter}</p>
        {((this.state.currentState === TITLE_STATE) ?
        <> 
        <h1>{this.state.titleText}</h1>
        <input type="button" className="start" value="START" onClick={() => this.start()} />
      </>
      :
      <QuizQuestion 
        question={questions[this.state.currentQuestion].question}
        answers={questions[this.state.currentQuestion].possibleAnswers}
        nextQuestion={(correct) => this.nextQuestion(correct)}>
        </QuizQuestion> )}
        <p>Score: {this.state.score}</p>
      </> )
  }
}

function App() {
  return (
    <div className="App">
      <TitlePage />
    </div>
  );
}

export default App;
