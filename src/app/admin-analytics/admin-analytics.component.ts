import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrl: './admin-analytics.component.css'
})
export class AdminAnalyticsComponent implements OnInit{
  data:any;
  chart:any;
  ngOnInit() {
    
    const data = {
      labels: [
        "darwinbox",
        "others",
        "darwinbox microsoft",
        "darwinbox gartner",
        "instagram",
        "jayanth paleti",
        "yii1.1 framework",
        "chaitanya peddi",
        "rohit chennamaneni",
        "hrms platforms"
      ],
      datasets: [{
        data: [
          9,
          8,
          7,
          3,
          3,
          3,
          3,
          2,
          2,
          2
        ],
        backgroundColor:        [
          'rgba(255, 99, 132, 0.5)',   // Light Red
          'rgba(54, 162, 235, 0.5)',   // Light Blue
          'rgba(255, 206, 86, 0.5)',   // Light Yellow
          'rgba(75, 192, 192, 0.5)',   // Light Cyan
          'rgba(153, 102, 255, 0.5)',  // Light Purple
          'rgba(255, 159, 64, 0.5)',   // Light Orange
          'rgba(75, 192, 100, 0.5)',   // Light Green
          'rgba(255, 153, 204, 0.5)',  // Light Pink
          'rgba(64, 224, 208, 0.5)',   // Light Turquoise
          'rgba(204, 153, 255, 0.5)'   // Light Lavender
        ],
        borderWidth: 1
      }]
    };
    this.chart = new Chart('MyChart', {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          }
        },
        elements: {
          arc: {
            borderWidth: 0
          }
        }
      }
    });
  }
  
  
}
