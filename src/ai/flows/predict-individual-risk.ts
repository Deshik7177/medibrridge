'use server';

/**
 * @fileOverview Predicts individuals at high risk of specific health conditions based on their collected data.
 *
 * - predictIndividualRisk - A function that handles the risk prediction process.
 * - PredictIndividualRiskInput - The input type for the predictIndividualRisk function.
 * - PredictIndividualRiskOutput - The return type for the predictIndividualRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictIndividualRiskInputSchema = z.object({
  age: z.number().describe('Age of the individual.'),
  gender: z.string().describe('Gender of the individual.'),
  sugarLevel: z.number().describe('Sugar level of the individual (mg/dL).'),
  bpSystolic: z.number().describe('Systolic blood pressure of the individual (mmHg).'),
  bpDiastolic: z.number().describe('Diastolic blood pressure of the individual (mmHg).'),
  bmi: z.number().describe('Body mass index of the individual (kg/m^2).'),
  condition: z.string().describe('The health condition to predict risk for (e.g., diabetes, hypertension).'),
});
export type PredictIndividualRiskInput = z.infer<typeof PredictIndividualRiskInputSchema>;

const PredictIndividualRiskOutputSchema = z.object({
  riskScore: z.number().describe('The risk score for the specified health condition (0-100).'),
  riskLevel: z.string().describe('The risk level (low, medium, high) based on the risk score.'),
  explanation: z.string().describe('An explanation of the factors contributing to the risk score.'),
});
export type PredictIndividualRiskOutput = z.infer<typeof PredictIndividualRiskOutputSchema>;

export async function predictIndividualRisk(input: PredictIndividualRiskInput): Promise<PredictIndividualRiskOutput> {
  return predictIndividualRiskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictIndividualRiskPrompt',
  input: {schema: PredictIndividualRiskInputSchema},
  output: {schema: PredictIndividualRiskOutputSchema},
  prompt: `You are an AI health assistant that predicts the risk of an individual developing a specific health condition based on their health data.

  Analyze the following information to predict the risk of developing {{condition}}:

  Age: {{age}}
  Gender: {{gender}}
  Sugar Level: {{sugarLevel}} mg/dL
  Blood Pressure: {{bpSystolic}}/{{bpDiastolic}} mmHg
  BMI: {{bmi}} kg/m^2

  Provide a risk score between 0 and 100, a risk level (low, medium, or high), and an explanation of the factors contributing to the risk.

  Ensure that the output can be parsed as valid JSON. Do not return any surrounding text or comments.`,
});

const predictIndividualRiskFlow = ai.defineFlow(
  {
    name: 'predictIndividualRiskFlow',
    inputSchema: PredictIndividualRiskInputSchema,
    outputSchema: PredictIndividualRiskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
