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
} from '@ionic/react';
import '../theme/styleGrid.css';
import Login from './Login';
import { NavContext } from '@ionic/react';
import { Link } from 'react-router-dom';
import { add, addCircleSharp, arrowDown, arrowUp, at, camera, checkmark, chevronDownCircle, chevronUpCircle, chevronUpOutline, colorPalette, globe, home, imageOutline, informationCircle, logOutSharp, person, play, playBackCircle, pricetag, pricetagSharp, settings, stopCircle, stopCircleSharp, stopwatch, syncCircleSharp, timerOutline } from 'ionicons/icons';
import Head from './Head';
import { URL_IP } from './config';
const Encours: React.FC = () => {
  const { navigate } = useContext(NavContext) 
  const ref = useRef(false);

  const [list_, setList] = useState<any[]>([]);
  const [list3mois, setList3mois] = useState<any[]>([]);
  const [list1mois, setList1mois] = useState<any[]>([]);
  const [load, setLoad] = useState(false);
  const [ext, setExp] = useState<any>();
  const [key,setKey]=useState("");
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
    var fo=new FormData();
    fo.append("key",key);
    // console
    let url = URL_IP()+"/users/" + localStorage.getItem("iduser") + "/encheresEncours";
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
  },[])
  if (ext == true) {
  }
  if (localStorage.length == 0) {
    return (
      <Login />
    )
  }



   function deleP(id: any) {
    try {
    }
    catch (err) {
      console.log(`Error: ${err}`);
      return;
    }

  }
   function update(id: any, debut: any, fin: any, qtevato: any, pointsourceid: any) {
    try {
    }
    catch (err) {
      console.log(`Error: ${err}`);
      return;
    }

  }

  if (load == true) {
    return (
      <IonPage>
        {/* <IonTabBar slot="top">
        <IonTabButton tab="tab1" href="/lcentrifuge">
          <IonLabel>List</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/icentrifuge">
          <IonLabel>insert</IonLabel>
        </IonTabButton>
      </IonTabBar> */}
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Tous les encheres</IonTitle>
          </IonToolbar>
          <IonContent className="Ionpadding">
            <IonLoading
              cssClass="my-custom-class"
              isOpen={load}
              onDidDismiss={() => setLoad(false)}
              message={'Please wait...'}
              duration={2000}
            // animated
            />
          </IonContent>
        </IonHeader>

      </IonPage>
    )
  }
  const allCentrifuge = list_.map(group => {
    let expira = "";
    let color = "";

    if (group.expiration == true) {
      expira = "EXPIRER";
      color = 'danger';
    } else {
      expira = "En cours";
      color = 'warning';

    }
    // console.log("Test");
    let photo = group.photo;
    let img = "";
    if (photo.length > 0) {
      img = photo[photo.length - 1].photo;
    } else {
      img = require("../theme/test.PNG");
    } return (

      <>
        <IonCard style={{ "width": "350px" }}>
          <div className='flex-container'>
            <div>
              <img alt="Silhouette of mountains" width={"350px"} src={img} />
            </div>
          </div>
          <IonCardHeader>
            <IonCardTitle>{group.descriProduit}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <h1>{group.cat?.nom}</h1>

            <Link to={"/addPic/" + group.id}  >    <IonButton color="success"  >Add image
              <IonIcon slot="icon-only" icon={settings}></IonIcon>
            </IonButton></Link>
            <IonItem>
              <h2><IonIcon icon={timerOutline}></IonIcon>
              </h2>{group.dateFarany.split(" ")[0] + "  "}{" ,  "}
              <h2>{"    " + group.dateFarany.split(" ")[1]}</h2>
            </IonItem>
            <IonItem>

              <h2><IonIcon icon={pricetag}>
              </IonIcon>PRIX MIN:{group.prixMin}Ar</h2>
            </IonItem>
            <IonItem>
              <h2>Statut:
                <IonButton color={color}>
                  {expira}
                </IonButton></h2>

            </IonItem>

          </IonCardContent>
        </IonCard><IonItem>
          {/* <Link to={"/maj/"+group.id}  >    <IonButton color="success"  >
                Update
            </IonButton></Link> */}

          {/* <IonButton  color="medium"
  onClick={() => deleteEmp(group.id)}>
                Delete
             </IonButton> */}
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
          <IonFab slot="fixed"vertical="bottom" horizontal="end">
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

export default Encours;