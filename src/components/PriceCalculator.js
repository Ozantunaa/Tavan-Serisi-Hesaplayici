import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { Colors } from '../res/Colors'
import { Fonts } from '../res/FontsStyle'
import {responsiveScreenWidth} from 'react-native-responsive-dimensions'

const PriceCalculator = ({ isDarkMode, setPrice, price, handleCalculate }) => {
    return (
        <View style={styles.inputContainer}>
            <View style={styles.turkishLira}>
                <Text style={{ color: 'black', fontSize: 20 }}>₺</Text>
            </View>
            <TextInput
                style={[styles.input, { color: isDarkMode ? 'white' : Colors.black }]}
                placeholder='Fiyat'
                placeholderTextColor={'gray'}
                keyboardType='numeric'
                onChangeText={(value) => setPrice(value)}
                value={price}
            />
            <Pressable onPress={handleCalculate} style={styles.calculate}>
                <Text style={{ color: Colors.white, fontFamily: Fonts.bold, fontSize: 18, }}>Hesapla</Text>
            </Pressable>
        </View>
    )
}

export default PriceCalculator

const styles = StyleSheet.create({
    input: {
        borderColor: 'lightgray',
        width: responsiveScreenWidth(40),
        fontFamily: Fonts.bold,
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 14,
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
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,

    }
})