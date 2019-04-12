import React, { Component } from 'react';
import { WebView, View } from 'react-native';
import { Container, Echarts } from './components'
import echarts from './components/Echarts/echarts.min';
class WMEcharts extends Component {

  setNewOption(option) {
    this.chart.setNewOption(option);
  }

  render() {
    return (
      <Container width={this.props.width}>
        <Echarts {...this.props} ref={e => this.chart = e}/>
      </Container>
    );
  }
  reloadEcharts=()=>{
    this.chart.reloadWebView()
  }
}
export { WMEcharts,echarts };
