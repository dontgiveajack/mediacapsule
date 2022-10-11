import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    httpOptions = {
        // This is required so that Angular returns the Cookies received from the server.
        // The server sends cookies in Set-Cookie header. Without this, Angular will ignore the Set-Cookie header
        withCredentials: true
    };

    login(user: string, password: string, domain: string): Observable<any> {


        return this.http.post(`${environment.apiUrl}/Authentication/Login`, {
            UserName: user,
            Password: password,
            Domain: domain
        }, this.httpOptions);
    }

    logoff(): Observable<any> {
        return this.http.post(`${environment.apiUrl}/Authentication/Logout`, null, this.httpOptions);
    }
}
