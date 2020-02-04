import React, {Component} from 'react'
import rus from './rus'
import eng from './eng'
import store from '../../store'

const languages = {
    eng,
    rus
}

const WithTranslation = WrappedComponent =>
    class TranslatedComponent extends Component {
      constructor(props) {
        super(props);
        let language = store.getState().profile.language;
        let strings = languages[language][WrappedComponent.name]
        this.state = {
          language,
          strings
        };
      }

      componentDidMount() {
        this.unsubscribe = store.subscribe(() =>{
          let language = store.getState().profile.language;
          let strings = languages[language][WrappedComponent.name]
          this.setState({
            language,
            strings
          })
        });
      }

      componentWillUnmount() {
        this.unsubscribe();
      }
        
      
      render() {
        return <WrappedComponent strings={this.state.strings} {...this.props} />;
      }
    };

    export default WithTranslation