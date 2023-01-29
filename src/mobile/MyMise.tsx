import React, { useState, useRef, useEffect, useContext, useCallback, createRef } from 'react';
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
  IonLoading,
  IonAvatar,
  IonFabButton,
  IonFab,
  IonFabList,
  IonList,
} from '@ionic/react';
import '../theme/styleGrid.css';
import Login from './Login';
import { NavContext } from '@ionic/react';
import { Link } from 'react-router-dom';
import { add, addCircleSharp, arrowDown, arrowUp, at, bagHandleSharp, camera, checkmark, chevronDownCircle, chevronUpCircle, chevronUpOutline, colorPalette, globe, handLeftOutline, home, imageOutline, informationCircle, listOutline, logOutSharp, micOffSharp, moveOutline, person, play, playBackCircle, pricetag, pricetagSharp, radioButtonOnOutline, settings, stopCircle, stopCircleSharp, stopwatch, sync, syncCircleSharp, timerOutline } from 'ionicons/icons';
import { watch } from 'fs';
import Head from './Head';
import { URL_IP } from './config';
const MyMise: React.FC = () => {
  const { navigate } = useContext(NavContext)
  const ref = useRef(true);

  const [list_, setList] = useState<any[]>([]);
  const [list3mois, setList3mois] = useState<any[]>([]);
  const [list1mois, setList1mois] = useState<any[]>([]);
  const [load, setLoad] = useState(true);
  const [ext, setExp] = useState<any>();
  const [key, setKey] = useState("");
  var fin = useRef<HTMLIonInputElement>(null);
  var debut = useRef<HTMLIonInputElement>(null);
  var qtevato = useRef<HTMLIonInputElement>(null);
  var pointsourceid = useRef<HTMLIonSelectElement>(null);
  const contentRef = createRef<HTMLIonContentElement>();

  function scrollToBottom() {
    contentRef.current?.scrollToBottom(500);
  }

  function scrollToTop() {
    contentRef.current?.scrollToTop(500);
  }
  function addEnchere() {
    var fo = new FormData();
    fo.append("key", key);
    // console
    // users/{idusers}/encheres/{id}/enchereMoves
    let url = URL_IP() + "/users/" + localStorage.getItem("iduser") + "/enchereMoves";
    console.log(url);
    fetch(url, {
      method: 'GET',
      headers: {
        'token': `${localStorage.getItem("tokenHash")}`
      }
    }).then((result) => {
      return result.json();

    }).then((e) => {
      console.log(e);
      if (e.error != undefined) {
        setExp(true);
      } else {
        setList(e.data);
        setLoad(false);
      }

    }, (e) => {
    });

  }
  const router = useIonRouter();
  useEffect(() => {
    addEnchere();
  }, [])
  if (ext == true) {
  }
  if (localStorage.length == 0) {
    return (
      <Login />
    )
  }



  if (load == true) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Tous les encheres</IonTitle>
          </IonToolbar>
          <IonContent className="Ionpadding">
            <IonCard>
              <IonCardHeader>
                Veuillez Patienter.....<IonIcon icon={sync}></IonIcon>
              </IonCardHeader>
            </IonCard>
          </IonContent>
        </IonHeader>

      </IonPage>
    )
  }
  const allCentrifuge = list_.map(group => {
    let expira = "";
    let color = "";


    return (

      <>
        <IonCard color={'light'} style={{ "width": "350px" }}>
          <IonCardHeader>
            <IonCardTitle></IonCardTitle>
          </IonCardHeader>
          <IonCardContent color='dark'>
        <IonList>
          <IonItem color={'primary'}>
            <IonLabel>
              Mise:100Ar 
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Mise:100Ar</IonLabel>
          </IonItem> <IonItem>
            <IonLabel>Mise:100Ar</IonLabel>
          </IonItem> <IonItem>
            <IonLabel>Mise:100Ar</IonLabel>
          </IonItem>
        </IonList>

          </IonCardContent>
        </IonCard><IonItem>
        </IonItem></>
    )
  })

  return (
    <><>
      {/* <Menu /> */}
      {/* <IonButton expand="block" onClick={scrollToTop}>Scroll UP</IonButton> */}

    </>
      <IonPage>
        <IonTabBar slot="top">

          <IonTabButton tab="tab9" href="/mine">
            {/* <IonButton color={"light"}> */}
            {/* <IonButton expand="block" onClick={scrollToTop}>Scroll UP</IonButton> */}

            <IonLabel><IonIcon style={{ "width": "70px", "height": "30px" }} icon={home}></IonIcon></IonLabel>
            {/* </IonButton> */}
          </IonTabButton>

          <IonTabButton tab="tab1" href="/ajout">
            {/* <IonButton color={"light"}> */}
            <IonLabel><IonIcon style={{ "width": "70px", "height": "30px" }} icon={addCircleSharp}></IonIcon></IonLabel>
            {/* </IonButton> */}
          </IonTabButton>
          <IonTabButton tab="tab4" href="/recharge">
            <IonLabel><IonIcon style={{ "width": "70px", "height": "30px" }} icon={syncCircleSharp}></IonIcon></IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/deco">
            <IonLabel><IonIcon style={{ "width": "70px", "height": "30px" }} icon={logOutSharp}></IonIcon></IonLabel>

          </IonTabButton>
        </IonTabBar>
        <IonTabBar slot="top">
          <IonTabButton tab="tab2" href={"/encours"}>
            <IonLabel>
              {/* Historique */}
              <IonIcon style={{ "width": "70px", "height": "30px" }} icon={play}></IonIcon>
            </IonLabel>
            <IonLabel>Encours</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab4" href={"/mise"}>
            <IonLabel>
              {/* Historique */}
              <IonIcon style={{ "width": "70px", "height": "30px" }} icon={listOutline}></IonIcon>

            </IonLabel>
            <IonLabel>Mise</IonLabel>
          </IonTabButton>

          <IonTabButton tab="tab4" href={"/expirer"}>
            <IonLabel>
              {/* Historique */}
              <IonIcon style={{ "width": "70px", "height": "30px" }} icon={stopCircle}></IonIcon>

            </IonLabel>
            <IonLabel>Expiration</IonLabel>
          </IonTabButton>

        </IonTabBar>


        {/* <Head/> */}

        <IonHeader>
          <IonToolbar>
            <IonTitle>Liste des enchere</IonTitle>

          </IonToolbar>

        </IonHeader>
        <IonContent className="Ionpadding" ref={contentRef} >



          {allCentrifuge}
          <IonFab slot="fixed" vertical="bottom" horizontal="end">
            <IonFabButton onClick={scrollToBottom} >
              <IonIcon icon={chevronDownCircle}></IonIcon>
            </IonFabButton>

          </IonFab>
          {/* <IonButton expand="block" onClick={scrollToTop}>Scroll UP</IonButton> */}
          <IonButton expand="block" color={'medium'} onClick={scrollToTop}><IonIcon icon={chevronUpOutline}></IonIcon></IonButton>
        </IonContent>
      </IonPage></>

  );
};

export default MyMise;