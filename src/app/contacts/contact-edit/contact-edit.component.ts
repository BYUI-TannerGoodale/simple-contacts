import { Component, OnInit } from '@angular/core';
import {ContactService} from "../contact.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Contact} from "../contact.model";

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: Contact;
  originalContact: Contact;
  editMode: boolean = false;
  id: string;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) { }

  isInvalidContact(newContact: Contact){
    if(!newContact){
      return;
    }
    if (this.contact && newContact.id === this.contact.id){
      return true;
    }
    return false;
  }


  ngOnInit(): void {

    let params = this.route.params;
    params.subscribe((params: Params) => {
      let id = params['id'];
      if(id == null){
        this.editMode = false;
        return;
      }
      this.originalContact = this.contactService.getContact(id);
      if(this.originalContact == null){
        return;
      }
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));
    })
  }

  onCancel() {
    this.router.navigate(['/contacts'], {relativeTo: this.route});
  }

  onSubmit(f: NgForm) {
    let signupForm = f;
    this.contact = new Contact(null, null, null, null, null)
    this.contact.firstName = signupForm.value.firstName;
    this.contact.lastName = signupForm.value.lastName;
    this.contact.email = signupForm.value.email;
    this.contact.phoneNumber = signupForm.value.phoneNumber;
    if(this.editMode){
      this.contactService.updateContact(this.contact, this.originalContact);
    } else {
      this.contactService.createContact(this.contact);
    }
    this.router.navigate(['/contacts'], {relativeTo: this.route});
  }
}
