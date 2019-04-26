'use strict';

const e = React.createElement;

class ReactMain extends React.Component {
  constructor(props) {
    super(props);
    const payloads = [
     "result_bar.js",
     "fklsdj",
     "test.js",
     "icon.png"
   ]
    this.state = {payloads};
  }
  componentDidMount() {
    this.runStartup();

  }
  runStartup = async () => {
   const robots = await this.testRequest(fetch('/'), this.correctStatus) 
   this.setState({robots})
  }
  runSearch = async () => {
    const enumerations = await Promise.all(this.state.payloads.map(payload => this.testRequest(fetch('/'+payload),this.correctStatus)))
    this.setState({enumerations})
  }
  testRequest = async (myPromise, evaluator) => {
    const response = await myPromise;
    const success = evaluator(response)
    const text = await response.text()
    return {success,response,text}
  }
  correctStatus = r => r.status == 200

  render() {
    // const robots = (this.state.robots || {} ).success ? <div> robots </div> : <div>norobots</div>;
    return (
      <div>
        <textarea onChange={(event) => this.setState({payloads:[event.target.value]})} value={this.state.payloads}/>
        <button onClick={this.runSearch} >run enumerations</button>
        {(this.state.enumerations || []).map((result) => <ResultBar {...result}/>)}
        {this.state.robots && <ResultBar {...this.state.robots}></ResultBar>}

      </div>
    );
  }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(ReactMain), domContainer);