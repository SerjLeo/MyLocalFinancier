import React, {PureComponent} from 'react'
import rus from './rus'
import eng from './eng'
import store from '../../store'

const languages = {
    eng,
    rus
}

const WithTranslation = WrappedComponent =>
    class TranslatedComponent extends PureComponent {
      constructor(props) {
        super(props);
        let language
        if(store.getState().profile && store.getState().profile.profile && store.getState().profile.profile.language) {
          language = store.getState().profile.profile.language;
        } else {
          language = store.getState().system.language;
        }
        let strings = languages[language][WrappedComponent.name]
        this.state = {
          language,
          strings
        };
      }

      componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
          let language
          if(store.getState().profile && store.getState().profile.profile && store.getState().profile.profile.language) {
            language = store.getState().profile.profile.language;
          } else {
            language = store.getState().system.language;
          }
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
