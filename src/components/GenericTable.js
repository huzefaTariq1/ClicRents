import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppText from './AppText';
import { MessageIcon, UpArrowIcon, User } from './Icons';
import AppButton from './AppButton';
import MYDropDown from './MyDropDown';
import { getTranslation } from '../helpers/TranslationUtils';

const GenericTable = ({
  columns,
  fetchData,
  data,
  setData,
  sort,
  setSort,
  sortDirection,
  setSortDirection,
  searchString,
  setSearchString,
  pageNumber,
  pageSize,
  handlePreviousPage,
  handleNextPage,
  onClick,
  Loading,
  totalPages,
  //hasNext,
  // hasPrevious
  model,
  catagery,
  handleSelectedItemChange,
  allTenants,
  handleCategorySelection,
  handleSearchString,
  setHandleSerachString
}) => {
  const navigation = useNavigation();
  const [sortAscending, setSortAscending] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  const [inputFields, setInputFields] = useState([]);
  const [totalAmount, setTotalAmount] = useState(selectedRow?.amount);

  //const [sortDirection, setSortDirection] = useState(0); // 0 for ascending, 1 for descending

  const handleSort = column => {
    const newSortDirection = sortDirection === 1 ? 0 : 1;
    setSort(column.id)
    setSortDirection(newSortDirection);
    console.log("sort",sortDirection)
   // fetchData(handleSearchString, pageNumber, pageSize, newSortDirection);
  };
  
  const handleEnter=()=>{
    setHandleSerachString(searchString)
    console.log("njnj",handleSearchString)
  }
  




  useEffect(() => {
    fetchData(handleSearchString, pageNumber, pageSize,sortDirection,sort);
  }, [handleSearchString, pageNumber, pageSize,sortDirection,sort]);

  // const handleSort = column => {
  //   const sortedData = [...data].sort((a, b) => {
  //     const subjectA = a[column.id] || '';
  //     const subjectB = b[column.id] || '';

  //     if (typeof subjectA === 'string' && typeof subjectB === 'string') {
  //       const lowerCaseA = subjectA.toLowerCase();
  //       const lowerCaseB = subjectB.toLowerCase();

  //       if (lowerCaseA < lowerCaseB) {
  //         return sortAscending ? -1 : 1;
  //       }
  //       if (lowerCaseA > lowerCaseB) {
  //         return sortAscending ? 1 : -1;
  //       }
  //       return 0;
  //     }

  //     if (typeof subjectA === 'number' && typeof subjectB === 'number') {
  //       return sortAscending ? subjectA - subjectB : subjectB - subjectA;
  //     }

  //     if (column.format === 'date') {
  //       const dateA = new Date(subjectA);
  //       const dateB = new Date(subjectB);

  //       return sortAscending ? dateA - dateB : dateB - dateA;
  //     }

  //     return 0;
  //   });

  //   setData(sortedData);
  //   setSortAscending(!sortAscending);
  // };

  const renderTableHeaders = () => {
    const columnWidth = `${100 / columns.length}%`;

    return (
      <View style={styles.tableHeader}>
        {columns.map(column => (
          <TouchableOpacity
            style={[styles.columnHeader, { width: columnWidth }]}
            onPress={() => handleSort(column)}
            activeOpacity={0.8}
            key={column.id}>
            <Text style={styles.columnHeaderText}>{column.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderTableData = () => {
    if (data.length === 0) {
      return <Text>No Data</Text>;
    }

    const itemIsCurrentMonth = date => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();
  
      const itemDate = new Date(date);
      const itemMonth = itemDate.getMonth() + 1;
      const itemYear = itemDate.getFullYear();
  
      return itemMonth === currentMonth && itemYear === currentYear;
    };

    const formatDate = dateString => {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      if (day === 1 && month === 1 && year === 1) {
        return '-';
      }
      return `${day}-${month}-${year}`;
    };

    const handleRowPress = item => {
      if (onClick) {
        navigation.navigate(onClick, item);
      }
      if (model) {
        setModalVisible(true);
        setSelectedRow(item);
      }
    };

    return data.map((item, index) => (
      <TouchableOpacity onPress={() => handleRowPress(item)} style={styles.tableRow} key={index}>
        {columns.map(column => (
          <View style={styles.rowData} key={column.id}>
            {column.format === 'date' ? (
              // <Text style={styles.rowDataText1}>{formatDate(item[column.id])}</Text>
              <Text style={[styles.rowDataText1, { color: itemIsCurrentMonth(item[column.id]) ? 'green' : 'red' }]}>
              {formatDate(item[column.id])}
            </Text>
            ) : (
              <Text style={styles.rowDataText}>
                {typeof item[column.id] === 'number'
                  ? item[column.id].toFixed(2)
                  : item[column.id] || '-'}
              </Text>
            )}

            {column.id === 'bankAction' ? (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.navigate('message', item)} style={{ marginRight: 3 }}>
                  <MessageIcon />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        ))}
      </TouchableOpacity>
    ));
  };

  if (Loading) {
    return <ActivityIndicator size="large" color="#fb5e39" />;
  }

  const hasPrevious = pageNumber > 0;
  const hasNext = data.length === pageSize;
  //console.log("has next ", hasNext)

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchString}
          onChangeText={text => setSearchString(text)}
          onSubmitEditing={()=>handleEnter()} 
        />
      </View>
      {renderTableHeaders()}
      {renderTableData()}

      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[
            styles.paginationButton,
            !hasPrevious && styles.disabledButton,
          ]}
          onPress={handlePreviousPage}
          disabled={!hasPrevious}>
          <Text style={styles.paginationButtonText}>Previous</Text>
        </TouchableOpacity>

        <Text style={styles.paginationText}>
          Page {pageNumber + 1} of {totalPages}
        </Text>

        <TouchableOpacity
          style={[styles.paginationButton, !hasNext && styles.disabledButton]}
          onPress={handleNextPage}
          disabled={!hasNext}>
          <Text style={styles.paginationButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GenericTable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    //paddingHorizontal: 10,
  },
  searchContainer: {
    marginBottom: 10,
  },
  searchInput: {
    borderRadius: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  columnHeader: {
    flex: 1,
    justifyContent: 'center',
   justifyContent: 'center',
    alignItems: 'center',
   flexDirection:"row",
    
  },
  columnHeaderText: {
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
  },
  headingText: { color: '#777777', fontWeight: '700' },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomColor: '#DEDEDE',
    borderTopColor: 'white',
    borderRightColor: 'white',
    borderLeftColor: 'white',
    borderWidth: 2,
    paddingBottom: 10,
    justifyContent: 'center',
   // backgroundColor:"red"
  },
  rowData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:"blue"
  },
  rowDataText: {
    fontSize: 12,
  },
  rowDataText1: {
    color: 'red',
    fontSize: 12,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationButton: {
    marginHorizontal: 5,
    padding: 6,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
  paginationButtonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    marginHorizontal: 11,
    backgroundColor: 'white',
    borderRadius: 20,
    //paddingVertical: 35,
    paddingHorizontal: 15,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

// <View style={styles.paginationContainer}>
// <TouchableOpacity
//   style={styles.paginationButton}
//   onPress={handlePreviousPage}
//   disabled={pageNumber === 0}
// >
//   <Text style={styles.paginationButtonText}>Previous</Text>
// </TouchableOpacity>
// <TouchableOpacity style={styles.paginationButton} onPress={handleNextPage}>
//   <Text style={styles.paginationButtonText}>Next</Text>
// </TouchableOpacity>
// </View>

// <TouchableOpacity style={{}} onPress={()=>console.log("touched")}>
// {column.id === 'bankAction'  ? <User /> : null}
// </TouchableOpacity>
