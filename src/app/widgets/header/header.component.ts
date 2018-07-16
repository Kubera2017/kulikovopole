import { Component, OnInit } from '@angular/core';

import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public langService: LangService
  ) { }

  ngOnInit() {
  }

  onSwitchLang(e) {
    e.preventDefault();
    e.stopPropagation();
    this.langService.switchLang();
  }

  temp(e) {
    e.preventDefault();
    e.stopPropagation();
  }

}
