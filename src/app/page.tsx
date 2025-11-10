'use client';

import * as React from 'react';
import {
  Activity,
  ArrowUpRight,
  HeartPulse,
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
import { GenderChart } from './components/gender-chart';
import type { Patient } from '@/lib/types';

const allHighRiskPatients = patients.filter((p) => p.riskLevel === 'High');
const totalPatients = patients.length;
const mediumRiskCount = patients.filter(
  (p) => p.riskLevel === 'Medium'
).length;

const totalScreenings = patients.reduce((acc, patient) => {
  if (patient.bpSystolic && patient.sugarLevel && patient.bmi) {
    return acc + 1;
  }
  return acc;
}, 0);

const founders = [
  {
    name: 'Ch Tejaswaroop',
    role: 'CEO',
    avatar: '/ceo.jpg',
  },
  {
    name: 'Ahmed Raza',
    role: 'COO/CTO',
    avatar: '/coo.jpg',
  },
  {
    name: 'Hamid Raza',
    role: 'CFO',
    avatar: '/cfo.jpg',
  },
  {
    name: 'Pranav Kumar',
    role: 'CMO',
    avatar: '/cmo.jpg',
  },
];

export default function Dashboard() {
  const [filteredPatients, setFilteredPatients] =
    React.useState<Patient[]>(allHighRiskPatients);
  const [selectedCondition, setSelectedCondition] = React.useState<
    string | null
  >('High-Risk');

  const handleBarClick = (condition: string | null) => {
    if (condition === selectedCondition) {
      // If the same bar is clicked again, reset to show all high-risk
      setFilteredPatients(allHighRiskPatients);
      setSelectedCondition('High-Risk');
    } else if (condition) {
      const filtered = patients.filter((p) => {
        if (condition === 'Hypertension') return p.bpSystolic > 140;
        if (condition === 'Diabetes') return p.sugarLevel > 125;
        if (condition === 'Obesity') return p.bmi > 30;
        return false;
      });
      setFilteredPatients(filtered);
      setSelectedCondition(condition);
    } else {
      setFilteredPatients(allHighRiskPatients);
      setSelectedCondition('High-Risk');
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 md:gap-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <Link href="/patients?filter=all">
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
            </Link>
          </Card>
          <Card className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <Link href="/patients?filter=high">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  High-Risk Individuals
                </CardTitle>
                <HeartPulse className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">
                  {allHighRiskPatients.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  +2 since last week
                </p>
              </CardContent>
            </Link>
          </Card>
          <Card className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <Link href="/patients?filter=medium">
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
            </Link>
          </Card>
          <Card className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <Link href="/patients">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Preventive Screenings
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{totalScreenings}</div>
                <p className="text-xs text-muted-foreground">
                  in the last 30 days
                </p>
              </CardContent>
            </Link>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2 transform transition-all duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle>Disease Trends</CardTitle>
              <CardDescription>
                Prevalence of common conditions in the community. Click a bar to
                filter patients below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DiseaseChart onBarClick={handleBarClick} />
            </CardContent>
          </Card>
          <div className="grid gap-4 auto-rows-max">
            <Card className="transform transition-all duration-300 hover:shadow-xl">
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
            <Card className="transform transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <CardTitle>Gender Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <GenderChart />
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>
                  {selectedCondition &&
                  selectedCondition.charAt(0).toUpperCase() +
                    selectedCondition.slice(1)}{' '}
                  Patients
                </CardTitle>
                <CardDescription>
                  Individuals requiring priority attention. Now showing{' '}
                  {selectedCondition?.toLowerCase()} patients.
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
                  {filteredPatients.length > 0 ? (
                    filteredPatients.slice(0, 5).map((patient) => {
                      const avatar = PlaceHolderImages.find(
                        (img) => img.id === patient.avatar
                      );
                      return (
                        <TableRow
                          key={patient.id}
                          className="cursor-pointer transition-colors hover:bg-muted/50"
                          onClick={() =>
                            (window.location.href = `/patients/${patient.id}`)
                          }
                        >
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
                              {patient.bpSystolic > 140 && (
                                <Badge variant="destructive">High BP</Badge>
                              )}
                              {patient.sugarLevel > 125 && (
                                <Badge variant="destructive">High Sugar</Badge>
                              )}
                              {patient.bmi > 30 && (
                                <Badge variant="destructive">Obesity</Badge>
                              )}
                              {patient.riskLevel === 'High' &&
                                !(
                                  patient.bpSystolic > 140 ||
                                  patient.sugarLevel > 125 ||
                                  patient.bmi > 30
                                ) && <Badge>High Risk</Badge>}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            BP: {patient.bpSystolic}/{patient.bpDiastolic},
                            BMI: {patient.bmi}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="text-center text-muted-foreground"
                      >
                        No patients found for this condition.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Our Team</CardTitle>
              <CardDescription>
                The founding members of Medibridge.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {founders.map((founder) => (
                <div key={founder.name} className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={founder.avatar}
                      alt={founder.name}
                      data-ai-hint="person portrait"
                    />
                    <AvatarFallback>{founder.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{founder.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {founder.role}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
