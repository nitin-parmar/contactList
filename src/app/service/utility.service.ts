import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor( private snack: MatSnackBar ) { }
  openSnackBar(message: string, action: string, type: string = '') {
    this.snack.open(message, action, {
      duration: 1000000,
      verticalPosition: 'bottom',
      panelClass: type
    });
  }
}
