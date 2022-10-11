import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Domain } from 'src/models/app/admin/domain';
import { environment } from 'src/environments/environment';

@Injectable()
export class AdminService {
    constructor(private http: HttpClient) { }

    getAllDomains(): Observable<Domain[]> {
        return this.http.get<Domain[]>(`${environment.apiUrl}/Admin/Domain`);
    }

    getDomain(id: number): Observable<Domain> {
        return this.http.get<Domain>(`${environment.apiUrl}/Admin/Domain/${id}`);
    }
}
