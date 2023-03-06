import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Fonts } from '../res/FontsStyle'

const Table = ({ data }) => {
    const isDarkMode = useColorScheme() === 'dark';

    const headerText = {
        color: isDarkMode ? Colors.white : Colors.black,
        fontFamily: Fonts.light,
        padding: 8,
        flex: 1
    }
    return (
        <View style={styles.table}>
            <View style={styles.tableRowHead}>
                <Text style={headerText}>Tavan</Text>
                <Text style={headerText}>Fiyat</Text>
                <Text style={headerText}>Toplam Değer</Text>
                <Text style={headerText}>Kazanç (TL)</Text>
            </View>
            {data.map((item) => (
                <View key={item.id} style={styles.tableRow}>
                    <Text style={[styles.rowText, {color: isDarkMode ? Colors.white : Colors.black}]}>{`${item.id}.Tavan`}</Text>
                    <Text style={[styles.rowText, { color: 'green' }]}>{`${item.percent}₺`}</Text>
                    <Text style={[styles.rowText,{color: isDarkMode ? Colors.white : Colors.black}]}>{`${item.totalValue}₺`}</Text>
                    <Text style={[styles.rowText, { color: 'green', fontWeight: 'bold', paddingBottom: 16 }]}>{`+ ${item.revenue}₺`}</Text>
                </View>
            ))}
        </View>
    )
}

export default Table

const styles = StyleSheet.create({
    table: {
        borderWidth: 1,
        borderColor: 'orange',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },
    rowText: {
        fontFamily: Fonts.light,
        padding: 8,
        flex: 1,
    },
    tableRowHead:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth:1,
        borderColor:'orange'
    }
})