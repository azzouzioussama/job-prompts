import React, { useState, useRef } from 'react';
import { Briefcase, Sparkles, Copy, Download, FileText, CheckCircle2, ChevronLeft } from 'lucide-react';

// --- Templates ---
const CV_PROMPT_TEMPLATE = String.raw`# INSTRUCTIONS
I am applying for the attached job description. Analyze the JD and my CV below. 

Please complete the following 3 tasks:
1. Identify the top 3 technical requirements they are looking for.
2. Rewrite my ENTIRE CV  in latex (look  My Current LaTeX CV section) (including 'Résumé Professionnel', 'Compétences Support & Techniques', 'Projets Techniques', and 'Expériences Professionnelles') using the exact LaTeX formatting provided below. Tailor all bullet points, summaries, and descriptions to mirror the precise terminology, keywords, and priorities used in the JD.
3. Tell me which of my experiences I should highlight during the interview to prove I can handle their specific environment.

## My Current LaTeX CV

\documentclass[a4paper,10pt]{article}

% --- Paquets ---
\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage[french]{babel}
\usepackage[margin=0.5in]{geometry}
\usepackage{hyperref}
\usepackage{titlesec}
\usepackage{enumitem}
\usepackage{xcolor}

% --- Configuration ---
\hypersetup{colorlinks=true, urlcolor=blue}
\titleformat{\section}{\large\bfseries\scshape}{}{0em}{}[\titlerule]
\titlespacing{\section}{0pt}{8pt}{4pt}

\begin{document}

% --- En-tête ---
\begin{center}
    {\Huge \textbf{Oussama AZZOUZI}} \\
    \vspace{4pt}
    Île-de-France, France | **Permis B** \\
    +33 7 73 79 59 17 | \href{mailto:azzouzioussama@outlook.com}{azzouzioussama@outlook.com} \\
    \href{https://linkedin.com/in/azzouzioussama}{linkedin.com/in/azzouzioussama} | \href{https://github.com/azzouzioussama}{github.com/azzouzioussama} \\
    \vspace{6pt}
    \textbf{\Large Technicien Support Informatique \& Systèmes (CDD / CDI / Freelance)}
\end{center}

\section{Résumé Professionnel}
Technicien support rigoureux doté d'un excellent sens du **relationnel**. Spécialisé dans le **support de proximité** et la gestion d'environnements hybrides (AD/M365). Mon expérience actuelle en commerce m'a forgé une solide résistance au stress et à la gestion de situations complexes, tandis que mon expertise technique acquise chez IBM me permet d'automatiser la résolution d'incidents via le scripting. Orienté **satisfaction utilisateur** et respect des SLA. Disponible immédiatement.

\section{Compétences Support \& Techniques}
\begin{itemize}[leftmargin=0.15in, labelsep=0.5em]
    \item \textbf{Support \& Helpdesk :} Gestion d'incidents via **Jira / GLPI**, diagnostic matériel/logiciel (Laptop, périphériques), prise en main à distance (TeamViewer), maintenance préventive.
    \item \textbf{Administration Système :} **Active Directory** (GPO, OU, DNS), Microsoft Entra ID (Azure AD), administration Microsoft 365 et **Microsoft Intune** (MDM).
    \item \textbf{Réseau \& Connectivité :} Dépannage de la connectivité réseau (IPv4, DNS, DHCP, VPN), configuration de pare-feu et résolution d'erreurs de connectivité.
    \item \textbf{Langues :} **Français** (Courant/Maternel), **Anglais** (Niveau C1 - Certifié DCL), **Arabe** (Natif).
    \item \textbf{Soft Skills :} Pédagogie utilisateur, résistance au stress, gestion des conflits, autonomie.
\end{itemize}

\section{Expériences Professionnelles}

\textbf{Casino Shop} | \textit{Responsable de point de vente (Emploi de transition)} \hfill \textit{01/2025 -- Présent}
\begin{itemize}[noitemsep]
    \item \textbf{Service Client :} Accueil, conseil et gestion des situations complexes (gestion du stress et résolution de conflits).
    \item \textbf{Support Niveau 1 :} Diagnostic et dépannage de premier niveau sur les systèmes d'encaissement et terminaux de paiement (TPE).
    \item \textbf{Coordination :} Gestion opérationnelle du point de vente, suivi des stocks et fiabilité des flux financiers.
\end{itemize}

\textbf{IBM} | \textit{Stagiaire Support Technique \& Automatisation} \hfill \textit{04/2024 -- 10/2024}
\begin{itemize}[noitemsep]
    \item \textbf{Support Client International :} Présentations techniques et support pour des clients (Suisse, Allemagne, Inde).
    \item \textbf{Fiabilisation :} Validation de services Cloud pour garantir la continuité de service en production.
\end{itemize}

\textbf{Fiverr} | \textit{Support Technique Freelance} \hfill \textit{2021 -- 2023}
\begin{itemize}[noitemsep]
    \item \textbf{Troubleshooting :} Diagnostic et résolution à distance de bugs logiciels et problèmes de performance applicative.
\end{itemize}

\section{Projets Techniques (Labs)}
\textbf{Lab Infrastructure Entreprise Hybride} \hfill \textit{Projet Intensif}
\begin{itemize}[noitemsep, topsep=2pt]
    \item \textbf{Gestion de Parc :} Déploiement d'un DC (Windows Server 2022), masterisation et jonction de postes Windows 10 Pro.
    \item \textbf{Support Utilisateur :} Résolution d'incidents (verrouillages, DNS) et gestion de 10+ comptes via Active Directory.
\end{itemize}

\textbf{IT Support Automation Lab (PowerShell)} \hfill \textit{Projet Personnel}
\begin{itemize}[noitemsep, topsep=2pt]
    \item Scripts d'automatisation pour la création d'utilisateurs AD et rapports de santé système. (\href{https://azzouzioussama.github.io/Automating-Active-Directory-User-Onboarding/}{Lien GitHub})
\end{itemize}

\section{Éducation \& Certifications}
\begin{itemize}[leftmargin=0.15in, labelsep=0.5em]
    \item \textbf{Certifications :} **AWS Certified Cloud Practitioner**, IBM watsonx Assistant. (\href{https://www.credly.com/users/azzouzi-oussama-abderraouf}{Lien Certifications})
    \item \textbf{Master 2 IA2S (Option Automatisation) :} Université Paris Est Créteil (UPEC) \hfill \textit{2024}
    \item \textbf{DCL Anglais :} Diplôme de Compétence en Langue (Niveau C1) \hfill \textit{2024 -- 2025}
\end{itemize}

\end{document}


# JOB DESCRIPTION
{job_description}`;

const COVER_LETTER_PROMPT_TEMPLATE = String.raw`# ============================================================
#  COVER LETTER PROMPT (copy this section into ChatGPT/Claude)
# ============================================================

# ROLE
You are a French recruitment expert helping an IT support technician write concise, impactful cover letters (lettre de motivation) for roles in Île-de-France.

# CANDIDATE CONTEXT
Oussama AZZOUZI – Technicien Support Informatique. Key selling points:
- International support experience at IBM (clients in Switzerland, Germany, India)
- Bilingual (French native, English C1 certified DCL)
- Home lab with Active Directory, PowerShell automation, M365/Intune
- Current retail manager role proving stress management and customer service
- AWS Cloud Practitioner (shows cloud literacy)

# TASK
Write a **short cover letter** (max 150 words, 3-4 paragraphs) in **French** (unless the job explicitly requires English, then bilingual). The letter must:
1. **First paragraph:** Express interest in the specific role and company (use placeholders like [Company Name]).
2. **Second paragraph:** Match 2-3 of the candidate's strengths to the job requirements (e.g., "Votre besoin en support AD correspond à mon lab maison...").
3. **Third paragraph:** Mention availability (immédiate) and willingness for on-site/remote.
4. **Closing:** Polite call to action.

Keep the tone professional but not overly formal. Avoid repeating the CV verbatim. Include a line about "emploi de transition" only if it adds value.

# JOB DESCRIPTION
{job_description}`;

export default function App() {
  const [jobDescription, setJobDescription] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const sanitizeFilename = (text) => {
    return text.replace(/[\\/*?:"<>|]/g, "").replace(/ /g, "_").substring(0, 50);
  };

  const extractJobTitle = (desc) => {
    const lines = desc.trim().split('\n');
    let firstLine = lines.length > 0 ? lines[0].trim() : "job";
    
    // Remove common prefixes
    firstLine = firstLine.replace(/^(Job Title|Titre|Poste|Intitulé)\s*:?\s*/i, '');
    
    // If too short or too long, try to find a title with typical keywords
    if (firstLine.length < 5 || firstLine.length > 80) {
      const match = desc.match(/\b(Technicien|Support|Helpdesk|IT|Administrateur|Ingénieur|Développeur)[^\n]{5,60}/i);
      if (match) {
        firstLine = match[0];
      }
    }
    return sanitizeFilename(firstLine.trim()) || "job_offer";
  };

  const handleGenerate = () => {
    if (!jobDescription.trim()) {
      showToast('Veuillez coller une description de poste.');
      return;
    }

    const title = extractJobTitle(jobDescription);
    setJobTitle(title);

    const cvPrompt = CV_PROMPT_TEMPLATE.replace("{job_description}", jobDescription);
    const coverPrompt = COVER_LETTER_PROMPT_TEMPLATE.replace("{job_description}", jobDescription);
    
    const now = new Date();
    const dateString = now.toLocaleString('fr-FR');

    const combined = `# Combined Prompts for Job: ${title}\n# Generated on ${dateString}\n# ==============================================================================\n${cvPrompt}\n\n# ==============================================================================\n${coverPrompt}\n\n# ==============================================================================\n# End of combined prompts\n`;

    setGeneratedText(combined);
    setIsGenerated(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopy = () => {
    // Fallback copy method for iframes
    const textArea = document.createElement("textarea");
    textArea.value = generatedText;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showToast('Copié dans le presse-papiers !');
    } catch (err) {
      showToast('Échec de la copie.');
    }
    document.body.removeChild(textArea);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    // Format timestamp: YYYYMMDD_HHMMSS
    const now = new Date();
    const timestamp = now.toISOString().replace(/[-:T]/g, '').slice(0, 14);
    
    a.download = `${timestamp}_${jobTitle}_prompts.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Fichier téléchargé !');
  };

  const resetApp = () => {
    setIsGenerated(false);
    setGeneratedText('');
    setJobTitle('');
    // Keep the job description so they can edit if needed
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20 sm:pb-0">
      
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600">
            {isGenerated ? (
               <button onClick={resetApp} className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors">
                 <ChevronLeft size={24} />
               </button>
            ) : (
              <Briefcase size={28} />
            )}
            <h1 className="text-xl font-bold tracking-tight">
              {isGenerated ? 'Résultats' : 'Job Prep Generator'}
            </h1>
          </div>
          {isGenerated && (
            <span className="text-xs font-medium bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-full">
              Prêt
            </span>
          )}
        </div>
      </header>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-slate-800 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={18} className="text-green-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      <main className="max-w-3xl mx-auto p-4 sm:p-6 mt-4">
        {!isGenerated ? (
          // --- INPUT VIEW ---
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[calc(100vh-140px)] sm:h-auto">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FileText size={20} className="text-slate-500" />
                Description du poste
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Collez l'offre d'emploi ci-dessous pour générer vos prompts sur mesure.
              </p>
            </div>
            
            <div className="flex-grow p-5 flex flex-col">
              <textarea
                className="flex-grow w-full resize-none rounded-xl border border-slate-200 p-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
                placeholder="Ex: Nous recherchons un Technicien Support Informatique..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>

            <div className="p-5 bg-slate-50 border-t border-slate-100">
              <button
                onClick={handleGenerate}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-md shadow-indigo-200"
              >
                <Sparkles size={20} />
                Générer les Prompts
              </button>
            </div>
          </div>
        ) : (
          // --- OUTPUT VIEW ---
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Actions Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCopy}
                className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <Copy size={18} />
                Copier tout
              </button>
              
              <button
                onClick={handleDownload}
                className="flex-1 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <Download size={18} />
                Télécharger (.txt)
              </button>
            </div>

            {/* Preview Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
                <span className="font-mono text-xs text-slate-500 truncate mr-4">
                  {jobTitle}_prompts.txt
                </span>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>
              
              <div className="p-0">
                <pre className="text-xs sm:text-sm font-mono text-slate-700 p-5 overflow-x-auto whitespace-pre-wrap max-h-[60vh] overflow-y-auto custom-scrollbar">
                  {generatedText}
                </pre>
              </div>
            </div>

          </div>
        )}
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; 
        }
      `}} />
    </div>
  );
}