import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';


@Component({
  selector: 'app-index',
  standalone: true,
  imports: [ RouterLinkActive, RouterLink],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

}
