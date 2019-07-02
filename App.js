'use strict';
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { };
  }


  onMessage(state){
    this.setState(state);
  }

  render() {

  	var content = [];
  	if(this.state.app){
  		content = <QlikObject qlikId="hRZaKk" chartId="helpdesk-line-chart" app={this.state.app} />
  	}

    return (
      <div style={{backgroundColor: '#cccccc', width:'100%',height:'100%'}}>
      	{content}
         <QlikConnection callback={this.onMessage.bind(this)} appName="app" qvfName="Helpdesk Management.qvf"/>
      </div>)
  }
}

