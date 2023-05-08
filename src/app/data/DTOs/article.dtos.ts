import { CategoryTypes } from "../../data/enums/enums";

export interface ArticleDTO {
      imageId: number;
      content: string;
      category: CategoryTypes;
}

export interface ArticlePostDto extends ArticleDTO {
      title: string;
      userName: string;
      userEmail: string;
      created: Date;
}

export interface ArticlePutDTO extends ArticleDTO {
      id: number;
}