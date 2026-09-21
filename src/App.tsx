/**
 * RespondR – Assam Campus Merch Survey
 * Production-Ready Mobile-First React Web App
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { FooterNav } from './components/FooterNav';
import { LandingView } from './components/LandingView';
import { Step0Campus } from './components/Step0Campus';
import { QuestionCard } from './components/QuestionCard';
import { ReviewView } from './components/ReviewView';
import { ThankYouView } from './components/ThankYouView';
import { HeatmapModal } from './components/HeatmapModal';
import { BackendGuideModal } from './components/BackendGuideModal';

import { QUESTIONS } from './data/questions';
import { CUSTOM_COLLEGE_OPTION } from './data/colleges';
import { SurveyState, StepKey } from './types';
import {
  generateSessionId,
  getDeviceSubmissionMeta,
  validateFormTime,
  StoredSubmissionMeta
} from './utils/antiSpam';
import { formatSurveyPayload, submitSurvey } from './utils/submission';

export default function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return (
      localStorage.getItem('respondr_theme') === 'dark' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('respondr_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('respondr_theme', 'light');
    }
  }, [isDarkMode]);

  // Modals state
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isHeatmapOpen, setIsHeatmapOpen] = useState(false);

  // Stored device submission meta (gentle reminder if previously voted)
  const [priorSubmission, setPriorSubmission] = useState<StoredSubmissionMeta | null>(null);

  useEffect(() => {
    setPriorSubmission(getDeviceSubmissionMeta());
  }, []);

  // Current Step state
  const [currentStep, setCurrentStep] = useState<StepKey>('landing');

  // Survey Data State - initialized with sensible defaults matching Stitch screen
  const [surveyState, setSurveyState] = useState<SurveyState>(() => ({
    district: "Kamrup Metropolitan",
    college: "Cotton University, Panbazar",
    customCollege: "",
    isCustomCollege: false,
    answers: {
      q1: "Yes, absolutely! (Waiting for a fire drop)",
      q2: "Yes, official fest/event tee",
      q3: ["Oversized T-shirt", "Heavyweight Hoodie"],
      q4: "Heavy Streetwear (Acid wash, bold back graphic, drop-shoulder)",
      q5: "Oversized / Boxy Fit (Gen-Z streetwear staple, dropped shoulders)",
      q6: "₹400–499",
      q7: [
        "Aesthetic Streetwear Design",
        "Fabric Quality (GSM & Feel)",
        "College Pride & Identity"
      ],
      q8: "Heavyweight 240–280 GSM (Thick structure, drop shoulders, zero show-through)",
      q9: ["Carbon Black", "Gamosa Crimson Red"],
      q10: "Large statement back graphic + subtle front left chest crest",
      q12: "Direct pickup stall at College Gate / Student Common Room",
      q13: "2–3 pieces (Tee + Hoodie/Sweatshirt combo)",
      q14: "Yes! Hook me up with early samples, free merch & drop perks"
    },
    otherInputs: {
      q3Other: "",
      q4Other: "",
      q12Other: ""
    },
    q11Text: "",
    honeypot: "",
    sessionId: generateSessionId("Kamrup Metropolitan"),
    startTime: Date.now()
  }));

  // Validation error state
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Clear validation error whenever user changes answer
  const clearError = () => setValidationError(null);

  // Progress percentage calculation
  const progressPercent = useMemo(() => {
    if (currentStep === 'landing') return 0;
    if (currentStep === 'step0') return 7;
    if (currentStep.startsWith('q')) {
      const qNum = parseInt(currentStep.replace('q', ''), 10);
      return Math.round(((qNum) / 15) * 100);
    }
    if (currentStep === 'review' || currentStep === 'submitting') return 95;
    if (currentStep === 'success') return 100;
    return 0;
  }, [currentStep]);

  // Current Question Object if on a question step
  const currentQuestion = useMemo(() => {
    if (!currentStep.startsWith('q')) return null;
    const qNum = parseInt(currentStep.replace('q', ''), 10);
    return QUESTIONS.find((q) => q.number === qNum) || null;
  }, [currentStep]);

  // Step 0 Handlers
  const handleDistrictChange = (dist: string) => {
    clearError();
    setSurveyState((prev) => ({
      ...prev,
      district: dist,
      college: "",
      customCollege: "",
      isCustomCollege: false,
      sessionId: generateSessionId(dist)
    }));
  };

  const handleCollegeSelect = (col: string, isCustom: boolean) => {
    clearError();
    setSurveyState((prev) => ({
      ...prev,
      college: isCustom ? CUSTOM_COLLEGE_OPTION : col,
      isCustomCollege: isCustom,
      customCollege: isCustom ? prev.customCollege : ""
    }));
  };

  const handleCustomCollegeChange = (text: string) => {
    clearError();
    setSurveyState((prev) => ({
      ...prev,
      customCollege: text,
      isCustomCollege: true
    }));
  };

  // Question Answer Handlers
  const handleSelectOption = (val: string) => {
    if (!currentQuestion) return;
    clearError();
    setSurveyState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestion.id]: val
      }
    }));
  };

  const handleToggleMultiChip = (val: string) => {
    if (!currentQuestion) return;
    clearError();

    setSurveyState((prev) => {
      const existing = (prev.answers[currentQuestion.id] as string[]) || [];
      let updated: string[];

      if (existing.includes(val)) {
        updated = existing.filter((item) => item !== val);
      } else {
        // Enforce maxSelect (e.g. Q7 max 3)
        if (currentQuestion.maxSelect && existing.length >= currentQuestion.maxSelect) {
          return prev; // Block selecting more than limit
        }
        updated = [...existing, val];
      }

      return {
        ...prev,
        answers: {
          ...prev.answers,
          [currentQuestion.id]: updated
        }
      };
    });
  };

  const handleOtherTextChange = (text: string) => {
    if (!currentQuestion) return;
    clearError();

    if (currentQuestion.id === 'q11') {
      setSurveyState((prev) => ({ ...prev, q11Text: text }));
      return;
    }

    const otherKey = currentQuestion.otherKey as keyof SurveyState['otherInputs'];
    if (otherKey) {
      setSurveyState((prev) => ({
        ...prev,
        otherInputs: {
          ...prev.otherInputs,
          [otherKey]: text
        }
      }));
    }
  };

  // Validation Checker before advancing
  const validateCurrentStep = (): boolean => {
    if (currentStep === 'step0') {
      if (!surveyState.district) {
        setValidationError("Please select your district in Assam.");
        return false;
      }
      if (surveyState.isCustomCollege) {
        if (!surveyState.customCollege.trim() || surveyState.customCollege.trim().length < 2) {
          setValidationError("Please enter your college or institution name.");
          return false;
        }
      } else {
        if (!surveyState.college || surveyState.college === CUSTOM_COLLEGE_OPTION) {
          setValidationError("Please choose your college or pick 'My college isn't listed'.");
          return false;
        }
      }
      return true;
    }

    if (currentQuestion) {
      if (!currentQuestion.required) {
        return true; // Optional (e.g. Q11)
      }

      const answer = surveyState.answers[currentQuestion.id];

      if (!answer) {
        setValidationError("Please select an answer to proceed.");
        return false;
      }

      if (Array.isArray(answer) && answer.length === 0) {
        setValidationError("Please pick at least one option.");
        return false;
      }

      // Check "Other" required text if chosen
      if (currentQuestion.allowOther) {
        const isOtherPicked = Array.isArray(answer) ? answer.includes("Other") : answer === "Other";
        const otherKey = currentQuestion.otherKey as keyof SurveyState['otherInputs'];
        if (isOtherPicked && otherKey && !surveyState.otherInputs[otherKey]?.trim()) {
          setValidationError("Please specify your custom concept in the text box below.");
          return false;
        }
      }
    }

    return true;
  };

  // Next Step Navigation
  const handleNext = () => {
    if (!validateCurrentStep()) return;
    clearError();

    if (currentStep === 'landing') {
      setCurrentStep('step0');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentStep === 'step0') {
      setCurrentStep('q1');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentStep.startsWith('q')) {
      const qNum = parseInt(currentStep.replace('q', ''), 10);
      if (qNum < 14) {
        setCurrentStep(`q${qNum + 1}` as StepKey);
      } else {
        setCurrentStep('review');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentStep === 'review') {
      handleSubmitSurvey();
    }
  };

  // Back Step Navigation
  const handleBack = () => {
    clearError();

    if (currentStep === 'step0') {
      setCurrentStep('landing');
    } else if (currentStep === 'q1') {
      setCurrentStep('step0');
    } else if (currentStep.startsWith('q')) {
      const qNum = parseInt(currentStep.replace('q', ''), 10);
      setCurrentStep(`q${qNum - 1}` as StepKey);
    } else if (currentStep === 'review') {
      setCurrentStep('q14');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Direct jump from Review screen
  const handleJumpToQuestion = (qId: string) => {
    clearError();
    setCurrentStep(qId as StepKey);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJumpToCampus = () => {
    clearError();
    setCurrentStep('step0');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit survey payload to Google Sheets Web App
  const handleSubmitSurvey = async () => {
    // Check honeypot
    if (surveyState.honeypot && surveyState.honeypot.trim() !== '') {
      console.warn("Honeypot filled. Simulating submission.");
      setCurrentStep('success');
      return;
    }

    // Minimum time on form check (anti-spam check)
    const timeCheck = validateFormTime(surveyState.startTime, 3);
    if (!timeCheck.valid) {
      console.info("Fast submission detected:", timeCheck.elapsedSeconds);
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    const payload = formatSurveyPayload(surveyState);

    try {
      const result = await submitSurvey(payload);

      if (result.success) {
        // Refresh prior submission
        setPriorSubmission(getDeviceSubmissionMeta());
        setCurrentStep('success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSubmissionError(result.message);
      }
    } catch (err: any) {
      setSubmissionError("Network error. Your responses are safely kept. Tap Retry to submit.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset survey to start fresh for a classmate or friend
  const handleResetForFriend = () => {
    clearError();
    setSurveyState({
      district: "Kamrup Metropolitan",
      college: "",
      customCollege: "",
      isCustomCollege: false,
      answers: {},
      otherInputs: { q3Other: "", q4Other: "", q12Other: "" },
      q11Text: "",
      honeypot: "",
      sessionId: generateSessionId("Kamrup Metropolitan"),
      startTime: Date.now()
    });
    setCurrentStep('step0');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Bottom Nav Action Labels
  const getNextLabel = () => {
    if (currentStep === 'landing') return "Rep Your College & Start Vote";
    if (currentStep === 'step0') return "Continue to Drop Questions";
    if (currentStep === 'q14') return "Review Merch Responses";
    if (currentStep === 'review') return "Submit College Drop Vote";
    return "Continue Drop Vote";
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#faf8ff] dark:bg-[#131b2e] text-[#131b2e] dark:text-slate-100 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#dc2626] selection:text-white transition-colors">
      {/* Sticky Header */}
      <Header
        currentStep={currentStep}
        stepProgressPercent={progressPercent}
        onBack={handleBack}
        onOpenGuide={() => setIsGuideOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main Content Area constrained to max-w-[560px] matching Stitch screens */}
      <main className="flex-1 w-full max-w-[560px] mx-auto px-4 pt-20">
        {currentStep === 'landing' && (
          <LandingView
            onStart={() => setCurrentStep('step0')}
            priorSubmission={priorSubmission}
          />
        )}

        {currentStep === 'step0' && (
          <Step0Campus
            district={surveyState.district}
            college={surveyState.college}
            customCollege={surveyState.customCollege}
            isCustomCollege={surveyState.isCustomCollege}
            onDistrictChange={handleDistrictChange}
            onCollegeSelect={handleCollegeSelect}
            onCustomCollegeChange={handleCustomCollegeChange}
            error={validationError}
          />
        )}

        {currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            district={surveyState.district}
            college={surveyState.isCustomCollege ? surveyState.customCollege : surveyState.college}
            selectedAnswer={surveyState.answers[currentQuestion.id]}
            otherText={
              currentQuestion.id === 'q11'
                ? surveyState.q11Text
                : surveyState.otherInputs[currentQuestion.otherKey as keyof SurveyState['otherInputs']] || ""
            }
            onSelectOption={handleSelectOption}
            onToggleMultiChip={handleToggleMultiChip}
            onOtherTextChange={handleOtherTextChange}
            validationError={validationError}
          />
        )}

        {currentStep === 'review' && (
          <ReviewView
            state={surveyState}
            onEditQuestion={handleJumpToQuestion}
            onEditCampus={handleJumpToCampus}
            onHoneypotChange={(val) => setSurveyState((p) => ({ ...p, honeypot: val }))}
            errorMessage={submissionError}
          />
        )}

        {currentStep === 'success' && (
          <ThankYouView
            sessionId={surveyState.sessionId}
            district={surveyState.district}
            college={surveyState.isCustomCollege ? surveyState.customCollege : surveyState.college}
            onReset={handleResetForFriend}
            onOpenHeatmap={() => setIsHeatmapOpen(true)}
          />
        )}
      </main>

      {/* Sticky Bottom Navigation Bar on screens where action is needed */}
      {currentStep !== 'success' && currentStep !== 'landing' && (
        <FooterNav
          onBack={handleBack}
          onNext={handleNext}
          canGoBack={true}
          nextLabel={getNextLabel()}
          isLoading={isSubmitting}
          validationError={validationError}
        />
      )}

      {/* 35-District Heatmap Modal */}
      <HeatmapModal
        isOpen={isHeatmapOpen}
        onClose={() => setIsHeatmapOpen(false)}
        userDistrict={surveyState.district}
      />

      {/* Google Sheets Backend & Apps Script Guide Modal */}
      <BackendGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
