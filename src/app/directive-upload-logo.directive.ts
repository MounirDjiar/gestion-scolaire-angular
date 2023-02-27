import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appDirectiveUploadLogo]'
})
export class DirectiveUploadLogoDirective {
  @Output() giveURLtoCreate = new EventEmitter<string>();

  constructor() { }

  @HostListener('change', ['$event.target.files'])
  onChange(files: FileList) {
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const url = reader.result as string;
        this.giveURLtoCreate.emit(url);
      };
    }
  }
}
