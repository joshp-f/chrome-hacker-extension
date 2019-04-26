'use strict';

const e = React.createElement;

class ReactMain extends React.Component {
  constructor(props) {
    super(props);
    const payloads = 'robots.txt'
    const baseurl = 'https://www.google.com'
    const code = 'fetch("/"+payload)'
    this.state = {payloads,code,baseurl};
  }
  componentDidMount() {
    this.runStartup();
    this.changeList({target:{value:'directories'}})


  }
  changeURL = (baseurl) => {
    const code = 'fetch("'+baseurl+'/"+payload)'
    this.setState({baseurl,code},this.runStartup)
  }
  changeList = async (e) => {
    const response = await fetch('wordlists/'+e.target.value+'.txt');
    const payloads = await response.text();
    this.setState({payloads})
  }
  runStartup = async () => {
   const robots = await this.testRequest(fetch(this.state.baseurl+'/robots.txt'), this.correctStatus) 
   this.setState({robots})
  }
  runSearch = async () => {
    const payloads = this.state.payloads.split('\n')
    const enumerations = await Promise.all(payloads.map(payload => this.testRequest(eval(this.state.code),this.correctStatus)))
    enumerations.sort((x,y) => y.success-x.success )
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
    const payloadfiles = ['directories','subdomains','numbers','sqli','xss','empty','coursespecific']
    return (
      <div>
        <h1>
          Chrome hacker extension
        </h1>
        <p>
          Um so I really rushed this so I made the mistake of using uncompiled react, meaning I could not easily dynamically inject it using a chrome extension :( In the future I will fix this.        </p>
        <h3>
          Enter base url
        </h3>
        <input onChange={(e) => this.changeURL(e.target.value)} value={this.state.baseurl}></input>
        <section>
          <h3>
            Spicy recon websites
          </h3>
          <a href="https://dnsdumpster.com/">dnsdumpster</a>
          <br />
          <a href={"https://transparencyreport.google.com/https/certificates?cert_search_auth=&cert_search_cert=&cert_search=include_expired:false;include_subdomains:true;domain:"+this.state.baseurl+"&lu=cert_search"}>google transparency report</a>

        </section>
        <hr/>
        <section>
          <h3>
            Check for robots.txt
          </h3>
          {this.state.robots && <ResultBar {...this.state.robots}></ResultBar>}

        </section>
        <section>

          <hr/>
          <p>
            Choose list to use for enumeration, and feel free to modify by pasting in new lines.
            lists range from length 500 - 2000. results will pop up once all requests have returned.
          </p>
          <div>
            <select onChange={this.changeList} >
              {payloadfiles.map(name => <option value={name}>{name}</option>)}
            </select>
          </div>
          <textarea style={{width:"200px",height:"250px"}} onChange={(event) => this.setState({payloads:event.target.value})} value={this.state.payloads}/>
          <p>
          Enter fetch request. modify to ensure 'payload' is in correct place. (open network tab, copy fetch and paste in here for POST template)
          </p>
          <textarea style={{width:"400px",height:"200px"}}onChange={(event) => this.setState({code:event.target.value})} value={this.state.code}/>
          <button onClick={this.runSearch} >run enumerations</button>
          {(this.state.enumerations || []).map((result) => <ResultBar {...result}/>)}
          <br/>
        </section>

      </div>
    );
  }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(ReactMain), domContainer);