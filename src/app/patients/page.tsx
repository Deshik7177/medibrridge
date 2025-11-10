import {
  File,
  ListFilter,
  PlusCircle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { PatientTable } from './components/patient-table';
import { patients } from '@/lib/data';

interface PatientsPageProps {
  searchParams: {
    filter?: string;
  };
}

export default function PatientsPage({ searchParams }: PatientsPageProps) {
  const { filter } = searchParams;
  const validFilters = ['all', 'low', 'medium', 'high'];
  const defaultTab = (filter && validFilters.includes(filter)) ? filter : 'all';

  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8">
      <Tabs defaultValue={defaultTab}>
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="low">Low Risk</TabsTrigger>
            <TabsTrigger value="medium">Medium Risk</TabsTrigger>
            <TabsTrigger value="high" className="text-destructive">High Risk</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Gender
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Age Group</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
            <PatientTable 
                title="All Patients" 
                description="Manage and monitor all individuals in the community."
                patients={patients}
            />
        </TabsContent>
        <TabsContent value="low">
             <PatientTable 
                title="Low Risk Patients" 
                description="Individuals with healthy vitals."
                patients={patients.filter(p => p.riskLevel === 'Low')}
            />
        </TabsContent>
        <TabsContent value="medium">
            <PatientTable 
                title="Medium Risk Patients" 
                description="Individuals with borderline health metrics."
                patients={patients.filter(p => p.riskLevel === 'Medium')}
            />
        </TabsContent>
        <TabsContent value="high">
            <PatientTable 
                title="High Risk Patients" 
                description="Individuals requiring immediate attention and follow-up."
                patients={patients.filter(p => p.riskLevel === 'High')}
            />
        </TabsContent>
      </Tabs>
    </div>
  );
}
