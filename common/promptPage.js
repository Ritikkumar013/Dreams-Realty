import React, { useEffect, useState } from "react";
// import { Prompt } from 'react-router'
import WarningModal from "./warningModal";

const RouteLeavingGuard = ({ when, navigate, shouldBlockNavigation }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [lastLocation, setLastLocation] = useState(null);
	const [confirmedNavigation, setConfirmedNavigation] = useState(false);

	React.useEffect(() => {
		window.onbeforeunload = when ? () => true : null;
		window.location.hash = "no-back-button";

		// Again because Google Chrome doesn't insert
		// the first hash into the history
		window.location.hash = "Again-No-back-button";

		window.onhashchange = function () {
			window.location.hash = "no-back-button";
		};
		return () => {
			window.onbeforeunload = null;
		};
	}, [when]);

	//   React.useEffect(() => {
	//     if(!when){
	//     setModalVisible(true);
	//     }else{
	//       window.onbeforeunload = null;
	//     }
	//   // window.onbeforeunload = !modalVisible ? () => true : null;
	//   // return () => {
	//   //   window.onbeforeunload = null;
	//   // };
	// }, [when]);

	const closeModal = () => {
		setModalVisible(false);
	};
	const handleBlockedNavigation = (nextLocation) => {
		if (!confirmedNavigation && shouldBlockNavigation(nextLocation)) {
			setModalVisible(true);
			setLastLocation(nextLocation);
			return false;
		}
		return true;
	};
	const handleConfirmNavigationClick = () => {
		setModalVisible(false);
		setConfirmedNavigation(true);
	};
	useEffect(() => {
		if (confirmedNavigation && lastLocation) {
			// Navigate to the previous blocked location with your navigate function
			navigate(lastLocation.pathname);
		}
	}, [confirmedNavigation, lastLocation]);
	return (
		<>
			{/* <Prompt when={when} message={handleBlockedNavigation} /> */}
			<WarningModal
				open={modalVisible}
				titleText="Close without saving?"
				contentText="You have unsaved changes. Are you sure you want to leave this page without saving?"
				cancelButtonText="DISMISS"
				confirmButtonText="CONFIRM"
				onCancel={closeModal}
				onConfirm={handleConfirmNavigationClick}
			/>
		</>
	);
};
export default RouteLeavingGuard;
