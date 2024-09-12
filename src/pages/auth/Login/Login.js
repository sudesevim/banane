import React, { Fragment , useState} from "react";
import { SafeAreaView, Text } from "react-native";
import styles from './Login.style';
import { Formik } from "formik";
import auth from '@react-native-firebase/auth';

import authErrorMessageParsel from "../../../utils/authErrorMessageParsel";

import Button from "../../../components/Button";
import Input from "../../../components/Input";

import { showMessage} from "react-native-flash-message";

const initialFormValues = {
    usermail: '',
    password: '',
};

const Login = ({navigation}) => {
    const [loading, setLoading] = useState(false);

    function handleSignUp() {
        navigation.navigate("SignPage");
    };

async function handleFormSubmit(formValues) {
    try {
        setLoading(true);
        await auth().signInWithEmailAndPassword(formValues.usermail,formValues.password);
        setLoading(false);
        navigation.navigate('Messages');
}
    catch (error) {
        showMessage({
            message: authErrorMessageParsel(error.code),
            type: 'danger',
        });
        setLoading(false);

    }
};

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Login</Text>
            <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
                { ({values, handleChange, handleSubmit}) => (
                <>
                   <Input  
                   value={values.usermail} 
                   onType={handleChange('usermail')}
                   placeholder="Kullanıcı adınız..."/>
                   <Input 
                   value={values.password} 
                   onType={handleChange('password')}
                   placeholder="Şifreniz..."
                   isSecure={true}/>
                   <Button text="Giriş Yap" onPress={handleSubmit} />
                </>
                )
                }
            </Formik>
            <Button text="Kayıt Ol" theme="secondary" onPress={handleSignUp}/>
        </SafeAreaView>
    );
};

export default Login;