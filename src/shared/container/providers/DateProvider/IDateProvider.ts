interface IDateProvider {
  currentDate(): Date;
  compareInHours(startDate: Date, endDate: Date): number;
  compareInDays(startDate: Date, endDate: Date): number;
  addDays(days: number): Date;
}

export { IDateProvider }