import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.services';
import { Country } from '../../interfaces/country.interfaces';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  fb = inject(FormBuilder);
  countryServices = inject(CountryService);
  countriesByRegion = signal<Country[]>([]);
  countriesByBorders = signal<Country[]>([]);
  regions = signal(this.countryServices.regions);
  myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  //para identificar el cambio de region cuando el usuario selecciona una opcion
  onFormChanged = effect((onCleanup) => {
    const regionSubscription = this.onRegionChanged();

    onCleanup(() => {
      regionSubscription.unsubscribe(); //para limpiar el value cuando se desmonte el componente
    });
  });

  onRegionChanged() {
    return this.myForm
      .get('region')!
      .valueChanges.pipe(
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(() => this.myForm.get('border')!.setValue('')),
        tap(() => {
          this.countriesByBorders.set([]);
          this.countriesByRegion.set([]);
        }),
        switchMap((region) =>
          this.countryServices.getCountriesByRegion(region ?? '')
        )
      )
      .subscribe((countries) => {
        this.countriesByRegion.set(countries);
      });
  }
}
