import { Component, NgZone,ElementRef,AfterViewInit } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Game } from '../../interfaces/game';
import { DataProviderService } from '../../providers/data-provider.service';
import { FormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';

import Isotope from 'isotope-layout';
//import 'isotope-layout/dist/isotope.css';

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
        this.getDataToShow()
      },
      (error) => {
        console.error('Request error', error);
      }
    );
  }
  private changeTimeout: any;
  onElementsChange() {
    /*this.iso.reloadItems();
    this.iso.arrange({ filter: `*` });
    console.log('aaaa');*/
    if (!this.changeTimeout) {
      this.changeTimeout = setTimeout(() => {
        this.ngZone.run(() => {
          this.iso.reloadItems();
          this.iso.arrange({ filter: `*` });
          console.log('aaaa');
        });
  
        this.changeTimeout = null;
      }, 1000); // Establecer un tiempo de espera en milisegundos
    }
  }

  getDataToShow(){
    this.data.forEach(game =>{
      if (game.rating == "Very Positive" && game.positive_ratio=="100" ){
        this.trending.push(game)
      }
    })
  }

  ngAfterViewInit() {
    // Configurar MutationObserver para detectar cambios en el contenedor
    const trendingBox = this.el.nativeElement.querySelector('.trending-box');
    const observer = new MutationObserver(() => {
       // Desconectar el observer temporalmente
    observer.disconnect();

    this.ngZone.run(() => {
      this.onElementsChange();
    });

    console.log("b")

    });

    const config = { childList: true, subtree: true };

    observer.observe(trendingBox, config);

    // Inicializar Isotope
    this.initIsotope(trendingBox);
  }

  initIsotope(grid: HTMLElement) {
    this.iso = new Isotope(grid, {
      itemSelector: '.trending-items',
      layoutMode: 'fitRows',
      percentPosition: true,
      filter: '.first-page'
    });
  }


  /*
  ngAfterViewInit() {
    window.onload = () => {
      const grid = document.querySelector('.trending-box') as HTMLElement;
      this.ngZone.run(() => {
        this.iso = new Isotope(grid, {
          itemSelector: '.trending-items',
          layoutMode: 'fitRows',
          percentPosition: true,
        });
      });

      //    let gamesFilters = document.querySelectorAll(".trending-filter a")
    };
  }
*/
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
    console.log(this.score);
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
