import { decode } from "html-entities";

export const getTrueFalseQuestions = async (numQuestions) => {
	let num = 10;

	if (numQuestions) {
		num = numQuestions;
	}

	const apiCall = await fetch(
		`https://opentdb.com/api.php?amount=${num.toString()}&type=boolean`,
	);
	const data = await apiCall.json();
	return data.results.map((object, index) => {
		return {
			questionNumber: index,
			question: decodeHtml(object.question),
			answers: object.incorrect_answers.concat(object.correct_answer).sort(),
			correctAnswer: object.correct_answer,
		};
	});
};

export const getRegularQuestions = async () => {

	const customData = require('./data.json');
	let data = []
	for (let i = 0; i < 10; i++) {
		let correct = customData[i].correct
		let answers = customData[i].answers
		let question = customData[i].question
		data.push({ questionNumber: i, question: decodeHtml(question), answers: answers, correctAnswer: correct })
	}

	let n = numberOfQuestions
	if (data.length < numberOfQuestions)
		n = data.length + 1

	shuffleArray(data)
	newdata = []
	for (let i = 0; i < n; i++) {
		newdata[i] = data[i]
	}


	return newdata;
}
/*

	
const apiCall = await fetch("https://opentdb.com/api.php?amount=10");
const data = await apiCall.json();
return data.results.map((object, index) => {
	return {
		questionNumber: index,
		question: decodeHtml(object.question),
		answers: object.incorrect_answers.concat(object.correct_answer).sort(),
		correctAnswer: object.correct_answer,
	};
});
*.
};
*/

export const getSpecificNumberOfRegularQuestions = async (
	numberOfQuestions, categoryType
) => {

	const customData = require('./data.json');
	let data = []
	for (let i = 0; i < customData.length - 1; i++) {
		let correct = customData[i].correct
		let answers = customData[i].answers
		let question = customData[i].question
		let category = customData[i].category
		if (category == categoryType)
			data.push({ questionNumber: i, question: decodeHtml(question), answers: answers, correctAnswer: correct })
		else if (categoryType == "All")
			data.push({ questionNumber: i, question: decodeHtml(question), answers: answers, correctAnswer: correct })
	}

	let n = numberOfQuestions
	if (data.length < numberOfQuestions)
		n = data.length + 1

	shuffleArray(data)
	newdata = []
	for (let i = 0; i < n; i++) {

		newdata[i] = data[i]
	}


	return newdata;
	/*
	const apiCall = await fetch(
		`https://opentdb.com/api.php?amount=${numberOfQuestions}`,
	);
	const data = await apiCall.json();
	console.log(data)
	return data.results.map((object, index) => {
		return {
			questionNumber: index,
			question: decodeHtml(object.question),
			answers: object.incorrect_answers.concat(object.correct_answer).sort(),
			correctAnswer: object.correct_answer,
		};
	});
*/
};
function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {

		// Generate random number 
		var j = Math.floor(Math.random() * (i + 1));

		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}

	return array;
}
function decodeHtml(html) {
	return decode(html);
}
