import React, {useCallback, useState} from 'react';
import QUESTIONS from "../questions.js";
import quizCompeteImg from '../assets/quiz-complete.png'
import QuestionTimer from "./QuestionTimer.jsx";

const Quiz = () => {

    const [userAnswer, setUserAnswer] = useState([]);
    const activeQuestionIndex = userAnswer.length;
    const quizIsComplicate = activeQuestionIndex === QUESTIONS.length;
    
    if (quizIsComplicate) {
        return <div id={'summary'}>
            <img src={quizCompeteImg} alt={'Trophy icon'}/>
            <h2>Quiz Competed!</h2>
        </div>
    }

    const handleSelectAnswer = useCallback((selectedAnswer) => {
        setUserAnswer((prevState) => ([...prevState, selectedAnswer]));
    }, []);

    const handleSkipAnswer = useCallback(() => {
        handleSelectAnswer(null);
    }, [handleSelectAnswer]);

    const shuffledAnswer = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswer.sort((a, b) => Math.random() - 0.5);
    return (<div id={'quiz'}>
            <div id={'question'}>
                <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={() => handleSelectAnswer(null)}/>
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id={'answers'}>
                    {shuffledAnswer.map((answer) => (<li key={answer.toString()} className={'answer'}>
                            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                        </li>))}
                </ul>
            </div>
        </div>);
};

export default Quiz;