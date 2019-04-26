'use strict';

const e = React.createElement;

class ResultBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show:false};
  }

  render() {
    return (
      <div>
        <div onClick={() => this.setState({show:!this.state.show})} style={{backgroundColor: this.props.success ? "green" : "red", width: "100%",height: "20px"}}>
          {(this.props.response || {} ).url}                        (click to expand)

        </div>
        {this.state.show && <div>

          {this.props.text} 
        </div>}

      </div>
    )
  }
}