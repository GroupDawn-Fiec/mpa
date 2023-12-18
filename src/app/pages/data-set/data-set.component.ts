import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Game } from '../../interfaces/game';
import { DataProviderService } from '../../providers/data-provider.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-data-set',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, HttpClientModule, FormsModule],
  providers: [DataProviderService],
  templateUrl: './data-set.component.html',
  styleUrl: './data-set.component.css',
})
export class DataSetComponent {

  selectedFilter: { [key: string]: string } = {};

  public data: Game[] = [];
  public filteredData: Game[] = [];

  constructor(private dataProvider: DataProviderService) {}
  ngOnInit() {
    this.dataProvider.getResponse().subscribe(
      (response) => {
        let dataArray = response as Game[];
        this.data = dataArray.slice(0, 20);
        this.filteredData = this.data;
      },
      (error) => {
        console.error('Error en la petición:', error);
      }
    );
  }

  addFilter() {
    this.filteredData = this.data.filter(item =>{

      return Object.keys(this.selectedFilter).every(key => {
        const filter = this.selectedFilter[key].toLowerCase();
        return item[key].toLowerCase().includes(filter);
      });

     // return item[index].toLowerCase().includes(this.selectedFilter[index].toLowerCase())

      
      
      //console.log(Object.keys(item).every(key=>console.log(item[key])))

    });
  }
}
