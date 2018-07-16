import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, ROUTES } from '@angular/router';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';

import { YaCoreModule } from './yamaps-module/index';

import { UseLoaderDirective } from './directives/svgLoader';

import { AppComponent } from './app.component';
import { SettingsService } from './services/settings.service';
import { ApiService } from './services/api.service';
import { MainPageComponent } from './containers/main-page/main-page.component';
import { TulaCardComponent } from './containers/tula-card/tula-card.component';
import { AnonsComponent } from './widgets/anons/anons.component';
import { WysiwygComponent } from './widgets/wysiwyg/wysiwyg.component';
import { TextWithLinksComponent } from './widgets/text-with-links/text-with-links.component';
import { InverseBannerSliderComponent } from './widgets/inverse-banner-slider/inverse-banner-slider.component';
import { BlockTextComponent } from './widgets/block-text/block-text.component';
import { MuseumComponent } from './containers/museum/museum.component';
import { SubscriptionComponent } from './widgets/subscription/subscription.component';
import { LangService } from './services/lang.service';
import { HeaderComponent } from './widgets/header/header.component';
import { MapDescriptionComponent } from './widgets/map-description/map-description.component';
import { MainMuseumsComponent } from './widgets/main-museums/main-museums.component';
import { MainMapComponent } from './widgets/main-map/main-map.component';
import { FooterComponent } from './widgets/footer/footer.component';
import { GalleryExhibitsComponent } from './widgets/gallery-exhibits/gallery-exhibits.component';
import { MuseumService } from './services/museum.service';
import { MuseumListComponent } from './containers/museum-list/museum-list.component';
import { EventsListComponent } from './containers/events-list/events-list.component';
import { TextPageComponent } from './containers/text-page/text-page.component';
import { PromoPageComponent } from './containers/promo-page/promo-page.component';
import { MyVisitPageComponent } from './containers/my-visit-page/my-visit-page.component';
import { EventsCardComponent } from './containers/events-card/events-card.component';

declare var lightbox: any;

lightbox.option({
  albumLabel: 'Изображение %1 из %2',
  alwaysShowNavOnTouchDevice: true
});

export function initSettings(settings: SettingsService) {
  return () => settings.loadSettings();
}

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TulaCardComponent,
    AnonsComponent,
    WysiwygComponent,
    TextWithLinksComponent,
    InverseBannerSliderComponent,
    BlockTextComponent,
    MuseumComponent,
    SubscriptionComponent,
    HeaderComponent,
    MapDescriptionComponent,
    MainMuseumsComponent,
    MainMapComponent,
    FooterComponent,
    UseLoaderDirective,
    GalleryExhibitsComponent,
    MuseumListComponent,
    EventsListComponent,
    TextPageComponent,
    PromoPageComponent,
    MyVisitPageComponent,
    EventsCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    YaCoreModule.forRoot(),
    MalihuScrollbarModule.forRoot()
  ],
  entryComponents: [
    MainPageComponent,
    TulaCardComponent,
    MuseumComponent,
    WysiwygComponent,
    MuseumListComponent,
    EventsListComponent,
    TextPageComponent,
    PromoPageComponent,
    MyVisitPageComponent,
    EventsCardComponent
  ],
  providers: [
    SettingsService,
    ApiService,
    {
      'provide': APP_INITIALIZER,
      'useFactory': initSettings,
      'deps': [SettingsService],
      'multi': true
    },
    MuseumService,
    LangService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
