import React, {  } from 'react';
import {
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonIcon,
} from '@ionic/react';
import '../theme/styleGrid.css';
import { addCircleSharp, home, logOutSharp, syncCircleSharp } from 'ionicons/icons';
const Head: React.FC = () => {
  return (
    <>
    <IonTabBar slot="top">
        <IonTabButton tab="tab3" href="/mine">
          {/* <IonButton color={"light"}> */}
            <IonLabel><IonIcon style={{"width":"70px","height":"30px"}} icon={home}></IonIcon></IonLabel>
            {/* </IonButton> */}
          </IonTabButton>
        
          <IonTabButton tab="tab1" href="/ajout">
            {/* <IonButton color={"light"}> */}
            <IonLabel><IonIcon  style={{"width":"70px","height":"30px"}} icon={addCircleSharp}></IonIcon></IonLabel>
            {/* </IonButton> */}
          </IonTabButton>
            <IonTabButton tab="tab4" href="/recharge">
            <IonLabel><IonIcon  style={{"width":"70px","height":"30px"}} icon={syncCircleSharp}></IonIcon></IonLabel>
          </IonTabButton>  
          <IonTabButton tab="tab2" href="/deco">
          <IonLabel><IonIcon  style={{"width":"70px","height":"30px"}} icon={logOutSharp}></IonIcon></IonLabel>
         
            </IonTabButton>
        </IonTabBar>
        
        </>

  );
};

export default Head;