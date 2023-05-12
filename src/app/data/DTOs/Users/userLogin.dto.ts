import { UserMainDto } from "./userMain.dto";

export interface UserLoginDto extends UserMainDto {
    password: string
}