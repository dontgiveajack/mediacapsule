export interface DashboardReportActivity {
    activity: string;
    actionBy: string;
    activityDate: Date;
}

export class DashboardReport {
    onlineUsed: number;
    onlineUsedFormatted: string;
    onlineTotalAvailable: number;
    onlineTotalAvailableFormatted: string;
    archiveUsed: number;
    archiveUsedFormatted: string;
    archiveTotalAvailable: number;
    archiveTotalAvailableFormatted: string;
    activities: DashboardReportActivity[];
}

