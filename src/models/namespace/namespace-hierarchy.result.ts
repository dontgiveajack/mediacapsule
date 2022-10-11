export class NamespaceHierarchyResult {
    id: number;
    name: string;
}

export class NamespaceHierarchyResponse {
    result: NamespaceHierarchyResult[];
    success: boolean;
    errorMessage: string;
}
