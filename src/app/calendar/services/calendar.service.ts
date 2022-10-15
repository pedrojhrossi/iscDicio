import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BranchList } from '../interfaces/branchList.interface';
import { ServiceList } from '../interfaces/serviceList.interface';
import { DateList } from '../interfaces/dateList.interface';
import { TimeList } from '../interfaces/timeList.interface';
import {
  QwbConfig,
  AppointmentList,
} from '../interfaces/isc-appointment.interface';
import { CustomerList } from '../interfaces/customerList.interface';
import { ReservationInfo } from '../interfaces/reservationInfo.interface';
import { ConfirmationBody } from '../interfaces/confirmationBody.interface';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private _baseUrlPublic: string =
    'https://orchestramx.prismatechcorp.com/calendar-backend/public/api/v1';

  private _baseUrlPublic2: string =
    'https://orchestramx.prismatechcorp.com/calendar-backend/public/api/v2';

  private _baseUrl: string =
    'https://orchestramx.prismatechcorp.com/calendar-backend/api/v1';

  private _configUrl: string =
    'https://orchestramx.prismatechcorp.com/qsystem/rest/entrypoint/variables/qw_general';

  private _username: string = 'qmaticsoporte';
  private _password: string = 'AB*1234ab';

  private _authorizationData =
    'Basic ' + btoa(this._username + ':' + this._password);

  headerOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this._authorizationData,
    }),
  };

  constructor(private http: HttpClient) {}

  private _branchPublicId: string = '';
  private _branchId: string = '';
  private _servicePublicId: string = '';
  private _dateSelected: string = '';

  getAllBranches(): Observable<BranchList> {
    const url: string = `${this._baseUrl}/branches/`;
    return this.http.get<BranchList>(url, this.headerOptions);
  }

  getServicesByBranchId(branchId: string): Observable<ServiceList> {
    this._branchId = branchId;
    this._branchPublicId = branchId;
    const url: string = `${this._baseUrlPublic}/branches/${branchId}/services/`;
    return this.http.get<ServiceList>(url);
  }

  getDatesAvailable(servicePublicId: string): Observable<DateList | null> {
    if (!servicePublicId) {
      return of(null);
    }
    this._servicePublicId = servicePublicId;
    const url: string = `${this._baseUrlPublic}/branches/${this._branchPublicId}/services/${servicePublicId}/dates`;

    return this.http.get<DateList>(url);
  }

  getTimeAvailable(dateSelected: string): Observable<TimeList | null> {
    if (!dateSelected) {
      return of(null);
    }
    this._dateSelected = dateSelected;
    const url: string = `${this._baseUrlPublic}/branches/${this._branchPublicId}/services/${this._servicePublicId}/dates/${dateSelected}/times/`;
    return this.http.get<TimeList>(url);
  }

  getQwbConfig(): Observable<QwbConfig> {
    const url: string = `${this._configUrl}`;
    return this.http.get<QwbConfig>(url, this.headerOptions);
  }

  getUserByEmail(email: string): Observable<CustomerList | null> {
    const url: string = `${this._baseUrl}/customers/search?email=${email}`;
    return this.http.get<CustomerList | null>(url, this.headerOptions);
  }

  reserveAppoinment(hora: string): Observable<ReservationInfo | null> {
    const url: string = `${this._baseUrlPublic}/branches/${this._branchPublicId}/services/${this._servicePublicId}/dates/${this._dateSelected}/times/${hora}/reserve`;
    return this.http.post<ReservationInfo | null>(url, null);
  }

  confirmAppoinment(
    appointmentPublicId: string,
    body: ConfirmationBody
  ): Observable<AppointmentList | null> {
    const url: string = `${this._baseUrlPublic2}/branches/appointments/${appointmentPublicId}/confirm/`;
    return this.http.post<AppointmentList | null>(url, body);
  }
}
