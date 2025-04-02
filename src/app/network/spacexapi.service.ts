import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mission } from '../models/mission';

@Injectable({
  providedIn: 'root'
})
export class SpaceXApiService {
  private apiUrl = 'https://api.spacexdata.com/v3/launches';

  constructor(private http: HttpClient) {}

  getAllMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(this.apiUrl);
  }

  getMissionByFlightNumber(flightNumber: number): Observable<Mission> {
    return this.http.get<Mission>(`${this.apiUrl}/${flightNumber}`);
  }

  getMissionsByYear(year: string): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.apiUrl}?launch_year=${year}`);
  }
}
