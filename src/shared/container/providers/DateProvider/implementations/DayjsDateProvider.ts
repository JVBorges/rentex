import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  
  private convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format()
  }

  currentDate(): Date {
    return dayjs().toDate()    
  }

  compareInHours(startDate: Date, endDate: Date): number {
    return dayjs(this.convertToUTC(endDate)).diff(this.convertToUTC(startDate), "hours");
  }

  compareInDays(startDate: Date, endDate: Date): number {
    return dayjs(this.convertToUTC(endDate)).diff(this.convertToUTC(startDate), "days"); 
  }

  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, "hours").toDate();
  }

  compareIfBefore(startDate: Date, endDate: Date): boolean {
    return dayjs(startDate).isBefore(endDate);
  }
}

export { DayjsDateProvider };