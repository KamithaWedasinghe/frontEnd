import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/guards/auth.guard';
import { AdminComponent } from './home/admin/admin.component';
import { SupplierComponent } from './home/supplier/supplier.component';
import { ApprovePersonComponent } from './home/approve-person/approve-person.component';
import { CreateContractBoqComponent } from './home/admin/create-contract-boq/create-contract-boq.component';
import { StagesComponent } from './home/admin/stages/stages.component';

import { SummaryComponent } from './home/admin/summary/summary.component';
import { UserManagementComponent } from './home/admin/user-management/user-management.component';
import { SubmitBoqsComponent } from './home/admin/submit-boqs/submit-boqs.component';
import { ViewContractBoqComponent } from './home/common/view-contract-boq/view-contract-boq.component';
import { ItemListCartComponent } from './home/common/item-list-cart/item-list-cart.component';

import { ApproveRejectBoqComponent } from './home/common/approve-reject-boq/approve-reject-boq.component';
import { BoqListComponent } from './home/common/boq-list/boq-list.component';
import { AdminGuard } from './services/guards/admin.guard';
import { SupplierGuard } from './services/guards/supplier.guard';
import { ApprovePersonGuard } from './services/guards/approve-person.guard';
import { CreateBoqSupplierComponent } from './home/supplier/create-boq-supplier/create-boq-supplier.component';
import { PoSummaryComponent } from './home/admin/report-summary/po-summary/po-summary.component';
import { BudgetedSummaryComponent } from './home/admin/report-summary/budgeted-summary/budgeted-summary.component';
import { AgineComponent } from './home/admin/report-summary/agine/agine.component';
import { ReportSummaryComponent } from './home/admin/report-summary/report-summary.component';
import { ApiResolverGuard } from './services/guards/api-resolver.guard';


const routes: Routes = [
  
  {
    component: LoginComponent,
    path: 'login'
  },
  {
    component: RegisterComponent,
    path: 'register'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'admin',
        component: AdminComponent,
        canActivate : [AdminGuard],
        children: [
          {
            path: 'create',
            component: CreateContractBoqComponent
          }, {
            path: 'stages',
            component: StagesComponent
          },{
            path: 'submit-boq',
            component: SubmitBoqsComponent
          },{
            path: 'summary/:id',
            component: SummaryComponent,
            resolve: {
              data: ApiResolverGuard
            }
          }, {
            path: 'user-manage',
            component: UserManagementComponent
          },{
            path : 'boq-list',
            component : BoqListComponent
          },
          {
            path: 'approve-reject-boqs',
            component: ApproveRejectBoqComponent
          },
          {
            path : 'report-summary',
            component: ReportSummaryComponent,
            children : [
              {
                path: 'agine',
                component: AgineComponent
              },
              {
                path: 'po-summary',
                component: PoSummaryComponent
              },
              {
                path: 'budgeted-summary',
                component: BudgetedSummaryComponent
              }
            ]
          }

        ]
      },
      {
        path: 'supplier',
        component: SupplierComponent,
        canActivate : [SupplierGuard],
        children : [
          {
            path: 'approve-reject-boqs',
            component: ApproveRejectBoqComponent
          },
          {
            path: 'create-boq',
            component: CreateBoqSupplierComponent
          },
          {
            path : 'boq-list',
            component : BoqListComponent
          },
          {
            path: 'summary/:id',
            component: SummaryComponent,
            resolve: {
              data: ApiResolverGuard
            }
          }
        ]
        
      },
      {
        path: 'approve-person',
        component: ApprovePersonComponent,
        canActivate : [ApprovePersonGuard],
        children : [
          {
            path: 'approve-reject-boqs',
            component: ApproveRejectBoqComponent
          },{
            path : 'boq-list',
            component : BoqListComponent
          },
          {
            path: 'summary/:id',
            component: SummaryComponent,
            resolve: {
              data: ApiResolverGuard
            }
          }
          
        ]
      }
     
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
