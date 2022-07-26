import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGIFResponse, Gif } from '../interfaces/resultados.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'hhqRsgqZk8TvZ8ymXRwcVvc54BjGWMBO';
  private limit: string = '10';
  private baseUrl: string = 'https://api.giphy.com/v1/gifs';
  public resultados: Gif[] = [];

  private _historial: string[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('lastSearch')!) || [];
  }

  buscarGif = (query: string = ''): void => {
    query = query.trim().toLowerCase();
    if (this._historial.includes(query)) {
      this._historial = this._historial.filter((el) => el !== query);
    } else if (query.trim().length === 0) {
      return;
    }
    this._historial.unshift(query);
    localStorage.setItem('historial', JSON.stringify(this._historial));
    this._historial = this._historial.splice(0, 10);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', this.limit)
      .set('q', query);

    this.http
      .get<SearchGIFResponse>(`${this.baseUrl}/search`, { params })
      .subscribe((resp) => {
        this.resultados = resp.data;
        localStorage.setItem('lastSearch', JSON.stringify(resp.data));
      });
  };
}
