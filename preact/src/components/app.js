import { h, Component } from 'preact';
import style from '../style/index.css';

import Service from './service';
import View from './view';

// Code-splitting is automated for routes
import ConfigProvider from './configContext';

export default class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = (e) => {
    this.currentUrl = e.url;
  };

  state = {
    errorOccured: false,
    loading: true,
  };

  onErrorOccured = () => {
    this.setState({
      errorOccured: true,
      loading: false,
    });
  };

  onDataLoaded = () => {
    this.setState({
      loading: false,
    });
  };

  render() {
    const { errorOccured, loading } = this.state;

    if (errorOccured && !loading) {
      return (
        <div id={style.app}>
          <div className={style['text-center']}>
            <p>
              An error occured. please check configuration
            </p>
          </div>
        </div>
      );
    }

    return (
      <span id={style.app}>
        <ConfigProvider config={this.props}>
          <Service
            appId={this.props.appId}
            onDataLoaded={this.onDataLoaded}
            onErrorOccured={this.onErrorOccured}
          />
          {loading ? (
            <div className={style['text-center']}>
              <p>Loading...</p>
            </div>
          ) : (
            <View />
          )}
        </ConfigProvider>
      </span>
    );
  }
}
