import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-scalable-app';

  constructor(
    private afs: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.afs.collection('test').snapshotChanges().subscribe(items => {
      console.log(items.map(i => i.payload.doc.data()));
    });
  }
}
