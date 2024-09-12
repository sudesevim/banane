import React, {useState} from "react";
import { SafeAreaView, Text } from "react-native";
import styles from './Sign.style';
import { Formik } from "formik";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import auth from '@react-native-firebase/auth';
import { showMessage } from "react-native-flash-message";
import authErrorMessageParsel from "../../../utils/authErrorMessageParsel";

const initialFormValues= {
    usermail: '',
    password: '',
    confirmPassword: '',
};

const Sign = ({navigation}) => {
    const [loading, setLoading] = useState(false);

    function handleLogin() {
        navigation.goBack();
    };

    async function handleFormSubmit(formValues) {
        if (formValues.password !== formValues.confirmPassword) {
            showMessage({
                message: 'Şifreler uyuşmuyor',
                type: 'danger', 
            });
            return;
        }
        try {
            await auth().createUserWithEmailAndPassword(formValues.usermail, formValues.confirmPassword);
            showMessage({
                message: 'Kayıt başarılı',
                type: 'success',});
                setLoading(false);
        } catch (error) {
            showMessage({
                message: authErrorMessageParsel(error.code),
                type: 'danger' ,
            });
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Login</Text>
            <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
                {({values, handleChange, handleSubmit}) => (
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
                    <Input 
                    value={values.confirmPassword}
                    onType={handleChange('confirmPassword')}
                    placeholder="Şifrenizi tekrar giriniz..."
                    isSecure={true}/>
                    <Button text="Kayıt Ol" onPress={handleSubmit}/>
            </>
            )}
            </Formik>
            <Button text="Geri dön" theme="secondary" onPress={handleLogin}/>
        </SafeAreaView>
    );
};

export default Sign;