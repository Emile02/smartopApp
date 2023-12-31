// interventions.component.ts
import { Component, OnInit } from '@angular/core';
import { InterventionsService } from '../interventions.service';

@Component({
  selector: 'app-interventions',
  templateUrl: './interventions.component.html',
  styleUrls: ['./interventions.component.css']
})

export class InterventionsComponent implements OnInit {
  
  interventions: any[] = [];
  surgeonsInfos: any[] = [];

  surgeonsArray: any[] = [];
  
  itemsToShowStart: number = 0;
  itemsToShowEnd: number = 10;

  sliceStart: number = 0;
  sliceEnd: number = 10;
  
  searchText: string = '';
  
  lookingForSurgeon: boolean = false;

  highlightedRowIndex: number = -1;

  
  constructor(private interventionsService: InterventionsService) {}

  ngOnInit(): void {
    this.getInterventions();
    this.getSurgeons(this.itemsToShowStart, this.itemsToShowEnd);
  }

  showMoreInterventions (): void {
    if (this.itemsToShowEnd < this.surgeonsInfos.length) {
      this.itemsToShowStart += 10;
      if (this.itemsToShowStart == 30)
      this.itemsToShowEnd += 7;
      else
      this.itemsToShowEnd += 10;
  }
  console.log(this.itemsToShowStart, this.itemsToShowEnd);
  this.getSurgeons(this.itemsToShowStart, this.itemsToShowEnd);
  }
  
  showLessInterventions (): void {
    if (this.itemsToShowStart > 0) {
      this.itemsToShowStart -= 10;
      if (this.itemsToShowStart == 20)
        this.itemsToShowEnd -= 7;
        else
          this.itemsToShowEnd -= 10;
      }
      console.log(this.itemsToShowStart, this.itemsToShowEnd);
    this.getSurgeons(this.itemsToShowStart, this.itemsToShowEnd);
  }

  getInterventions(): any {
    this.interventionsService.getInterventions().subscribe(
      (data) => {
        this.interventions = data;

        const uniqueSurgeons = Array.from(new Set(this.interventions.map(intervention => intervention.surgeon)));
        this.surgeonsInfos = uniqueSurgeons.map(surgeon => ({
          surgeon,
          nurses: this.getMostFrequentNurses(surgeon),
          speciality: this.interventions.find(intervention => intervention.surgeon === surgeon).specialty,
          totalInterventions: this.getTotalInterventions(surgeon),
          anesthsiste : this.getMostFrequentAnesthesiste(surgeon),
          mostIntervention : this.getMostFrequentIntervention(surgeon),
          preferedRoom : this.getMostFrequentRoom(surgeon)
        })).sort((a, b) => b.totalInterventions - a.totalInterventions);;
        this.interventionsService.sendDataToBackend(this.surgeonsInfos).subscribe(
          (response) => {
            console.log('Réponse du backend :', response);
          },
          error => {
            console.error('Erreur lors de l\'envoi des données :', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching interventions:', error);
      }
    );
  }

  getSurgeons(enter: any, end: any): any {    
    this.interventionsService.getSurgeons(enter, end).subscribe(
      (data) => {
        this.surgeonsArray = data;
        console.log(this.surgeonsArray.length); 
      }
    )
  }

  getMostFrequentNurses(surgeonName: string): string {

    const surgeonInterventions = this.interventions.filter((intervention) =>
      intervention.surgeon.toLowerCase() === surgeonName.toLowerCase()
    );
  
    const nurseCounts: { [nurse: string]: number } = {};
    
    for (const intervention of surgeonInterventions) {
      
      const nurse1 = intervention.nurse1;
      const nurse2 = intervention.nurse2;
  
      nurseCounts[nurse1] = (nurseCounts[nurse1] || 0) + 1;
      nurseCounts[nurse2] = (nurseCounts[nurse2] || 0) + 1;
    }

    const mostFrequentNurse = Object.keys(nurseCounts).reduce((a, b) =>
    nurseCounts[a] > nurseCounts[b] ? a : b
  );
    return mostFrequentNurse;
  }

  getMostFrequentIntervention(surgeonName: string): string {

    const surgeonInterventions = this.interventions.filter((intervention) =>
      intervention.surgeon.toLowerCase() === surgeonName.toLowerCase()
    );
  
    const InterventionsCount: { [mostIntervention: string]: number } = {};
    
    for (const intervention of surgeonInterventions) {
      
      const interventions = intervention.intervention;
  
      InterventionsCount[interventions] = (InterventionsCount[interventions] || 0) + 1;
    }

    const mostFrequentIntervention = Object.keys(InterventionsCount).reduce((a, b) =>
    InterventionsCount[a] > InterventionsCount[b] ? a : b
  );
    return mostFrequentIntervention;
  }

  getMostFrequentRoom(surgeonName: string): string {

    const surgeonInterventions = this.interventions.filter((intervention) =>
      intervention.surgeon.toLowerCase() === surgeonName.toLowerCase()
    );
  
    const roomCount: { [preferedRoom: string]: number } = {};
    
    for (const intervention of surgeonInterventions) {
      
      const room = intervention.roomNumber;
  
      roomCount[room] = (roomCount[room] || 0) + 1;
    }

    const mostFrequentRoom = Object.keys(roomCount).reduce((a, b) =>
    roomCount[a] > roomCount[b] ? a : b
  );
    return mostFrequentRoom;
  }

  getMostFrequentAnesthesiste(surgeonName: string): string {
    const surgeonInterventions = this.interventions.filter((intervention) =>
      intervention.surgeon.toLowerCase() === surgeonName.toLowerCase()
    );
  
    const anesthesisteCount: { [anesthsiste: string]: number } = {};
    let mostFrequentAnesthsiste = String();
    
    for (const intervention of surgeonInterventions) {
      const anesthsiste = intervention.anesthsiste;
      
      if (anesthsiste.length > 0)
        anesthesisteCount[anesthsiste] = (anesthesisteCount[anesthsiste] || 0) + 1;
    }
    

    if (Object.keys(anesthesisteCount).length === 0)
      return 'EMPTY';
    else {
      return (
      mostFrequentAnesthsiste = Object.keys(anesthesisteCount).reduce((a, b) =>
      anesthesisteCount[a] > anesthesisteCount[b] ? a : b))
    }
  }

  getTotalInterventions(surgeonName: string): number {
    const surgeonInterventions = this.interventions.filter((intervention) =>
      intervention.surgeon.toLowerCase() === surgeonName.toLowerCase()
    );
    return surgeonInterventions.length;
  }

  search(): void {
    if (this.searchText.trim() === '') {
      this.itemsToShowStart = 0;
      this.itemsToShowEnd = 10;
      this.getSurgeons(this.itemsToShowStart, this.itemsToShowEnd);
      this.lookingForSurgeon = false;
    } else {
      const foundSurgeon = this.surgeonsInfos.find(
        surgeonData =>
          surgeonData.surgeon.toLowerCase().includes(this.searchText.toLowerCase())
      );
  
      if (foundSurgeon) {
        this.surgeonsArray = [foundSurgeon];
        this.itemsToShowStart = 0;
        this.itemsToShowEnd = 1;
        this.lookingForSurgeon = true;
      } else {
        this.itemsToShowStart = 0;
        this.itemsToShowEnd = 10;
        this.getSurgeons(this.itemsToShowStart, this.itemsToShowEnd);
        this.lookingForSurgeon = false;
      }
    }
  }
  
  
  refresh(): void {
    this.itemsToShowStart = 0;
    this.itemsToShowEnd = 10;
    this.sliceEnd = 10;
    this.getSurgeons(this.itemsToShowStart, this.itemsToShowEnd);
    this.lookingForSurgeon = false;
    this.searchText = '';
  }  
}