import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class localStorageService {
    addToken(token: string, refreshToken: string, userId:string) {
        localStorage.setItem('TOKEN', token);
        localStorage.setItem('REFRESH_TOKEN', refreshToken);
        localStorage.setItem('ID', userId);
    }

    checkToken() {
        return localStorage.getItem('TOKEN');
    }

    removeToken() {
        localStorage.removeItem('TOKEN');
        localStorage.removeItem('REFRESH_TOKEN');
        localStorage.removeItem('ID');
    }
}