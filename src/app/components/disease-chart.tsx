'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { patients } from '@/lib/data';

const diseaseData = [
  {
    condition: 'Hypertension',
    count: patients.filter((p) => p.bpSystolic > 140).length,
    fill: 'var(--color-hypertension)',
  },
  {
    condition: 'Diabetes',
    count: patients.filter((p) => p.sugarLevel > 125).length,
    fill: 'var(--color-diabetes)',
  },
  {
    condition: 'Obesity',
    count: patients.filter((p) => p.bmi > 30).length,
    fill: 'var(--color-obesity)',
  },
];

const diseaseChartConfig: ChartConfig = {
  count: { label: 'Patients' },
  hypertension: { label: 'Hypertension', color: 'hsl(var(--chart-1))' },
  diabetes: { label: 'Diabetes', color: 'hsl(var(--chart-2))' },
  obesity: { label: 'Obesity', color: 'hsl(var(--chart-4))' },
};

export function DiseaseChart() {
  return (
    <ChartContainer config={diseaseChartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={diseaseData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="condition"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="count" radius={8} />
      </BarChart>
    </ChartContainer>
  );
}
