export interface IBaseResponse {
    success: boolean;
    errorMessage: string;
}

export interface ITypedBaseResponse<T> extends IBaseResponse {
    result: T;
}

export interface IPagedTypeBaseResponse<T> extends ITypedBaseResponse<T> {
    metaData: PagingMetaData;
}

export interface PagingMetaData {
    pageCount: number;
    totalItemCount: number;
    pageNumber: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    isFirstPage: boolean;
    isLastPage: boolean;
    firstItemOnPage: number;
    lastItemOnPage: number;
}
