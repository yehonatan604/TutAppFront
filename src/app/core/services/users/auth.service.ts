import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { User } from "../../../data/models/user.model";
import { UserLoginDto } from "src/app/data/DTOs/Users/userLogin.dto";
import { UserRegisterDto } from "src/app/data/DTOs/Users/userRegister.dto";
import { UserTokenDto } from "src/app/data/DTOs/Users/userToken.dto";
import { UserUpdateDto } from "src/app/data/DTOs/Users/userUpdate.dto";

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