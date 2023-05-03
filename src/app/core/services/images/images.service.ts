import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Image } from "../../../data/models/image.model";

@Injectable()
export class ImagesService {
    constructor (private http: HttpClient) { 
    }

    imagesUrl: string = 'https://localhost:7012/api/Images';

    fetchImages() {
        return this.http.get<Image[]>(this.imagesUrl);
    }

    fetchImageById(id: number) {
        return this.http.get<Image[]>(`${this.imagesUrl}/?$filter=id eq ${id}`);
    }

    fetchImageByTitle(title: string) {
        return this.http.get<Image[]>(`${this.imagesUrl}/?$filter=title eq '${title}'`);
    }
    
    postImage(imageUrl: string, imageTitle: string) {
        return this.http.post(this.imagesUrl, {
            Title: imageTitle,
            Location: imageUrl
        });
    }
}