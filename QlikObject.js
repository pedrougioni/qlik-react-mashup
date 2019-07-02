/*
	QlikObject - Cria um objeto do Qlik com base em um ID
	Props:
		app - referência do objeto app do qlik
		qlikId - Id do gráfico no qlik
		chartId - id necessariamente único para a criação da div referencia onde o gráfico será criado
*/

class QlikObject extends React.Component {

	constructor(props){
		super(props);
		this.state = {};
	}

	componentDidMount(){
		var me = this;
		this.props.app.getObject(this.props.chartId, this.props.qlikId).then(model => me.setState({model:model}));
	}

	shouldComponentUpdate(nextProps, nextState){
		return this.props.qlikId != nextProps.qlikId;
	}

	componentDidUpdate(){
		var me = this;
		if(this.state.model){
			this.state.model.close();
		}
		this.props.app.getObject(this.props.chartId, this.props.qlikId).then(model => me.setState({model:model}));
	}

	componentWillUnmount(){
		if(this.state.model){
			this.state.model.close();
		}
	}

	render() {
	  return	<div style={{height:300, width:700}} id={this.props.chartId} />;
  }
}