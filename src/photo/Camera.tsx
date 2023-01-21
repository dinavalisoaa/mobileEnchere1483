import { IonContent, IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';
import { usePhotoGallery } from '../photo/Photo';
const FFd: React.FC = () => {
    const { photos, takePhoto } = usePhotoGallery();
    return (
        <IonContent>
            <IonGrid>
                <IonRow>
                    {photos.map((photo, index) => (
                        <IonCol size="6" key={index}>
                            <IonImg src={photo.webviewPath} />
                        </IonCol>
                    ))}
                </IonRow>
            </IonGrid>
        </IonContent>
    )
}
export default FFd;