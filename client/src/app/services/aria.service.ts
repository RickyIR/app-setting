import { Injectable } from '@angular/core';
import swal, { SweetAlertOptions } from 'sweetalert2';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class AriaService {

  constructor() { }

  /**
   * Function that wraps swal container with aria-hidden="false" and all document with aria-hidden="true"
   */
  ariaSwal(swalOptions: SweetAlertOptions): void {
    swalOptions.focusConfirm = false;
    swalOptions.showCloseButton = true;
    swalOptions.closeButtonAriaLabel = 'Close this dialog';
    swalOptions.onBeforeOpen = (swalElement) => {

      swalElement.removeAttribute('aria-modal');

      window.document.querySelector('.page-wrapper').setAttribute('aria-hidden', 'true');

      setTimeout(() => {
        swalElement.focus();
      }, 4);
    };
    swalOptions.onClose = (swalElement) => {

      window.document.querySelector('.page-wrapper').setAttribute('aria-hidden', 'false');

    };

    swal(swalOptions);
  }

  async ariaSwalAwait(swalOptions: SweetAlertOptions) {
    swalOptions.focusConfirm = false;
    swalOptions.showCloseButton = true;
    swalOptions.closeButtonAriaLabel = 'Close this dialog';
    swalOptions.onBeforeOpen = (swalElement) => {

      swalElement.removeAttribute('aria-modal');

      window.document.querySelector('.page-wrapper').setAttribute('aria-hidden', 'true');

      setTimeout(() => {
        swalElement.focus();
        console.log($(swalElement).find('.swal2-content'));
      }, 4);
    };
    swalOptions.onClose = (swalElement) => {

      window.document.querySelector('.page-wrapper').setAttribute('aria-hidden', 'false');

    };

    const result = await swal(swalOptions);

    return result;
  }
}
