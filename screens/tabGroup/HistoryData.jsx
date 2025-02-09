import { StyleSheet, View, Text } from "react-native";
import { CardData } from "../../components/CardData";
import { use, useEffect, useState } from "react";
import { getExpensese } from "../../service/ExpenseService";
import { useNavigationState } from "@react-navigation/native";
import { FlatList } from "react-native";
import DateTimePickerAndroid from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { TouchableHighlight } from "react-native";
import { Animated } from "react-native";
import { useRef } from "react";
import { useContext } from "react";
import { CreateContext } from "../../context/ContextProvider";
import { Dimensions } from "react-native";
import { CardDataDetailed } from "../../components/CardDataDetailed";
export const HistoryData = ({ navigation, route }) => {
  const { expenseList, setExpenseList, theme, cardType } = useContext(CreateContext);
  const { width } = Dimensions.get("window");
  const [expenses, setExpenses] = useState([]);
  const [showPrevDate, setShowPrevDate] = useState(false);
  const [showPostDate, setShowPostDate] = useState(false);
  const [prevDate, setPrevDate] = useState("");
  const [postDate, setPostDate] = useState("");
  const currentRoute = useNavigationState((state) => state.routes[state.index]);
  const [filterListed, setFilterListed] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const [cost, setCost] = useState(0);
  useEffect(() => {
    if (currentRoute.name === "Historial") {
      getExpepenses();
    }
  }, [currentRoute]);

  useEffect(() => {

    console.log("dasdasd " + cardType )
  }, [cardType]);

  // reset del filtro de fechas
  useEffect(() => {
    if (prevDate === "" && postDate === "") {
      setFilterListed(expenses);
      setCost(0);
    }
  }, [filterListed, expenses]);

  const getExpepenses = () => {
    getExpensese().then((result) => {
      setExpenses(result);
    });
  };

  const convertToDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return new Date(`${year}-${month}-${day}`);
  };

  //!IMPORTANTE:
  //tengo un error en el item.date del expense, por eso este filtro, debo corregirlo y eliminar esta funcion para usar solo convertToDate
  const convertToDate2 = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return new Date(`${year}-${day}-${month}`);
  };

  const clearFilters = () => {
    setPrevDate("");
    setPostDate("");
    toggleContainer();
  };

  const calculateCost = (expenses) => {
    let total = 0;
    expenses.forEach((item) => {
      total += item.price;
    });
    setCost(total);
  };

  useEffect(() => {
    if (prevDate !== "" && postDate !== "") {
      const filter = expenses.filter((item) => {
        const prevDateConverted = new Date(convertToDate(prevDate));
        const postDateConverted = new Date(convertToDate(postDate));
        const dateItem = new Date(convertToDate2(item.date));
        return dateItem >= prevDateConverted && dateItem <= postDateConverted;
      });
      calculateCost(filter);
      setFilterListed(filter);
    } else {
      setFilterListed(expenses);
    }
  }, [prevDate, postDate]);

  const handlePrevDate = () => {
    setShowPrevDate(!showPrevDate);
  };

  const handleClosePrevDate = (date) => {
    const dateConverted = new Date(date.nativeEvent.timestamp);
    setShowPrevDate(!showPrevDate);
    const formattedDate = dateConverted.toLocaleDateString("es-ES", {
      day: "2-digit", // Asegura que el día tenga siempre 2 dígitos
      month: "2-digit", // Asegura que el mes tenga siempre 2 dígitos
      year: "numeric", // Incluye el año completo
    });
    setPrevDate(formattedDate);
  };

  const handlePostDate = () => {
    setShowPostDate(!showPostDate);
  };

  const handleClosePostDate = (date) => {
    const dateConverted = new Date(date.nativeEvent.timestamp);
    setShowPostDate(!showPostDate);
    const formattedDate = dateConverted.toLocaleDateString("es-ES", {
      day: "2-digit", // Asegura que el día tenga siempre 2 dígitos
      month: "2-digit", // Asegura que el mes tenga siempre 2 dígitos
      year: "numeric", // Incluye el año completo
    });
    setPostDate(formattedDate);
  };

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
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      {showFilter && (
        <Animated.View
          style={[
            styles.filtersContainer,
            { height: animation, borderColor: theme.color },
          ]}
        >
          <TouchableHighlight
            style={[
              styles.ButtonShowFilter,
              { backgroundColor: theme.secondary },
            ]}
            onPress={handlePrevDate}
          >
            <View>
              <Text style={[styles.showFilterFont,{color:theme.color}]}>
                {prevDate ? `Fecha inicial: ${prevDate}` : "Fecha inicial"}
              </Text>
              {showPrevDate && (
                <RNDateTimePicker
                  value={new Date()}
                  display="calendar"
                  onChange={handleClosePrevDate}
                />
              )}
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={[
              styles.ButtonShowFilter,
              { backgroundColor: theme.secondary },
            ]}
            onPress={handlePostDate}
          >
            <View>
              <Text style={[styles.showFilterFont,{color:theme.color}]}>
                {postDate ? `Fecha final: ${postDate}` : "Fecha final"}
              </Text>
              {showPostDate && (
                <RNDateTimePicker
                  value={new Date()}
                  display="calendar"
                  onChange={handleClosePostDate}
                />
              )}
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={[
              styles.ButtonShowFilter,
              { backgroundColor: theme.secondary },
            ]}
            onPress={clearFilters}
          >
            <Text style={[styles.showFilterFont,{color:theme.color}]}>Limpiar filtros</Text>
          </TouchableHighlight>
        </Animated.View>
      )}

      <TouchableHighlight
        style={[styles.ButtonShowFilter, { backgroundColor: theme.secondary }]}
        onPress={toggleContainer}
      >
        <Text style={[styles.showFilterFont,{color:theme.color}]}>Filtros</Text>
      </TouchableHighlight>
      {cost > 0 && (
        <Text
          style={{
            textAlign: "right",
            width: width,
            fontSize: 20,
            color: theme.color,
            backgroundColor: theme.primary,
            paddingEnd: 10,
          }}
        >{`Costo: $${cost} `}</Text>
      )}
      {expenses.length === 0 ? (
        <Text>No hay datos</Text>
      ) : (
        <FlatList
          data={filterListed}
          renderItem={({ item }) => cardType === "boxCard"? <CardDataDetailed {...item} type={1}  /> : <CardData {...item} type={1} />}
          keyExtractor={(item) => item.idExpense}
          
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    gap: 15,
  },
  filtersContainer: {
    boxShadow: "0px 1px 4px 0px rgba(0,0,0,0.25)",
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "space-around",
   
    paddingBottom: 10,
  },
  ButtonShowFilter: {
    width: "80%",
    height: 35,
    boxShadow: "0px 1px 4px 0px rgba(0,0,0,0.25)",
    borderRadius: 10,
    marginTop: 10,
    justifyContent: "center",
  },
  showFilterFont: {
    fontSize: 20,
    textAlign: "center",
  },
});
