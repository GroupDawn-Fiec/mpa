import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { HttpClientModule } from  '@angular/common/http';
import { Game } from '../../interfaces/game';
import { DataProviderService } from '../../providers/data-provider.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ RouterLinkActive, RouterLink, HttpClientModule],
  providers: [ DataProviderService ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {

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
