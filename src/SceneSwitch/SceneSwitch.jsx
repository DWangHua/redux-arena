import React, { Component } from "react";
import PropTypes from "prop-types";
import { Router, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import {
  SCENESWITCH_INIT_SAGA,
  SCENESWITCH_KILL_SAGA
} from "../redux/actionTypes";
import createSenceSwitchReducer from "../redux/reducers/createSenceSwitchReducer";
import { addReducer } from "../utils";

export default class SceneSwitch extends Component {
  static contextTypes = {
    store: PropTypes.any
  };

  static childContextTypes = {
    sceneSwitchKey: PropTypes.string
  };

  static propTypes = {
    children: PropTypes.any,
    reducerKey: PropTypes.string
  };

  componentWillMount() {
    let reducerKey = addReducer(
      this.context.store,
      this.props.reducerKey,
      createSenceSwitchReducer
    );
    this.state = {
      reducerKey,
      sagaTaskPromise: new Promise(resolve =>
        this.context.store.dispatch({
          type: SCENESWITCH_INIT_SAGA,
          reducerKey,
          setSagaTask: resolve
        })
      )
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (
      nextProps.reducerKey != null &&
      nextProps.reducerKey !== this.state.reducerKey
    ) {
      this.context.store.dispatch({
        type: SCENESWITCH_KILL_SAGA,
        sagaTaskPromise: this.sagaTaskPromise
      });
      this.context.store.removeReducer(this.state.reducerKey);
      let reducerKey = addReducer(
        nextContext.store,
        nextProps.reducerKey,
        createSenceSwitchReducer
      );
      this.setState({
        reducerKey,
        sagaTaskPromise: new Promise(resolve =>
          this.context.store.dispatch({
            type: SCENESWITCH_INIT_SAGA,
            reducerKey,
            setSagaTask: resolve
          })
        )
      });
    }
  }

  componentWillUnMount() {
    this.context.store.dispatch({
      type: SCENESWITCH_KILL_SAGA,
      sagaTaskPromise: this.state.sagaTaskPromise
    });
    this.context.store.removeReducer(this.state.reducerKey);
  }

  getChildContext() {
    return { sceneSwitchKey: this.state.reducerKey };
  }

  render() {
    return (
      <Switch location={this.props.location}>
        {this.props.children}
      </Switch>
    );
  }
}