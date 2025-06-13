import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormUtils } from '../../../utils/form-utils';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-diname-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './diname-page.component.html',
})
export class DinamePageComponent {
  private fb = inject(FormBuilder);
  FormUtils = FormUtils;
  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array(
      [
        ['Metal Gear', Validators.required],
        ['Guitar Hero', Validators.required],
      ],
      Validators.minLength(3)
    ),
  });

  newFavoriteGame = new FormControl('', Validators.required); //para el campo agregar

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddToFavorites() {
    if (this.newFavoriteGame.invalid) return;
    const newGame = this.newFavoriteGame.value;

    this.favoriteGames.push(this.fb.control(newGame, Validators.required));
    this.newFavoriteGame.reset();
  }

  onDeleteFavorite(index: number) {
    this.favoriteGames.removeAt(index);
  }
}
