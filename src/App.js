import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Ranking from './containers/Ranking';
import Nav from './containers/Nav';
import Reboot from 'material-ui/Reboot';
import AppBar from 'material-ui/AppBar';
import ToolBar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';


class App extends Component {
  render() {
    return (
      <div className={"App"} style={{ paddingLeft: 240 }}>
        <Reboot />

        <AppBar style={{ left: 240 }}>
          <ToolBar>
            <Typography variant={"title"} color={"inherit"} >
              Yahoo!ショッピングランキング
            </Typography>
          </ToolBar>
        </AppBar>
        <Nav />

        <div style={{ margin: 64, padding: 32 }}>
          <Switch>
            <Route path={"/all"} component={Ranking} />
            <Route path={"/category/1"} render={ () => <Redirect to={"/all"} /> } />
            <Route path={"/category/:id"}
                   render={ (props) => <Ranking categoryId={props.match.params.id} /> }
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
