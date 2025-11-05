export type Patient = {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  sugarLevel: number;
  bpSystolic: number;
  bpDiastolic: number;
  bmi: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  avatar: string;
};
