export class Donation {
  quantity: number;
  street: string;
  city: string;
  zipCode: string;
  pickUpDate: Date;
  pickUpTime: Date;
  pickUpComment: string;
  categoryIds: number[];
  institutionId: number;
  phone: string;
}
