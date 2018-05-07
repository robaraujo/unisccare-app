import { Component } from '@angular/core';
import { ViewController, IonicPage, NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { ImageResizer } from '@ionic-native/image-resizer';
import { Platform, LoadingController} from 'ionic-angular';
import { Global } from '../../../helpers/global';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { config } from '../../../app/config';
import { UserService } from '../../../providers/user-service';

@IonicPage({
    name: 'modal-camera-gallery',
    segment: 'modal-camera-gallery'
})
@Component({
  selector: 'modal-camera-gallery',
  templateUrl: './modal-camera-gallery.html'
})
export class ModalCameraGalleryPage {
    
    private fileTransfer: FileTransferObject;
    private uploadingText:string = 'Fazendo upload';
    
    constructor(private viewCtrl: ViewController,
                public navCtrl: NavController,
                private camera: Camera,
                private platform: Platform,
                private crop: Crop,
                private imageResizer: ImageResizer,
                private transfer: FileTransfer,
                private global: Global,
                private loadingCtrl: LoadingController,
                private userService: UserService,
            
            ) {

        this.platform.ready().then(res => {
            this.fileTransfer = this.transfer.create();
        });
    }

    /**
     * Close modal and return user choose
     * @param type type that user choose(camera, gallery, cancel)
     */
    dismiss(type?: string) {
        this.viewCtrl.dismiss(type);
    }

    /**
     * Callback from ModalCameraGallery
     * @param type string[gallery,camera, remove, undefined]
     */
    takePic(type) {

        let sources = {
            gallery: 0,
            camera: 1,
        };


        // source type invalid
        if (sources[type] === undefined) return;
        
        const options: CameraOptions = {
            quality: 80,
            correctOrientation: true,            
            sourceType: sources[type],
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };

        // fix ios bug when cropping
        if (this.platform.is('ios')) {
            options.allowEdit = true;
        }

        this.camera.getPicture(options).then(
            file=> this.doCrop(file),
            error=> {
                // Selection cancelled && 'Camera cancelled.'
                //this.error('ProfilePage.takePic', 'Error getting image.')
            }
        );
    }

    /**
     * Let user crop image
     * @param fileUri string
     */
    doCrop(fileUri) {
        this.crop
            .crop(fileUri, {quality: 100})
            .then(
                newImage => this.doResize(newImage),
                error => {
                    if (error && error.code && error.code === 'userCancelled') {
                        return this.dismiss('canceled');
                    }

                    this.global.showMsg('Error cropping image.', 'error');
                    this.dismiss('error');
                }
            );
    }

    /**
     * Resize image to 200x200
     * @param fileUri string
     */
    doResize(fileUri) {

        let options = {
            uri: fileUri,
            folderName: 'avatar',
            fileName: 'localdrive-avatar.jpg',            
            quality: 100,
            width: 500,
            height: 500
        };
           
        this.imageResizer
            .resize(options)
            .then((filePath: string) => this.saveAvatar(fileUri))
            .catch(e => {
                this.global.showMsg('Erro ao redimensionar imagem.', 'error');
                this.dismiss('error');
            });
    }

    
    /**
     * Access server to save avatar
     * @param base64File string
     */
    saveAvatar(fileUri) {
        
        let loader = this.loadingCtrl.create({ content: this.uploadingText });
        loader.present();

        let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: 'avatar.jpg',
            headers: {'Authorization': 'Bearer '+this.userService.idToken}
        };
        
        this.fileTransfer.upload(fileUri, config.apiUrl + '/photos/store', options)
            .then(
                (resp: any) => {
                    loader.dismiss();

                    if (!resp || !resp.responseCode || resp.responseCode !== 200) {
                        console.error(resp);
                        this.dismiss('error');
                        this.global.showMsg('Erro ao enviar imagem para o servidor', 'error');
                    }
                    
                    this.dismiss(resp);
                    this.global.showMsg('Imagem enviada com sucesso.', 'success');
                },
                (err) => {
                    loader.dismiss();
                    this.dismiss('error');
                    this.global.showMsg('Erro ao enviar imagem para o servidor', 'error');
                } 
            );
    }
}
