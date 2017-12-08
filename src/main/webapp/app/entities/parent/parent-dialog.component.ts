import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Parent } from './parent.model';
import { ParentPopupService } from './parent-popup.service';
import { ParentService } from './parent.service';

@Component({
    selector: 'jhi-parent-dialog',
    templateUrl: './parent-dialog.component.html'
})
export class ParentDialogComponent implements OnInit {

    parent: Parent;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private parentService: ParentService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.parent.id !== undefined) {
            this.subscribeToSaveResponse(
                this.parentService.update(this.parent));
        } else {
            this.subscribeToSaveResponse(
                this.parentService.create(this.parent));
        }
    }

    private subscribeToSaveResponse(result: Observable<Parent>) {
        result.subscribe((res: Parent) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Parent) {
        this.eventManager.broadcast({ name: 'parentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-parent-popup',
    template: ''
})
export class ParentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private parentPopupService: ParentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.parentPopupService
                    .open(ParentDialogComponent as Component, params['id']);
            } else {
                this.parentPopupService
                    .open(ParentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
