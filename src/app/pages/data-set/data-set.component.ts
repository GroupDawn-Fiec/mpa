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
  selectedFilter: { [key: string]: string } = {'app_id':'','title':'','date_release':'','rating':'','price_original':'','price_final':''};

  isMac = false;
  isWin = false;
  isLinux = false;
  isSteamDeck = false;

  score:number = 0;


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
        console.error('Request error', error);
      }
    );
  }

  addFilter() {
    console.log(this.score)
    this.currentPage = 1; 
    this.filteredData = this.data.filter((item) => {
      return Object.keys(this.selectedFilter).every((key) => {
        let filter = this.selectedFilter[key].toString().toLowerCase();
       let conditional = (
        (this.isMac ? JSON.parse(item.mac) : true) &&
        (this.isWin ? JSON.parse(item.win) : true) &&
        (this.isLinux ? JSON.parse(item.linux) : true) &&
        (this.isSteamDeck ? JSON.parse(item.steam_deck) : true)&&
        (Number(item.positive_ratio) >=this.score)
      );
       
       return item[key].toLowerCase().includes(filter) &&conditional ;
      });
    });
  }

}