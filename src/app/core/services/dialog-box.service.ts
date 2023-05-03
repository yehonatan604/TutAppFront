import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable()
export class DialogBoxService {
    show(boxTitle: string, titleTxt: string) {
        return Swal.fire({
            title: boxTitle,
            text: titleTxt,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#4f4f4f',
            cancelButtonColor: '#308a38b6',
            confirmButtonText: 'כן',
            cancelButtonText: 'לא',
            width: 250,
            backdrop: `#4f4f4f9a`
        });
    }

    fire(ttl: string, msg: string, icn: any) {
        return Swal.fire({
            title: ttl,
            text: msg,
            icon: icn,
            showCancelButton: false,
            confirmButtonColor: '#4f4f4f',
            confirmButtonText: '<i class="fa fa-thumbs-up"></i>',
            width: 250,
            backdrop: `#4f4f4f9a`
        });
    }
}