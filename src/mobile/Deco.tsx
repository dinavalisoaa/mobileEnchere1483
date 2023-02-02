import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
import {
  IonButtons,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  useIonModal,
  useIonViewWillEnter,
  IonSelect,
  IonSelectOption,
  IonMenu,
  IonMenuButton,
  IonTabBar,
  IonTabButton,
  IonSearchbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  useIonRouter,
  IonCardSubtitle,
  IonAvatar,
  IonThumbnail,
  IonAlert,
} from '@ionic/react';
import '../theme/styleGrid.css';
import Head from './Head';
import { URL_IP } from './config';
import { at } from 'ionicons/icons';
const Deco: React.FC = () => {
  const [showAlert3, setShowAlert3] = useState(false);
  const [deco, setDeco] = useState(false);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [login, setLogin] = useState("");


  useEffect(() => {
    // localStorage.clear();
    // window.location.href = "login";
  }, [])
  const [showAlert2, setShowAlert2] = useState(false);
  if (deco == true) {
    localStorage.clear();
    window.location.href = "login";

  }
  // users/{idusers}/encheres/{id}/enchereMoves
  function addEnchere() {
    var fo = new FormData();
    // fo.append("key",key);
    // console
    let url = URL_IP()+"/users/" + localStorage.getItem("iduser");
    console.log(url);
    fetch(url, {
      method: 'GET'
    }).then((result) => {
      return result.json();

    }).then((e) => {
      console.log(e);
      setNom(e.data[0].nom);
      setPrenom(e.data[0].prenom);
      setLogin(e.data[0].login);
    }, (e) => {
    });

  }
  useEffect(() => {
    addEnchere();
  })
  function log() {

  }
  return (
    <><>
    </><IonPage>
        <Head />
        <IonHeader>
          <IonToolbar>

            <IonTitle>Deconnexion</IonTitle>

          </IonToolbar>

        </IonHeader>
        <IonContent className="Ionpadding">
          {/* <IonButton expand="block" type="submit" onClick={(e) => { log() }} className="ion-margin-top">
            Deconnexion
          </IonButton> */}
          {/* <IonButton onClick={() => setShowAlert2(true)} expand="block">Show Alert 2</IonButton> */}
          {/* 
          <IonAlert
            isOpen={showAlert2}
            onDidDismiss={() => setShowAlert2(false)}
            header={'DECONNEXION'}
            // subHeader={'Su'}
            message={'voul'}
            buttons={['Cancel', 'Open Modal', 'Delete']}
          /> */}

          <IonAlert
            isOpen={showAlert3}
            onDidDismiss={() => setShowAlert3(false)}
            header={'Confirm!'}
            message={'<h1>Deconnexion</h1!!!'}
            buttons={[
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: blah => {
                  console.log('Confirm Cancel: blah');
                }
              },
              {
                text: 'DECONNEXION',
                handler: () => {
                  setDeco(true);
                }
              }
            ]}
          />
          <IonItem>
            <IonCard style={{ "width": "350px", "height": "120px" }}>

              <IonCardHeader>
              </IonCardHeader>
              <IonCardContent>
                <IonItem>
                  <IonAvatar slot="start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Person</title><path d="M332.64 64.58C313.18 43.57 286 32 256 32c-30.16 0-57.43 11.5-76.8 32.38-19.58 21.11-29.12 49.8-26.88 80.78C156.76 206.28 203.27 256 256 256s99.16-49.71 103.67-110.82c2.27-30.7-7.33-59.33-27.03-80.6zM432 480H80a31 31 0 01-24.2-11.13c-6.5-7.77-9.12-18.38-7.18-29.11C57.06 392.94 83.4 353.61 124.8 326c36.78-24.51 83.37-38 131.2-38s94.42 13.5 131.2 38c41.4 27.6 67.74 66.93 76.18 113.75 1.94 10.73-.68 21.34-7.18 29.11A31 31 0 01432 480z" /></svg></IonAvatar>
                  <IonLabel>
                    {/* <IonIcon icon={at}> */}
                    {/* </IonIcon> */}
                    Vous:
                    {nom}.
                    {prenom}
                    <IonItem>
                      <IonLabel>
                        <IonIcon icon={at}>
                        </IonIcon>
                        <i>
                          {login}
                          {/* {prenom} */}

                        </i>
                      </IonLabel>
                    </IonItem>
                  </IonLabel>

                </IonItem>

              </IonCardContent></IonCard>
          </IonItem>
          <IonItem>
            <IonLabel>Deconnexion


            </IonLabel>
            <IonButton onClick={() => setShowAlert3(true)} color='danger' expand="block">Deconnexion</IonButton>

          </IonItem>

        </IonContent>
      </IonPage></>

  );
};

export default Deco;