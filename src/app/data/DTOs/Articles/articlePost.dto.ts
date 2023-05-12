import { ArticleDTO } from "./article.dto";

export interface ArticlePostDto extends ArticleDTO {
    title: string;
    userName: string;
    userEmail: string;
    created: Date;
}