import { Component } from '@angular/core';
import { HttpClientModule } from  '@angular/common/http';
import { Game } from '../../interfaces/game';
import { DataProviderService } from '../../providers/data-provider.service'

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [HttpClientModule],
  providers:[DataProviderService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
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

