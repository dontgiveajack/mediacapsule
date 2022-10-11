export enum BreadCrumbItemType {
    Asset,
    Namespace,
    Other
}

export class BreadcrumbItem {
    type: BreadCrumbItemType;
    url?: string;
    id: number;
    path: string;
}
