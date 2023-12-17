import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DataSetComponent } from './pages/data-set/data-set.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';

export const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'data-set', component: DataSetComponent },
    { path: 'statistics', component: StatisticsComponent },
    { path: 'contact', component: ContactComponent },
    { path: '**', redirectTo: "IndexComponent" }
];
