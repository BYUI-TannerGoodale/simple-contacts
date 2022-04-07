import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContactEditComponent} from "./contacts/contact-edit/contact-edit.component";
import {ContactDetailedComponent} from "./contacts/contact-detailed/contact-detailed.component";
import {ContactsComponent} from "./contacts/contacts.component";

const routes: Routes = [
  {path: '', redirectTo: '/contacts', pathMatch: 'full'},
  {path: 'contacts', component: ContactsComponent, children: [
      {path: 'new', component: ContactEditComponent},
      {path: ':id', component: ContactDetailedComponent},
      {path: ':id/edit', component: ContactEditComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
