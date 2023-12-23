import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Game } from '../../interfaces/game';
import { DataProviderService } from '../../providers/data-provider.service';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ChartItem, LineElement, LineController, PointElement, Point, PieController, ArcElement, BubbleController, RadialLinearScale, PolarAreaController } from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, LineElement, LineController, PointElement, PieController, ArcElement, BubbleController, PolarAreaController, RadialLinearScale, Title, Tooltip, Legend);


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

  numJuegos: number | undefined;
  juegosLinux: number | undefined;
  juegosMac: number | undefined;

  ngOnInit() {
    this.dataProvider.getResponse().subscribe((response) => {
      let dataArray = (response as Game[]);

      this.numJuegos = dataArray.length;

      const filteredData1 = dataArray.filter(game => game.linux === 'true');
      const filteredData2 = dataArray.filter(game => game.mac === 'true');

      this.juegosLinux = filteredData1.length;
      this.juegosMac = filteredData2.length;


      /* 
      this.data = dataArray.slice(0, 100);
      */

      this.createChart1(dataArray);

      this.createChart2(dataArray);

      this.createChart3(dataArray);

      this.createChart4(dataArray);



    }, (error) => {
      console.error('Error en la petición:', error);
    })
  }

  createChart1(data: Game[]) {

    data.sort((a, b) => {
      // Convertir los precios a números y restarlos
      return parseFloat(b.price_final) - parseFloat(a.price_final);
    });

    let dataP = data.slice(0, 25);

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

    let dataP = data.slice(0, 10);

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

  createChart3(data: Game[]) {
    const filteredData = data.filter(game => game.steam_deck === 'true' && parseFloat(game.user_reviews) >= 9000);
    filteredData.sort((a, b) => {
      return parseFloat(b.positive_ratio) - parseFloat(a.positive_ratio);
    });

    let dataP = filteredData.slice(0, 5);

    // Obtener el contexto del elemento canvas por su id
    let canvas = document.getElementById("myChart3") as HTMLCanvasElement;
    let ctxtmp = canvas.getContext('2d');
    let ctx = ctxtmp as ChartItem;

    // Crear un arreglo con los títulos de los juegos
    let titles = dataP.map(game => game.title);
    // Crear un arreglo con los porcentajes de ratio positivo de los juegos
    let ratio = dataP.map(game => game.positive_ratio);

    // Crear un arreglo de colores diferentes para cada sector
    // Puedes agregar más colores según la cantidad de elementos en tu gráfico
    let colors = [
      'rgba(255, 99, 132, 0.8)',
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 206, 86, 0.8)',
      'rgba(75, 192, 192, 0.8)',
      'rgba(153, 102, 255, 0.8)',
    ];

    // Crear un objeto con los datos del gráfico
    let chartData = {
      labels: titles,
      datasets: [{
        data: ratio,
        label: '%Positive Ratio',
        backgroundColor: colors,
      }],
      options: {
        title: {
          display: true,
          text: 'Positive Ratio (%)',
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
      type: 'pie',
      data: chartData
    });
  }


  createChart4(data: Game[]) {
    data.sort((a, b) => {
      // Convertir los descuentos a números y restarlos
      return parseFloat(b.discount) - parseFloat(a.discount);
    });

    let dataP = data.slice(0, 20);

    // Obtener el contexto del elemento canvas por su id
    let canvas = document.getElementById("myChart4") as HTMLCanvasElement;
    let ctxtmp = canvas.getContext('2d');
    let ctx = ctxtmp as ChartItem;

    // Crear un arreglo con los títulos de los juegos
    let titles = dataP.map(game => game.title);
    // Crear un arreglo con los descuentos de los juegos
    let discounts = dataP.map(game => game.discount);

    // Crear un arreglo de colores diferentes para cada sector
    let colors = [
      'rgba(255, 99, 132, 0.8)',
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 206, 86, 0.8)',
      'rgba(75, 192, 192, 0.8)',
      'rgba(153, 102, 255, 0.8)',
      // Agrega más colores según sea necesario
    ];

    // Crear un objeto con los datos del gráfico
    let chartData = {
      labels: titles,
      datasets: [{
        data: discounts,
        label: '%discount',
        backgroundColor: colors,
      }],
      options: {
        title: {
          display: true,
          text: 'Discount (%)',
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
      type: 'polarArea',
      data: chartData
    });
  }
}
