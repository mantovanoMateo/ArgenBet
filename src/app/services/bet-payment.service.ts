import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bet } from '../models/Bet';
import { TournamentsService } from './tournaments.service';

@Injectable({
  providedIn: 'root'
})
export class BetPaymentService {

  constructor(private http: HttpClient, private tournamentService: TournamentsService) { }

  betPaymentMaster(bet: Bet) {
    let response: any;
    let betWin: boolean=false;
    let fixtureData: any;
    let conclusion: string='';
    this.tournamentService.getTournamentFixtureResults(bet.fixtureId)
      .then((Response) => {
        response = Response;
        fixtureData = response.response;
      });
    if (fixtureData.fixture.status.short == 'FT') {
      switch (bet.typeId) {
        case 1:
          betWin = this.matchWinner1(bet, response);
          break;
        case 3:
          betWin = this.secondHalfWinner3(bet, response);
          break;
        case 4:
          break;
        case 5:
          betWin = this.goalsMoreLess5(bet, response);
          break;
        case 6:
          betWin = this.goalsMoreLessFirstHalf6(bet, response);
          break;
        case 26:
          betWin = this.goalsMoreLessSecondHalf26(bet, response);
          break;
        case 8:
          betWin = this.bothTeamsMakeGoal8(bet, response);
          break;
        case 10:
          betWin = this.exactScore10(bet, response);
          break;
        case 11:
          betWin = this.moreScoredHalf11(bet, response);
          break;
        case 31:
          betWin = this.exactScoreFirtsHalf31(bet, response);
          break;
        case 62:
          betWin = this.exactScoreSecondsHalf62(bet, response);
          break;
        case 12:
          betWin = this.doubleChance12(bet, response);
          break;
        case 13:
          betWin = this.firstHalfWinner13(bet, response);
          break;
        case 16:
          betWin = this.totalHome16(bet, response);
          break;
        case 17:
          betWin = this.totalAway17(bet, response);
          break;
        case 20:
          betWin = this.doubleChanceFirstHalf20(bet, response);
          break;
        case 33:
          betWin = this.doubleChanceSecondHalff33(bet, response);
          break;
        case 34:
          betWin = this.bothTeamsScoreFirstHalf34(bet, response);
          break;
        case 35:
          betWin = this.bothTeamsScoreSecondHalf35(bet, response);
          break;
        case 21:
          betWin = this.goalsOddOrEven21(bet, response);
          break;
        case 22:
          betWin = this.goalsOddOrEvenFirstHalf22(bet, response);
          break;
        case 23:
          betWin = this.goalsOddOrEvenHome23(bet, response);
          break;
        case 60:
          betWin = this.goalsOddOrEvenHome60(bet, response);
          break;
      }
      if(betWin==true){
        conclusion='WIN';
      }else if(betWin==false){
        conclusion='LOST'
      }
    }else{
      conclusion='NF';
    }

    return conclusion;

  }

  matchWinner1(bet: Bet, response: any) {
    let winner = '';
    if (response.teams.home.winner == true) {
      winner = 'Home';
    } else if (response.teams.away.winner == true) {
      winner = 'Away';
    } else {
      winner = 'Draw';
    }

    return bet.selection == winner;
  }

  secondHalfWinner3(bet: Bet, response: any) {
    let winner = '';
    if (response.score.fulltime.home < response.score.fulltime.away) {
      winner = 'Away';
    } else if (response.score.fulltime.home > response.score.fulltime.away) {
      winner = 'Home';
    } else {
      winner = 'Draw';
    }
    return bet.selection == winner;
  }

  asianHandicap4() {

  }

  goalsMoreLess5(bet: Bet, response: any) {
    let goalsBeted = 0;
    let betWin = false;
    let totalGoals = response.goals.home + response.goals.away;
    if (Number.parseFloat(bet.selection) < 0) {
      goalsBeted = Number.parseFloat(bet.selection) * (-1);
      if (goalsBeted > totalGoals) {
        betWin = true;
      }
    } else {
      goalsBeted = Number.parseFloat(bet.selection);
      if (goalsBeted < totalGoals) {
        betWin = true;
      }
    }
    return betWin;
  }

  goalsMoreLessFirstHalf6(bet: Bet, response: any) {
    let choice = 0;
    let betWin = false;
    let goals = response.score.halftime.home + response.score.halftime.away;
    if (bet.selection.includes('Over')) {
      //here checks if the user bets for over
      choice = Number.parseFloat(bet.selection.substring(5));
      if (choice < goals) {
        betWin = true;
      }
    } else {
      //here checks if the user bets for under
      choice = Number.parseFloat(bet.selection.substring(6));
      if (choice > goals) {
        betWin = true;
      }
    }
    return betWin;
  }

  goalsMoreLessSecondHalf26(bet: Bet, response: any) {
    let choice = 0;
    let betWin = false;
    let goals = response.score.fulltime.home + response.score.fulltime.away;
    if (bet.selection.includes('Over')) {
      //here checks if the user bets for over
      choice = Number.parseFloat(bet.selection.substring(5));
      if (choice < goals) {
        betWin = true;
      }
    } else {
      //here checks if the user bets for under
      choice = Number.parseFloat(bet.selection.substring(6));
      if (choice > goals) {
        betWin = true;
      }
    }
    return betWin;
  }

  bothTeamsMakeGoal8(bet: Bet, response: any) {
    let bothGoal = 'No';
    if (response.goals.home > 0 && response.goals.away > 0) {
      bothGoal = 'Yes';
    }
    return bet.selection == bothGoal;
  }

  exactScore10(bet: Bet, response: any) {
    let score = response.goals.home + ':' + response.goals.away;
    return bet.selection == score;
  }

  moreScoredHalf11(bet: Bet, response: any) {
    let score1stHalf = response.score.halftime.home + response.score.halftime.away;
    let score2ndHalf = response.score.fulltime.home + response.score.fulltime.away;
    let moreScored = '';
    if (score1stHalf > score2ndHalf) {
      moreScored = '1st Half';
    } else if (score1stHalf < score2ndHalf) {
      moreScored = '2nd Half';
    } else {
      moreScored = 'Draw';
    }

    return bet.selection == moreScored;
  }

  exactScoreFirtsHalf31(bet: Bet, response: any) {
    let score = response.score.halftime.home + ':' + response.score.halftime.away;
    return bet.selection == score;
  }

  exactScoreSecondsHalf62(bet: Bet, response: any) {
    let score = response.score.fulltime.home + ':' + response.score.fulltime.away;
    return bet.selection == score;
  }

  doubleChance12(bet: Bet, response: any) {
    let winner = '';
    if (response.teams.home.winner == true) {
      winner = 'Home';
    } else if (response.teams.home.away == true) {
      winner = 'Away';
    } else {
      winner = 'Draw';
    }

    return bet.selection.includes(winner);
  }

  firstHalfWinner13(bet: Bet, response: any) {
    let winner = '';
    if (response.score.halftime.home < response.score.halftime.away) {
      winner = 'Away';
    } else if (response.score.halftime.home > response.score.halftime.away) {
      winner = 'Home';
    } else {
      winner = 'Draw';
    }
    return bet.selection == winner;
  }

  totalHome16(bet: Bet, response: any) {
    let choice = 0;
    let betWin = false;
    if (bet.selection.includes('Over')) {
      //here checks if the user bets for over
      choice = Number.parseFloat(bet.selection.substring(5));
      if (choice < response.goals.home) {
        betWin = true;
      }
    } else {
      //here checks if the user bets for under
      choice = Number.parseFloat(bet.selection.substring(6));
      if (choice > response.goals.home) {
        betWin = true;
      }
    }
    return betWin;
  }

  totalAway17(bet: Bet, response: any) {
    let choice = 0;
    let betWin = false;
    if (bet.selection.includes('Over')) {
      //here checks if the user bets for over
      choice = Number.parseFloat(bet.selection.substring(5));
      if (choice < response.goals.away) {
        betWin = true;
      }
    } else {
      //here checks if the user bets for under
      choice = Number.parseFloat(bet.selection.substring(6));
      if (choice > response.goals.away) {
        betWin = true;
      }
    }
    return betWin;
  }

  doubleChanceFirstHalf20(bet: Bet, response: any) {
    let winner = '';
    if (response.score.halftime.home < response.score.halftime.away) {
      winner = 'Away';
    } else if (response.score.halftime.home > response.score.halftime.away) {
      winner = 'Home';
    } else {
      winner = 'Draw';
    }
    return bet.selection.includes(winner);
  }

  doubleChanceSecondHalff33(bet: Bet, response: any) {
    let winner = '';
    if (response.score.fulltime.home < response.score.fulltime.away) {
      winner = 'Away';
    } else if (response.score.fulltime.home > response.score.fulltime.away) {
      winner = 'Home';
    } else {
      winner = 'Draw';
    }
    return bet.selection.includes(winner);
  }

  bothTeamsScoreFirstHalf34(bet: Bet, response: any) {
    let bothScore = 'No';
    if (response.score.halftime.home > 0 && response.score.halftime.away > 0) {
      bothScore = 'Yes';
    }
    return bet.selection == bothScore;
  }

  bothTeamsScoreSecondHalf35(bet: Bet, response: any) {
    let homeGoalsFirstHalf = response.score.halftime.home;
    let awayGoalsFirstHalf = response.score.halftime.away;
    let bothScore = 'No';

    if (response.score.fulltime.home > homeGoalsFirstHalf && response.score.fulltime.away > awayGoalsFirstHalf) {
      bothScore = 'Yes';
    }

    return bet.selection == bothScore;
  }

  goalsOddOrEven21(bet: Bet, response: any) {
    let totalGoals = response.goals.home + response.goals.away;
    let oddOrEven = '';
    if (totalGoals % 2 == 0) {
      oddOrEven = 'Even';
    } else {
      oddOrEven = 'Odd';
    }

    return bet.selection == oddOrEven;
  }

  goalsOddOrEvenFirstHalf22(bet: Bet, response: any) {
    let totalGoals = response.score.halftime.home + response.score.halftime.away;
    let oddOrEven = '';
    if (totalGoals % 2 == 0) {
      oddOrEven = 'Even';
    } else {
      oddOrEven = 'Odd';
    }

    return bet.selection == oddOrEven;
  }

  goalsOddOrEvenHome23(bet: Bet, response: any) {
    let totalGoals = response.goals.home;
    let oddOrEven = '';
    if (totalGoals % 2 == 0) {
      oddOrEven = 'Even';
    } else {
      oddOrEven = 'Odd';
    }

    return bet.selection == oddOrEven;
  }

  goalsOddOrEvenHome60(bet: Bet, response: any) {
    let totalGoals = response.goals.away;
    let oddOrEven = '';
    if (totalGoals % 2 == 0) {
      oddOrEven = 'Even';
    } else {
      oddOrEven = 'Odd';
    }

    return bet.selection == oddOrEven;
  }






}
