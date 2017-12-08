import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaycootSharedModule } from '../../shared';
import {
    ParentService,
    ParentPopupService,
    ParentComponent,
    ParentDetailComponent,
    ParentDialogComponent,
    ParentPopupComponent,
    ParentDeletePopupComponent,
    ParentDeleteDialogComponent,
    parentRoute,
    parentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...parentRoute,
    ...parentPopupRoute,
];

@NgModule({
    imports: [
        GatewaycootSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ParentComponent,
        ParentDetailComponent,
        ParentDialogComponent,
        ParentDeleteDialogComponent,
        ParentPopupComponent,
        ParentDeletePopupComponent,
    ],
    entryComponents: [
        ParentComponent,
        ParentDialogComponent,
        ParentPopupComponent,
        ParentDeleteDialogComponent,
        ParentDeletePopupComponent,
    ],
    providers: [
        ParentService,
        ParentPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewaycootParentModule {}
