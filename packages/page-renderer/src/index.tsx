import React from "react"
import ReactDOM from "react-dom/client"
import "./types/index.d.ts"
import "./index.css"
import PageRenderer from "./page-renderer.tsx"

const root = document.createElement("div")
document.body.appendChild(root)
const rootDiv = ReactDOM.createRoot(root)

const pageConfig = {
	id: "85416a16-83ae-4a51-ac67-d93eb2e6771f",
	created: "2024-12-11T09:53:14.225Z",
	updated: "2024-12-18T10:44:35.361Z",
	origin: "miodrag.vilotijevic@jigjoy.io",
	type: "blank",
	environment: "development",
	linkedPageId: null,
	name: "Time Management Skills",
	config: {
		buildingBlocks: [
			{
				type: "carousel-tile",
				id: "65879cd8-b19f-4bcd-a59d-0caf56e2766f",
				title: "Introduction to Time Management",
				description: "Learn the basics of time management and its importance.",
				cta: "Start",
				page: {
					type: "carousel",
					id: "b16173de-b755-4f3d-89f2-a2be63e42ad6",
					name: "Time Management Basics",
					config: {
						buttons: {
							previous: "Previous",
							next: "Next",
							home: "Back to Home",
						},
						pages: [
							{
								type: "blank",
								id: "d8312ef1-645e-43ee-8b2c-f473f3be7284",
								name: "What is Time Management?",
								config: {
									buildingBlocks: [
										{
											type: "title",
											id: "cd8d3bf5-0576-45fe-ba89-8096d0d96368",
											text: "What is Time Management?",
										},
										{
											type: "text",
											id: "6459b5b4-840a-469d-9a21-9d9a2a93f5cb",
											text: "Time management is the process of planning and exercising conscious control of time spent on specific activities, especially to increase effectiveness, efficiency, and productivity.",
										},
									],
								},
							},
							{
								type: "blank",
								id: "859c570c-ada5-48d2-b447-ce56f7a1fcef",
								name: "Importance of Time Management",
								config: {
									buildingBlocks: [
										{
											type: "title",
											id: "7a48eb4e-7593-4519-a324-8b62297169b9",
											text: "Importance of Time Management",
										},
										{
											type: "text",
											id: "2a45ccbb-0696-42da-9038-8538c3a901a4",
											text: "Effective time management allows individuals to complete more in less time, lowers stress, and leads to career success.",
										},
									],
								},
							},
							{
								type: "blank",
								id: "e2dd1d01-b042-403a-857d-2c47032bf9d8",
								name: "Common Time Management Techniques",
								config: {
									buildingBlocks: [
										{
											type: "title",
											id: "1bcdded2-11de-4d1f-9faa-29a3dbbc8b2e",
											text: "Common Time Management Techniques",
										},
										{
											id: "9f4a4c7c-295c-4618-816f-0d04f983fbc2",
											type: "text",
											text: "Some popular techniques include the Pomodoro Technique, Eisenhower Box, and Time Blocking.",
										},
									],
								},
							},
							{
								type: "blank",
								id: "bdae5e70-60ba-4948-abce-50bdbfd10098",
								name: "Benefits of Time Management",
								config: {
									buildingBlocks: [
										{
											type: "title",
											id: "f64aabc0-7aaa-4459-b5bb-d30a56e29781",
											text: "Benefits of Time Management",
										},
										{
											type: "text",
											id: "5a7138e1-ddf2-45be-8905-6e8f3b9a16e3",
											text: "Good time management leads to improved efficiency, better work-life balance, and increased productivity.",
										},
									],
								},
							},
							{
								type: "blank",
								id: "a45dcab5-8ee6-4aca-8f77-e59fd86b0fae",
								name: "Challenges in Time Management",
								config: {
									buildingBlocks: [
										{
											type: "title",
											id: "7ad487ed-cdd6-42e7-96b8-d565b054e3f5",
											text: "Challenges in Time Management",
										},
										{
											type: "text",
											id: "234432dc-abc9-474d-9007-c6d83835a41c",
											text: "Common challenges include procrastination, distractions, and lack of clear goals.",
										},
									],
								},
							},
						],
					},
				},
			},
			{
				type: "carousel-tile",
				id: "dc02a94b-e100-43b9-952e-eac4139b6ded",
				title: "Time Management Questions",
				description: "Test your understanding of time management concepts.",
				cta: "Start",
				page: {
					type: "carousel",
					id: "43c6a79f-e381-4659-8791-2df12446581e",
					name: "Time Management Quiz",
					config: {
						buttons: {
							previous: "Previous",
							next: "Next",
							home: "Back to Home",
						},
						pages: [
							{
								type: "blank",
								id: "d239c8bf-4b67-46be-9f72-43fea362fe48",
								name: "Question 1",
								config: {
									buildingBlocks: [
										{
											type: "question",
											id: "a9db69e8-ea55-481b-b722-c913f8639e19",
											content: {
												displayQuestion: true,
												displayImage: false,
												text: "What is the primary goal of time management?",
												image: null,
											},
											answers: [
												{
													id: "44b7f25d-7777-4d4d-a5dc-26943c1a5647",
													correct: true,
													text: "To increase effectiveness and productivity",
												},
												{
													id: "ea211441-3c83-4823-b1fe-ff0e539f0c0b",
													correct: false,
													text: "To work longer hours",
												},
												{
													id: "05e3fb3c-21b0-4dbb-89ab-528ee68b649c",
													correct: false,
													text: "To avoid all stress",
												},
											],
											outcomes: {
												confirmationButtonText: "Check the answer",
												correct: {
													type: "success",
													title: "Great!",
													message: "The primary goal is to increase effectiveness and productivity.",
												},
												incorrect: {
													type: "danger",
													title: "Better luck next time",
													message: "The primary goal is not to work longer hours or avoid all stress.",
												},
											},
										},
									],
								},
							},
							{
								type: "blank",
								id: "5ef866f5-53b4-457a-bd42-8337274ab9bc",
								name: "Question 2",
								config: {
									buildingBlocks: [
										{
											type: "question",
											id: "37bfdb05-9792-481b-a6ac-c1b9eabbee33",
											content: {
												displayQuestion: true,
												displayImage: false,
												text: "Which of the following is a common time management technique?",
												image: null,
											},
											answers: [
												{
													id: "3c68ca67-cfb6-46e0-971a-bb900400d1c5",
													correct: true,
													text: "Pomodoro Technique",
												},
												{
													id: "d3b09079-b83e-4bf4-a052-9975e9c801cb",
													correct: false,
													text: "Random Tasking",
												},
												{
													id: "4ee72838-3389-478b-be97-ac55f8bab979",
													correct: false,
													text: "Endless Planning",
												},
											],
											outcomes: {
												confirmationButtonText: "Check the answer",
												correct: {
													type: "success",
													title: "Great!",
													message: "The Pomodoro Technique is a well-known time management method.",
												},
												incorrect: {
													type: "danger",
													title: "Better luck next time",
													message: "Random Tasking and Endless Planning are not recognized techniques.",
												},
											},
										},
									],
								},
							},
							{
								type: "blank",
								id: "bd4c51f0-885a-47b5-9fd5-4b61f7bd0734",
								name: "Question 3",
								config: {
									buildingBlocks: [
										{
											type: "question",
											id: "18741790-4f33-43f8-b215-d288636ac4a6",
											content: {
												displayQuestion: true,
												displayImage: false,
												text: "What is a common challenge in time management?",
												image: null,
											},
											answers: [
												{
													id: "b1bfb49e-0403-436b-a1b2-5bef57081070",
													correct: true,
													text: "Procrastination",
												},
												{
													id: "af627df0-f068-4d91-bf67-c1e24da280c0",
													correct: false,
													text: "Over-planning",
												},
												{
													id: "0e4d95fe-d7af-4d30-b4f3-65ba48f08d3e",
													correct: false,
													text: "Excessive productivity",
												},
											],
											outcomes: {
												confirmationButtonText: "Check the answer",
												correct: {
													type: "success",
													title: "Great!",
													message: "Procrastination is a common challenge in time management.",
												},
												incorrect: {
													type: "danger",
													title: "Better luck next time",
													message: "Over-planning and excessive productivity are not typical challenges.",
												},
											},
										},
									],
								},
							},
						],
					},
				},
			},
			{
				type: "block-selector",
				id: "c40f1157-58ca-4b63-9566-44de049176c7",
			},
		],
	},
}

rootDiv.render(
	<React.StrictMode>
		<PageRenderer {...pageConfig} />
	</React.StrictMode>,
)
