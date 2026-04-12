import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GenericResponse } from '../../view-models/generic-response/generic-response';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private readonly _httpClient = inject(HttpClient)
  private url = environment.url;
  addNewReview(review:any){
    return this._httpClient.post<GenericResponse>(`${this.url}/Review`,review,{withCredentials:true});
  }
}
