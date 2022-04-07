import { Contact } from './contact.model';

import { EventEmitter, Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  // Properties
  private contacts: Contact[] = [];
  maxContactId: number;

  // Constructor(s)
  constructor(private http : HttpClient) {
    this.maxContactId = this.getMaxId();
  }

  // Emitters
  contactSelectedEvent = new EventEmitter<Contact>();

  contactListChangedSubject = new Subject<Contact[]>();

  // Methods
  // Set max ID for unique IDs.
  getMaxId(): number{
    let maxId = 0;
    for (let contact of this.contacts) {
      let currentId: number = +contact.id;
      if (currentId > maxId){
        maxId = currentId;
      }
    }
    return maxId;
  }

  // Init contact list
  getContacts() {
    let contactList
    return this.http.get('http://localhost:3000/contacts').subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        contactList = this.contacts.sort((a,b) => this.compareinator(a,b)).slice();
        this.contactListChangedSubject.next(contactList);
      }, error => {
        console.log(error);
      }
    )
    // A bit hacky, but it solves for the bug...
    return contactList;
  }

  storeContacts() {
    let bufferContactList = JSON.stringify(this.contacts);
    let headers = new HttpHeaders({"Content-Type" : "application/json"});
    this.http.put("http://localhost:3000/contacts", bufferContactList, {headers}).subscribe(
      (res) => {
        let tempArr = this.contacts.slice();
        this.contactListChangedSubject.next(tempArr);
      }, error => {
        console.log(error);
      }
    )
  }

  // Find out how to set "Contact" to generic of Object with name property. (Interface?)
  compareinator(a: Contact, b: Contact):number{
    if(a.firstName < b.firstName){
      return -1
    }
    if(a.firstName > b.firstName){
      return 1
    }
    return 0
  }

  // CRUD methods,
  // Create
  createContact(newContact: Contact){
    if(newContact == null){return;}
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts();
  }

  // Read
  getContact(id: string): Contact{
    for (const contact of this.contacts) {
      if (id === contact.id) {
        return contact;
      }
    }
    return null;
  }

  //Update
  updateContact(newContact: Contact, originalContact: Contact){
    if (newContact == null || originalContact == null){return;}
    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0){
      console.log('error in handling indexOf(originalContact), index is less than 0. Please check contact service, line 70. Index: ' + pos);
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }

  // Delete
  deleteContact(contact: Contact){
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.storeContacts();
  }
}
