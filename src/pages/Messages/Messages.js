import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList } from "react-native";
import styles from './Messages.style';
import FloatingButton from "../../components/FloatingButton";
import ContentInputModal from "../../components/modal/ContentInputModal";

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Messages = () => {
    const [inputModalVisible, setInputModalVisible] = useState(false);
    const [contentList, setContentList] = useState([]);

    useEffect(() => {
        database()
        .ref('messages/')
        .on('value', snapshot => {
            const contentData = snapshot.val(); 
            console.log(contentData);
        });

    }, [])

    function handleInputToggle() {
        setInputModalVisible(!inputModalVisible);
    }

    function handleSendContent(content) {
        handleInputToggle();
        sendContent(content);
    }

    function sendContent(content) {
        const userMail = auth().currentUser.email;

        const contentObject = {
          text: content,
          username: userMail.split('@')[0],
          date: new Date().toISOString(),
        };

     database().ref('messages/').push(contentObject);
    }

    return (
    <SafeAreaView style={styles.container}>
        <FlatList />
        <FloatingButton icon="plus" onPress={handleInputToggle}/>
        <ContentInputModal 
        visible={inputModalVisible} 
        onClose={handleInputToggle}
        onSend={handleSendContent}/>
    </SafeAreaView>
)};

export default Messages;