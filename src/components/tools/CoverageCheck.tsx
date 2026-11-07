'use client';

import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { AnimatePresence, domAnimation, LazyMotion, m, MotionConfig } from 'motion/react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { coverageQuestions, coverageSummaryMessage, scoreCoverage } from '@/lib/calculators';
import { whatsappUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from '../icons';
import { ScoreGauge } from '../ScoreGauge';

const bandCopy = {
  strong: { title: 'You are well protected.', text: 'Your main risks look covered. A yearly review helps keep it that way as your life changes.' },
  fair: { title: 'You have a good base, with some gaps.', text: 'Some important risks are not fully covered yet. Start with the gaps listed below.' },
  exposed: { title: 'You may be exposed to some big risks.', text: 'A single event could affect your savings. The items below are the place to start.' },
};

export function CoverageCheck() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const done = step >= coverageQuestions.length;
  const question = coverageQuestions[step];

  function choose(value: string) {
    if (!question) return;
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
    setStep((s) => s + 1);
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  const result = done ? scoreCoverage(answers) : null;

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div className="card overflow-hidden rounded-[1.75rem]">
          {!done && (
            <div
              role="progressbar"
              aria-label="Progress"
              aria-valuemin={0}
              aria-valuemax={coverageQuestions.length}
              aria-valuenow={step}
              className="h-2 bg-navy-100"
            >
              <div className="h-full bg-leaf-500 transition-all duration-300" style={{ width: `${(step / coverageQuestions.length) * 100}%` }} />
            </div>
          )}
          <div className="p-6 sm:p-10">
            <AnimatePresence mode="wait" initial={false}>
              {question ? (
                <m.div key={question.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.18 }}>
                  <p className="text-sm font-bold tracking-[0.1em] text-leaf-700 uppercase">Question {step + 1} of {coverageQuestions.length}</p>
                  <h2 ref={headingRef} tabIndex={-1} className="mt-3 text-3xl outline-none sm:text-4xl">{question.question}</h2>
                  <p className="mt-3 text-muted">{question.hint}</p>
                  <div className="mt-7 grid gap-3">
                    {question.options.map((o) => (
                      <button
                        key={o.value}
                        type="button"
                        onClick={() => choose(o.value)}
                        className={`group flex min-h-14 items-center justify-between gap-3 rounded-2xl border-[1.5px] px-5 py-3 text-left text-lg font-semibold text-navy-900 transition-colors hover:border-leaf-600 hover:bg-leaf-50 ${
                          answers[question.id] === o.value ? 'border-leaf-600 bg-leaf-50' : 'border-navy-900/20'
                        }`}
                      >
                        {o.label}
                        <ArrowRight aria-hidden="true" className="size-5 shrink-0 text-leaf-600 opacity-0 transition-opacity group-hover:opacity-100" />
                      </button>
                    ))}
                  </div>
                  {step > 0 && (
                    <button type="button" onClick={() => setStep((s) => s - 1)} className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-navy-700 hover:text-leaf-700">
                      <ArrowLeft aria-hidden="true" className="size-4" />
                      Previous question
                    </button>
                  )}
                </m.div>
              ) : result ? (
                <m.div key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} data-testid="coverage-result">
                  <div className="grid items-center gap-6 sm:grid-cols-[auto_1fr]">
                    <div className="mx-auto w-56">
                      <ScoreGauge score={result.score} />
                    </div>
                    <div>
                      <p className="text-sm font-bold tracking-[0.1em] text-leaf-700 uppercase">Your score: {result.score} out of 100</p>
                      <h2 ref={headingRef} tabIndex={-1} className="mt-2 text-3xl outline-none sm:text-4xl">{bandCopy[result.band].title}</h2>
                      <p className="mt-3 text-muted">{bandCopy[result.band].text}</p>
                    </div>
                  </div>
                  {result.gaps.length > 0 ? (
                    <>
                      <h3 className="mt-9 text-2xl">Where to look first</h3>
                      <ul className="mt-4 grid gap-3">
                        {result.gaps.map((g) => (
                          <li key={g.title}>
                            <Link href={g.href} className="group block rounded-2xl border border-navy-900/15 p-5 transition-colors hover:border-leaf-600 hover:bg-leaf-50">
                              <span className="flex items-center gap-2">
                                <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold uppercase ${g.severity === 'high' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-900'}`}>
                                  {g.severity === 'high' ? 'Priority' : 'Review'}
                                </span>
                              </span>
                              <span className="mt-2 block text-lg font-semibold text-navy-900">{g.title}</span>
                              <span className="mt-1 block text-muted">{g.detail}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p className="mt-8 flex items-start gap-2 rounded-2xl bg-leaf-50 p-5 font-semibold text-navy-900">
                      <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-leaf-600" />
                      No major gaps from your answers. It is still worth checking the cover amounts and terms.
                    </p>
                  )}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a href={whatsappUrl(coverageSummaryMessage(result))} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                      <WhatsAppIcon />
                      Send my result on WhatsApp
                    </a>
                    <button type="button" onClick={() => { setAnswers({}); setStep(0); }} className="btn btn-outline">
                      <RotateCcw aria-hidden="true" className="size-4" />
                      Start again
                    </button>
                  </div>
                  <p className="mt-6 rounded-2xl bg-bone p-4">
                    Once your protection is in place, the next step is building for your goals.{' '}
                    <Link href="/tools/goal-planner/" className="link">Try the goal planner</Link>.
                  </p>
                  <p className="mt-6 text-sm text-muted">This is a general guide based only on your answers. It is not insurance advice or a review of any actual policy.</p>
                </m.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
