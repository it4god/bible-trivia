import { useNavigation } from "@react-navigation/native";
import Reac, { useState } from "react";
import { Text, SafeAreaView, View, Image, Dimensions, Alert } from "react-native";
import CustomButton from "../../Components/CustomButton/CustomButton.jsx";
import quizCat from "../../assets/images/quiz.jpg";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import palette from "../../styles/colours.js";
import { useQuizContext } from "../../context/QuizContext.jsx";
import Slider from "@react-native-community/slider";
import Pawprint from "../../assets/images/pawprint.png";
import getStyles from "./Starter.style.js";
import SelectDropdown from 'react-native-select-dropdown'
const questionTypes = ["Multiple Choice"];

const Starter = () => {
	const { numQuestions, questionType, updateNumQuestions, updateQuestionType, categoryType, updateCategoryType } =
		useQuizContext();

	const screenDimensions = Dimensions.get("screen");
	const styles = getStyles(screenDimensions);

	const navigation = useNavigation();

	const canStart = numQuestions && questionType;
	const cat = ["All", "Nama & Tempat", "Perjanjian Lama", "Perjanjian Baru", "Natal", "Paskah"]
	const [category, setCategory] = useState("All")
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.innerContainer}>

				<View style={styles.outerOptionsContainer}>
					<View style={styles.optionsContainer}>
					<Text style={styles.titleText}>Bible Quiz</Text>
						<Text style={styles.subtitle}>
							Choose number of questions: {numQuestions}
						</Text>
						<View style={styles.sliderContainer}>
							<Slider
								style={styles.slider}
								step={1}
								minimumValue={10}
								maximumValue={50}
								minimumTrackTintColor={palette.primary}
								maximumTrackTintColor={palette.accent}
								onValueChange={updateNumQuestions}
								thumbImage={Pawprint}
							/>
						</View>
					</View>

					<View style={styles.optionsContainer}>
						<Text style={styles.subtitle}>
							Category
						</Text>
						<View>
							<SelectDropdown

								buttonStyle={{ backgroundColor: "#6c4c0f", borderRadius: 20 }}
								buttonTextStyle={{ color: "#FFF" }}
								dropdownStyle={{ backgroundColor: "#312900", marginTop: -60 }}
								rowTextStyle={{ color: "#FFF" }}
								defaultValue={"All"}
								data={cat}
								onSelect={(selectedItem, index) => {
									
									setCategory(selectedItem)
								}}
								buttonTextAfterSelection={(selectedItem, index) => {
									// text represented after item is selected
									// if data array is an array of objects then return selectedItem.property to render after item is selected
									return selectedItem
								}}
								rowTextForSelection={(item, index) => {
									// text represented for each item in dropdown
									// if data array is an array of objects then return item.property to represent item in dropdown
									return item
								}}
							/>
						</View>
					</View>
					<CustomButton
						width="80%"
						buttonText="start"
						onPress={() => {
							if (category == "") {
								Alert.alert("Category Needed", "Please Select Category !")
							}
							else {
								if (category == "Nama & Tempat" || category == "All")
									navigation.navigate("Quiz", { category: category })
								else
									Alert.alert("No Questions", "No Questions in that Category !")
							}
						}}
						type="secondary"
					/>
				</View>
			</View>

				<Image
							source={quizCat}
							alt="a hero cat on a quest"
							style={styles.homeImage}
						/>

		</SafeAreaView>
	);
};

export default Starter;
