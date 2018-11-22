import * as React from 'react';
import { UpPanel, UpThemeProvider, UpDefaultTheme, UpBox, UpNotification, UpParagraph, UpButton, UpRadio } from '@up-group/react-controls';

export interface HomeContainerProps {

}

export interface HomeContainerState {
  moduleSelected: Option;
}

type Option = 'option1' | 'option2' | 'option3';

class HomeContainer extends React.Component<HomeContainerProps, HomeContainerState> {

  constructor(props, context) {
    super(props, context);
    this.state = {
      moduleSelected: null,
    };
  }

  onModuleChange = (value) => {
    this.setState({ moduleSelected: value });
  }

  render() {
    const { children } = this.props;
    return (
      <UpThemeProvider theme={UpDefaultTheme} >
        <div>
          <UpBox style={{ margin: '40px 30px' }}>
            <UpNotification intent={'info'}>
              <UpParagraph>
                Bienvenue dans mon application...
                </UpParagraph>
            </UpNotification>
            <UpParagraph>
              <UpRadio
                name="module"
                displayMode="button"
                value={this.state.moduleSelected}
                onChange={this.onModuleChange}
                options={[{ text: 'Offre Standard', value: 'option1' }, { text: 'Offre Open', value: 'option2' }, { text: 'Offre BI', value: 'option3' }]}
              />
            </UpParagraph>
          </UpBox>
          <UpBox style={{ margin: '40px 30px' }}>
            {this.state.moduleSelected === 'option1' &&
              <UpPanel type={'primary'} title={'Option 1'}>
                Vous avez choisi l'option 1...
                </UpPanel>
            }
            {this.state.moduleSelected === 'option2' &&
              <UpPanel type={'light'} title={'Option 2'}>
                Vous avez choisi l'option 2, l'évolution naturelle de nos services...
                </UpPanel>
            }
            {this.state.moduleSelected === 'option3' &&
              <UpPanel type={'warning'} title={'Option 3'}>
                Vous avez choisi l'option 3. Elle sera dispo prochainement...
                </UpPanel>
            }
          </UpBox>
          {children &&
            <UpBox style={{ margin: '40px 30px' }}>
              {children}
            </UpBox>
          }
        </div>
      </UpThemeProvider>
    );
  }
}

export default HomeContainer;
