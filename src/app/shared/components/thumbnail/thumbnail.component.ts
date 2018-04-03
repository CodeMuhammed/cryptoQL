import { Component, Input } from '@angular/core';

@Component({
  selector: 'thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent {
  public defaultImage: string = '/assets/images/user.png';

  @Input()
  public image: string;
}
