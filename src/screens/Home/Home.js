import { useState } from 'react';
import { Text, View, useColorScheme, SafeAreaView, StatusBar, Switch, TextInput, Pressable, ScrollView, Keyboard, Alert, ActivityIndicator, Dimensions } from 'react-native'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import PriceCalculator from '../../components/PriceCalculator';
import Table from '../../components/Table';
import { Colors } from '../../res/Colors';
import { Fonts } from '../../res/FontsStyle';
import { styles } from './Styles';
import { BannerAd, TestIds, BannerAdSize } from 'react-native-google-mobile-ads';

const { height } = Dimensions.get('screen');

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

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <ScrollView contentContainerStyle={styles.main}>
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
                            <Text style={{ color: isDarkMode ? Colors.white : Colors.black, fontFamily: Fonts.bold, fontSize: 16, paddingTop: 10, paddingBottom: 10 }}>
                                Verdiğiniz Fiyat: {price}₺
                            </Text>
                            {number !== '' && (
                                <>
                                    <Text style={{ color: isDarkMode ? Colors.white : Colors.black, fontFamily: Fonts.bold, fontSize: 16 }}>
                                        Hisse Adeti: {number}
                                    </Text>
                                    <Text style={{ color: isDarkMode ? Colors.white : Colors.black, fontFamily: Fonts.bold, fontSize: 16, paddingBottom: 10 }}>
                                        Toplam Hisse Değeri: {(price * number).toFixed(2)}₺
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
                                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ width: responsiveWidth(90), height: height * 1.8 }}>
                                    <Table data={tableData} />
                                </ScrollView>
                            ) : (
                                <>
                                    <View style={{ marginBottom: responsiveHeight(14), borderWidth: 1,borderColor: 'orange'}}>
                                        {tableData.map((item, index) => (
                                            <View style={{ flexDirection: 'row', alignItems: 'center',padding:6}} key={index}>
                                                <Text style={{ color: isDarkMode ? Colors.white : Colors.black, fontFamily: Fonts.light, fontSize: 16, padding: 6 }}>
                                                    {item.id}.Tavan
                                                </Text>
                                                <Text style={{ color: 'green', fontFamily: Fonts.regular, fontSize: 16, marginLeft: 20 }}>
                                                    +{item.percent}₺
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                </>
                            )}
                        </>
                    )}

                </>
            </ScrollView>
            <View style={styles.bannerAdStyle}>
                <BannerAd size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} unitId={TestIds.BANNER} />
            </View>
        </SafeAreaView>
    )
}

export default Home
