import Header from 'components/Header';
import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withReduxStore from 'store/withReduxStore';

class MyApp extends App {
  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <div id='root'>
          <Header/>
          <Component {...pageProps} />
        </div>
      </Provider>
    );
  }
}

export default withReduxStore(MyApp);
