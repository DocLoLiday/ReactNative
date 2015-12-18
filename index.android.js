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
  View,
} = React;


var REQUEST_URL = 'https://test.ledgex.com/api/CustomEntity/Get?id=5';
var myHeaders = new Headers({"Authorization": "r5gh4VYQEBGCVUPhxVlPBioHDuhEIeU5CpaIUVhARo_7bPfjW2LmgiLwiNDvifADdz4NUZ36kYWQSjmAXD-o-bSC9bDM9lviDeBqcf0E9uozprwyV8VehgGcRCUEQ1r6Ph1mS8008zs5avn-htz0r9tIpJ-b6fYVzDdacU_42PbaUnn34c7p5uqziqVz7Jhov-_lTuf0yw_-Up7M8Cf8j9ihtur-ZrYcuW2wzgSCae8sO74iibsz1QOKrBkuL_fw38xjw_KgAdjnjrVe7O5i2yNBLmlfjnjDjR5Fi_SiyETbycUWqZnBKm1OKsnjB8Kbl5-5aGYYUX6WXTsFcS_RsN9CEHjbjdMsxbZuwCPras5dW4GC-ZxzRHNcjmrAkX8V7rCuz9hkE5-1DJ9CHoReniJvfOUhlKisboEt5qTUuat21Br26L4Rn20d3W6Ya2-CtGRbpGcZrq1z1cyg1WBZSLJHqIVBsT5Gw4oRN-THTpIroKqN",
  "default_tenant_identifier":"7c24ea8f-3ace-49cd-88ed-16d312cf80eb"});

var myInit = {
  method: 'GET',
  headers: myHeaders
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
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
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
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderContact}
        style={styles.listView} />
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
      <View style={styles.container}>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>Name: {contact.name}</Text>
          <Text style={styles.year}> Email: {contact.email}</Text>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);


