import { UserLoginDto } from "./userLogin.dto";
import { UserNameDto } from "./userName.dto";

export interface UserRegisterDto extends UserLoginDto, UserNameDto {
}