// PhrasalVerbsPractice.js
import React, { useState } from "react"
import { motion } from "framer-motion"

const PhrasalVerbsPractice = () => {
	const phrasalVerbs = [
		{ verb: "give up", meaning: "to stop trying" },
		{ verb: "look after", meaning: "to take care of" },
		{ verb: "run into", meaning: "to meet unexpectedly" },
		{ verb: "take off", meaning: "to remove or to ascend" },
		{ verb: "put up with", meaning: "to tolerate" },
	]

	const [currentIndex, setCurrentIndex] = useState(0)
	const [userAnswer, setUserAnswer] = useState("")
	const [feedback, setFeedback] = useState(null)
	const [correctCount, setCorrectCount] = useState(0)
	const [isComplete, setIsComplete] = useState(false)

	const handleCheckAnswer = () => {
		const correctAnswer = phrasalVerbs[currentIndex].verb.toLowerCase()
		if (userAnswer.trim().toLowerCase() === correctAnswer) {
			setFeedback("Correct!")
			setCorrectCount((prev) => prev + 1)
		} else {
			setFeedback(`Incorrect. The correct answer is "${correctAnswer}".`)
		}
	}

	const handleNext = () => {
		if (currentIndex === phrasalVerbs.length - 1) {
			setIsComplete(true)
			return
		}
		setFeedback(null)
		setUserAnswer("")
		setCurrentIndex((prevIndex) => prevIndex + 1)
	}

	const progress = ((currentIndex + 1) / phrasalVerbs.length) * 100

	return (
		<div className="p-6 bg-jig-yellow min-h-screen flex flex-col items-center">
			<motion.h1 className="text-title text-primary mb-4" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
				Phrasal Verbs Practice
			</motion.h1>
			<motion.div className="w-full max-w-md bg-shallow-gray rounded-full h-4 mb-4" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.8 }}>
				<div className="bg-primary h-4 rounded-full"></div>
			</motion.div>

			{!isComplete ? (
				<motion.div className="bg-jig-blue shadow p-6 rounded-md w-full max-w-md text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
					<p className="text-heading mb-4 text-jig-default">
						What is the phrasal verb for: <span className="text-primary-light">{phrasalVerbs[currentIndex].meaning}</span>
					</p>
					<input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} className="w-full px-3 py-2 border border-default-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary mb-4" placeholder="Type the phrasal verb" />
					<button onClick={handleCheckAnswer} className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light focus:outline-none mb-4">
						Check Answer
					</button>
					<button onClick={handleNext} className="w-full px-4 py-2 bg-jig-green text-jig-default rounded-md hover:bg-alert-success focus:outline-none">
						Next Question
					</button>
					{feedback && (
						<motion.div className="mt-4 text-lg font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
							<p className={feedback === "Correct!" ? "text-green-600" : "text-text-danger"}>{feedback}</p>
						</motion.div>
					)}
				</motion.div>
			) : (
				<motion.div className="bg-alert-success shadow p-6 rounded-md w-full max-w-md text-center" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
					<h2 className="text-heading text-primary mb-4">Congratulations!</h2>
					<p className="text-paragraph mb-4">
						You have completed the practice. You answered <span className="text-green-600">{correctCount}</span> out of {phrasalVerbs.length} correctly.
					</p>
					<div className="text-center">
						<motion.div className="bg-primary-light text-white px-4 py-2 rounded-md" initial={{ scale: 0.5, rotate: 360 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 0.8 }}>
							🏆 Well Done!
						</motion.div>
					</div>
				</motion.div>
			)}
		</div>
	)
}

export default PhrasalVerbsPractice
