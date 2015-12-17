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

var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];
/**
 * For quota reasons we replaced the Rotten Tomatoes' API with a sample data of
 * their very own API that lives in React Native's Github repo.
 */
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
var myHeaders = new Headers();
myHeaders.append("Authorization", "r5gh4VYQEBGCVUPhxVlPBioHDuhEIeU5CpaIUVhARo_7bPfjW2LmgiLwiNDvifADdz4NUZ36kYWQSjmAXD-o-bSC9bDM9lviDeBqcf0E9uozprwyV8VehgGcRCUEQ1r6Ph1mS8008zs5avn-htz0r9tIpJ-b6fYVzDdacU_42PbaUnn34c7p5uqziqVz7Jhov-_lTuf0yw_-Up7M8Cf8j9ihtur-ZrYcuW2wzgSCae8sO74iibsz1QOKrBkuL_fw38xjw_KgAdjnjrVe7O5i2yNBLmlfjnjDjR5Fi_SiyETbycUWqZnBKm1OKsnjB8Kbl5-5aGYYUX6WXTsFcS_RsN9CEHjbjdMsxbZuwCPras5dW4GC-ZxzRHNcjmrAkX8V7rCuz9hkE5-1DJ9CHoReniJvfOUhlKisboEt5qTUuat21Br26L4Rn20d3W6Ya2-CtGRbpGcZrq1z1cyg1WBZSLJHqIVBsT5Gw4oRN-THTpIroKqN");
myHeaders.append("default_tenant_identifier","7c24ea8f-3ace-49cd-88ed-16d312cf80eb");

var myInit = {
  method: 'GET',
  headers: myHeaders,
  mode 'cors'
}
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
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
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
        renderRow={this.renderMovie}
        style={styles.listView} />
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  },

  renderMovie: function(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail} />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
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

curl -d "grant_type=password&username=paronofsky@ledgex.com&password=M3gamanx!" https://test.ledgex.com/token
