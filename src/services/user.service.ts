import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBaseResponse } from 'src/models/IBaseResponse';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getUser(): Observable<IBaseResponse> {
        return this.http.get<IBaseResponse>(`${environment.apiUrl}/user/get`);
    }

    isau(): boolean {
        const imu = localStorage.getItem('imu');
        return (imu && imu.length === 17 && imu[8] === '5');
    }
}
