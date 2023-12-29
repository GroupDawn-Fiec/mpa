import { Component, NgZone,ElementRef,AfterViewInit } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Game } from '../../interfaces/game';
import { Game_info } from '../../interfaces/game_info';
import { DataProviderService } from '../../providers/data-provider.service';
import { FormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';

import Isotope from 'isotope-layout';

@Component({
  selector: 'app-data-set',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
  ],
  providers: [DataProviderService],
  templateUrl: './data-set.component.html',
  styleUrl: './data-set.component.css',
})
export class DataSetComponent {
  selectedFilter: { [key: string]: string } = {
    app_id: '',
    title: '',
    date_release: '',
    rating: '',
    price_original: '',
    price_final: '',
  };

  isMac = false;
  isWin = false;
  isLinux = false;
  isSteamDeck = false;
  score: number = 0;

  public data: Game[] = [];
  public filteredData: Game[] = [];
  public trending: Game[] = [];
  public Game_metadata!: Map<number,Game_info>; 
  public currentPage = 1;
  public currentPageTrendig = 1;
  public itemsPerPage = 20;

  constructor(
    private dataProvider: DataProviderService,
    private ngZone: NgZone, private el: ElementRef
  ) {}

  private iso!: Isotope;

  ngOnInit() {
    this.dataProvider.getResponse().subscribe(
      (response) => {
        let dataArray = response as Game[];
        this.data = dataArray;
        this.filteredData = this.data;
       // this.getDataToShow()
      },
      (error) => {
        console.error('Request error', error);
      }
    );
    this.dataProvider.getMetadataResponse().subscribe(
      (response) => {
        let metaDataArray = response as Game_info[];
        this.Game_metadata =  new Map(metaDataArray.map(item => [item.app_id, item]));
        let array = this.data
        this.getDataToShow(array)
      },
      (error) => {
        console.error('Request error', error);
      }
    );
  }

  ngAfterViewInit() {
    const trendingBox = this.el.nativeElement.querySelector('.trending-box');
    const observer = new MutationObserver(() => {
    observer.disconnect();
    this.ngZone.run(() => {
      this.onElementsChange();
      observer.observe(trendingBox, config);

    });

    });

    const config = { childList: true, subtree: true };
    observer.observe(trendingBox, config);
    this.initIsotope(trendingBox);
  }

  onElementsChange() {
    console.log("a")
        this.ngZone.run(() => {
       
          this.iso.reloadItems();
          this.iso.arrange({ filter: '*' });
        });
    }
  

  getDataToShow(newData:Game[]){
    console.log("aaa")

    newData.forEach(game =>{
      if ((game.rating == "Very Positive" || game.rating == "Positive")  && parseInt(game.user_reviews)>=50000 ){
        this.trending.push(game)
      }
    })
  }


  initIsotope(grid: HTMLElement) {
    this.iso = new Isotope(grid, {
      itemSelector: '.trending-items',
      layoutMode: 'fitRows',
      percentPosition: true,
    });
  }

  filterIso(filterValue: string, event: any) {
    event.preventDefault();

    this.ngZone.run(() => {
      let gamesFilters = document.querySelectorAll(".trending-filter a")
      gamesFilters.forEach(element => {
        element.classList.remove("is_active")
      });
  
      event.target.classList.add("is_active")
      this.iso.arrange({ filter: `${filterValue}` });
    });
  }

  addFilter() {
    this.currentPage = 1;
    this.filteredData = this.data.filter((item) => {
      return Object.keys(this.selectedFilter).every((key) => {
        let filter = this.selectedFilter[key].toString().toLowerCase();
        let conditional =
          (this.isMac ? JSON.parse(item.mac) : true) &&
          (this.isWin ? JSON.parse(item.win) : true) &&
          (this.isLinux ? JSON.parse(item.linux) : true) &&
          (this.isSteamDeck ? JSON.parse(item.steam_deck) : true) &&
          Number(item.positive_ratio) >= this.score;

        return item[key].toLowerCase().includes(filter) && conditional;
      });
    });
  }
}
