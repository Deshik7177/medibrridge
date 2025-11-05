'use client';

import { Pie, PieChart as RechartsPieChart } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { patients } from '@/lib/data';

const ageData = [
  {
    ageGroup: '18-35',
    count: patients.filter((p) => p.age >= 18 && p.age <= 35).length,
    fill: 'var(--color-group1)',
  },
  {
    ageGroup: '36-50',
    count: patients.filter((p) => p.age >= 36 && p.age <= 50).length,
    fill: 'var(--color-group2)',
  },
  {
    ageGroup: '51-65',
    count: patients.filter((p) => p.age >= 51 && p.age <= 65).length,
    fill: 'var(--color-group3)',
  },
  {
    ageGroup: '65+',
    count: patients.filter((p) => p.age > 65).length,
    fill: 'var(--color-group4)',
  },
];

const ageChartConfig: ChartConfig = {
  count: {
    label: 'Patients',
  },
  group1: { label: '18-35', color: 'hsl(var(--chart-1))' },
  group2: { label: '36-50', color: 'hsl(var(--chart-2))' },
  group3: { label: '51-65', color: 'hsl(var(--chart-3))' },
  group4: { label: '65+', color: 'hsl(var(--chart-4))' },
};

export function AgeChart() {
  return (
    <ChartContainer config={ageChartConfig} className="min-h-[200px] w-full">
      <RechartsPieChart>
        <ChartTooltip content={<ChartTooltipContent nameKey="count" />} />
        <Pie data={ageData} dataKey="count" nameKey="ageGroup" />
      </RechartsPieChart>
    </ChartContainer>
  );
}
