import {MatDialogConfig} from '@angular/material/dialog';

const dialogConfig = new MatDialogConfig();
dialogConfig.maxWidth = '320px';
dialogConfig.width = '80%';
dialogConfig.position = {top: '22vh'};
dialogConfig.autoFocus = false;
dialogConfig.panelClass = 'dialog';

export {dialogConfig};
