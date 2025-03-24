import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import ApiConnector from "../../api/apiConnector";
import ApiEndpoints from "../../api/apiEndpoints";

const Room = () => {
	const { roomid } = useParams();
	const [currentUser, setCurrentUser] = useState({
        first_name: "",
        last_name: ""
    });

	const getProfileDetail = async () => {
		const url = ApiEndpoints.PROFILE_ICON;
		const profileDetails = await ApiConnector.sendGetRequest(url);
        console.log(profileDetails)
		console.log('profileDetails san testing...')
		console.log(roomid);
		setCurrentUser(() => ({
            first_name: profileDetails.first_name,
            last_name: profileDetails.last_name
        }));
	};

	useEffect(() => {
		getProfileDetail();
	},[]);
    
	const myMeeting = async (element) => {
        const user = `${currentUser.first_name}, ${currentUser.last_name}`;
		const appId = 572018761;//2025032658;
		const serverSecret ="ac2209fecc713640a730b27879c1a650";// "61bcbf8d625ab11a91c09ed88ae4b479";
		const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
			appId,
			serverSecret,
			roomid,
			Date.now().toString(),
			user
		);
		const zc = ZegoUIKitPrebuilt.create(kitToken);
		zc.joinRoom({
			container: element,
			scenario: {
				mode: ZegoUIKitPrebuilt.OneONoneCall,
			},
			showScreenSharingButton: true,
			showAudioVideoSettingsButton: true,
			showPinButton: true,
            showTextChat: true,
            showRoomDetailsButton: true,
            showLeaveRoomConfirmDialog: true,
            showUserList: true,

		});
	};
	return (
		<div>
			<div ref={myMeeting} />
		</div>
	);
};

export default Room;
