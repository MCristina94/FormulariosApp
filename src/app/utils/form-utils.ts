import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormUtils {
  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    const control = form.controls[fieldName] as FormControl;
    if (!control || !control.errors) return null;

    const errors = control.errors ?? {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return ` Minimo de ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `Valor minimo de ${errors['min'].min}`;
      }
    }
    return null;
  }

  static isValidFieldInArray(form: FormArray, index: number) {
    return form.controls[index].errors && form.controls[index].touched;
  }

  static getFieldErrorInArray(form: FormArray, index: number): string | null {
    const control = form.controls[index] as FormControl;
    if (form.controls.length === 0) return null;

    const errors = control.errors ?? {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return ` Minimo de ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `Valor minimo de ${errors['min'].min}`;
      }
    }
    return null;
  }
}
