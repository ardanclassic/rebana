import './app.scss';
import Sidebar from './components/sidebar/index';
import { Dashboard, DefaultPage } from './components/contents'
import { FileData } from 'assets/data'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { store } from './redux/store';
import { Provider } from 'react-redux';

function App() {
  let menus = [];
  JSON.stringify(FileData, (key, value) => {
    if (key === 'id') menus.push(value);
    return value;
  });

  return (
		<Provider store={ store }>
      <div className="container">
        <Router>
          <div className="columns">
            <Sidebar className="column" />
            <div className="column main-content">
              <Switch>
                <Route exact path="/" component={ Dashboard } />
                <Route path="/dashboard" component={ Dashboard } />
                { menus.map(el => {
                  return <Route key={el} path={`/${el}`} component={ DefaultPage } />
                }) }
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
