import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { UserLoginDto, UserRegisterDto, UserTokenDto, UserUpdateDto } from "src/app/data/DTOs/user.dtos";
import { User } from "../../../data/models/user.model";

@Injectable()
export class AuthService {
    constructor(
        private http: HttpClient) {
    }

    loggedInUserChanged = new Subject();
    url: string = 'https://tutappapi-yehonatan.azurewebsites.net/v1/api/auth'
    loggedInUser?: User;
    isLoggedIn: boolean = false;

    //GET methods 
    checkEmail(email: string) {
        return this.http.get<boolean>(`${this.url}/checkEmailExist/${email}`);
    }

    getUser() {
        return this.http.get<User>(`${this.url}/getUser/${localStorage.getItem('ID')}`);
    }
    //POST methods
    registerUser(user: UserRegisterDto) {
        this.http.post(`${this.url}/register`, user).subscribe();
    }

    loginUser(user:UserLoginDto) {
        return this.http.post<any>(`${this.url}/login`, user);
    }

    updateUser(user:UserUpdateDto){
        return this.http.put<Response>(`${this.url}/updateUser`, user);
    }

    refreshToken() {
        return this.http.post<UserTokenDto>(`${this.url}/refreshToken`, {
            token: localStorage.getItem('TOKEN'),
            refreshToken: localStorage.getItem('REFRESH_TOKEN'),
            userId: localStorage.getItem('ID')
        });
    }
}