import { StyleSheet } from "react-native";
import palette from "../../styles/colours";

const getStyles = (screenDimensions) => {
	const isTablet = screenDimensions.width > 1000;

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			flexDirection: "column",
			justifyContent: "space-between",
			alignItems: "center",
			backgroundColor: "#f9ecdc",
		},
		innerContainer: {
			flex: isTablet ? 0.3 : 0.5,
			flexDirection: "column",
			width: isTablet ? "100%" : "90%",
			alignItems: "center",
			justifyContent: "space-around",
			backgroundColor: "#f9ecdc",
		},
		outerOptionsContainer: {
			width: isTablet ? "70%" : "100%",
			alignItems: "center",
		},
		titleText: {
			fontSize:  60,
			fontWeight: "bold",
			fontFamily: "Blaka_400Regular",
			color: palette.accent,
		},
		subtitle: {
			fontSize: isTablet ? 20 : 14,
			fontWeight: "bold",
			marginVertical: 5,
			color: palette.primary,
		},
		optionsContainer: {
			width: isTablet ? "60%" : "100%",
			flexDirection: isTablet ? "row" : null,
			justifyContent: "center",
			alignItems: "center",
			marginVertical: isTablet ? 10 : 1,
		},
		homeImage: {
			height: 400,
			width: "100%",
			position: "absolute",
			bottom: isTablet ? -80 : -10,
		},
		input: {
			height: 40,
			margin: 12,
			borderWidth: 1,
			padding: 10,
			borderRadius: 20,
			backgroundColor: palette.offWhite,
			color: "black",
		},
		buttonsContainer: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			marginBottom: isTablet ? 5 : 20,
			marginLeft: isTablet ? 110 : 0,
		},
		sliderContainer: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "center",
			marginBottom: 5,
		},
		slider: {
			width: "90%",
			height: 40,
		},
		questionType: {
			display: "flex",
			flexDirection: isTablet ? "column" : "row",
		},
	});
	return styles;
};

export default getStyles;
