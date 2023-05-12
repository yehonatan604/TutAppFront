import { UserStatusTypes, UserTypes } from "../enums/enums";

export interface User {
    id: string;
    userName: string;
    password: string;
    email: string;
    dob: Date;
    userType: UserTypes;
    status: UserStatusTypes,
    blocked: boolean;

    aboutMe?: string;
    hobbiesList?: string;
    favCategoriesList?: string;
}