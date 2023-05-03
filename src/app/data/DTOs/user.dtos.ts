export interface UserMainDto {
    email: string,
}

export interface UserNameDto extends UserMainDto{
    userName: string,
    dob: Date
}

export interface UserLoginDto extends UserMainDto {
    password: string
}

export interface UserUpdateDto extends UserMainDto, UserNameDto {
    newEmail: string,
    favCategoriesList: string,
    hobbiesList: string,
    aboutMe: string;
}

export interface UserRegisterDto extends UserLoginDto, UserNameDto {
}

export interface UserTokenDto {
    token: string,
    refreshToken: string,
    userId: string
}