import { Injectable } from "@angular/core";
import { AngularEditorConfig } from "@kolkov/angular-editor";

@Injectable()
export class EditorService {
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '300px',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: 'auto',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    customClasses: [
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['backgroundColor', 'textColor', 'subscript', 'superscript', 'fontName'],
      ['insertVideo', 'insertImage', 'removeFormat']
    ]
  }
}