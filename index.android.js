/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = React;

var ToastModule = require('./NativeModules');


var REQUEST_URL = 'https://test.ledgex.com/api/list/GetList/';
var myHeaders = new Headers({"Authorization": "Bearer r5gh4VYQEBGCVUPhxVlPBioHDuhEIeU5CpaIUVhARo_7bPfjW2LmgiLwiNDvifADdz4NUZ36kYWQSjmAXD-o-bSC9bDM9lviDeBqcf0E9uozprwyV8VehgGcRCUEQ1r6Ph1mS8008zs5avn-htz0r9tIpJ-b6fYVzDdacU_42PbaUnn34c7p5uqziqVz7Jhov-_lTuf0yw_-Up7M8Cf8j9ihtur-ZrYcuW2wzgSCae8sO74iibsz1QOKrBkuL_fw38xjw_KgAdjnjrVe7O5i2yNBLmlfjnjDjR5Fi_SiyETbycUWqZnBKm1OKsnjB8Kbl5-5aGYYUX6WXTsFcS_RsN9CEHjbjdMsxbZuwCPras5dW4GC-ZxzRHNcjmrAkX8V7rCuz9hkE5-1DJ9CHoReniJvfOUhlKisboEt5qTUuat21Br26L4Rn20d3W6Ya2-CtGRbpGcZrq1z1cyg1WBZSLJHqIVBsT5Gw4oRN-THTpIroKqN",
  "tenant_id":"7c24ea8f-3ace-49cd-88ed-16d312cf80eb","Accept": "application/json","Content-Type": "application/json",});

// var MOCKED_CONTACTS_DATA = [
//   {firstName: 'Harry', lastName: 'Osborne', phone: '617-123-4567', email: 'hosborne@oscorp.com', company: 'OsCorp'},
//   {firstName: 'Peter', lastName: 'Parker', phone: '617-233-4432', email: 'thatparkerluck@parker-industries.com', company: 'Parker Industries'},
//   {firstName: 'Lex', lastName: 'Luthor', phone: '617-764-4662', email: 'lex@lexcorp.com', company: 'LexCorp'},
//   {firstName: 'Hugh', lastName: 'Jones', phone: '617-984-8671', email: 'hjones@roxxon.com', company: 'Roxxon Energy'},
//   {firstName: 'Bruce', lastName: 'Wayne', phone: '617-384-4786', email: 'billionairepb@wayne-enterprises.com', company: 'Wayne Enterprises'},
//   {firstName: 'Tony', lastName: 'Stark', phone: '617-852-6943', email: 'starkmoney@starkindustries.com', company: 'Stark Industries'},
//   {firstName: 'Alec', lastName: 'Holland', phone: '617-667-2654', email: 'aholland@bayou-science.gov', company: 'Louisiana Science Center'},
//   {firstName: 'Otto', lastName: 'Octavius', phone: '617-232-9512', email: 'eight@sixco.com', company: 'Sixco'},
//   {firstName: 'Victor', lastName: 'Frieze', phone: '617-714-3398', email: 'coldcustomer@wayne-enterprises.com', company: 'Wayne Enterprises'},
// ];
var myInit = {
  method: 'POST',
  headers: myHeaders,
  body: JSON.stringify({
    EntityId: 5,
    pageSize:50,
  }),
};

var myRequest = new Request(REQUEST_URL,myInit);

var AwesomeProject = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function() {
    fetch(myRequest)
      .then((response) => response.json())
      .then((responseData) => {
        console.log("I'm here!");
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.Data),
          loaded: true,
        });
      })
      .done();
  },
  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View>
        <View style={styles.topNav}>
          <View style={styles.imgContainer}>
            <Image style={styles.image} source={require('image!ledgex_logo')} />
          </View>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderContact}
          style={styles.listView} />
      </View>
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading contacts...
        </Text>
      </View>
    );
  },

  renderContact: function(contact) {
    return (
      <TouchableHighlight onPress={() => ToastModule.show('Phone: ' + contact.BusinessPhone, ToastModule.SHORT)}>
      <View style={styles.container}>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{contact.FirstName} {contact.LastName}</Text>
          <Text style={styles.email}>{contact.EmailAddress}</Text>
        </View>
      </View>
      </TouchableHighlight>
    );
  },

  _onPressButton: function(){
    this.backgroundColor = '#ff0000';
  },
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingLeft: 50,
    paddingTop: 20,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'left',
  },
  email: {
    textAlign: 'left',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  topNav:{
    backgroundColor: '#002338',
    height: 44,
  },
  image: {
    width: 106,
    height: 24,
  },
  imgContainer: {
    paddingTop: 10,
    paddingLeft: 5,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);

