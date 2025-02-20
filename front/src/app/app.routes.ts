import { Routes } from '@angular/router';
import { CardPageComponent } from './pages/card-page/card-page.component';
import { CardDetailPageComponent } from './pages/card-detail-page/card-detail-page.component';

export const routes: Routes = [
    {path: '', component: CardPageComponent},
    {path: ':id', component: CardDetailPageComponent}
];
