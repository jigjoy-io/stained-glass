// NumberLineActivity.js
import React, { useState } from "react"

const NumberLineActivity = () => {
	const start = 710
	const end = 770
	const step = 10
	const subStep = 2 // Smaller divisions between main markers
	const markers = Array.from({ length: (end - start) / step + 1 }, (_, i) => start + i * step)
	const subMarkers = Array.from({ length: (end - start) / subStep + 1 }, (_, i) => start + i * subStep)
	const kites = [713, 720, 730, 740, 750, 760, 770]
	const [answers, setAnswers] = useState(Array(kites.length).fill(""))
	const [feedback, setFeedback] = useState(Array(kites.length).fill(null))

	const handleChange = (index, value) => {
		const newAnswers = [...answers]
		newAnswers[index] = value
		setAnswers(newAnswers)
	}

	const checkAnswers = () => {
		const newFeedback = answers.map((answer, index) => (parseInt(answer, 10) === kites[index] ? "Correct" : "Incorrect"))
		setFeedback(newFeedback)
	}

	return (
		<div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
			<h1 className="text-2xl font-bold mb-10">Izbroj podeljke i unesi tačne brojeve</h1>
			<div className="relative w-full max-w-3xl mt-10 py-20">
				<div className="border-t-2 border-gray-800 h-2 relative">
					{subMarkers.map((marker, index) => (
						<div key={index} className="absolute text-sm text-gray-600" style={{ left: `${((marker - start) / (end - start)) * 100}%`, transform: "translateX(-50%)" }}>
							{index % (step / subStep) === 0 ? (
								<div className="font-bold">
									|<div>{marker}</div>
								</div>
							) : (
								<div>|</div>
							)}
						</div>
					))}
				</div>
				{kites.map((kite, index) => (
					<div key={index} className="absolute flex flex-col items-center" style={{ left: `${((kite - start) / (end - start)) * 100}%`, top: "-40px" }}>
						<div className="w-10 h-10 bg-blue-200 flex items-center justify-center border border-gray-400">
							<input type="text" maxLength={3} value={answers[index]} onChange={(e) => handleChange(index, e.target.value)} className="w-full h-full text-center bg-transparent border-none focus:outline-none" />
						</div>
					</div>
				))}
			</div>
			<button onClick={checkAnswers} className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
				Proveri Odgovore
			</button>
			<div className="mt-4">
				{feedback.map((result, index) => (
					<p key={index} className={`text-sm ${result === "Correct" ? "text-green-600" : "text-red-600"}`}>
						Pozicija {index + 1}: {result || ""}
					</p>
				))}
			</div>
		</div>
	)
}

export default NumberLineActivity
