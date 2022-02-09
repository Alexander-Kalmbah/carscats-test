import Head from 'next/head';
import { Provider } from 'react-redux';
import Loader from '../src/components/Loader';
import MainLayuot from '../src/components/MainLayuot/MainLayuot';

import store from '../src/redux/store';

import { DEF_TITLE } from '../src/constants';

import './../public/style/font.css';
import './../public/style/globals.css';

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>{DEF_TITLE}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <MainLayuot>
        <Component {...pageProps} />
      </MainLayuot>

      <Loader />
    </Provider>
  );
};

export default App;
