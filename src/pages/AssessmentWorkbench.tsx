import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';
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
  ListFilter,
  ChevronDown,
  ChevronUp,
  LayoutList
} from 'lucide-react';

const AssessmentWorkbench = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { workbook, selectedSheet } = location.state || {};

  // Parse and Group Excel Data
  const groupedData = useMemo(() => {
    if (!workbook || !selectedSheet) return [];
    const sheet = workbook.Sheets[selectedSheet];
    const rawRows = XLSX.utils.sheet_to_json(sheet);

    const groups = [];
    const guidelines = [];
    //console.log('Raw rows from Excel:', rawRows);
    var regulation=null;
    var question=null;
    var datarow = [];
    rawRows.forEach((row) => {
      
      const existingGroup = ('Regulation' in row);
      if (existingGroup) {
        if(datarow.length>0){
          groups.push(datarow[0]);
        }

          datarow = [{
            regulation: row["Regulation"],
            question: row["Question"],
            guidelines: [],
               // Track selection for each mandate individually
          selectedIdx: 0,
          isExpanded: false 
          }]; 
        
      //console.log('data row:', datarow);
        
        const guidelines = [];
      }
      //console.log('existingGroup:', existingGroup);
      //console.log('Processing row:', row);
      const guidelineItem = {
        text: row["Detailed Audit Guidelines"],
        evidence: row["Detailed Work Done/Regulatory Reference"],
        finding: row["TL Finding"],
        recommendation: row["Recommendations"]
      };
      datarow[0].guidelines.push(guidelineItem);

      
    });
    return groups;
  }, [workbook, selectedSheet]);

  // Local state to track which guideline is selected for which mandate
  const [selections, setSelections] = useState({});

  const back = () => navigate("/Gap");
  const next = () => navigate("/Results");

  if (!workbook) return <div className="p-20 text-center">No data found. Please go back to Setup.</div>;

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      
      {/* TOP NAVIGATION BAR */}
      <div className="h-14 border-b border-border/40 flex items-center justify-between px-6 bg-background/50 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="gap-2" onClick={back}>
            <ChevronLeft className="h-4 w-4" /> Back
          </Button>
          <div className="h-4 w-px bg-border" />
          <h2 className="text-sm font-semibold tracking-tight uppercase text-muted-foreground flex items-center gap-2">
            <LayoutList className="h-4 w-4 text-primary" /> Full Assessment View: <span className="text-primary italic">{selectedSheet}</span>
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
            {groupedData.length} Total Mandates
          </Badge>
          <Button size="sm" className="font-bold shadow-lg ml-4" onClick={next}>
            Finalize All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* MAIN SCROLLABLE FEED */}
      <div className="flex-1 overflow-y-auto bg-secondary/5 p-4 md:p-8 space-y-12">
        {groupedData.map((mandate, mIdx) => {
          // Get the currently selected guideline for this specific mandate
          const currentGuidelineIdx = selections[mIdx] || 0;
          const currentGuideline = mandate.guidelines[currentGuidelineIdx];

          return (
            <div key={mIdx} className="max-w-7xl mx-auto space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* SECTION HEADER */}
              <div className="flex items-center gap-3 ml-1">
                <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">
                  {mIdx + 1}
                </div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
                  Mandate Item {mIdx + 1}
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                
                {/* 1. REGULATORY CONTEXT (LEFT) */}
                <Card className="lg:col-span-4 glass-card border-primary/20 shadow-sm">
                  <CardContent className="p-5 space-y-4">
                    <div>
                      <Label className="text-[10px] font-black text-primary uppercase tracking-widest block mb-1">Regulation Reference</Label>
                      <p className="text-sm font-bold text-foreground leading-tight">{mandate.regulation}</p>
                    </div>
                    <div className="pt-3 border-t border-border/40">
                      <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block mb-1">Assessment Question</Label>
                      <p className="text-sm font-medium text-foreground/80">{mandate.question}</p>
                    </div>

                    {/* Guideline Selector within the card */}
                    <div className="pt-2">
                      <select 
                        className="w-full bg-secondary/20 border border-border rounded-md px-2 py-2 text-[11px] font-bold outline-none focus:ring-1 focus:ring-primary"
                        value={currentGuidelineIdx}
                        onChange={(e) => setSelections({...selections, [mIdx]: parseInt(e.target.value)})}
                      >
                        {mandate.guidelines.map((_, gIdx) => (
                          <option key={gIdx} value={gIdx}>Audit Guideline {gIdx + 1} of {mandate.guidelines.length}</option>
                        ))}
                      </select>
                    </div>
                  </CardContent>
                </Card>

                {/* 2. GUIDELINE & EVIDENCE (MIDDLE) */}
                <Card className="lg:col-span-4 border-none shadow-sm bg-background border-l-4 border-l-primary">
                  <CardContent className="p-5 space-y-4">
                    <div className="space-y-2">
                      <Badge className="bg-primary/10 text-primary border-none text-[10px]">Active Guideline</Badge>
                      <p className="text-xs italic text-foreground/70 leading-relaxed font-serif">
                        "{currentGuideline.text}"
                      </p>
                    </div>
                    <div className="pt-4 border-t border-border/10">
                      <div className="flex items-center gap-2 mb-2">
                        <FileSearch className="h-3 w-3 text-primary" />
                        <Label className="text-[10px] font-bold uppercase text-muted-foreground">Evidence Trace</Label>
                      </div>
                      <div className="bg-secondary/10 p-3 rounded-lg border border-border/40">
                        <Quote className="h-3 w-3 text-primary/40 mb-1" />
                        <p className="text-[11px] text-foreground/80 leading-relaxed">
                          {currentGuideline.evidence || "No evidence reference found."}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 3. FINDINGS & RECOMMENDATIONS (RIGHT) */}
               
<Card className="lg:col-span-4 border-none shadow-sm bg-background border-l-4 border-l-orange-500">
  <CardContent className="p-5 space-y-4">
    
    {/* TL Finding Header & Content */}
    <div className="p-3 rounded-lg bg-orange-500/5 border border-orange-500/20 space-y-2">
      {(() => {
        // Logic to decide status based on currentGuideline.finding
        const findingText = (currentGuideline.finding || "").toLowerCase();
        let statusLabel = "GAP IDENTIFIED";
        let iconColor = "text-red-600";
        
        if (findingText.includes("partial")) {
          statusLabel = "PARTIAL COMPLIANCE";
          iconColor = "text-orange-600";
        } else if (findingText.includes("no gap")) {
          statusLabel = "FULL COMPLIANCE";
          iconColor = "text-green-600";
        }

        return (
          <>
            <div className={`flex items-center gap-2 ${iconColor} font-black italic text-[11px]`}>
              <AlertTriangle className="h-4 w-4" />
              <span>{statusLabel}</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-snug font-medium border-t border-orange-500/10 pt-2">
              {currentGuideline.finding || "No specific finding recorded."}
            </p>
          </>
        );
      })()}
    </div>

    {/* Auditor Notes */}
    <div className="space-y-2">
      <Label className="text-[10px] font-bold uppercase text-muted-foreground">Auditor Notes</Label>
      <Textarea 
        className="min-h-[80px] text-[11px] bg-secondary/5 border-border/40"
        defaultValue={currentGuideline.recommendation}
        placeholder="Enter recommendation..."
      />
    </div>

    {/* Final Decision Dropdown */}
    <div className="flex items-center justify-between pt-2">
      {(() => {
        const findingText = (currentGuideline.finding || "").toLowerCase();
        let defaultValue = "Gap";
        if (findingText.includes("partial")) defaultValue = "Partial";
        if (findingText.includes("no gap")) defaultValue = "Full";
       
        return (
          <select 
            className="text-[10px] font-bold border-none bg-transparent text-primary outline-none cursor-pointer"
            defaultValue={defaultValue}
          >
            <option value="Partial">🟠 Partial Gap</option>
            <option value="Gap">🔴 Gap Identified</option>
            <option value="Full">🟢 Full Compliance</option>
          </select>
        );
      })()}
      <Badge variant="outline" className="text-[9px] opacity-50">Auto-Detected</Badge>
    </div>
  </CardContent>
</Card>

              </div>
              {/* Visual Divider for next mandate */}
              {mIdx < groupedData.length - 1 && <div className="h-px bg-border/60 w-1/4 mx-auto mt-8" />}
            </div>
          );
        })}
        
        {/* FOOTER ACTION */}
        <div className="py-20 flex flex-col items-center gap-4">
          <div className="h-12 w-px bg-gradient-to-b from-primary to-transparent" />
          <p className="text-muted-foreground text-sm font-medium">End of Regulatory Framework</p>
          <Button size="xl" className="px-20 py-8 text-lg font-black rounded-full" onClick={next}>
            COMPLETE ASSESSMENT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentWorkbench;