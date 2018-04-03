
import { Component } from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public items = [
      { name: 'Airdrops', path: 'airdrops' , icon: 'group_work' }
    ];
    constructor() { }
}
