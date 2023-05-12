import { ArticleDTO } from "./article.dto";

export interface ArticlePutDTO extends ArticleDTO {
    id: number;
}