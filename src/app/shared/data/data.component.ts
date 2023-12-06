import { Component } from '@angular/core';

import { HttpClientModule } from  '@angular/common/http';

//Importación de la interfaz
import { Game } from '../../interfaces/game';

//Importación del servicio
import { DataProviderService } from '../../providers/data-provider.service';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [HttpClientModule],
  providers: [DataProviderService],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})
export class DataComponent {
  //Atributo con el tipo de dato de la interfaz
  public data : Game[] = [];


  //Inyección de dependencia del servicio
  constructor(private dataProvider: DataProviderService) { }

  ngOnInit() {
    this.dataProvider.getResponse().subscribe((response) => { 
        let dataArray = (response as Game[]); 
        this.data = dataArray;
      })

    this.agregarElementoManualmente();
    }

    agregarElementoManualmente() {
    const nuevoJuego: Game = {
      app_id: "456",
      date_release: "2023-02-01",
      discount: "15%",
      linux: "false",
      mac: "true",
      positive_ratio: "80%",
      price_final: "$24.99",
      price_original: "$39.99",
      rating: "4.0",
      steam_deck: "not-compatible",
      title: "Nuevo Juego Manual",
      user_reviews: "50",
      win: "true",
    };

    // Agrega el nuevo juego al arreglo data
    this.data.push(nuevoJuego);

    
}
}