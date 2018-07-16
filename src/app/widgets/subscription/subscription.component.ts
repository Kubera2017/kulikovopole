import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  @Input() email: any;
  @Input() social_network: any;

  constructor() { }

  ngOnInit() {
  }

  getSocialbyIdent(ident) {
    switch (ident) {
      case 'VK':
        return 'vk';
      case 'FB':
        return 'facebook';
      case 'TWITTER':
        return 'twitter';
      case 'TRIPADVISOR':
        return 'tripadvisor';
      case 'OK':
        return 'ok-ru';
      case 'YOUTUBE':
        return 'youtube';
      case 'GOOGLE+':
        return 'google-plus';
      case 'INSTAGRAM':
        return 'instagram';
    }
  }

  temp(e) {
    e.preventDefault();
    e.stopPropagation();
  }

}
