import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  ChevronDown, 
  ChevronUp, 
  Download, 
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  History,
  FileBarChart
} from 'lucide-react';

const AssessmentResults = () => {
  const [expandedRow, setExpandedRow] = useState(1); 

  // Data mapped directly from your provided Audit Findings
  const data = [
    { 
      id: 1, 
      domain: "KYC", 
      requirement: "Client Acceptance Policy", 
      decision: "Partial Gap", 
      severity: "High", 
      reg: "Art. 16.1(a) AML-CFT Law", 
      policy: "UAE KYC Procedure v1.0", 
      logic: "Risk scoring exists (CRA), but no dedicated 'Acceptance' document defining prohibited types.",
      reviewerNote: "Confirmed. CRA rules are scattered; needs a unified Risk Appetite Statement."
    },
    { 
      id: 2, 
      domain: "AML", 
      requirement: "Shell Bank Prohibition", 
      decision: "Gap", 
      severity: "Critical", 
      reg: "Article 19(1)(c) Decree 10", 
      policy: "Business CDD Policy", 
      logic: "No explicit clause prohibiting Shell Banks found in onboarding or periodic review policies.",
      reviewerNote: "Critical failure. Explicit prohibition of Shell Banks is a mandatory CBUAE requirement."
    },
    { 
      id: 3, 
      domain: "TM", 
      requirement: "Sanctions Screening Frequency", 
      decision: "No Gap", 
      severity: "Low", 
      reg: "Federal Decree No. 20", 
      policy: "Global Sanctions Policy", 
      logic: "Daily automated batch screening confirmed via system logs and policy trace.",
      reviewerNote: "Matches regulatory expectation for real-time/daily screening."
    },
  ];

  return (
    <div className="container max-w-full px-6 py-8 space-y-8 bg-background min-h-screen animate-in fade-in duration-700">
      
      {/* HEADER & EXPORT */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary">
            <FileBarChart className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">Compliance Intelligence</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">Audit Traceability Report</h1>
          <p className="text-muted-foreground text-sm">Target Entity: <span className="text-foreground font-semibold">Revolut UAE (Branch)</span> • Generated: April 25, 2026</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 border-primary/20 hover:bg-primary/5">
            <History className="h-4 w-4" /> View Version History
          </Button>
          <Button className="gap-2 shadow-xl bg-primary hover:bg-primary/90">
            <Download className="h-4 w-4" /> Export CBUAE Audit Package
          </Button>
        </div>
      </div>

      {/* SUMMARY DASHBOARD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Assessed Articles", val: "45", color: "border-border", sub: "Total Scope" },
          { label: "Critical Gaps", val: "02", color: "border-red-500/50 bg-red-500/5 text-red-600", sub: "Action Required" },
          { label: "Partial Findings", val: "07", color: "border-orange-500/50 bg-orange-500/5 text-orange-600", sub: "Policy Updates" },
          { label: "Compliant", val: "36", color: "border-green-500/50 bg-green-500/5 text-green-600", sub: "Verified Controls" },
        ].map((stat, i) => (
          <Card key={i} className={`border-l-4 ${stat.color} shadow-sm`}>
            <CardContent className="p-5">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-black">{stat.val}</p>
                <p className="text-[10px] font-medium opacity-60">{stat.sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* TRACEABILITY TABLE */}
      <Card className="border-none shadow-2xl bg-card overflow-hidden">
        <Table>
          <TableHeader className="bg-secondary/20">
            <TableRow className="hover:bg-transparent border-b-border/50">
              <TableHead className="w-[40px]"></TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-wider">Domain</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-wider">Regulatory Requirement</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-wider">Audit Decision</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-wider text-center">Severity</TableHead>
              <TableHead className="text-right text-[10px] font-black uppercase tracking-wider">Explore</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow 
                  className={`group cursor-pointer transition-all border-b-border/40 ${expandedRow === row.id ? 'bg-primary/5' : 'hover:bg-secondary/10'}`}
                  onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)}
                >
                  <TableCell>
                    {expandedRow === row.id ? <ChevronUp className="h-4 w-4 text-primary" /> : <ChevronDown className="h-4 w-4 opacity-30" />}
                  </TableCell>
                  <TableCell><Badge variant="outline" className="font-mono text-[10px] bg-background">{row.domain}</Badge></TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">{row.requirement}</span>
                      <span className="text-[10px] text-muted-foreground font-medium">{row.reg}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {row.decision === "Gap" && <ShieldAlert className="h-4 w-4 text-red-500" />}
                      {row.decision === "Partial Gap" && <ShieldQuestion className="h-4 w-4 text-orange-500" />}
                      {row.decision === "No Gap" && <ShieldCheck className="h-4 w-4 text-green-500" />}
                      <span className={`text-xs font-black uppercase tracking-tighter ${
                        row.decision === "Gap" ? "text-red-600" : 
                        row.decision === "Partial Gap" ? "text-orange-600" : "text-green-600"
                      }`}>{row.decision}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={row.severity === 'Critical' ? 'destructive' : row.severity === 'High' ? 'default' : 'secondary'} className="text-[9px] uppercase px-2">
                      {row.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>

                {/* TRACEABILITY TRACE EXPANSION */}
                {expandedRow === row.id && (
                  <TableRow className="bg-primary/[0.02] hover:bg-primary/[0.02] border-none">
                    <TableCell colSpan={6} className="p-0">
                      <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in zoom-in-95 duration-300">
                        
                        {/* Reg Trace */}
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-black uppercase text-muted-foreground flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Regulatory Mapping
                          </h4>
                          <div className="p-4 rounded-xl bg-background border border-border shadow-sm">
                            <p className="text-[11px] font-bold text-primary mb-2 italic underline">{row.reg}</p>
                            <p className="text-xs text-foreground/70 leading-relaxed font-medium">
                              "Financial institutions must maintain clear, written policies for client acceptance that identify high-risk categories and shell entity prohibitions."
                            </p>
                          </div>
                        </div>

                        {/* Evidence Trace */}
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-black uppercase text-muted-foreground flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Evidence Snippet
                          </h4>
                          <div className="p-4 rounded-xl bg-background border border-blue-500/20 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 opacity-10"><ShieldCheck className="h-8 w-8" /></div>
                            <p className="text-[11px] font-bold text-blue-600 mb-2">{row.policy}</p>
                            <p className="text-xs text-foreground/70 leading-relaxed italic">
                              "{row.logic}"
                            </p>
                          </div>
                        </div>

                        {/* Audit Conclusion */}
                        <div className="space-y-3">
                          <h4 className="text-[10px] font-black uppercase text-muted-foreground flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" /> Audit Recommendation
                          </h4>
                          <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 shadow-sm">
                            <p className="text-xs font-bold text-orange-700 mb-2">Reviewer Conclusion:</p>
                            <p className="text-[11px] leading-relaxed text-orange-900/80 font-medium">{row.reviewerNote}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Defense Footer */}
                      <div className="bg-muted/50 px-8 py-3 flex justify-between items-center border-y">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Trace ID: REV-UAE-2026-{row.id}</span>
                        <div className="flex gap-4">
                           <span className="text-[10px] font-medium italic">Policy Hash: sha256:7f8e...</span>
                           <span className="text-[10px] font-medium italic">Verified by: AI Auditor Core v4</span>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default AssessmentResults;