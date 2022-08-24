// import { AbstractControl, ValidatorFn } from '@angular/forms';
// import { UtilService } from '../_services/util.service';
//
// export class FileType {
//   private static imageFileTypes = [
//     'image/apng',
//     'image/bmp',
//     'image/gif',
//     'image/jpeg',
//     'image/png',
//     'image/svg+xml',
//   ];
//
//   constructor(private utilS: UtilService) {}
//
//   static validateFile(type: string): boolean {
//     return this.imageFileTypes.includes(type);
//   }
//
//   static image(
//     photoControl: AbstractControl
//   ): { [key: string]: boolean } | any {
//     if (photoControl.value) {
//       console.log(photoControl);
//       const image = photoControl.value.type;
//       console.log('ja tipi', image);
//       return FileType.validateFile(image) ? null : { notRightFileFormat: true };
//     }
//   }
// }
