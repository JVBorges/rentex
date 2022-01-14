interface IDateProvider {
  currentDate(): Date;
  compareInHours(startDate: Date, endDate: Date): number;
}

export { IDateProvider }