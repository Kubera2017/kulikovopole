import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-block-text',
  templateUrl: './block-text.component.html',
  styleUrls: ['./block-text.component.css']
})
export class BlockTextComponent implements OnInit {

  @Input()
  content: any;

  constructor() { }

  ngOnInit() {
  }

}
