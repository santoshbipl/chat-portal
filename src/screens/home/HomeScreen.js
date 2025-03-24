import React, { useEffect, useState } from "react";
import AuthRequired from "../../components/auth/AuthRequired";
import ChatBody from "../../components/chatbody/ChatBody";
import Sidebar from "../../components/sidebar/sidebar";
import ApiConnector from "../../api/apiConnector";
import ApiEndpoints from "../../api/apiEndpoints";

const HomeScreen = (props) => {
  const [currentChattingMember, setCurrentChattingMember] = useState({id: -1});
  const [onlineUserList, setOnlineUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState(-1);

  const getProfileDetail = async () => {
    const url = ApiEndpoints.PROFILE_ICON;
    const profileDetails = await ApiConnector.sendGetRequest(url);
    setCurrentUser(profileDetails.id);
  };

  useEffect(() => {
    getProfileDetail();
  },[]);

  return (
    <main className="content">
      <div className="container-fluid p-0">
        <div className="container-fluid">
          <div className="row g-0">
            <Sidebar
              setCurrentChattingMember={setCurrentChattingMember}
              onlineUserList={onlineUserList}
              {...props}
            />
            <ChatBody
              setOnlineUserList={setOnlineUserList}
              currentChattingMember={currentChattingMember}
              currentUser={currentUser}
              {...props}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthRequired(HomeScreen);
