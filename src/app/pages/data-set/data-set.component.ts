import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Game } from '../../interfaces/game';
import { DataProviderService } from '../../providers/data-provider.service';
import { FormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-data-set',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, HttpClientModule, FormsModule,NgxPaginationModule],
  providers: [DataProviderService],
  templateUrl: './data-set.component.html',
  styleUrl: './data-set.component.css',
})

export class DataSetComponent {
  selectedFilter: { [key: string]: string } = {};

  public data: Game[] = [];
  public filteredData: Game[] = [];
  public currentPage = 1;
  public itemsPerPage = 20; 

  constructor(private dataProvider: DataProviderService) {}

  ngOnInit() {
    this.dataProvider.getResponse().subscribe(
      (response) => {
        let dataArray = response as Game[];
        this.data = dataArray;
        this.filteredData = this.data;
      },
      (error) => {
        console.error('Error en la petición:', error);
      }
    );
  }

  addFilter() {
    this.currentPage = 1; 
    this.filteredData = this.data.filter((item) => {
      return Object.keys(this.selectedFilter).every((key) => {
        const filter = this.selectedFilter[key].toLowerCase();
        return item[key].toLowerCase().includes(filter);
      });
    });
  }
}