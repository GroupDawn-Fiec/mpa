import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Game } from '../../interfaces/game';
import { DataProviderService } from '../../providers/data-provider.service';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ChartItem, LineElement, LineController, PointElement, Point } from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, LineElement, LineController, PointElement, Title, Tooltip, Legend);


@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [HttpClientModule, RouterLinkActive, RouterLink],
  providers: [DataProviderService],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {
  public data: Game[] = [];
  constructor(private dataProvider: DataProviderService) { }

  ngOnInit() {
    this.dataProvider.getResponse().subscribe((response) => {
      let dataArray = (response as Game[]);

      /* 
      this.data = dataArray.slice(0, 100);
      */

      this.createChart1(dataArray);

      this.createChart2(dataArray);

     

    }, (error) => {
      console.error('Error en la petición:', error);
    })
  }

  createChart1(data: Game[]) {

    data.sort((a, b) => {
      // Convertir los precios a números y restarlos
      return parseFloat(b.price_final) - parseFloat(a.price_final);
    });

    let dataP = data.slice(0, 50);

    // Obtener el contexto del elemento canvas por su id
    let canvas = document.getElementById("myChart1") as HTMLCanvasElement;
    let ctxtmp = canvas.getContext('2d');
    let ctx = ctxtmp as ChartItem;
    // Crear un arreglo con los títulos de los juegos
    let titles = dataP.map(game => game.title);
    // Crear un arreglo con los precios finales de los juegos
    let prices = dataP.map(game => game.price_final);
    // Crear un objeto con los datos del gráfico
    let chartData = {
      // Etiquetas del eje x, los títulos de los juegos
      labels: titles,
      // Conjunto de datos del eje y, los precios de los juegos
      datasets: [{
        data: prices,
        label: 'Precio final',
        backgroundColor: 'rgba(54, 162, 235, 0.2)'
      }],
      // Opciones del gráfico
      options: {
        title: {
          display: true,
          text: 'Precios de los juegos',
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    };
    // Crear una instancia de Chart
    let chart = new Chart(ctx, {
      // Tipo de gráfico, puede ser 'bar', 'line', 'pie', etc.
      type: 'bar',
      // Datos del gráfico
      data: chartData
    });

  };

  createChart2(data: Game[]) {

    data.sort((a, b) => {
      // Convertir los precios a números y restarlos
      return parseFloat(b.user_reviews) - parseFloat(a.user_reviews);
    });

    let dataP = data.slice(0, 50);

    // Obtener el contexto del elemento canvas por su id
    let canvas = document.getElementById("myChart2") as HTMLCanvasElement;
    let ctxtmp = canvas.getContext('2d');
    let ctx = ctxtmp as ChartItem;
    // Crear un arreglo con los títulos de los juegos
    let titles = dataP.map(game => game.title);
    // Crear un arreglo con los precios finales de los juegos
    let reviews = dataP.map(game => game.user_reviews);
    // Crear un objeto con los datos del gráfico
    let chartData = {
      // Etiquetas del eje x, los títulos de los juegos
      labels: titles,
      // Conjunto de datos del eje y, los precios de los juegos
      datasets: [{
        data: reviews,
        label: '#Reviews',
        backgroundColor: 'rgba(54, 162, 235, 0.2)'
      }],
      // Opciones del gráfico
      options: {
        title: {
          display: true,
          text: 'Reviews (#)',
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    };
    // Crear una instancia de Chart
    let chart = new Chart(ctx, {
      // Tipo de gráfico, puede ser 'bar', 'line', 'pie', etc.
      type: 'line',
      // Datos del gráfico
      data: chartData
    });

  }

}
