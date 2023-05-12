import { UserMainDto } from "./userMain.dto";
import { UserNameDto } from "./userName.dto";

export interface UserUpdateDto extends UserMainDto, UserNameDto {
    newEmail: string,
    favCategoriesList: string,
    hobbiesList: string,
    aboutMe: string;
}