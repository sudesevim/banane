import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList } from "react-native";
import styles from './Messages.style';
import FloatingButton from "../../components/FloatingButton";
import ContentInputModal from "../../components/modal/ContentInputModal";

import MessageCard from "../../components/card/MessageCard/MessageCard";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import parseContentData from "../../utils/parseContentData";

const Messages = () => {
    const [inputModalVisible, setInputModalVisible] = useState(false);
    const [contentList, setContentList] = useState([]);

    useEffect(() => {
        const onValueChange = database()
            .ref('messages/')
            .on('value', snapshot => {
                const contentData = snapshot.val();
                
                const parsedData = parseContentData(contentData || {});
                setContentList(parsedData);
            
            });
    }, []);

    function handleInputToggle() {
        setInputModalVisible(prev => !prev);
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
          dislike: 0,
        };

        database().ref('messages/').push(contentObject);
    }

    function handleDislike(item) {
        database().ref(`messages/${item.id}`).update({ dislike: item.dislike + 1 });
    }
    const renderContent = ({ item }) => 
    <MessageCard message={item} onDislike={() => handleDislike(item)}/>

    return (
        <SafeAreaView style={styles.container}>
            <FlatList 
                data={contentList}
                renderItem={renderContent}
                keyExtractor={item => item.date}  // Assuming `date` is unique
            />
            <FloatingButton icon="plus" onPress={handleInputToggle} />
            <ContentInputModal 
                visible={inputModalVisible} 
                onClose={handleInputToggle}
                onSend={handleSendContent}
            />
        </SafeAreaView>
    );
};

export default Messages;