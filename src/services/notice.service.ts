import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceNotice } from 'src/models/notice/serviceNotice';
import { Observable } from 'rxjs';
import { ITypedBaseResponse, IBaseResponse, IPagedTypeBaseResponse } from 'src/models/IBaseResponse';
import { environment } from 'src/environments/environment';
import { GlobalNotice } from 'src/models/notice/globalNotice';


@Injectable()
export class NoticeService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<ITypedBaseResponse<ServiceNotice[]>> {
        return this.http.get<ITypedBaseResponse<ServiceNotice[]>>(`${environment.apiUrl}/notice`);
    }

    acknowledge(id: number): Observable<IBaseResponse> {
        return this.http.post<IBaseResponse>(`${environment.apiUrl}/notice/acknowledge/${id}`, null);
    }

    report(pageNumber: number, pageSize: number = 10): Observable<IPagedTypeBaseResponse<ServiceNotice[]>> {
        return this.http
            .get<IPagedTypeBaseResponse<ServiceNotice[]>>(`${environment.apiUrl}/notice/report/true/${pageNumber}/${pageSize}/false`);
    }

    create(body: any): Observable<ITypedBaseResponse<ServiceNotice[]>> {
        return this.http.post<ITypedBaseResponse<ServiceNotice[]>>(`${environment.apiUrl}/notice`, body);
    }

    delete(id: number): Observable<IBaseResponse> {
        return this.http.delete<IBaseResponse>(`${environment.apiUrl}/notice/${id}`);
    }

    getGlobal(): Observable<ITypedBaseResponse<GlobalNotice>> {
        return this.http.get<ITypedBaseResponse<GlobalNotice>>(`${environment.apiUrl}/notice/global`);
    }

    expireGlobal(): Observable<IBaseResponse> {
        return this.http.delete<IBaseResponse>(`${environment.apiUrl}/notice/global`);
    }

    updateGlobal(message: string): Observable<ITypedBaseResponse<GlobalNotice>> {
        const body = {
            Message: message
        };
        return this.http.post<ITypedBaseResponse<GlobalNotice>>(`${environment.apiUrl}/notice/global`, body);
    }
}
