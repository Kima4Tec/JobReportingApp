import { Routes } from '@angular/router';
import { JobReportsComponent } from './job-reports/job-reports.component';
import { ShowReportComponent } from './show-report/show-report.component';

export const routes: Routes = [
    { path: '', component: JobReportsComponent },
    { path: 'showreport', component: ShowReportComponent },
];
