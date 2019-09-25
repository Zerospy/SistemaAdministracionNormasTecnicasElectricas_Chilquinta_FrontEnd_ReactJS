import React, {Component} from 'react';
import {Container} from 'mdbreact';
import RouterComponent from 'routes/RouterComponent';
import {BrowserRouter} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import messages_es from 'translations/es.json';
import {IntlProvider, addLocaleData} from 'react-intl';
import esLocaleData from 'react-intl/locale-data/es';
import {GeneralContext} from 'GeneralContext';

addLocaleData(esLocaleData);

const messages = {
    es: messages_es
};

const defaultLang = {
    lang: 'es',
    messages: 'es'
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            localeSelected: defaultLang
        };
    }

  onChangeCountry = country => {
      let localeSelected = {};

      if (country === 'chile') {
          localeSelected = defaultLang;
      } else if (country === 'brasil') {
          localeSelected = {
              lang: 'en'
          };
      } else {
          localeSelected = defaultLang;
      }

      localStorage.setItem('languageSelected', JSON.stringify(localeSelected));

      this.setState({
          localeSelected
      });
  };

  selectLang = () => {
      const languageSelected = localStorage.getItem('languageSelected');

      if (languageSelected !== null) {
          const localeSelected = JSON.parse(languageSelected);

          this.localeSelected = localeSelected;
      } else {
          this.localeSelected = defaultLang;
      }
  };

  getSelectedLang = () => this.localeSelected;

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
      this.selectLang();

      return (
          <Container fluid={true} className="h-100">
              <ToastContainer
                  hideProgressBar={true}
                  newestOnTop={true}
                  autoClose={3000}
              />
              <IntlProvider
                  locale={this.localeSelected.lang}
                  messages={messages[this.localeSelected.messages]}
              >
                  <BrowserRouter forceRefresh={false}>
                      <GeneralContext.Provider value={this}>
                          <RouterComponent />
                      </GeneralContext.Provider>
                  </BrowserRouter>
              </IntlProvider>
          </Container>
      );
  }
}

export default App;
