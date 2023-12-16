import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'product-details', component: ProductDetailsComponent },
    { path: 'shop', component: ShopComponent },
    { path: 'contact', component: ContactComponent },
    { path: '**', redirectTo: "IndexComponent" }
];
