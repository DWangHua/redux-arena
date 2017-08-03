import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as actions from "./actions";
import { connect } from "react-redux";

class PageB extends Component {
  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>state_key</th>
              <th>state_value</th>
            </tr>
            <tr>
              <td>name:</td>
              <td>
                {this.props.name}
              </td>
            </tr>
            <tr>
              <td>pageB:</td>
              <td>
                {this.props.pageB}
              </td>
            </tr>
            <tr>
              <td>dynamicState:</td>
              <td>
                {this.props.dynamicState}
              </td>
            </tr>
            <tr>
              <td>cnt:</td>
              <td>
                {this.props.cnt}
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={() => this.props.addCnt()}>Add Cnt</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pageB: state.scene.pageB,
    name: state.scene.name,
    dynamicState: state.scene.dynamicState,
    cnt: state.scene.cnt
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PageB);
