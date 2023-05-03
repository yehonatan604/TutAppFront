import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { UserLoginDto, UserRegisterDto, UserTokenDto, UserUpdateDto } from "src/app/data/DTOs/user.dtos";
import { User } from "../../../data/models/user.model";

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(
        private http: HttpClient) {
    }

    loggedInUserChanged = new Subject();
    usersUrl: string = 'https://localhost:7012/api/auth'
    loggedInUser?: User;
    isLoggedIn: boolean = false;

    //GET methods 
    checkEmail(email: string) {
        return this.http.get<boolean>(`${this.usersUrl}/checkEmailExist/${email}`);
    }

    getUser() {
        return this.http.get<User>(`${this.usersUrl}/getUser/${localStorage.getItem('ID')}`);
    }
    //POST methods
    registerUser(user: UserRegisterDto) {
        this.http.post(`${this.usersUrl}/register`, user).subscribe();
    }

    loginUser(user:UserLoginDto) {
        return this.http.post<any>(`${this.usersUrl}/login`, user);
    }

    updateUser(user:UserUpdateDto){
        return this.http.put<Response>(`${this.usersUrl}/updateUser`, user);
    }

    refreshToken() {
        return this.http.post<UserTokenDto>(`${this.usersUrl}/refreshToken`, {
            token: localStorage.getItem('TOKEN'),
            refreshToken: localStorage.getItem('REFRESH_TOKEN'),
            userId: localStorage.getItem('ID')
        });
    }
}