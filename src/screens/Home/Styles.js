import { StyleSheet } from "react-native"
import { Fonts } from "../../res/FontsStyle"

export const styles = StyleSheet.create({
    main: {
        alignItems: 'center',
        marginTop: 20,
    },
    selectContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    input: {
        borderColor: 'lightgray',
        width: 140,
        fontFamily: Fonts.bold,
        borderWidth: 1,
        paddingVertical: 11.7,
        borderRadius: 16,
        padding: 10,
        marginTop: 10
    },
    inputPrice: {
        borderColor: 'lightgray',
        width: 140,
        fontFamily: Fonts.bold,
        borderWidth: 1,
        paddingVertical: 11.7,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    turkishLira: {
        backgroundColor: 'lightgray',
        padding: 14.5,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12
    },
    calculate: {
        padding: 14.2,
        backgroundColor: 'darkorange',
        marginTop: 20,
        borderRadius: 12,
        marginBottom:10
    },

})