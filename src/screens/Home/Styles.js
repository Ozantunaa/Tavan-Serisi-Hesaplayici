import { StyleSheet } from "react-native"
import { responsiveScreenWidth } from "react-native-responsive-dimensions"
import { Fonts } from "../../res/FontsStyle"

export const styles = StyleSheet.create({
    main: {
        marginTop: 20,
        alignItems:'center'
    },
    selectContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    input: {
        borderColor: 'lightgray',
        width: responsiveScreenWidth(40),
        fontFamily: Fonts.bold,
        borderWidth: 1,
        borderRadius: 16,
        marginVertical:12
    },
    inputPrice: {
        borderColor: 'lightgray',
        width: responsiveScreenWidth(50),
        fontFamily: Fonts.bold,
        borderWidth: 1,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12
    },
    inputContainer: {
        flexDirection: 'row',
        paddingVertical: 10
    },
    turkishLira: {
        backgroundColor: 'lightgray',
        padding: 14.5,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12
    },
    calculate: {
        padding: 14,
        backgroundColor: 'darkorange',
        borderRadius: 12,
    },
    bannerAdStyle: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
      }

})