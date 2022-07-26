import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private gifService: GifsService) {}

  buscar = (query: string = ''): void => {
    this.gifService.buscarGif(query);
  };

  get busquedas() {
    return this.gifService.historial;
  }
}
