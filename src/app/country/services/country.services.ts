import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interfaces';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private http = inject(HttpClient);
  private baseUrl = 'https://restcountries.com/v3.1';

  private _region = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regions(): string[] {
    return [...this._region]; //se hace con el fin de que no se modifique el arreglo original
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    if (!region) return of([]);
    const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
    return this.http.get<Country[]>(url);
  }

  getCountryByAlphaCode(alphacode: string): Observable<Country> {
    const url = `${this.baseUrl}/alpha/${alphacode}?fields=cca3,name,borders`;
    return this.http.get<Country>(url);
  }
}
