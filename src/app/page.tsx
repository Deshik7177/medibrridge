import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  HeartPulse,
  Menu,
  Package2,
  PieChart,
  Search,
  Users,
  UsersRound,
} from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { patients } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AgeChart } from './components/age-chart';
import { DiseaseChart } from './components/disease-chart';

const highRiskPatients = patients
  .filter((p) => p.riskLevel === 'High')
  .slice(0, 5);
const totalPatients = patients.length;
const mediumRiskCount = patients.filter(
  (p) => p.riskLevel === 'Medium'
).length;

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 md:gap-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Patients
              </CardTitle>
              <UsersRound className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPatients}</div>
              <p className="text-xs text-muted-foreground">
                +10% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                High-Risk Individuals
              </CardTitle>
              <HeartPulse className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {highRiskPatients.length}
              </div>
              <p className="text-xs text-muted-foreground">
                +2 since last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Medium-Risk Individuals
              </CardTitle>
              <Activity className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">
                {mediumRiskCount}
              </div>
              <p className="text-xs text-muted-foreground">
                Stable since last month
              </p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Preventive Screenings
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+52</div>
              <p className="text-xs text-muted-foreground">
                in the last 7 days
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
           <Card>
            <CardHeader>
              <CardTitle>Disease Trends</CardTitle>
              <CardDescription>
                Prevalence of common conditions in the community.
              </CardDescription>
            </CardHeader>
            <CardContent>
               <DiseaseChart />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>At-Risk Demographics</CardTitle>
              <CardDescription>
                Distribution of patients across different age groups.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <AgeChart />
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader className="flex flex-row items-center">
             <div className="grid gap-2">
                <CardTitle>High-Risk Patients</CardTitle>
                <CardDescription>
                    Individuals requiring priority attention.
                </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/patients">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Risk Factors
                  </TableHead>
                  <TableHead className="text-right">Metrics</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {highRiskPatients.map((patient) => {
                  const avatar = PlaceHolderImages.find(
                    (img) => img.id === patient.avatar
                  );
                  return (
                    <TableRow key={patient.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="hidden h-9 w-9 sm:flex">
                            {avatar && (
                              <AvatarImage
                                src={avatar.imageUrl}
                                alt={patient.name}
                                data-ai-hint={avatar.imageHint}
                              />
                            )}
                            <AvatarFallback>
                              {patient.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="grid gap-0.5">
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {patient.age} years, {patient.gender}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <div className="flex flex-wrap gap-1">
                            {patient.bpSystolic > 140 && <Badge variant="destructive">High BP</Badge>}
                            {patient.sugarLevel > 125 && <Badge variant="destructive">High Sugar</Badge>}
                            {patient.bmi > 30 && <Badge variant="destructive">Obesity</Badge>}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        BP: {patient.bpSystolic}/{patient.bpDiastolic}, BMI:{' '}
                        {patient.bmi}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
