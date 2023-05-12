import { UserMainDto } from "./userMain.dto";

export interface UserNameDto extends UserMainDto{
    userName: string,
    dob: Date
}