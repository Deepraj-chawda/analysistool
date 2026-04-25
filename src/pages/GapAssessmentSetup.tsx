import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx'; // ADDED: Import the xlsx library
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { 
  FileText, 
  ShieldCheck, 
  Building2, 
  Upload, 
  CheckCircle2, 
  Loader2,
  ChevronRight,
  X
} from 'lucide-react';
import { toast } from 'sonner';

const GapAssessmentSetup = () => {
  const [files, setFiles] = useState({
    regulation: null,
    framework: null,
    policy: null
  });

  // ADDED: State variables for Excel parsing
  const [sheets, setSheets] = useState([]);
  const [selectedScope, setSelectedScope] = useState('');
  const [workbookData, setWorkbookData] = useState(null);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const regInputRef = useRef(null);
  const frameInputRef = useRef(null);
  const policyInputRef = useRef(null);

  const handleFileChange = (event, type) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFiles(prev => ({ ...prev, [type]: selectedFile }));
      toast.success(`${selectedFile.name} loaded successfully`);

      // ADDED: Logic to read Excel when 'framework' is uploaded
      if (type === 'framework') {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          // Read the Excel file
          const workbook = XLSX.read(data, { type: 'array' });
          console.log('Workbook loaded:', workbook);
          // Extract sheet names
          const sheetNames = workbook.SheetNames;
          setSheets(sheetNames);
          console.log('Parsed sheets:', sheetNames);
          // Auto-select the first sheet
          if (sheetNames.length > 0) {
            setSelectedScope(sheetNames[0]);
          }
          
          // Save workbook data to pass to Page 2
          setWorkbookData(workbook);
        };
        reader.readAsArrayBuffer(selectedFile);
      }
    }
  };

  const removeFile = (type) => {
    setFiles(prev => ({ ...prev, [type]: null }));
    
    // ADDED: Clear Excel data if framework is removed
    if (type === 'framework') {
      setSheets([]);
      setSelectedScope('');
      setWorkbookData(null);
    }
  };

  const startAssessment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.info(`Analyzing Revolut UAE ${selectedScope} Procedures...`);
      
      // ADDED: Pass the workbook and selected sheet to Page 2
      navigate("/Workbench", { 
        state: { 
          workbook: workbookData, 
          selectedSheet: selectedScope 
        } 
      });
    }, 2500);
  };

  return (
    <div className="container max-w-full px-2 py-6 md:px-6 space-y-8 animate-in fade-in duration-700">
      {/* HEADER SECTION */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Gap Assessment Setup</h1>
        <p className="text-muted-foreground">Upload regulatory data and institutional policies for automated mapping</p>
      </div>

      {/* SECTION 1 — INPUTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1 - Regulation */}
        <Card className={`shadow-sm glass-card transition-all ${files.regulation ? 'border-primary/50 bg-primary/5 shadow-md' : 'border-border/40'}`}>
          <CardHeader className="py-4 px-5 border-b border-border/40">
            <CardTitle className="text-lg font-medium flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Regulation
              </div>
              {files.regulation && <X className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-destructive" onClick={() => removeFile('regulation')} />}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <input type="file" ref={regInputRef} className="hidden" onChange={(e) => handleFileChange(e, 'regulation')} accept=".pdf" />
            {!files.regulation ? (
              <div className="border-2 border-dashed border-border/60 rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:bg-secondary/30 transition-all cursor-pointer group" onClick={() => regInputRef.current.click()}>
                <Upload className="h-8 w-8 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium">Upload Laws and Regulations</span>
              </div>
            ) : (
              <div className="space-y-4 animate-in zoom-in-95 duration-300">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-bold text-xs uppercase tracking-widest">Uploaded Successfully</span>
                </div>
                <div className="bg-background/80 p-3 rounded-lg border border-primary/10 shadow-sm">
                  <p className="text-xs font-semibold text-primary">{files.regulation.name}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Card 2 - Framework (Excel) */}
        <Card className={`shadow-sm glass-card transition-all ${files.framework ? 'border-blue-500/50 bg-blue-500/5 shadow-md' : 'border-border/40'}`}>
          <CardHeader className="py-4 px-5 border-b border-border/40">
            <CardTitle className="text-lg font-medium flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-blue-500" />
                Framework
              </div>
              {files.framework && <X className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-destructive" onClick={() => removeFile('framework')} />}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <input type="file" ref={frameInputRef} className="hidden" onChange={(e) => handleFileChange(e, 'framework')} accept=".xlsx,.xls,.csv" />
            {!files.framework ? (
              <div className="border-2 border-dashed border-border/60 rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:bg-secondary/30 transition-all cursor-pointer group" onClick={() => frameInputRef.current.click()}>
                <Upload className="h-8 w-8 text-muted-foreground/60 group-hover:text-blue-500 transition-colors" />
                <span className="text-sm font-medium">Upload Framework Excel</span>
              </div>
            ) : (
              <div className="space-y-4 animate-in zoom-in-95 duration-300">
                <div className="flex items-center gap-2 text-blue-600">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-bold text-xs uppercase tracking-widest">Uploaded Successfully</span>
                </div>
                <div className="bg-background/80 p-3 rounded-lg border border-blue-500/10 shadow-sm">
                  <p className="text-xs font-semibold text-blue-600">{files.framework.name}</p>
                  {/* ADDED: Show sheet count to confirm parsing worked */}
                  <p className="text-[10px] text-muted-foreground mt-1">{sheets.length} sheets parsed</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Card 3 - Policy */}
        <Card className={`shadow-sm glass-card transition-all ${files.policy ? 'border-violet-500/50 bg-violet-500/5 shadow-md' : 'border-border/40'}`}>
          <CardHeader className="py-4 px-5 border-b border-border/40">
            <CardTitle className="text-lg font-medium flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-violet-500" />
                Bank Policy
              </div>
              {files.policy && <X className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-destructive" onClick={() => removeFile('policy')} />}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <input type="file" ref={policyInputRef} className="hidden" onChange={(e) => handleFileChange(e, 'policy')} accept=".pdf" />
            {!files.policy ? (
              <div className="border-2 border-dashed border-border/60 rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:bg-secondary/30 transition-all cursor-pointer group" onClick={() => policyInputRef.current.click()}>
                <Upload className="h-8 w-8 text-muted-foreground/60 group-hover:text-violet-500 transition-colors" />
                <span className="text-sm font-medium">Upload Policy and Procedures</span>
              </div>
            ) : (
              <div className="space-y-4 animate-in zoom-in-95 duration-300">
                <div className="flex items-center gap-2 text-violet-600">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-bold text-xs uppercase tracking-widest">Uploaded Successfully</span>
                </div>
                <div className="bg-background/80 p-3 rounded-lg border border-violet-500/10 shadow-sm">
                  <p className="text-xs font-semibold text-violet-600">{files.policy.name}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* SCOPE SELECTION */}
      <div className="flex justify-center pt-4">
        <div className="w-full max-w-md space-y-3 bg-secondary/10 p-6 rounded-2xl border border-border/50 backdrop-blur-sm">
          <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-center block">Assessment Scope</Label>
          
          {/* UPDATED: Dynamic Dropdown based on Excel sheets */}
          <select 
            className="w-full bg-background border border-border/60 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-inner disabled:opacity-50"
            value={selectedScope}
            onChange={(e) => setSelectedScope(e.target.value)}
            disabled={sheets.length === 0}
          >
            {sheets.length === 0 ? (
              <option value="">Upload Framework Excel to view sheets...</option>
            ) : (
              sheets.map((sheet, idx) => (
                <option key={idx} value={sheet}>{sheet}</option>
              ))
            )}
          </select>
        </div>
      </div>

      {/* START BUTTON */}
      <div className="flex justify-center pb-12">
        <Button 
          size="lg" 
          className="px-16 py-8 text-xl font-black rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95 disabled:opacity-40"
          disabled={!files.regulation || !files.framework || !files.policy || loading || !workbookData}
          onClick={startAssessment}
        >
          {loading ? (
            <><Loader2 className="mr-3 h-6 w-6 animate-spin" /> Processing Policies...</>
          ) : (
            <><CheckCircle2 className="mr-2 h-6 w-6" /> START ASSESSMENT</>
          )}
        </Button>
      </div>
    </div>
  );
};

export default GapAssessmentSetup;