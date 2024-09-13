import { StyleSheet } from "react-native";
import colors from '../../../styles/colors';

export default StyleSheet.create({
    container: {
        backgroundColor: colors.darkgreen,
        margin: 10,
        padding: 10,
        borderRadius: 10,
        borderWidth: 3,
        borderColor:'#1D8D84',
    },
    inner_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    user: {
        fontSize: 13,
        color: 'white',
    },
    date: {
        fontStyle: 'italic',
        color: 'white',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
    },
    footer: {
        alignItems: 'flex-end',
        
    },
    dislike_container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 3,
        paddingHorizontal: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
    dislike_count_container: {
        backgroundColor: colors.darkgreen,
        padding: 3,
        marginRight: 3,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dislike_count_text: {
        color: 'white',
        fontWeight: 'bold',
    },
    dislike_text: {
        fontWeight: 'bold',
        color: colors.darkgreen,
    },
});