import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TournamentsService {

  private apiFixtureOdds='https://v3.football.api-sports.io/odds?fixture=';
  private apiGetFixture='https://v3.football.api-sports.io/fixtures?id=';
  private apiKey='38fdbc96520dd2740eff02efcd4ada0b';//ya usamos todas el dia 2/11
  private apiKey2='a3ddfc2f662520e998b7fcf1b17e59d3';
  private headers = new HttpHeaders({
    'x-rapidapi-host':'v3.football.api-sports.io',
    'x-rapidapi-key': this.apiKey
  })

  private options={headers: this.headers};
  private tournaments=[{'name':'Premier League','id':39},
                       {'name':'Ligue 1','id':61},
                       {'name':'La liga','id':140} ,
                       {'name':'Serie A','id':135},
                       {'name':'Eredivisie','id':88},
                       {'name':'Bundesliga','id':78},
                       {'name':'MLS','id':253},
                       {'name':'Liga Profesional de Fulbo Argentino','id':128},
                       {'name':'Brasilerao','id':71},
                       {'name':'Primera Colombia','id':239},
                       {'name':'Primera B Argentina','id':131},
                       {'name':'CONMEBOL Libertadores','id':13},
                       {'name':'CONMEBOL Sudamericana','id':11},
                       {'name':'UEFA Champions League','id':2},
                       {'name':'UEFA Europa League','id':3},
                       {'name':'Copa Argentina','id':130},
                       {'name':'Copa America','id':9},
                       {'name':'Clasificatoria Mundial','id':37}
                      ];
  private actualTournamentTeams: any[]=[];
  private actualLeague=0;
  private actualTeam=0;
  private actualFixture=0;
  private fixture:any;
  constructor(private http : HttpClient) { }
  
  get Tournaments(){
    return this.tournaments;
  }

  getActualDate(){
    let date= new Date();
    let fromDate='';
    let day='';
    if(date.getDate()<10){
      day='0'+date.getDate();
    }else{
      day=date.getDate().toString();
    }
    fromDate=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+day;
    return fromDate;
  }

  getToDate(){
    let toDate='';
    let date=new Date();
    date.setDate(date.getDate()+13);
    let day='';
    if(date.getDate()<10){
      day='0'+date.getDate().toString();
    }

    toDate=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
    return toDate;
  }

  getFixtureOdds(id: number): Promise<any>{
    return this.http.get(this.apiFixtureOdds+id+'&bookmaker=11',this.options)
    .toPromise();
  }

  getTournamentNextFixtures(leagueId: number){
    return this.http.get('https://v3.football.api-sports.io/fixtures?league='+leagueId+'&season=2023&from='+this.getActualDate()+'&to='+this.getToDate(),this.options)
    .toPromise();
  }

  getTournamentFixtureResults(id: number){
    return this.http.get(this.apiGetFixture+id,this.options)
    .toPromise();
  }

  getTeamNextFixtures(teamId: number){
    return this.http.get('https://v3.football.api-sports.io/fixtures?team='+teamId+'&season=2023&from='+this.getActualDate()+'&to='+this.getToDate(),this.options)
    .toPromise();
  }

  getTeamData(teamId: number){
    return this.http.get('https://v3.football.api-sports.io/teams?id='+teamId,this.options)
    .toPromise();
  }

  getTournamentTeams(leagueId: number){
    return this.http.get('https://v3.football.api-sports.io/teams?league='+leagueId+'&season=2023',this.options)
    .toPromise();
  }

  setTeams(teams: any){
    this.actualTournamentTeams=teams.response;
  }

  get teams(){
    return this.actualTournamentTeams;
  }

  setCurrentLeauge(leagueId: number){
    this.actualLeague=leagueId;
  }

  get CurrentLeague(){
    return this.actualLeague;
  }

  setActualTeam(TeamId : number){
    this.actualTeam=TeamId;
  }

  get CurrentTeam(){
    return this.actualTeam;
  }

  get currentFixture(){
    return this.actualFixture;
  }

  setActualFixture(fixtureId: number){
    this.actualFixture=fixtureId;
  }

  setFixture(fixture: any){
    this.fixture=fixture;
  }
  
  getFixture(fixture: any){
    return this.fixture;
  }
}
