import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule], //siempre se debe importar reactive form module.
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {
  private formBuilder = inject(FormBuilder);

  myForm: FormGroup = this.formBuilder.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
      ] /**validadores sincronos */,
    ],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(1)]],
  });

  isValidField(fieldName: string): boolean | null {
    return !!this.myForm.controls[fieldName].errors;
  }

  getFieldError(fieldName: string): string | null {
    const control = this.myForm.controls[fieldName] as FormControl;
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

  //   myForm = new FormGroup({
  //     name: new FormControl('',[],[]), //nombre del producto
  //     price: new FormControl(0),
  //     inStorage: new FormControl(0),
  //   });
}
