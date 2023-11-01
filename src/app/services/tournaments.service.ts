import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TournamentsService {

  private apiFixtureOdds='https://v3.football.api-sports.io/odds?fixture=';
  private apiGetFixture='https://v3.football.api-sports.io/fixtures?id=';
  private apiKey='38fdbc96520dd2740eff02efcd4ada0b';
  private headers = new HttpHeaders({
    'x-rapidapi-host':'v3.football.api-sports.io',
    'x-rapidapi-key': this.apiKey
  })

  private options={headers: this.headers};
  private tournaments=['Premier League','Ligue 1','La liga','Serie A','Eredivisie','Bundesliga','MLS','Liga Profesional de Fulbo Argentino','Brasilerao','Primera Colombia','Primera B Argentina','CONMEBOL Libertadores','CONMEBOL Sudamericana','UEFA Champions League','UEFA Europa League','Copa Argentina','Copa America','Clasificatoria Mundial'];
  constructor(private http : HttpClient) { }
  
  get Tournaments(){
    return this.tournaments;
  }

  getFixtureOdds(id: number): Promise<any>{
    return this.http.get(this.apiFixtureOdds+id,this.options)
    .toPromise();
  }

  getTournamentNextFixtures(leagueId: number,fromDate: String, toDate: String){
    return this.http.get('https://v3.football.api-sports.io/fixtures?league='+leagueId+'&season=2023&from='+fromDate+'&to='+toDate,this.options)
    .toPromise();
  }

  getTournamentFixtureResults(id: number){
    return this.http.get(this.apiGetFixture+id,this.options)
    .toPromise();
  }

  getTeamNextFixtures(teamId: number,fromDate: String, toDate: String){
    return this.http.get('https://v3.football.api-sports.io/fixtures?team='+teamId+'&season=2023&from='+fromDate+'&to='+toDate,this.options)
    .toPromise();
  }

  getTeamData(teamId: number){
    return this.http.get('https://v3.football.api-sports.io/teams?id='+teamId)
    .toPromise();
  }
}
