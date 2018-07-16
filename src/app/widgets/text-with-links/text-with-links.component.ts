import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-with-links',
  templateUrl: './text-with-links.component.html',
  styleUrls: ['./text-with-links.component.css']
})
export class TextWithLinksComponent implements OnInit {

  @Input()
  content: any;

  constructor() { }

  ngOnInit() {
  }

}
