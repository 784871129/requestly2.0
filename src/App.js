import './App.css';
import './Table.js'
import RulesTable from './Table.js';
import {HashRouter,Route} from 'react-router-dom'
import NewRules from './NewRules';
import EditRules from './EditRule';
import CopyRules from './CopyRules';

function App() {
  return (
    <HashRouter>
        <Route exact path='/Table' component={RulesTable} />
        <Route path='/NewRules' component={NewRules}/>
        <Route path='/EditRules' component={EditRules}/>
        <Route path='/CopyRules' component={CopyRules}/>
    </HashRouter>
  );
}

export default App;
