import { CategoryTypes } from "../enums/enums";

export interface Article {
    id: number,
    userName: string;
    userEmail: string;
    imageId: number;
    category: CategoryTypes;
    title: string;
    content: string;
    created: Date;
    stars: number;
    views: number;
}