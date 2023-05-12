import { CategoryTypes } from "../../enums/enums";

export interface ArticleDTO {
      imageId: number;
      content: string;
      category: CategoryTypes;
}
