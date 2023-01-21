
import React, { useState }  from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { SQLiteHook } from 'react-sqlite-hook';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './mobile/Login';
import AjoutEnchere from './mobile/AjoutEnchere';
import MyEnchere from './mobile/MyEnchere';
import Example from './mobile/Login2';
import AddPic from './mobile/AddPic';
import Rechargement from './mobile/Rechargement';
import Info from './mobile/Info';
import Deco from './mobile/Deco';
import Logon from './mobile/Logon'
import Camcam from './photo/AjoutEnchere';
import Expirer from './mobile/Expirer';
import Encours from './mobile/Encours';
import MyMise from './mobile/MyMise';
import EtatDemande from './mobile/EtatDemande';

interface JsonListenerInterface {
  jsonListeners: boolean,
  setJsonListeners: React.Dispatch<React.SetStateAction<boolean>>,
}
interface existingConnInterface {
  existConn: boolean,
  setExistConn: React.Dispatch<React.SetStateAction<boolean>>,
}

setupIonicReact();

const App: React.FC = () => {
  const [existConn, setExistConn] = useState(false);


  return (
    <IonApp>
    	<IonReactRouter>
			<IonSplitPane contentId="main">
				<IonRouterOutlet id="main">
					
					<Route exact path="/ajout" component={AjoutEnchere} />
					<Route exact path="/info/:id" component={Info} />
					<Route exact path="/mymise" component={MyMise} />

					<Route exact path="/recharge" component={Rechargement} />
					<Route exact path="/etatDemande" component={EtatDemande} />


					<Route exact path="/login" component={Login} />
					<Route exact path="/login2" component={Example} />

					<Route exact path="/mine" component={MyEnchere} />
					<Route exact path="/deco" component={Deco} />
					<Route exact path="/logon" component={Logon} />
					<Route exact path="/expirer" component={Expirer} />
					<Route exact path="/encours" component={Encours} />

					<Route exact path="/logon" component={Logon} />

					<Route exact path="/cam" component={Camcam} />


					<Route exact path="/addPic/:id" component={AddPic} />

					<Route path="/tabs" render={() => <Redirect to="/insert" />} exact={true} />
					<Route path="/" render={() => <Redirect to="/login" />} exact={true} />
				</IonRouterOutlet>
			</IonSplitPane>
		</IonReactRouter>
    </IonApp>
    // if()
  );
};


export default App;
