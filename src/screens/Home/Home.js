import { useState } from 'react';
import { Text, View, useColorScheme, SafeAreaView, StatusBar, Switch, TextInput, Pressable, ScrollView, Keyboard, Alert, ActivityIndicator, Modal, Button } from 'react-native'
import PriceCalculator from '../../components/PriceCalculator';
import { Colors } from '../../res/Colors';
import { Fonts } from '../../res/FontsStyle';
import { styles } from './Styles';

const Home = () => {

    const [isEnabled, setIsEnabled] = useState(false);
    const [price, setPrice] = useState('');
    const [number, setNumber] = useState('');
    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.black : Colors.white,
        flex: 1
    };
    const headertextStyle = {
        color: isDarkMode ? Colors.black : Colors.white,
        fontFamily: Fonts.bold,
        flex: 1,
        padding: 8
    };

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        setTableData([]);
        setPrice('');
        setNumber('');
    };

    const handleCalculate = () => {
        setIsLoading(true);
        let percent = parseFloat(price).toFixed(2)
        let resultArray = [];
        let totalValue = parseFloat(price * number)

        setTimeout(() => {

            if (!isEnabled) {
                if (price === '') {
                    Alert.alert('Lütfen boşlukları doldurun');
                    setIsLoading(false)
                    return;
                }
                for (let i = 0; i < 30; i++) {
                    percent = (percent * 1.1).toFixed(2);
                    resultArray.push({
                        id: i + 1,
                        percent: percent
                    });
                }
                setTableData(resultArray);
                Keyboard.dismiss();

            } else if (isEnabled) {
                if (price === '' || number === '') {
                    Alert.alert('Lütfen boşlukları doldurun');
                    setIsLoading(false)
                    return;
                }
                for (let i = 0; i < 30; i++) {
                    percent = (percent * 1.1).toFixed(2);
                    totalValue = (totalValue * 1.1).toFixed(2);
                    revenue = Math.abs(price * number - (totalValue)).toFixed(2);
                    resultArray.push({
                        id: i + 1,
                        totalValue: totalValue,
                        percent: percent,
                        revenue: revenue
                    });
                }
                setTableData(resultArray);
                Keyboard.dismiss();
            } setIsLoading(false);
        }, 200)
    }
    const TableHeader = () => (
        <View style={{ flexDirection: 'row', backgroundColor: 'lightgray', }}>
            <Text style={headertextStyle}>Tavan</Text>
            <Text style={headertextStyle}>Fiyat</Text>
            <Text style={headertextStyle}>Toplam Değer</Text>
            <Text style={headertextStyle}>Kazanç (TL)</Text>
        </View>
    );

    const TableRow = ({ item }) => (
        <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: isDarkMode ? Colors.white : Colors.black, fontFamily: Fonts.light, flex: 1, padding: 8, }}>{item.id}.Tavan</Text>
            <Text style={{ fontFamily: Fonts.light, flex: 1, padding: 8, color: 'green' }}>{item.percent}₺</Text>
            <Text style={{ color: isDarkMode ? Colors.white : Colors.black, fontFamily: Fonts.light, flex: 1, padding: 8, }}>{item.totalValue}₺</Text>
            <Text style={{ fontFamily: Fonts.light, flex: 1, padding: 8, color: 'green', fontWeight: 'bold', paddingBottom: 16 }}> + {item.revenue}₺</Text>
        </View>
    );


    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <View style={styles.main}>
                <View style={styles.selectContainer}>
                    <Text style={{ color: isDarkMode ? Colors.white : Colors.black, fontFamily: Fonts.regular, fontSize: 18, }} >Detaylı Hesaplama</Text>
                    <Switch
                        trackColor={{ false: 'gray', true: 'darkorange' }}
                        thumbColor={isEnabled ? 'white' : 'white'}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <Text style={{ color: isDarkMode ? Colors.white : Colors.black, fontFamily: Fonts.light, fontSize: 16, }}>Hissenin Fiyatı</Text>
                {!isEnabled ?
                    <PriceCalculator handleCalculate={handleCalculate} setPrice={setPrice} price={price} isDarkMode={isDarkMode} />
                    :
                    <>
                        <View style={styles.inputContainer}>
                            <View style={styles.turkishLira}>
                                <Text style={{ color: 'black', fontSize: 20 }}>₺</Text>
                            </View>
                            <TextInput
                                style={[styles.inputPrice, { color: isDarkMode ? 'white' : Colors.black }]}
                                placeholder='Fiyat'
                                placeholderTextColor={'gray'}
                                keyboardType='numeric'
                                onChangeText={(price) => setPrice(price)}
                                value={price}
                            />
                        </View>
                        <Text style={{ color: isDarkMode ? Colors.white : Colors.black, fontFamily: Fonts.light, fontSize: 16, }}>Hisse Adet</Text>
                        <TextInput style={[styles.input, { color: isDarkMode ? 'white' : Colors.black }]}
                            placeholder='Adet'
                            placeholderTextColor={'gray'}
                            keyboardType='numeric'
                            onChangeText={(number) => setNumber(number)}
                            value={number} />
                        <Pressable onPress={() => handleCalculate()} style={styles.calculate}>
                            <Text style={{ color: Colors.white, fontFamily: Fonts.bold, fontSize: 18, }}>Hesapla</Text>
                        </Pressable>
                    </>
                }
                <>
                    {price !== '' && (
                        <>
                            <Text style={{ color: isDarkMode ? Colors.white : Colors.black, fontFamily: Fonts.bold, fontSize: 16, paddingTop: 10,paddingBottom:10 }}>
                                Verdiğiniz Fiyat: {price}₺
                            </Text>
                            {number !== '' && (
                                <>
                                    <Text style={{ color: isDarkMode ? Colors.white : Colors.black, fontFamily: Fonts.bold, fontSize: 16 }}>
                                        Hisse Adeti: {number}
                                    </Text>
                                    <Text style={{ color: isDarkMode ? Colors.white : Colors.black, fontFamily: Fonts.bold, fontSize: 16, paddingBottom: 10 }}>
                                        Toplam Hisse Değeri: {(price * number).toFixed(2)}
                                    </Text>
                                </>
                            )}
                        </>
                    )}

                    {isLoading ? (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color="darkorange" />
                        </View>
                    ) : (
                        <>
                            {isEnabled && number !== '' && price !== '' ? (
                                <ScrollView contentContainerStyle={{ paddingBottom: 80 }} style={{ maxHeight: 400, width: 380 }}>
                                    <TableHeader />
                                    {tableData.map((item, index) => (
                                        <TableRow key={index} item={item} />
                                    ))}
                                </ScrollView>
                            ) : (
                                <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={{ maxHeight: 500, width: 380 }}>
                                    {tableData.map((item, index) => (
                                        <View style={{ flexDirection: 'row' }} key={index}>
                                            <Text style={{ color: isDarkMode ? Colors.white : Colors.black, fontFamily: Fonts.light, fontSize: 16, padding: 6 }}>
                                                {item.id}.Tavan
                                            </Text>
                                            <Text style={{ color: 'green', fontFamily: Fonts.regular, fontSize: 16, marginLeft: 20 }}>
                                                +{item.percent}₺
                                            </Text>
                                        </View>
                                    ))}
                                </ScrollView>
                            )}
                        </>
                    )}

                </>
            </View>
        </SafeAreaView>
    )
}

export default Home
