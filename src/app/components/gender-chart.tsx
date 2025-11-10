'use client';

import { Pie, PieChart as RechartsPieChart } from 'recharts';

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { patients } from '@/lib/data';

const genderData = [
  {
    gender: 'Male',
    count: patients.filter((p) => p.gender === 'Male').length,
    fill: 'var(--color-male)',
  },
  {
    gender: 'Female',
    count: patients.filter((p) => p.gender === 'Female').length,
    fill: 'var(--color-female)',
  },
  {
    gender: 'Other',
    count: patients.filter((p) => p.gender === 'Other').length,
    fill: 'var(--color-other)',
  },
].filter((d) => d.count > 0);

const genderChartConfig: ChartConfig = {
  count: {
    label: 'Patients',
  },
  male: { label: 'Male', color: 'hsl(var(--chart-1))' },
  female: { label: 'Female', color: 'hsl(var(--chart-2))' },
  other: { label: 'Other', color: 'hsl(var(--chart-3))' },
};

export function GenderChart() {
  return (
    <ChartContainer
      config={genderChartConfig}
      className="min-h-[200px] w-full"
    >
      <RechartsPieChart>
        <ChartTooltip content={<ChartTooltipContent nameKey="count" />} />
        <Pie data={genderData} dataKey="count" nameKey="gender" innerRadius={30} />
        <ChartLegend content={<ChartLegendContent />} />
      </RechartsPieChart>
    </ChartContainer>
  );
}
