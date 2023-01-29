import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonItem, IonLabel, IonSelectOption, IonSelect, IonRow, IonCol, IonButtons, IonMenuButton, IonTabBar, IonTabButton, useIonViewDidEnter, IonTextarea, IonIcon, IonAlert, NavContext, IonMenu, IonGrid, IonImg } from '@ionic/react';
//import ExploreContainer from '../components/ExploreContainer';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router';
import { add, addCircleSharp, camera, closeCircleOutline, home, list, logOut, logOutSharp, newspaper, sync, syncCircle, syncCircleSharp } from 'ionicons/icons';
import { Link, useHistory } from 'react-router-dom';
import Head from './Head';
import { supAll, supPhoto, usePhotoGallery } from '../photo/usePhotoGallery';
import { URL_IP } from './config';
const AjoutEnchere: React.FC = () => {
  const ref = useRef(false);
  const { control, handleSubmit } = useForm();
  const [Error, setError] = useState<string>("");

  const history = useHistory();
  const [categorie, setCategorie] = useState<any[]>([]);
  const [descri, setDescri] = useState("");
  const [categorieId, setCategorieId] = useState("");
  const [prixMin, setPrixMin] = useState('');
  const [durer, setDurer] = useState('');

  const [nisyError, setNisyError] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);
  const [message, setMessage] = useState("Ajout Non Reussi");

  const params = useParams<{ id: string }>();
  const [ok, setOk] = useState(false);
  // const [e, setOk] = useState(false);c

  const { navigate } = useContext(NavContext);

  const [login, setLogin] = useState('ramanga@u.com');
  // sonct 
  const [password, setPassword] = useState('ramanga');
  const [redirect, setRedirect] = useState(false);
  const { photos, takePhoto, __photo } = usePhotoGallery();
  var [ph, setPh] = useState(__photo);
  ph = __photo;
  function supPh(id: String) {
      var __ph = supPhoto(id);
      setPh(__ph);
  }
  function log() {
    console.log(login);
    console.log(password);
    // After Async call....

    var fors = new FormData();
    fors.append("prixMin", prixMin);
    fors.append("categorieId", categorieId);
    fors.append("descriProduit", descri);
    fors.append("durer", durer);
    // supAll()


    fors.append("pwds", password);
    fetch(URL_IP()+"/categories", {
      method: 'GET',
    }).then((result) => {
      return result.json();

    }).then((e) => {
      setCategorie(e.data);
      // console.log(categorie.length);      
      if (e.data.error != undefined) {
        setError(e.data.error);
        // localStorage.setItem("tokenHash", e.datas.name);
        // localStorage.setItem("iduser", e.datas.id);
        // setRedirect(true);
      } else {
        // setError(e.datas.message);
      }
    }, (e) => {
    });

  }
function upFile(photo: any,id:number){
  let url = URL_IP()+"/users/" + localStorage.getItem("iduser") + "/encheres/" +id + "/addPic";
    console.log(url);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        photo: photo
      })
    }).then((result) => {
      return result.json();

    }).then((e) => {
      console.log(e);
      if (e.error != undefined) {
        // setExp(true);
      } else {
        // setList(e.data);
        // setOk(true);
      }

    }, (e) => {
    });
   
}
  function addEnchere() {
    console.log(login);
    console.log(password);
    let body="";
    var fors = new FormData();
    fors.append("prixMin", prixMin);
    fors.append("categorieId", categorieId);
    fors.append("descriProduit", descri);
    fors.append("durer", durer);
  //   for (let index = 0; index < __photo.length; index++) {
  //     body = body + __photo[index][0] + ",";
  //     console.log("-->"+body);
  // }
    fetch(URL_IP()+"/users/" + localStorage.getItem("iduser") + "/encheres", {
      method: 'POST',
      body: fors,
      headers: {
        'token': `${localStorage.getItem("tokenHash")}`
      }
    }).then((result) => {
  

      
        return result.json();

    }).then((e) => {

      console.log(e);

      // setCategorie(e.data);
      if (e.error != undefined) {
        setNisyError(true);
        setMessage(e.error.message);
        setShowAlert1(true);
      }
      else if (e.timestamp != undefined) {
        setMessage(e.message);
        setShowAlert1(true);
      }
      else {
      
        for (let index = 0; index < __photo.length; index++) {
          body = body + __photo[index][0] + ",";
          upFile(__photo[index][0],e.data.id);
      }
        setMessage("Enchere Ajouter");
        setShowAlert1(true);
        setOk(true);

      }
    }, (e) => {
    });

  }
  if (redirect) {

    setRedirect(false);
  }
  if (nisyError == true) {

  }
  const registerUser = (data: any) => {
    addEnchere();
    // setOk(true);
  }
  useEffect(() => {
    log();

  }, []);
  if (localStorage.getItem("tokenHash") == null) {
    window.location.href = "login";
  }
  if (ok == true) {
  }
  const setImage = (_event: any) => {
    let f = _event.target.files![0];
    let reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onload = () => {
      console.log(reader.result);
    }
  }
  return (
    <><>
    </>
      <IonPage>
        <Head />
        <IonAlert
          isOpen={showAlert1}
          onDidDismiss={() => setShowAlert1(false)}
          header={'Confirm!'}
          message={message}
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
              text: 'Ajout Successful',
              handler: () => {
                if (ok == true) {
                  window.location.href = "mine";

                }
                // setDeco(true);
              }
            }
          ]}
        />

        <IonHeader>
          <IonToolbar>
            <IonTitle>Ajout Enchere</IonTitle>


          </IonToolbar>

        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Rechargement</IonTitle>
            </IonToolbar>
          </IonHeader>

          {/* <IonAlert
            isOpen={showAlert1}
            onDidDismiss={() => setShowAlert1(false)}
            header={'Alert'}

            subHeader={'Message'}
            message={message}
            buttons={['OK']} /> */}
          <IonRow justify-content-center>
            {/* <IonCol size-md-0 size-lg-0 size-xl-0 size-xs-0></IonCol> */}
         

            <IonCol size-md-12 size-lg-11 size-xl-11 size-xs-11>
            <IonGrid>
                    <IonRow>
                        {ph.map((p) => (
                            <IonCol size="6" >
                                <IonIcon icon={closeCircleOutline} onClick={() => supPh(p[1])}>{p[1]}</IonIcon>
                                <IonImg src={p[0] + ""} />
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid> <div className="ion-text-center">
                        Ajout photo(s)
                        <IonButton onClick={() => takePhoto()}>
                            <IonIcon icon={camera}></IonIcon>
                        </IonButton>
                    </div>

              <form onSubmit={handleSubmit(registerUser)} id="forme">
                <IonItem>{/*interface="popover"*/}
                  <IonLabel>Categorie</IonLabel>
                  <IonSelect name="CategorieId" value={categorieId} placeholder="Categorie" onIonChange={(e: any) => { setCategorieId((e.target.value)); }}>
                    {categorie.map((element, index) => (
                      <IonSelectOption value={element.id}>{element.nom}</IonSelectOption>

                    ))}
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel>Prix Minimale


                  </IonLabel>
                  <IonInput name="prixminimale" value={prixMin} type="number" onIonChange={(e: any) => { setPrixMin(e.target.value); }}></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel>Description</IonLabel>
                  <IonTextarea name="desc" value={descri} onIonChange={(e: any) => {

                    setDescri(e.target.value);
                  }}></IonTextarea>
                </IonItem>

                <IonItem>
                  <IonLabel>Durer</IonLabel>
                  <IonInput name="Durer" value={durer} type="number" onIonChange={(e: any) => { setDurer((e.target.value)); }}></IonInput>
                </IonItem>

                <IonButton expand="block" onClick={(e) => { /*addEnchere();*/     }} type="submit" className="ion-margin-top">
                  Ajouter
                </IonButton>
                {/* (document as any).getElementById("file-upload").click(); */}
                {/* <Link to={"/addPic/"} >
                  <IonButton color="success" id="bled" >
                    AJOUTER PHOTO
                  </IonButton>
                </Link> */}
              </form>
            </IonCol>
          </IonRow>
        </IonContent>

      </IonPage>
    </>

  );
};

export default AjoutEnchere;
