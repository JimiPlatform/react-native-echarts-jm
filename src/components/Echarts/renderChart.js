import echarts from './echarts.min';
import toString from '../../util/toString';

export default function renderChart(props) {
  const height = `${props.height || 400}px`;
  const width = props.width ? `${props.width}px` : 'auto';
  // const selectXName = props.selectXName ? props.selectXName : ""
  const selectObject = props.selectObject

  var optionS = props.option
  let strOpens = toString(optionS)
  if (selectObject) {
    for ( const key in selectObject){
      strOpens = strOpens.replace(key,selectObject[key])
    }
  }  
  return `
    document.getElementById('main').style.height = "${height}";
    document.getElementById('main').style.width = "${width}";
    var myChart = echarts.init(document.getElementById('main'));

    myChart.setOption(${strOpens});
    window.document.addEventListener('message', function(e) {
      var option = JSON.parse(e.data);
      myChart.setOption(option);
    });
    myChart.on('click', function(params) {
      var seen = [];
      var paramsString = JSON.stringify(params, function(key, val) {
        if (val != null && typeof val == "object") {
          if (seen.indexOf(val) >= 0) {
            return;
          }
          seen.push(val);
        }
        return val;
      });
      window.postMessage(paramsString);
    });
  `
}
