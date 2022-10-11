import { AssetSimple } from './asset-simple';
import { NamespaceSimple } from './namespace-simple';

export class AssetNamespaceListResult {
    assets: AssetSimple[];
    namespaces: NamespaceSimple[];
    parentNamespace: NamespaceSimple;
    currentNamespace: NamespaceSimple;
}

export class AssetNamespaceListResponse {
    success: boolean;
    errorMessage: string;
    result: AssetNamespaceListResult;
}
