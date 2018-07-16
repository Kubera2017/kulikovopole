import {
  Component,
  OnInit,
  Input
 } from '@angular/core';

@Component({
  selector: 'app-anons',
  templateUrl: './anons.component.html',
  styleUrls: ['./anons.component.css']
})
export class AnonsComponent implements OnInit {

  @Input()
  content: any;

  constructor(
  ) { }

  ngOnInit() {
  }

}
