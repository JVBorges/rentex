interface ICreateRentalDTO {
  userId: string;
  carId: string;
  deadlineDate: Date;
  id?: string;
  endDate?: Date;
  total?: number;
}

export { ICreateRentalDTO }