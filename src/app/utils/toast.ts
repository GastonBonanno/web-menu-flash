import {Injectable} from "@angular/core";
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class Toast {

  constructor(private toastController: ToastController) {}

  async present(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      position
    });

    await toast.present();
  }

}
