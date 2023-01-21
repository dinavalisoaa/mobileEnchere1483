import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonFab,
    IonFabButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonText,
    IonSelect,
    IonSelectOption,
} from '@ionic/react';
import axios from 'axios';
import { camera, closeCircleOutline } from 'ionicons/icons';
import { useRef, useState } from 'react';
import { supAll, supPhoto, usePhotoGallery } from './usePhotoGallery';
const Camcam: React.FC = () => {
    const { photos, takePhoto, __photo } = usePhotoGallery();
    var [ph, setPh] = useState(__photo);
    ph = __photo;
    function supPh(id: String) {
        var __ph = supPhoto(id);
        setPh(__ph);
    }
    var [liste, setListe] = useState([]);
    var Utilisateur = sessionStorage.getItem("idUtilisateur");
    var [compteur, setCompteur] = useState(true);
    if (compteur) {
        axios.get('http://' + 'localhost:8080:' + 'GetCategorie/').then((response) => {
            setListe(response['data'][0]['data']);
        })
        setCompteur(false);
    }
    var nom = useRef<HTMLIonInputElement>(null);
    var prix = useRef<HTMLIonInputElement>(null);
    var categorieid = useRef<HTMLIonSelectElement>(null);
    var duree = useRef<HTMLIonInputElement>(null);
    var [erreur, setErreur] = useState("");
    var [success, setSuccess] = useState("");
    function Ajouter() {
        let __nom = nom.current?.value;
        let __prix = prix.current?.value;
        let __categorieid = categorieid.current?.value;
        let __duree = duree.current?.value;
        let body = "";
        for (let index = 0; index < __photo.length; index++) {
            body = body + __photo[index][0] + ",";
            console.log("-->"+body);
        }
        console.log("iee");
        if (__nom != "" && __prix != "" && __categorieid != "" && __duree != "") {
            if (__photo.length != 0) {
                fetch('http://' + 'localhost:8080:' + 'Encheres?nom=' + __nom + '&&idUtilisateur=' + Utilisateur + '&&categorieid=' + __categorieid + '&&duree=' + __duree + '&&prix=' + __prix, {
                    method: "POST",
                    body: "{" + body + "}"
                }
                ).then()
                setErreur("");
                setSuccess("Enchere faite avec succes !");
                setPh(supAll());
                nom.current!.value = "";
                prix.current!.value = "";
                categorieid.current!.value = "";
                duree.current!.value = "";
            }else{
                setErreur("Vous devez mettre au moins une photo !");
                setSuccess("");
            }
        } else {
            setErreur("Veuillez compléter tout les champs !");
            setSuccess("");
        }
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Photo Gallery</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonGrid>
                    <IonRow>
                        {ph.map((p) => (
                            <IonCol size="6" >
                                <IonIcon icon={closeCircleOutline} onClick={() => supPh(p[1])}>{p[1]}</IonIcon>
                                <IonImg src={p[0] + ""} />
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>
                <IonContent>
                    <div className="ion-text-center">
                        Ajout photo(s)
                        <IonButton onClick={() => takePhoto()}>
                            <IonIcon icon={camera}></IonIcon>
                        </IonButton>
                    </div>
                    <IonContent class="ion-padding-horizontal">
                        <IonItem>
                            <IonLabel position="floating"> Produit</IonLabel>
                            <IonInput ref={nom} ></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating"> Prix</IonLabel>
                            <IonInput ref={prix}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating"> Catégorie</IonLabel>
                            <IonSelect ref={categorieid} >
                                {liste.map((liste) => {
                                    return (
                                        <IonItem>
                                            <IonSelectOption value={liste['id']}>{liste['nom']}</IonSelectOption>
                                        </IonItem>
                                    );
                                })
                                }
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating"> Durée</IonLabel>
                            <IonInput type="time" ref={duree}></IonInput>
                        </IonItem>
                        <IonRow>
                            <IonCol className="ion-text-center" >
                                <IonButton color="primary" onClick={Ajouter}>Lancer cette enchère</IonButton>
                            </IonCol>
                        </IonRow>
                        <IonText color="danger">{erreur}</IonText>
                        <IonText color="success">{success}</IonText>
                    </IonContent>
                </IonContent>
            </IonContent>
        </IonPage>
    );
};

export default Camcam;
