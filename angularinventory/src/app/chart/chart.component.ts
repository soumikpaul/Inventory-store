import { Component, OnInit,Input, ViewChild, ElementRef, OnChanges, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { ItemService } from '../item.service';
import * as  ChartConst from 'ng6-o2-chart';
import { Ng6O2ChartModule } from 'ng6-o2-chart';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit{

  //@ViewChild('Chart',{ static: true })
  //private chartContainer: ElementRef;
  //margin = { top: 20, right: 20, bottom: 30, left: 40 };
  items=[];  
  //data1=[];
  //barDataJson:any;
  //configData:any;
  //barTypeName: string;

  @ViewChild('chart',{static:true}) private chartContainer: ElementRef;
  @Input() private data1=[];
  private margin: any = { top: 20, bottom: 20, left: 20, right: 20};
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;

  constructor(private itemSer: ItemService) {
  }

  ngOnInit() {
    this.itemSer.getItems()
      .subscribe(data => {
        this.items = data;
      console.log(this.items);
      this.data1 = this.items["item"].map((obj)=>obj.Units);
      console.log(this.data1);
      //this.createChart();
      this.createChart();
      if (this.data1) {
        this.updateChart();
      }
  
      });
      
  }
  createChart() {
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    // chart plot area
    this.chart = svg.append('g')
      .attr('class', 'bars')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    // define X & Y domains
    const xDomain = this.data1.map(d => d[0]);
    const yDomain = [0, d3.max(this.data1, d => d[1])];

    // create scales
    this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
    this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

    // bar colors
    this.colors = d3.scaleLinear().domain([0, this.data1.length]).range(<any[]>['red', 'blue']);

    // x & y axis
    this.xAxis = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
      .call(d3.axisBottom(this.xScale));
    this.yAxis = svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.yScale));
  }

  updateChart() {
    // update scales & axis
    this.xScale.domain(this.data1.map(d => d[0]));
    this.yScale.domain([0, d3.max(this.data1, d => d[1])]);
    this.colors.domain([0, this.data1.length]);
    this.xAxis.transition().call(d3.axisBottom(this.xScale));
    this.yAxis.transition().call(d3.axisLeft(this.yScale));

    const update = this.chart.selectAll('.bar')
      .data(this.data1);

    // remove exiting bars
    update.exit().remove();

    // update existing bars
    this.chart.selectAll('.bar').transition()
      .attr('x', d => this.xScale(d[0]))
      .attr('y', d => this.yScale(d[1]))
      .attr('width', d => this.xScale.bandwidth())
      .attr('height', d => this.height - this.yScale(d[1]))
      .style('fill', (d, i) => this.colors(i));

    // add new bars
    update
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => this.xScale(d[0]))
      .attr('y', d => this.yScale(0))
      .attr('width', this.xScale.bandwidth())
      .attr('height', 0)
      .style('fill', (d, i) => this.colors(i))
      .transition()
      .delay((d, i) => i * 10)
      .attr('y', d => this.yScale(d[1]))
      .attr('height', d => this.height - this.yScale(d[1]));
  }

}