import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState, useInterval } from "react";
import { Text, SafeAreaView, ActivityIndicator, View, Dimensions } from "react-native";
import CustomButton from "../../Components/CustomButton/CustomButton.jsx";
import { useQuizContext } from "../../context/QuizContext.jsx";
import GradientWrapper from "../../Components/GradientWrapper/GradientWrapper.jsx";
import getStyles from "./Quiz.style.js";
import {
	getTrueFalseQuestions,
	getSpecificNumberOfRegularQuestions,
} from "../../api/quiz.js";

function Quiz({ route }) {
	const {
		quizQuestions,
		numQuestions,
		questionType,
		updateQuestions,
		addAnswer,
		counter,
		updateCounter,
		categoryType,
	} = useQuizContext();

	const screenDimensions = Dimensions.get("screen");
	const styles = getStyles(screenDimensions)
	const { category } = route.params;
	const [selectedOption, setSelectedOption] = useState("");
	const [boolNewTimer, setBoolNewTimer] = useState()
	const navigation = useNavigation();

	const endOfQuestions = counter === numQuestions - 1;

	const fetchQuestions = async () => {
		if (questionType === "True or False") {
			const trueOrFalseQuestions = await getTrueFalseQuestions(numQuestions);
			await updateQuestions(trueOrFalseQuestions);
		} else {
			const regularQuestions = await getSpecificNumberOfRegularQuestions(
				numQuestions, category
			);
			await updateQuestions(regularQuestions);
		}
	};

	const saveAnswer = (answer) => {
		setSelectedOption(answer);
		addAnswer({ id: counter, answer: answer });

		if (!endOfQuestions) {
			goToNextQuestion();
		} else {
			navigation.navigate("Finish", { category: category });
		}
	};

	const goToNextQuestion = () => {
		const nextQuestion = counter + 1;
		updateCounter(nextQuestion);
	
		setSelectedOption("");
	};


	const refTimer = useRef();

	// For keeping a track on the Timer
	const [timerEnd, setTimerEnd] = useState(false);
	const [time, setTime] = useState(10);
	const intervalRef = useRef();

	const interval = () => {
		intervalRef.current = setInterval(() => {
			setTime((prevTime) => prevTime - 1)
		}, 1000);
	};

	useEffect(() => {
		const intervalId = intervalRef.current;
		return () => clearInterval(intervalId);
	}, []);

	useEffect(() => {
		if (time <= 0) {
			setTime(10)
			saveAnswer("")
		}
	}, [time]);


	useEffect(() => {
		if(quizQuestions.length === 0)
		{
			
			interval();
		}
			
		fetchQuestions();
	
	}, []);

	if (quizQuestions.length === 0) {
		return <ActivityIndicator />;
	} else {
		return (
			<GradientWrapper>
				<SafeAreaView style={styles.mainContainer}>

					<View style={styles.gameContainer}>
						<Text style={styles.title}>Question {counter + 1}</Text>
						<Text style={styles.question}>
							{quizQuestions && quizQuestions[counter].question}
						</Text>
						<View style={styles.buttonContainer}>
							{quizQuestions &&
								quizQuestions[counter].answers.map((answer, index) => (
									<CustomButton
										key={`${answer}-${index}`}
										buttonText={answer}
										onPress={() => {saveAnswer(answer); setTime(10)}}
										type="primary"
										fullWidth
									/>
								))}
						</View>
					</View>
					<Text style={styles.title2}>Timer : {time}</Text>
				</SafeAreaView>
			</GradientWrapper>
		);
	}
};

export default Quiz;
