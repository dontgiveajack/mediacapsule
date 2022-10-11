export class AssetSimple {
    id: number;

    type: string;
    namespace: string;
    fullPath: string;
    name: string;

    displayName: string;

    createdOn: Date;
    lastModifiedOn: Date;

    fileSize: number;
    fileSizeFormatted: string;

    tags: string[];
    stores: string[];

    isOnline: boolean;
    isArchived: boolean;
}
