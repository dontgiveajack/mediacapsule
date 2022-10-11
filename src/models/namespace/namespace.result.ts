export class NamespaceResult {
    id: number;
    name: string;
}

export class NamespaceResponse {
    result: NamespaceResult[];
    success: boolean;
    errorMessage: string;
}
