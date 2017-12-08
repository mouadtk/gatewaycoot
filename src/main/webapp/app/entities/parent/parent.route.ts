import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ParentComponent } from './parent.component';
import { ParentDetailComponent } from './parent-detail.component';
import { ParentPopupComponent } from './parent-dialog.component';
import { ParentDeletePopupComponent } from './parent-delete-dialog.component';

export const parentRoute: Routes = [
    {
        path: 'parent',
        component: ParentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Parents'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'parent/:id',
        component: ParentDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Parents'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const parentPopupRoute: Routes = [
    {
        path: 'parent-new',
        component: ParentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Parents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'parent/:id/edit',
        component: ParentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Parents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'parent/:id/delete',
        component: ParentDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Parents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
