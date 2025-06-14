import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';

export class FormUtils {
  //expresiones regulares:

  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

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
        case 'email':
          return `El correo es invalido`;
        case 'pattern':
          if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            return 'El correo electronico no es permitido';
          }
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

  static isFieldOneEqualFieldTwo(field1: string, field2: string) {
    //funcion para validar si password1 es igual a password2
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return field1Value === field2Value ? null : { passwordsNotEqual: true };
    };
  }
}
