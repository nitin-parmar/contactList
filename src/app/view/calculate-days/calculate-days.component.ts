import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarHeaderComponent } from 'src/app/shared/calendar-header/calendar-header.component';
import * as moment from 'moment';
import 'moment-precise-range-plugin';
import 'moment-weekday-calc'

@Component({
  selector: 'app-calculate-days',
  templateUrl: './calculate-days.component.html',
  styleUrls: ['./calculate-days.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class CalculateDaysComponent implements OnInit {

  customeHeader = CalendarHeaderComponent;

  calculateForm : FormGroup;
  today = new Date();
  yesterday = new Date(new Date().setDate( new Date().getDate() + 7 ))
  diffrDays:number | undefined;
  totalHour:number | undefined;
  totalS:number | undefined;
  totalSs:number | undefined;
  isWeekEnd: boolean = true;
  finaleStartDate:string | undefined;
  finalEndDate:string | undefined;
  endMinDate:Date | undefined

  constructor() {
    this.calculateForm = new FormGroup({
      startDate : new FormControl( this.today , [Validators.required]),
      endDate : new FormControl( this.yesterday , [Validators.required]),
      weekend : new FormControl(true),
      endDay : new FormControl(false),
    })
  }

  ngOnInit(): void {
    this.calculate()
    this.setMinDateforEnd();
  }

  setMinDateforEnd(){
    this.endMinDate = this.calculateForm.value.startDate;
  }

  calculate(){

    const payload = {
      startDate : this.calculateForm.value.startDate,
      endDate : this.calculateForm.value.endDate,
      weekend : this.calculateForm.value.weekend,
      endDay : this.calculateForm.value.endDay
    }
    this.diffrDays = this.giveMeDays(payload);
    this.totalHour = this.diffrDays * 24;
    this.finaleStartDate = this.givemeFullDate(payload.startDate)
    this.finalEndDate = this.givemeFullDate(payload.endDate)
    
  }
  
  giveMeDays = (data:any) => {
    let startDate = new Date(this.givemeFullDate(data.startDate))
    let endDate = new Date(this.givemeFullDate(data.endDate))    
    if (data.endDay) {
      endDate = new Date(new Date(endDate).setDate( new Date(endDate).getDate() + 1 ))
    }    
    let days = endDate.getTime() - startDate.getTime()
    days = days / (1000 * 3600 * 24);    
    if(!data.weekend){
      let weekDay = (<any>moment()).weekdayCalc(startDate,endDate,[1,2,3,4,5]);
      days = weekDay 
      this.isWeekEnd = false;
      this.totalS = (<any>moment()).weekdayCalc(startDate,endDate,[6]);
      this.totalSs = (<any>moment()).weekdayCalc(startDate,endDate,[0]);
    }else {
      this.isWeekEnd = true;      
    }
    return days    
  }
  givemeFullDate(date:any){
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getUTCFullYear();
    return `${year}/${month}/${day}`
  }

}
