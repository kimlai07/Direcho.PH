export interface Vehicle {
  id: string;
  googleDriveUrl: string;
  purchasePrice: string;
  dealerName: string;
  loanableAmount: string | null;
  allInPrice: string | null;
  formValue: string | null;
  codingDay: string;
  createdBy: string;
  transferFee: string | null;
  videoUrl: string;
  purchaseStatus: string;
  sellerPrice: string | null;
  variant: string;
  plateNumber: string;
  loanPercentage: string | null;
  thumbnailUrl: string;
  marketPremium: string | null;
  color: string;
  transmission: string;
  mileage: string;
  model: string;
  location: string;
  downPayment: string | null;
  brand: string;
  creationDate: string;
  photoUrls: string[];
  grossProfit: string | null;
  chattelFee: string | null;
  year: string;
  vin: string;
  fuelType: string;
  bodyType: string;
}

export interface ApiResponse<T> {
  data: T;
}