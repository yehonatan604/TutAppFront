import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Image } from "../../../data/models/image.model";

@Injectable()
export class ImagesService {
    constructor (private http: HttpClient) { 
    }

    url: string = 'https://tutappapi-yehonatan.azurewebsites.net/v1/api/Images';

    fetchImages() {
        return this.http.get<Image[]>(this.url);
    }

    fetchImageById(id: number) {
        return this.http.get<Image[]>(`${this.url}/?$filter=id eq ${id}`);
    }

    fetchImageByTitle(title: string) {
        return this.http.get<Image[]>(`${this.url}/?$filter=title eq '${title}'`);
    }
    
    postImage(imageUrl: string, imageTitle: string) {
        return this.http.post(this.url, {
            Title: imageTitle,
            Location: imageUrl
        });
    }
}