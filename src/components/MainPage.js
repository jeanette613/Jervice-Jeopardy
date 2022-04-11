import { useEffect, useState } from "react";
export default function MainPage(props) {
    const [question, setQuestion] = useState([])

    const getData = async () => {
        try {
            const response = await fetch('https://jservice.io/api/random')
            const data = await response.json()
            setQuestion(data)
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    const [hide, setHide] = useState(true)
    const [score, setScore] = useState(0)

    const getQuestion = (data) => {
        setHide(data)
    }

    const increaseScore = (data) => {
        setScore(score + parseInt(data))
    }

    const decreaseScore = (data) => {
        setScore(score - parseInt(data))
    }

    const resetScore = () => {
        setScore(0)
    }

    return (
        <>
            {question.map((item, index) => {
                return (
                    <>
                        <h1>Welcome to Jeopardy</h1>
                        <h2>Score: {score}</h2>
                        <div className="scoreButtons">
                            <button className="decreasebtn" onClick={() => { decreaseScore(item.value) }}>Decrease</button>
                            <button className="increasebtn" onClick={() => { increaseScore(item.value) }}>Increase</button>
                            <button className="resetbtn" onClick={() => { resetScore() }}>Reset</button>
                        </div>
                        <h2>Let's Play</h2>
                        <button className="clueButton" onClick={() => { return getData(), setHide(true) }}>Get Question</button>
                        <h2>Category: {item.category.title}</h2>
                        <h2 className="points">Points:{item.value}</h2>
                        <h2>Question: {item.question}</h2>
                        <button className="revealQuestion" onClick={() => { setHide(!hide) }}>Click to Reveal Question</button>
                        {!hide ?
                            <h3>Answer: {item.answer}</h3> : ''}
                    </>
                );
            })
            }
        </>
    )
}