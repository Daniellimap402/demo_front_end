import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { NavigationComponent } from './header-navigation/navigation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        NavigationComponent,
        BreadcrumbComponent
    ],
    imports: [ CommonModule ],
    exports: [],
    providers: [],
})
export class SharedModule {}