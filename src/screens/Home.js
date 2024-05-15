

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {API_URL, LOGIN_BASE_URL} from "@env"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  searchContainer: {
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  columnHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  columnHeaderText: {
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomColor: '#DEDEDE',
    borderTopColor: 'white',
    borderRightColor: 'white',
    borderLeftColor: 'white',
    borderWidth: 2,
  },
  rowData: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowDataText: {},
});

const Home = () => {
  const [data, setData] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    fetchData();
  }, [searchString]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/Building/GetAllBuildingsWithPagination?status=all&pageNumber=0&pageSize=10&searchString=${searchString}`,
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSort = () => {
    const sortedData = [...data].sort((a, b) => {
      const subjectA = a.name.toLowerCase();
      const subjectB = b.name.toLowerCase();
      if (subjectA < subjectB) {
        return sortAscending ? -1 : 1;
      }
      if (subjectA > subjectB) {
        return sortAscending ? 1 : -1;
      }
      return 0;
    });
    setData(sortedData);
    setSortAscending(!sortAscending);
  };

  const renderTable = () => {
    if (data.length === 0) {
      return <Text>Loading...</Text>;
    }

    return (
      <>
        <View style={styles.tableHeader}>
          <TouchableOpacity
            style={styles.columnHeader}
            onPress={handleSort}
            activeOpacity={0.8}>
            <Text style={styles.columnHeaderText}>Subject</Text>
          </TouchableOpacity>
          <View style={styles.columnHeader}>
            <Text style={styles.columnHeaderText}>Apartment</Text>
          </View>
          <View style={styles.columnHeader}>
            <Text style={styles.columnHeaderText}>Cost</Text>
          </View>
        </View>
        {data.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.rowData}>
              <Text style={styles.rowDataText}>{item.name}</Text>
            </View>
            <View style={styles.rowData}>
              <Text style={styles.rowDataText}>{item.totalApartments}</Text>
            </View>
            <View style={styles.rowData}>
              <Text style={styles.rowDataText}>{item.totalCost}</Text>
            </View>
          </View>
        ))}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchString}
          onChangeText={text => setSearchString(text)}
        />
      </View>
      {renderTable()}
    </View>
  );
};

export default Home;
