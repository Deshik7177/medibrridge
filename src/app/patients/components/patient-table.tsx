'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Patient } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AddPatientForm } from './add-patient-form';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

const riskBadgeVariant = {
  Low: 'default',
  Medium: 'secondary',
  High: 'destructive',
} as const;

interface PatientTableProps {
  title: string;
  description: string;
  patients: Patient[];
}

export function PatientTable({
  title,
  description,
  patients: initialPatients,
}: PatientTableProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [patients, setPatients] = React.useState(initialPatients);

  const handleAddPatient = (newPatient: Omit<Patient, 'id' | 'avatar'>) => {
    const createdPatient: Patient = {
      ...newPatient,
      id: `USR${String(patients.length + 1).padStart(3, '0')}`,
      avatar: `avatar-${(patients.length % 6) + 1}`,
    };
    setPatients((prev) => [createdPatient, ...prev]);
    setOpen(false);
  };

  const handleRowClick = (patientId: string) => {
    router.push(`/patients/${patientId}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Patient
                </span>
              </Button>
            </DialogTrigger>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead className="hidden md:table-cell">Age</TableHead>
                <TableHead className="hidden md:table-cell">Vitals</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => {
                const avatar = PlaceHolderImages.find(
                  (img) => img.id === patient.avatar
                );
                return (
                  <TableRow
                    key={patient.id}
                    onClick={() => handleRowClick(patient.id)}
                    className="cursor-pointer"
                  >
                    <TableCell className="hidden sm:table-cell">
                      {avatar ? (
                        <Image
                          alt={patient.name}
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={avatar.imageUrl}
                          width="64"
                          data-ai-hint={avatar.imageHint}
                        />
                      ) : (
                        <div className="w-16 h-16 bg-muted rounded-md" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{patient.name}</TableCell>
                    <TableCell>
                      <Badge variant={riskBadgeVariant[patient.riskLevel]}>
                        {patient.riskLevel}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {patient.age}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      BP: {patient.bpSystolic}/{patient.bpDiastolic}, Sugar:{' '}
                      {patient.sugarLevel}, BMI: {patient.bmi}
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleRowClick(patient.id)}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <AddPatientForm onAddPatient={handleAddPatient} />
    </Dialog>
  );
}
