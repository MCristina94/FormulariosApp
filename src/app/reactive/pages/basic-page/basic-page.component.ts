import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule], //siempre se debe importar reactive form module.
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {
  private formBuilder = inject(FormBuilder);
  formUtils = FormUtils; //debo importarlo cuando tengo las funciones de validacion en utils

  myForm: FormGroup = this.formBuilder.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
      ] /**validadores sincronos */,
    ],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  // isValidField(fieldName: string): boolean | null {
  //   return (
  //    (!!) this.myForm.controls[fieldName].errors &&
  //     this.myForm.controls[fieldName].touched
  //   );
  // }

  // getFieldError(fieldName: string): string | null {
  //   const control = this.myForm.controls[fieldName] as FormControl;
  //   if (!control || !control.errors) return null;

  //   const errors = control.errors ?? {};
  //   for (const key of Object.keys(errors)) {
  //     switch (key) {
  //       case 'required':
  //         return 'Este campo es requerido';
  //       case 'minlength':
  //         return ` Minimo de ${errors['minlength'].requiredLength} caracteres`;
  //       case 'min':
  //         return `Valor minimo de ${errors['min'].min}`;
  //     }
  //   }
  //   return null;
  // }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched(); //hace como si el usuario hubiera tocado todos los campos, cuando haga submit
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset({
      price: 0,
      inStorage: 0,
    });
  }
}
