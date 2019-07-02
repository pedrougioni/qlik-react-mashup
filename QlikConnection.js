/*
  QlikConnection - Cria uma conexão com o QVF informado e envia em um json para a funcção de callback com o 
                        appName recebido das propriedadas. Envia tambem o filterListener, que é utilizado para escutar mudanças de filtro e no qvf
  Props:
    qvfName - Nome do QVF
    appName - nome do atributo que será retornado no json com a conexão aberta (provavélmente será colocado no state do instaciador desse componente)
    callback - função a qual será usado para enviar o retorno tanto da conexão do app quanto do filterListener
*/


class QlikConnection extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
      this.openQlikConnection();
  }

  openQlikConnection(){
    var me = this;
    
    var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );
    var config = {
      host: window.location.hostname,
      prefix: prefix,
      port: window.location.port,
      isSecure: window.location.protocol === "https:"
    };
    require.config( {
      baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
    } );

    require( ["js/qlik"], function ( qlik ) {
      qlik.setOnError( function ( error ) {
        me.props.callback({errorMessage: 'Error on loading QVF from Qlik ' + error, app: null});
        console.log(error);
      } );
      //open apps -- inserted here --
      var app = qlik.openApp( me.props.qvfName, config );
      var state={ errorMessage: null};
      state[me.props.appName] = app;
      me.props.callback(state);
    } );
  }

  render() {
    return <span/>;
  }
}
