import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBaseResponse, ITypedBaseResponse } from 'src/models/IBaseResponse';
import { AssetDetailResponse } from 'src/models/asset/asset-details';
import { AssetSimple } from 'src/models/namespace/asset-simple';
import { DashboardReportActivity, DashboardReport } from 'src/models/namespace/dashboard-report';

@Injectable()
export class AssetService {
    constructor(private http: HttpClient) { }

    flagFavorite(id: number): Observable<IBaseResponse> {
        return this.http.post<IBaseResponse>(`${environment.apiUrl}/asset/favorite/${id}`, null);
    }

    unflagFavorite(id: number): Observable<IBaseResponse> {
        return this.http.delete<IBaseResponse>(`${environment.apiUrl}/asset/favorite/${id}`);
    }

    getDetails(id: number): Observable<AssetDetailResponse> {
        return this.http.get<AssetDetailResponse>(`${environment.apiUrl}/asset/details/${id}`);
    }

    delete(id: number[]): Observable<IBaseResponse> {
        const body = { AssetIds: id };
        return this.http.post<IBaseResponse>(`${environment.apiUrl}/asset/DeleteBulk`, body);
    }

    move(id: number[], destinationNamespace: string) {
        const body = {
            AssetIds: id,
            Path: destinationNamespace
        };
        return this.http.post<IBaseResponse>(`${environment.apiUrl}/asset/move`, body);
    }

    getThumbnnail(id: number): Observable<Blob> {
        return this.http.get(`${environment.apiUrl}/asset/thumbnail/${id}`, { responseType: 'blob' });
    }

    hasThumbnail(id: number): Observable<ITypedBaseResponse<boolean>> {
        return this.http.get<ITypedBaseResponse<boolean>>(`${environment.apiUrl}/asset/hasthumbnail/${id}`);
    }

    upload(formData: FormData): Observable<HttpEvent<ITypedBaseResponse<AssetSimple>>> {
        return this.http
            .post<ITypedBaseResponse<AssetSimple>>(`${environment.apiUrl}/asset/upload`, formData, {
                reportProgress: true,
                observe: 'events',
                // headers: new HttpHeaders({ upload: 'true' })
            });
    }

    download(id: number): Observable<Blob> {
        return this.http.get(`${environment.apiUrl}/asset/download/${id}`, { responseType: 'blob' });
    }

    getAssetActivity(id: number): Observable<ITypedBaseResponse<DashboardReportActivity[]>> {
        return this.http
            .get<ITypedBaseResponse<DashboardReportActivity[]>>(`${environment.apiUrl}/asset/UserActivity/${id}`);
    }
}
