import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private KEY_TOKEN: string = 'auth-token'

  constructor( private storage: Storage ) {
    this.storage.create().then();
  }

  async saveToken(token: string): Promise<void> {
    await this.storage.set(this.KEY_TOKEN, token);
  }

  async getToken(): Promise<string> {
    return this.storage.get(this.KEY_TOKEN);
  }

  async clearToken(): Promise<void> {
    await this.storage.clear();
  }



}
