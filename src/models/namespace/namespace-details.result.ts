export class NamespaceAsset {
    id: number;
    name: string;
    path: string;
}

export class NamespaceDetailsResult {
    constructor() {
        this.assets = [];
    }
    id: number;
    name: string;
    assets: NamespaceAsset[];
    startAt: number;
    endAt: number;
    size: number;
    count: number;
    next: number;
    complete: boolean;
}

export class NamespaceDetailsResponse {
    result: NamespaceDetailsResult;
    success: boolean;
    errorMessage: string;
}
