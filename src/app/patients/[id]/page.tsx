import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  File,
  ListFilter,
  MoreVertical,
  PlusCircle,
} from 'lucide-react';

import { patients } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

const riskBadgeVariant = {
  Low: 'default',
  Medium: 'secondary',
  High: 'destructive',
} as const;

export default function PatientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const patient = patients.find((p) => p.id === params.id);
  if (!patient) {
    notFound();
  }
  const avatar = PlaceHolderImages.find((img) => img.id === patient.avatar);

  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8">
      <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-7 w-7" asChild>
            <Link href="/patients">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {patient.name}
          </h1>
          <Badge
            variant={riskBadgeVariant[patient.riskLevel]}
            className="ml-auto sm:ml-0"
          >
            {patient.riskLevel} Risk
          </Badge>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-3.5 w-3.5" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit Patient</DropdownMenuItem>
                <DropdownMenuItem>Export Data</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Delete Patient
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Vitals & Metrics</CardTitle>
                <CardDescription>
                  Key health indicators recorded for {patient.name}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      <TableHead>Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        Blood Pressure
                      </TableCell>
                      <TableCell>
                        {patient.bpSystolic} / {patient.bpDiastolic} mmHg
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Blood Sugar
                      </TableCell>
                      <TableCell>{patient.sugarLevel} mg/dL</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">BMI</TableCell>
                      <TableCell>{patient.bmi} kg/m²</TableCell>
                    </TableRow>
                    <TableRow>
                       <TableCell className="font-medium">
                        Risk Factors
                      </TableCell>
                      <TableCell>
                         <div className="flex flex-wrap gap-1">
                            {patient.bpSystolic > 140 && <Badge variant="destructive">High BP</Badge>}
                            {patient.sugarLevel > 125 && <Badge variant="destructive">High Sugar</Badge>}
                            {patient.bmi > 30 && <Badge variant="destructive">Obesity</Badge>}
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Patient Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  <div className="font-semibold">Demographics</div>
                  {avatar && (
                    <div className="relative w-full aspect-square">
                      <Image
                        src={avatar.imageUrl}
                        alt={patient.name}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                  )}
                  <dl className="grid gap-1">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Age</dt>
                      <dd>{patient.age}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Gender</dt>
                      <dd>{patient.gender}</dd>
                    </div>
                  </dl>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-3">
                  <div className="font-semibold">Contact Information</div>
                  <dl className="grid gap-1">
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Email</dt>
                      <dd>
                        <a href="mailto:">patient@example.com</a>
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Phone</dt>
                      <dd>
                        <a href="tel:">+1 234 567 890</a>
                      </dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
