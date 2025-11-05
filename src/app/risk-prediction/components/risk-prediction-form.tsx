'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertCircle,
  BarChart,
  HeartPulse,
  Loader2,
  Share2,
  FileText,
} from 'lucide-react';
import {
  predictIndividualRisk,
  type PredictIndividualRiskOutput,
} from '@/ai/flows/predict-individual-risk';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  age: z.coerce
    .number()
    .int()
    .min(1, 'Age must be positive')
    .max(120, 'Age seems unrealistic'),
  gender: z.enum(['Male', 'Female', 'Other']),
  sugarLevel: z.coerce
    .number()
    .min(1, 'Sugar level must be positive'),
  bpSystolic: z.coerce.number().int().min(1, 'Systolic BP must be positive'),
  bpDiastolic: z.coerce
    .number()
    .int()
    .min(1, 'Diastolic BP must be positive'),
  bmi: z.coerce.number().min(1, 'BMI must be positive'),
  condition: z.enum(['diabetes', 'hypertension', 'heart disease']),
});

type RiskFormValues = z.infer<typeof formSchema>;

const riskLevelColors = {
  low: 'bg-green-500',
  medium: 'bg-yellow-500',
  high: 'bg-red-500',
};

export function RiskPredictionForm() {
  const [prediction, setPrediction] =
    useState<PredictIndividualRiskOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<RiskFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: 'Female',
      condition: 'diabetes',
    },
  });

  async function onSubmit(data: RiskFormValues) {
    setIsLoading(true);
    setPrediction(null);
    try {
      const result = await predictIndividualRisk(data);
      setPrediction(result);
      toast({
        title: 'Prediction Complete',
        description: 'AI analysis has been successfully generated.',
      });
    } catch (error) {
      console.error('Prediction failed:', error);
      toast({
        variant: 'destructive',
        title: 'Prediction Failed',
        description:
          'Could not generate the AI prediction. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Individual Risk Prediction</CardTitle>
          <CardDescription>
            Use our AI-powered tool to predict health risks based on an
            individual&apos;s data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 45" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="sugarLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sugar Level (mg/dL)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 140" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bmi"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>BMI (kg/m²)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" placeholder="e.g., 28.5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="bpSystolic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Pressure (Systolic)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 130" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bpDiastolic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Pressure (Diastolic)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 85" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

               <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condition to Predict</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="diabetes">Diabetes</SelectItem>
                          <SelectItem value="hypertension">Hypertension</SelectItem>
                          <SelectItem value="heart disease">Heart Disease</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the health condition for risk analysis.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <HeartPulse className="mr-2 h-4 w-4" />
                    Predict Risk
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <AnimatePresence>
        <div className="flex flex-col gap-4">
          {(isLoading || prediction) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>AI Health Risk Analysis</CardTitle>
                  <CardDescription>
                    This report is generated by AI and should not replace professional medical advice.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isLoading && (
                     <div className="flex flex-col items-center justify-center space-y-4 p-8">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        <p className="text-muted-foreground">Generating AI prediction...</p>
                    </div>
                  )}
                  {prediction && (
                    <>
                      <div className="text-center space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Risk Score for {form.getValues('condition')}
                        </p>
                        <p className="text-6xl font-bold tracking-tighter">
                          {prediction.riskScore}
                          <span className="text-2xl text-muted-foreground">/100</span>
                        </p>
                        <Badge variant={prediction.riskLevel.toLowerCase() === 'high' ? 'destructive' : (prediction.riskLevel.toLowerCase() === 'medium' ? 'secondary' : 'default')}>
                          {prediction.riskLevel} Risk
                        </Badge>
                      </div>
                      
                      <Separator />

                      <div className="space-y-2">
                        <h4 className="font-semibold flex items-center gap-2">
                          <BarChart className="w-4 h-4 text-primary" />
                          Explanation
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {prediction.explanation}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-primary"/>
                            Recommendations
                        </h4>
                         <p className="text-sm text-muted-foreground leading-relaxed">
                            Based on the analysis, we recommend consulting a healthcare provider for a detailed evaluation. Regular monitoring of blood pressure and sugar levels is advised.
                        </p>
                      </div>
                    </>
                  )}
                </CardContent>
                 {prediction && (
                  <CardFooter className="flex justify-end gap-2">
                      <Button variant="outline">
                          <FileText className="mr-2 h-4 w-4" />
                          Download Report
                      </Button>
                      <Button>
                          <Share2 className="mr-2 h-4 w-4" />
                          Share
                      </Button>
                  </CardFooter>
                 )}
              </Card>
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
}
