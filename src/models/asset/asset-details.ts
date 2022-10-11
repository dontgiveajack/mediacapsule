export interface AssetFileName {
    extension: string;
    name: string;
}

export interface UserAudit {
    domain: string;
    user: string;
    id: number;
}

export interface AccessPermissions {
    canAccess: boolean;
    canRename: boolean;
    canDestroy: boolean;
    canAccessContent: boolean;
    canModifyContent: boolean;
}

export interface Size {
    formattedSize: string;
    size: number;
}

export interface Checksum {
    base: number;
    checksum: string;
}

export interface CapsuleMediaDateTime {
    timeZone: string;
    gmtOffset: number;
    dst: boolean;
    milliseconds: number;
    value: string;
}

export interface StoreInfo {
    oId: number;
    storeType: string;
    storeName: string;
}

export interface AssetUrl {
    isManaged: boolean;
    url: string;
}

export interface AssetContent {
    id: number;
    sTime: number;
    versions: number;
    totalSize: number;
    createdTime: CapsuleMediaDateTime;
    accessedTime: CapsuleMediaDateTime;
    type: AssetFileName;
    size: Size;
    checksums: Checksum[];
    copyTime: CapsuleMediaDateTime;
    store: StoreInfo;
    url: AssetUrl;
}

export class AssetDetail {
    id: number;
    version: number;
    vId: number;
    fileType: string;
    namespace: string;
    path: string;
    name: AssetFileName;
    creator: UserAudit;
    createdTime: CapsuleMediaDateTime;
    modifiedTime: CapsuleMediaDateTime;
    sTime: number;
    accessPermissions: AccessPermissions;
    content: AssetContent[];
    displayName: string;

    metadata: AssetMetaDataGroup[];
}

export interface AssetMetaDataGroup {
    name: string;
    value: string;
    subGroup: AssetMetaDataGroup[];
}

export interface AssetDetailResponse {
    result: AssetDetail;
    success: boolean;
    errorMessage?: any;
}
