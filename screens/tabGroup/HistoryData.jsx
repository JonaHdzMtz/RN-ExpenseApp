import { StyleSheet, View, Text } from 'react-native';
import { CardData } from '../../components/CardData';
import { use, useEffect, useState } from 'react';
import { getExpensese } from '../../service/ExpenseService';
import { useNavigationState } from '@react-navigation/native';
import { FlatList } from "react-native";
import DateTimePickerAndroid from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { TouchableHighlight } from 'react-native';
import { Animated } from 'react-native';
import { useRef } from 'react';
import { useContext } from 'react';
import { CreateContext } from '../../context/ContextProvider';


export const HistoryData = ({ navigation, route }) => {
    const { expenseList,
        setExpenseList,
        theme } = useContext(CreateContext);

    const [expenses, setExpenses] = useState([]);
    const [showPrevDate, setShowPrevDate] = useState(false);
    const [showPostDate, setShowPostDate] = useState(false);
    const [prevDate, setPrevDate] = useState('');
    const [postDate, setPostDate] = useState('');
    const currentRoute = useNavigationState((state) => state.routes[state.index]);
    const [filterListed, setFilterListed] = useState([]);
    const [showFilter, setShowFilter] = useState(false);

    const [cost, setCost] = useState(0);
    useEffect(() => {
        if (currentRoute.name === "Historial") {
            getExpepenses();
        }
    }, [currentRoute])

    // reset del filtro de fechas
    useEffect(() => {
        if (prevDate === '' && postDate === '') {
            setFilterListed(expenses);
            setCost(0);
        }
    }, [filterListed, expenses]);


    const getExpepenses = () => {
        getExpensese().then((result) => {
            setExpenses(result)
        })
    }

    const convertToDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return new Date(`${year}-${month}-${day}`);
    };

    //!IMPORTANTE:
    //tengo un error en el item.date del expense, por eso este filtro, debo corregirlo y eliminar esta funcion para usar solo convertToDate
    const convertToDate2 = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return new Date(`${year}-${day}-${month}`);
    };

    const clearFilters = () => {
        setPrevDate('');
        setPostDate('');
        toggleContainer();
    }

    const calculateCost = (expenses) => {
        let total = 0;
        expenses.forEach((item) => {
            total += item.price;
        })
        setCost(total);
    }

    useEffect(() => {
        if (prevDate !== '' && postDate !== '') {
            const filter = expenses.filter((item) => {
                const prevDateConverted = new Date(convertToDate(prevDate));
                const postDateConverted = new Date(convertToDate(postDate));
                const dateItem = new Date(convertToDate2(item.date));
                return dateItem >= prevDateConverted && dateItem <= postDateConverted
            })
            calculateCost(filter);
            setFilterListed(filter)
        } else {
            setFilterListed(expenses)
        }

    }
        , [prevDate, postDate]);

    const handlePrevDate = () => {
        setShowPrevDate(!showPrevDate);
    }

    const handleClosePrevDate = (date) => {
        const dateConverted = new Date(date.nativeEvent.timestamp);
        setShowPrevDate(!showPrevDate);
        const formattedDate = dateConverted.toLocaleDateString('es-ES', {
            day: '2-digit',    // Asegura que el día tenga siempre 2 dígitos
            month: '2-digit',  // Asegura que el mes tenga siempre 2 dígitos
            year: 'numeric',   // Incluye el año completo
        });
        setPrevDate(formattedDate);
    }

    const handlePostDate = () => {
        setShowPostDate(!showPostDate);
    }

    const handleClosePostDate = (date) => {
        const dateConverted = new Date(date.nativeEvent.timestamp);
        setShowPostDate(!showPostDate);
        const formattedDate = dateConverted.toLocaleDateString('es-ES', {
            day: '2-digit',    // Asegura que el día tenga siempre 2 dígitos
            month: '2-digit',  // Asegura que el mes tenga siempre 2 dígitos
            year: 'numeric',   // Incluye el año completo
        });
        setPostDate(formattedDate);

    }

    const animation = useRef(new Animated.Value(0)).current;
    const toggleContainer = () => {
        if (showFilter) {
            // Animación para ocultar
            Animated.timing(animation, {
                toValue: 0, // Altura final del contenedor
                duration: 300,
                useNativeDriver: false,
            }).start(() => setShowFilter(false));
        } else {
            setShowFilter(true);
            Animated.timing(animation, {
                toValue: 150,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    };



    return (
        <View style={theme === 'dark' ? styles.darkContainer : styles.container}>
            {showFilter && (
                <Animated.View style={[theme === "dark" ? styles.filtersContainerDark : styles.filtersContainer, { height: animation }]}>
                    <TouchableHighlight style={theme === "dark" ? styles.ButtonShowFilterDark : styles.ButtonShowFilter} onPress={handlePrevDate}>
                        <View>
                            <Text style={theme === "dark" ? styles.showFilterFontDark : styles.showFilterFont}>{prevDate ? `Fecha inicial: ${prevDate}` : "Fecha inicial"}</Text>
                            {showPrevDate && (
                                <RNDateTimePicker value={new Date()} display='calendar' onChange={handleClosePrevDate} />
                            )
                            }
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={theme === "dark" ? styles.ButtonShowFilterDark : styles.ButtonShowFilter} onPress={handlePostDate}>
                        <View>
                            <Text style={theme === "dark" ? styles.showFilterFontDark : styles.showFilterFont}>{postDate ? `Fecha final: ${postDate}` : "Fecha final"}</Text>
                            {
                                showPostDate && (
                                    <RNDateTimePicker value={new Date()} display='calendar' onChange={handleClosePostDate} />
                                )
                            }
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.ButtonShowFilter]} onPress={clearFilters}>
                        <Text style={[styles.showFilterFont]}>Limpiar filtros</Text>
                    </TouchableHighlight>
                </Animated.View>
            )}

            <TouchableHighlight style={theme === "dark" ? styles.ButtonShowFilterDark : styles.ButtonShowFilter} onPress={toggleContainer} >
                <Text style={theme === "dark" ? styles.showFilterFontDark : styles.showFilterFont}>Filtros</Text>
            </TouchableHighlight>
            {cost > 0 && <Text style={{ textAlign: 'right', width: "90%", fontSize: 20 }}>{`Costo: ${cost} `}</Text>}
            {expenses.length === 0 ?
                <Text>No hay datos</Text>
                :
                <FlatList
                    data={filterListed}
                    renderItem={({ item }) => <CardData {...item} />}
                    keyExtractor={(item) => item.idExpense} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        gap: 15
    },
    darkContainer: {
        flex: 1,
        paddingTop: 10,
        alignItems: 'center',
        backgroundColor: 'black',
        gap: 15
    },
    filtersContainer: {
        boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.25)',
        width: "90%",

        overflow: 'hidden',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    filtersContainerDark: {
        borderWidth: 1,
        width: "90%",
        borderColor: "white",
        overflow: 'hidden',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    ButtonShowFilter: {
        width: "80%",
        height: 30,
        boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.25)',
        borderRadius: 10,
        backgroundColor: "white"
    },
    ButtonShowFilterDark: {
        width: "80%",
        height: 30,
        boxShadow: '0px 1px 4px 0px rgba(0,0,0,0.25)',
        borderRadius: 10,
        backgroundColor: "white"
    },
    ButtonShowFilterDark: {
        width: "80%",
        height: 30,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 10,
        backgroundColor: "white"
    },
    showFilterFont: {
        fontSize: 20,
        textAlign: 'center'
    },
    showFilterFontDark: {
        fontSize: 20,
        textAlign: 'center',
        color: "black",

    }
})