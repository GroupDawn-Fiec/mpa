import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { DataProviderService } from '../../providers/data-provider.service';
import { HttpClientModule } from  '@angular/common/http';
import { Game } from '../../interfaces/game';


@Component({
  selector: 'app-index',
  standalone: true,
  imports: [ RouterLinkActive, RouterLink, HttpClientModule],
  providers: [DataProviderService],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  public data : Game[] = [];
  constructor(private dataProvider: DataProviderService) { }
  ngOnInit() {
    this.dataProvider.getResponse().subscribe((response) => { 
      let dataArray = (response as Game[]); 
      this.data = dataArray.slice(0,20);
    },(error) => {
      console.error('Error en la petición:', error);
    })
  }
}
