import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  ChevronLeft, 
  ChevronRight, 
  FileSearch, 
  Quote, 
  AlertTriangle,
  Scale,
  ShieldCheck,
  FileWarning
} from 'lucide-react';

const AssessmentWorkbench1 = () => {
  // Mapping real data from Excel
  const realAudit = {
    regRef: "Article 16.1(a) AML-CFT Law & Article 19(1)(a) – Federal Decree No. (10) of 2025",
    question: "15.2.1) Does the bank have a clear client acceptance policy and is it followed?",
    finding: "Partial compliance: Revolut has risk-based onboarding rules (CRA scoring) but no standalone 'Client Acceptance Policy' document explicitly naming allowed vs prohibited customer types.",
    evidence: "Revolut UAE KYC Procedure – Section 1.2 Scope, Section 2.6 CDD (Retail & Business) + Customer Risk Assessment Procedure.",
    recommendation: "Create a consolidated 'Client Acceptance & Risk Appetite Statement' aligned with CBUAE Law."
  };

  const [decision, setDecision] = useState('Partial Gap');
  const navigate = useNavigate();

  const back = () => navigate("/Gap");
  const next = () => navigate("/Results");

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden animate-in fade-in duration-500">
      
      {/* TOP NAVIGATION BAR */}
      <div className="h-14 border-b border-border/40 flex items-center justify-between px-6 bg-background/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="gap-2" onClick={back}>
            <ChevronLeft className="h-4 w-4" /> Back to Setup
          </Button>
          <div className="h-4 w-px bg-border" />
          <h2 className="text-sm font-semibold tracking-tight uppercase text-muted-foreground">
            Assessment Workbench <span className="text-primary ml-2 italic">Requirement 15.2.1</span>
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 flex gap-2">
            <Scale className="h-3 w-3" /> CBUAE Compliance Scope
          </Badge>
        </div>
      </div>

      {/* MAIN WORKBENCH LAYOUT */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT PANEL (30%) - REQUIREMENT */}
        <div className="w-[30%] border-r border-border/40 p-6 overflow-y-auto space-y-6 bg-secondary/5">
          <div className="space-y-1">
            <Label className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">Reg Reference</Label>
            <h3 className="text-lg font-bold leading-tight">Regulatory Mandate</h3>
          </div>

          <Card className="glass-card border-primary/20 shadow-lg">
            <CardContent className="p-4 space-y-4">
              <div>
                <p className="text-[10px] font-black text-primary mb-2 uppercase tracking-widest">Article Trace</p>
                <p className="text-sm text-foreground/80 leading-relaxed font-medium italic">
                  "{realAudit.regRef}"
                </p>
              </div>
              
              <div className="pt-4 border-t border-border/40">
                <p className="text-[10px] font-black text-muted-foreground mb-2 uppercase tracking-widest">Assessment Question</p>
                <p className="text-md font-bold text-foreground leading-tight">
                  {realAudit.question}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* MIDDLE PANEL (40%) - EVIDENCE */}
        <div className="w-[40%] bg-secondary/10 p-6 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
              <FileSearch className="h-4 w-4 text-primary" /> Policy Evidence Trace
            </h3>
            <Badge variant="secondary" className="text-[10px]">Revolut UAE Internal</Badge>
          </div>

          {/* Evidence Card 1: KYC Procedure */}
          <Card className="border-none shadow-sm hover:shadow-md transition-all border-l-4 border-l-primary bg-background">
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-3">
                <Badge className="bg-primary/10 text-primary border-none text-[10px]">KYC Procedure v1.0</Badge>
                <span className="text-[10px] text-muted-foreground font-mono italic">Section 2.6 CDD</span>
              </div>
              <div className="flex gap-3">
                <Quote className="h-5 w-5 text-primary/40 shrink-0" />
                <p className="text-sm text-foreground/80 leading-relaxed">
                  “The <span className="bg-yellow-200/50 px-1 font-semibold">CRA scoring rules</span> and <span className="bg-yellow-200/50 px-1 font-semibold">High-Risk overrides</span> define onboarding parameters, but a unified acceptance policy document was not identified.”
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Evidence Card 2: Shell Bank Check */}
          <Card className="border-none shadow-sm hover:shadow-md transition-all border-l-4 border-l-violet-500 bg-background">
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-3">
                <Badge className="bg-violet-500/10 text-violet-500 border-none text-[10px]">Business CDD</Badge>
                <span className="text-[10px] text-muted-foreground font-mono italic">Section 2.6.4</span>
              </div>
              <div className="flex gap-3">
                <Quote className="h-5 w-5 text-violet-500/40 shrink-0" />
                <p className="text-sm text-foreground/80 leading-relaxed">
                  “No explicit statement <span className="text-red-600 font-bold underline">prohibiting Shell Banks</span> or companies is present in customer acceptance materials.”
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT PANEL (30%) - ASSESSMENT */}
        <div className="w-[30%] border-l border-border/40 p-6 overflow-y-auto space-y-8 bg-background">
          
          {/* System Suggestion Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">AI Auditor Finding</Label>
            </div>
            
            <div className="p-4 rounded-xl border border-orange-500/30 bg-orange-500/5 space-y-3">
              <div className="flex items-center gap-2 text-orange-600 font-black italic">
                <AlertTriangle className="h-4 w-4" />
                <span>PARTIAL COMPLIANCE</span>
              </div>
              <p className="text-xs text-orange-900 leading-normal font-medium">
                {realAudit.finding}
              </p>
            </div>
          </div>

          {/* Reviewer Decision Section */}
          <div className="space-y-4">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Final Audit Decision</Label>
              <select 
                value={decision}
                onChange={(e) => setDecision(e.target.value)}
                className="w-full bg-secondary/20 border border-border rounded-lg px-3 py-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none appearance-none"
              >
                <option value="Gap">🔴 Gap Identified</option>
                <option value="Partial Gap">🟡 Partial Gap</option>
                <option value="No Gap">🟢 Full Compliance</option>
              </select>

              <Textarea 
                placeholder="Type audit recommendation here..." 
                className="min-h-[120px] text-sm resize-none bg-secondary/5 border-border/60 p-4"
                defaultValue={realAudit.recommendation}
              />
          </div>

          {/* Traceability Summary */}
          <div className="pt-6 border-t border-border/40">
            <Label className="text-[10px] font-black uppercase text-muted-foreground block mb-3 tracking-widest flex items-center gap-2">
              <ShieldCheck className="h-3 w-3" /> Audit Trail Snippet
            </Label>
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
              <p className="text-[11px] text-foreground/70 italic leading-relaxed">
                "Finding mapped to <span className="font-bold text-primary">Art. 19(1)(c)</span>. Recommend drafting a unified Client Acceptance Policy to consolidate scattered risk rules."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <div className="h-16 border-t border-border/40 flex items-center justify-between px-8 bg-background/80 backdrop-blur-md">
        <Button variant="outline" className="gap-2 font-semibold" onClick={back}>
          <ChevronLeft className="h-4 w-4" /> Setup Phase
        </Button>
        <div className="flex items-center gap-6">
           <div className="hidden md:flex flex-col items-end">
             <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Section: Client Acceptance</span>
             <span className="text-xs font-bold text-primary">Progress: 1 / 10 Articles</span>
           </div>
           <Button className="gap-2 px-10 font-bold shadow-lg" onClick={next}>
             Verify & Finalize <ChevronRight className="h-4 w-4" />
           </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentWorkbench1;