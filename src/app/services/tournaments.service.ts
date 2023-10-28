import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TournamentsService {

  private tournaments=['Premier League','Ligue 1','La liga','Serie A','Eredivisie','Bundesliga','MLS','Liga Profesional de Fulbo Argentino','Brasilerao','Primera Colombia','Primera B Argentina','CONMEBOL Libertadores','CONMEBOL Sudamericana','UEFA Champions League','UEFA Europa League','Copa Argentina','Copa America','Clasificatoria Mundial'];
  constructor() { }
  
  get Tournaments(){
    return this.tournaments;
  }
}
