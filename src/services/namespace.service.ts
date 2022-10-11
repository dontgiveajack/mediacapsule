import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NamespaceResponse } from 'src/models/namespace/namespace.result';
import { NamespaceDetailsResponse } from 'src/models/namespace/namespace-details.result';
import { NamespaceHierarchyResponse } from 'src/models/namespace/namespace-hierarchy.result';
import { AssetNamespaceListResponse } from 'src/models/namespace/asset-namespace-list-response';
import { ITypedBaseResponse, IBaseResponse } from 'src/models/IBaseResponse';
import { DashboardReport } from 'src/models/namespace/dashboard-report';
import { NamespaceSimple } from 'src/models/namespace/namespace-simple';

@Injectable()
export class NamespaceService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<NamespaceResponse> {
        return this.http.get<NamespaceResponse>(`${environment.apiUrl}/namespace`);
    }

    getDetails(name: string): Observable<NamespaceDetailsResponse> {
        return this.http.get<NamespaceDetailsResponse>(`${environment.apiUrl}/namespace/details/${name}`);
    }

    getHierarchy(id: number): Observable<NamespaceHierarchyResponse> {
        return this.http.get<NamespaceHierarchyResponse>(`${environment.apiUrl}/namespace/byid/${id}`);
    }

    getContent(id: number = null): Observable<AssetNamespaceListResponse> {
        if (id) {
            return this.http.get<AssetNamespaceListResponse>(`${environment.apiUrl}/namespace/Contents/${id}`);
        } else {
            return this.http.get<AssetNamespaceListResponse>(`${environment.apiUrl}/namespace/Personal`);
        }
    }

    getFavorites(): Observable<AssetNamespaceListResponse> {
        return this.http.get<AssetNamespaceListResponse>(`${environment.apiUrl}/namespace/favorite`);
    }

    getDashboardReport(): Observable<ITypedBaseResponse<DashboardReport>> {
        return this.http.get<ITypedBaseResponse<DashboardReport>>
            (`${environment.apiUrl}/dashboard`);
    }

    getTree(): Observable<ITypedBaseResponse<NamespaceSimple[]>> {
        return this.http.get<ITypedBaseResponse<NamespaceSimple[]>>(`${environment.apiUrl}/namespace/FolderTree`);
    }

    move(id: number, toId: number): Observable<IBaseResponse> {
        const body = {
            NamespaceId: id,
            ToNamespaceId: toId
        };

        return this.http.post<IBaseResponse>(`${environment.apiUrl}/namespace/move`, body);
    }

    create(name: string): Observable<ITypedBaseResponse<NamespaceSimple>> {
        return this.http
            .post<ITypedBaseResponse<NamespaceSimple>>(`${environment.apiUrl}/namespace/create`, { Path: name });
    }

    deleteBulk(namespaceList: string[]): Observable<IBaseResponse> {
        return this.http.post<IBaseResponse>(`${environment.apiUrl}/namespace/deletebulk`, namespaceList);
    }
}

