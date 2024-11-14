import React, { useState } from "react"
import { motion } from "framer-motion"

export default function Button(props: any) {
	const [animateSweep, setAnimateSweep] = useState(false)

	const handleClick = () => {
		setAnimateSweep(true) // Trigger gradient sweep animation on click

		setTimeout(() => {
			if (props.action) props.action() // Delay the actual button action to allow animation to complete
		}, 300) // Adjust timing as needed to match your animation duration

		// Reset the sweep animation after it's done
		setTimeout(() => {
			setAnimateSweep(false)
		}, 600) // Duration of the gradient animation
	}

	return (
		<motion.div
			style={{
				background: "linear-gradient(90deg, #4F46E5 0%, #7C3AED 50%, #EC4899 100%)",
			}}
			className={`${props.width} ${
				props.size === "sm" ? "px-3 py-1" : "px-4 py-2"
			} text-white font-bold rounded-full flex items-center justify-center relative overflow-hidden cursor-pointer`}
			onClick={handleClick}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.3,
				ease: "easeOut",
			}}
			whileTap={{
				scale: 0.95,
			}}
		>
			<span className="relative z-10">{props.text}</span>

			{/* Gradient sweep effect */}
			<motion.div
				className="absolute inset-0 bg-red from-transparent via-white/30 to-transparent"
				style={{
					zIndex: 1,
				}}
				initial={{ x: "-100%" }}
				animate={{ x: animateSweep ? "100%" : "-100%" }} // Trigger the animation on click
				transition={{
					duration: 0.6,
					ease: "easeInOut",
				}}
			/>
		</motion.div>
	)
}
