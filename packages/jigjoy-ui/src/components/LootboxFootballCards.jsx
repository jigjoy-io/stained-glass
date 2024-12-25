// LootboxFootballCards.js
import React, { useState } from "react"
import { motion } from "framer-motion"

const LootboxFootballCards = () => {
	const players = [
		{ name: "Lionel Messi", image: "https://img.a.transfermarkt.technology/portrait/big/28003-1694609670.jpg?lm=1" },
		{ name: "Cristiano Ronaldo", image: "https://img.a.transfermarkt.technology/portrait/big/8198-1694609670.jpg?lm=1" },
		{ name: "Neymar Jr.", image: "https://img.a.transfermarkt.technology/portrait/big/68290-1694609670.jpg?lm=1" },
		{ name: "Kylian Mbappé", image: "https://img.a.transfermarkt.technology/portrait/big/342229-1694609670.jpg?lm=1" },
		{ name: "Luka Modrić", image: "https://img.a.transfermarkt.technology/portrait/big/27992-1694609670.jpg?lm=1" },
		{ name: "Virgil van Dijk", image: "https://img.a.transfermarkt.technology/portrait/big/139208-1694609670.jpg?lm=1" },
		{ name: "Kevin De Bruyne", image: "https://img.a.transfermarkt.technology/portrait/big/88755-1694609670.jpg?lm=1" },
		{ name: "Robert Lewandowski", image: "https://img.a.transfermarkt.technology/portrait/big/38253-1694609670.jpg?lm=1" },
	]

	const [reward, setReward] = useState(null)
	const [isOpening, setIsOpening] = useState(false)

	const openLootbox = () => {
		setIsOpening(true)
		setTimeout(() => {
			const randomPlayer = players[Math.floor(Math.random() * players.length)]
			setReward(randomPlayer)
			setIsOpening(false)
		}, 3000) // Simulate opening animation delay
	}

	return (
		<div className="p-6 bg-jig-yellow min-h-screen flex flex-col items-center">
			<motion.h1 className="text-title text-jig-default mb-6" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
				Open Your Football Card Lootbox
			</motion.h1>
			<motion.div className="w-64 h-64 bg-gradient-to-r from-primary to-primary-light shadow-lg rounded-md flex items-center justify-center cursor-pointer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={openLootbox}>
				{!isOpening && !reward && <p className="text-heading text-jig-default">Click to Open</p>}
				{isOpening && (
					<motion.div className="text-heading text-jig-default" initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
						Opening...
					</motion.div>
				)}
				{reward && (
					<motion.div className="text-center" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
						<p className="text-heading text-jig-default">🎉 You Got:</p>
						<img src={reward.image} alt={reward.name} className="w-32 h-32 rounded-md object-cover mx-auto mb-2" />
						<p className="text-jig-default text-lg font-bold">{reward.name}</p>
					</motion.div>
				)}
			</motion.div>
			{reward && (
				<motion.button className="mt-6 px-6 py-3 bg-jig-green text-jig-default rounded-md hover:bg-alert-success focus:outline-none" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setReward(null)}>
					Open Another
				</motion.button>
			)}
		</div>
	)
}

export default LootboxFootballCards
