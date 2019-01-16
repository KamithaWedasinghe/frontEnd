
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainHttpService } from './services/common/main-http.service';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './home/admin/admin.component';
import { SupplierComponent } from './home/supplier/supplier.component';
import { ApprovePersonComponent } from './home/approve-person/approve-person.component';
import { ToastrModule } from 'ngx-toastr';
import { UploadFileComponent } from './home/common/upload-file/upload-file.component';
import { FileUploadModule } from 'ng2-file-upload';
import { CreateContractBoqComponent } from './home/admin/create-contract-boq/create-contract-boq.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StagesComponent } from './home/admin/stages/stages.component';
import { SubmitBoqsComponent } from './home/admin/submit-boqs/submit-boqs.component';
import { SummaryComponent } from './home/admin/summary/summary.component';
import { UserManagementComponent } from './home/admin/user-management/user-management.component';
import { ViewContractBoqComponent } from './home/common/view-contract-boq/view-contract-boq.component';
import { DataService } from './services/common/data.service';
import { ItemListCartComponent } from './home/common/item-list-cart/item-list-cart.component';
import { CreateBoqSupplierComponent } from './home/supplier/create-boq-supplier/create-boq-supplier.component';

import { ApproveRejectBoqComponent } from './home/common/approve-reject-boq/approve-reject-boq.component';
import { BoqListComponent } from './home/common/boq-list/boq-list.component';
import { ViewCreateBoqComponent } from './home/supplier/view-create-boq/view-create-boq.component';

import { TinymceModule } from 'angular2-tinymce';
import { ReportSummaryComponent } from './home/admin/report-summary/report-summary.component';
import { AgineComponent } from './home/admin/report-summary/agine/agine.component';
import { PoSummaryComponent } from './home/admin/report-summary/po-summary/po-summary.component';
import { BudgetedSummaryComponent } from './home/admin/report-summary/budgeted-summary/budgeted-summary.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    SupplierComponent,
    ApprovePersonComponent,
    UploadFileComponent,
    CreateContractBoqComponent,
    StagesComponent,
    SubmitBoqsComponent,
    SummaryComponent,
    UserManagementComponent,
    ViewContractBoqComponent,
    ItemListCartComponent,
    CreateBoqSupplierComponent,
    BoqListComponent,
    ApproveRejectBoqComponent,
    ViewCreateBoqComponent,
    ReportSummaryComponent,
    AgineComponent,
    PoSummaryComponent,
    BudgetedSummaryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    FileUploadModule,
    NgMultiSelectDropDownModule.forRoot(),
    TinymceModule.withConfig({}),
    NgbModule
  ],
  providers: [
    DataService,
    AuthService,
    MainHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
