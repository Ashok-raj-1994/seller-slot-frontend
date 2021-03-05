import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  showConfirmAlert(alert, callBack): void {
    Swal.fire({
      title: alert.title,
      text: alert.text,
      icon: alert.icon,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        callBack();
      }
    })
  }

}
