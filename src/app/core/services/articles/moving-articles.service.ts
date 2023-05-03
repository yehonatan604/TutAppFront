import { Injectable } from '@angular/core';
import { Article } from 'src/app/data/models/article.model';

@Injectable({ providedIn: 'root' })
export class MovingArticlesService {
  move(list: Article[], direction: string): Article[] {
    let tempArticlesList = [];

    if (direction === 'left') {
      tempArticlesList = [...list];
      let article: Article = list[0];
      tempArticlesList.shift();
      tempArticlesList.push(article);
      list = tempArticlesList;
    }

    if (direction === 'right') {
      tempArticlesList = [...list];
      let article: Article = list[tempArticlesList.length - 1];
      tempArticlesList.pop();
      tempArticlesList.unshift(article);
      list = tempArticlesList;
    }
    return list;
  }
}
