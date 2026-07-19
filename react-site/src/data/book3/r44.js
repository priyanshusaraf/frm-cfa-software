export default ({
  book: 3, reading: 44,
  session: "Operational Risk Overview",
  title: "Risk Mitigation",
  tagline: "Once risk is measured, what do you actually do about it? The four generic responses, four types of internal controls (plus how you test whether they actually work), the human-error taxonomy, and the practical playbook for crisis response and risk transfer.",

  teaches: `<p>The four T's of risk response, the four types of internal controls (with automated-control risks, weak-control patterns, and the four ways you actually <em>test</em> whether a control works), the human-error taxonomy that drives control design (slip / rule-based mistake / knowledge-based mistake / violation), how new products and M&A create fresh operational risk and how firms vet them (NPAP/NIRAP), contingency planning and crisis response (BCM, the four phases of a major op-risk event, RPO/RTO), and the two risk-transfer tools — insurance and outsourcing — plus reputation management.</p>`,

  why: `<p>Matching the RIGHT control type to the RIGHT failure mode is the practical payoff of all the identification and measurement work in R42–43. A slip needs different remediation than a deliberate violation — treating all human errors the same way wastes mitigation effort. And a control that looks good on paper (a signed-off policy, a "double check") can be worthless in practice if it's poorly designed or never actually tested — which is why the exam cares as much about <strong>testing</strong> controls as about naming them.</p>`,

  intuition: `<p>Start with the plainest question a risk manager asks about any exposure: what do we actually <em>do</em> about it? There are only four honest answers — the <strong>four T's</strong>. You can <strong>tolerate</strong> it (accept it as-is, no action — like going unhedged on a small position), <strong>treat</strong> it (take action to shrink its impact — better controls, automation, contingency plans), <strong>transfer</strong> it (pay someone else, e.g. an insurer, to hold the risk instead — note the firm still keeps <em>accountability</em> even after the risk itself moves), or <strong>terminate</strong> it (stop the activity entirely — the "avoid the position" option, used when nothing else works).</p>
<p>Once you've decided to <em>treat</em> a risk, you build a control. Controls come in four flavors depending on <em>when</em> in the timeline of a bad event they act. A <strong>preventive</strong> control acts before the event, stopping it from happening at all — segregation of duties (requiring four different people to generate, approve, pay, and record a transaction) is the classic example, because no single person can both create and approve a fraudulent payment. A <strong>detective</strong> control acts during/just after the event, sounding the alarm fast — a fraud alert texted to your card when an unusual purchase posts. A <strong>corrective</strong> control acts after the event, limiting the damage once it's already happened — a data backup you restore from, or a business continuity plan that gets a trading desk back online. A <strong>directive</strong> control is guidance that shapes behavior throughout — a written policy, a training program, a supervisor's sign-off requirement.</p>
<p>But a control on paper isn't a control in practice. The reading is explicit that <em>ineffective</em> controls are a real vulnerability, and names two specific failure patterns: an <strong>"optimistic" control</strong> is one that depends entirely on a single individual's diligence and is often rubber-stamped — think of a manager signing off on twenty documents in the last five minutes before a deadline, with no real time to read any of them. A <strong>"collective" control</strong> spreads the checking across multiple people (e.g., a "double check" reviewed by two people), which sounds safer but actually reduces individual accountability — each reviewer half-relies on the other one to catch the mistake, so nobody looks closely. The fix for collective controls is to have the two checkers sit at different hierarchy levels or in different departments, so their incentives to catch errors don't overlap and cancel out. And after a control failure, the reading flags a very human but wrong instinct: <strong>"more of the same"</strong> — just adding another layer of the identical control type. If the control type itself is the problem, piling on more of it just multiplies the same weakness.</p>
<p>How do you know if a control actually works? You <em>test</em> it, and the reading gives four testing methods that trade off rigor against cost: <strong>self-assessment</strong> (the control owner checks their own work — cheap, but biased, so it's reserved for low-risk secondary controls); <strong>examination</strong> (an independent reviewer inspects the documentation and a written summary of results — limited in scope, so it suits automated controls where the logic is fixed and traceable); <strong>observation</strong> (a tester watches the control run live, on a sample — used for key/primary controls precisely because it's thorough); and <strong>reperformance</strong> (the tester actually re-runs the control on sample transactions — e.g., deliberately feeding bad data into a system to see if it gets caught — which is also how model validation works). Testing frequency should track risk severity: high-severity or unstable risks get tested more often, and samples must mirror the true population or the test will overstate how well the control works. Testing is normally done by internal audit (the third line of defense), though the first line often tests its own key controls, and the second-line ORM team doesn't test directly but must get confirmation the controls are sound.</p>
<p>Automated controls (fraud-detection algorithms, reconciliation engines, data-validation checks) are generally more reliable than manual ones because a machine doesn't get tired or distracted — but automation doesn't eliminate risk, it <em>relocates</em> it. A human-error risk becomes an IT risk (the system fails to execute) or a model risk (the underlying data or model is flawed, so the control silently stops working). And the failure mode shifts shape: manual controls tend to produce frequent, small, random errors (high likelihood, low impact); automated controls tend to produce rare but severe, system-wide failures (low likelihood, high impact) — plus two specific error types worth memorizing: a <strong>Type 1 error</strong> is a false positive (the system flags a legitimate transaction as fraud), a <strong>Type 2 error</strong> is a false negative (the system misses an actual fraud), and automated controls can also simply go dark from system downtime or overcapacity.</p>
<p>Now the human-error taxonomy — the most precisely tested part of this reading. The key axis is <strong>voluntary vs. involuntary</strong>, and within voluntary, <strong>flawed rule vs. flawed choice vs. deliberate defiance</strong>. A <strong>slip</strong> is involuntary: inattention, distraction, fatigue, a "fat finger" typo — like a trader meaning to sell 3,000 shares but typing an extra zero and selling 30,000. Nobody chose to make this mistake, so the fix targets the environment, not the person: better workspace design, less noise, redesigned processes, clearer accountability. A <strong>rule-based mistake</strong> is voluntary but blameless in a different way: the person correctly followed a rule that was itself flawed — e.g., an employee sells an unsuitable product to a client because the firm's incentive structure (aggressive sales bonuses) rewards exactly that. The person did what they were told; the <em>rule</em> was wrong, so you fix the rule, not the employee. A <strong>knowledge-based mistake</strong> is voluntary and it's the person's judgment that was wrong — they faced a genuinely new or unfamiliar situation and, lacking a rule to follow, made the wrong call based on knowledge that didn't actually transfer to this case. The fix is better documentation, training, and clear escalation paths so the next person facing something unfamiliar knows who to ask instead of guessing. Finally, a <strong>violation</strong> is not an error at all — it's voluntary <em>and</em> deliberate: the person knew the correct rule and chose to break it anyway. Since ignorance isn't the problem, training doesn't fix it; you need supervision and detection — cameras, recorded calls, audit trails — to catch and document it.</p>
<p>Two named process-improvement frameworks attack errors at the design stage, before they can even occur — this is the idea of "prevention through design" (PtD, or safety by design): building checklists, protocols, and standardized systems so the process itself makes mistakes harder to make (this connects back to the Swiss Cheese model from R43 — poorly designed systems create the holes that let human error turn into a loss). <strong>Lean Six Sigma</strong> combines Lean (eliminating eight kinds of waste — e.g., wasted time, underused resources) with Six Sigma (reducing variability in outputs), and runs on the <strong>DMAIC</strong> cycle: Define, Measure, Analyze, Improve, Control. <strong>Quality improvement</strong> runs on the <strong>PDSA</strong> cycle: Plan (define the goal and who/what/when/where), Do (execute and collect data), Study (analyze the data against the forecast), Act (adjust the process) — then the cycle repeats.</p>
<p>When a major operational event does happen despite all this, the response runs through four phases: <strong>crisis</strong> (realizing something happened — could take minutes or much longer), <strong>emergency response</strong> (specialists decide and act fast), <strong>recovery</strong> (operations partially or fully resume — measured by <strong>Recovery Point Objective, RPO</strong>, how much data loss is tolerable, and <strong>Recovery Time Objective, RTO</strong>, how long the business can stay down), and <strong>restoration</strong> (full return to normal — quick for a power outage, potentially years for something like a pandemic). Success across all four phases depends on <strong>speed</strong> (crises spread fast), <strong>competence</strong> (the right specialist on the right task, including outside experts for technology or communications), and <strong>transparency</strong> (prompt, honest disclosure — silence or spin does more reputational damage than the original event).</p>
<p>Finally, two risk-transfer tools, each imperfect. <strong>Insurance</strong> swaps a certain ongoing cost (the premium) for reduced loss volatility, and works best when the risk is predictable/quantifiable enough to price and largely transferable to the insurer. It's not a full transfer, though — you're still relying on the insurer's willingness and ability to pay, and payouts can be delayed months, causing a liquidity crunch in the meantime. Because premiums price in the insurer's own margin, many large banks self-insure (absorb) small, predictable losses and only buy insurance for tail events (cyberattacks, business-interruption losses) where the potential severity justifies the premium. <strong>Outsourcing</strong> — handing a function like IT, accounting, or credit decisioning to a third-party specialist — transfers risk too, but how much is genuinely case-specific: offshoring IT to cut costs can introduce new risks (service delays, weaker supervision, language barriers), while outsourcing to a firm with genuinely superior controls (e.g., a specialist data-security vendor) can be a real net risk reduction. Either way you still depend on the third party's controls actually working, which is why the reading calls outsourcing "risk sharing" as often as true risk transfer.</p>`,

  eli5: `<p>Imagine your house has a smoke problem. You could just accept the smoke (<strong>tolerate</strong>), install smoke alarms and a fire extinguisher (<strong>treat</strong>), buy fire insurance so someone else pays if it burns down (<strong>transfer</strong>), or move out entirely (<strong>terminate</strong>). Now think about the smoke alarm itself: a motion-sensor light that stops a fire from starting (like leaving a stove unattended) is <strong>preventive</strong>; the smoke alarm that beeps once smoke appears is <strong>detective</strong>; your renter's insurance payout after the fire is <strong>corrective</strong>; the "how to use a fire extinguisher" poster on your wall is <strong>directive</strong>. And if you burn dinner because you got distracted by your phone, that's a <strong>slip</strong> (you didn't mean to); if you followed a recipe that told you the wrong temperature, that's a <strong>rule-based mistake</strong> (the rule was wrong, not you); if you guessed at a substitute ingredient in an unfamiliar recipe and got it wrong, that's a <strong>knowledge-based mistake</strong>; but if you deliberately left the stove on to "test" something despite knowing better, that's a <strong>violation</strong> — no training will fix that, only supervision will. In finance, the same four T's and four control types and four error types govern how a bank designs its defenses against operational failures, from fat-fingered trades to fraud.</p>`,

  thinkLike: `<p>A practitioner reading a control's design doesn't ask "does a control exist?" — they ask two harder questions: <em>what specific failure mode is this control aimed at</em>, and <em>has anyone actually tested that it works, rather than just that it exists on a policy document?</em> A directive control (a policy saying "always verify signatures") is not the same thing as a preventive control that actually stops a bad transaction from processing — GARP loves testing this exact confusion. A risk manager also treats human error diagnostically: before assigning blame or a remedy, they classify the error (slip / rule-based / knowledge-based / violation) because the wrong remedy wastes effort and can even make things worse — punishing an employee for a rule-based mistake (when the rule itself was flawed) breeds resentment and hides the real problem instead of fixing the rule.</p>
<p>On the exam, this reading is tested almost entirely through short scenarios: a sentence describing what happened (a trader mistypes an order size, a bank adds a second document signoff after a fraud incident, a bank self-insures small losses but buys catastrophe cover) followed by "which of the following best describes this?" You should be able to instantly map any such scenario onto one axis of one framework — is this a T, a control type, or a human-error category — rather than trying to reason from first principles under time pressure. Also expect at least one question probing the "not really an error" status of a violation, and at least one probing the difference between insurance/outsourcing as genuine risk transfer versus risk sharing.</p>`,

  breakdown: [
    {
      title: "Four T's of risk response",
      points: [
        "Tolerate — fully accept the risk and its consequences, no mitigating action (like holding an unhedged position).",
        "Treat — accept the risk but take action to mitigate its impact (controls, automation, contingency plans; a hedged position).",
        "Transfer — hand the risk to a willing third party, typically via insurance or outsourcing; note accountability for the risk stays with the original firm even though the risk itself moves.",
        "Terminate — eliminate the exposure entirely by discontinuing the product, service, or activity (avoiding the position altogether); used when no other response works."
      ]
    },
    {
      title: "Four types of internal controls",
      points: [
        "Preventive — lowers the chance the event happens at all by attacking the underlying cause (e.g., segregation of duties across four different people for generating/approving/paying/recording a transaction).",
        "Detective — acts as an alarm once an event is underway, to catch it and limit loss fast (e.g., a fraud alert on an unusual card transaction).",
        "Corrective — reduces the damage after the event has already happened (e.g., business continuity plans, data backups).",
        "Directive — guidance for performing a task correctly, aimed at preventing errors up front (e.g., written policies, procedures, training, supervision)."
      ]
    },
    {
      title: "Four categories of control testing",
      points: [
        "Self-assessment — the control owner tests their own work; cheap but not objective, so reserved for low-risk/secondary controls.",
        "Examination — an independent party reviews documentation and a written summary of results; limited scope makes it best suited to automated controls.",
        "Observation — the tester watches the control run live, on a sampling basis; used for thorough testing of key/primary controls.",
        "Reperformance — the tester re-runs the control on sample transactions (e.g., feeding in deliberately erroneous data to see if it's caught); also used in model validation."
      ]
    },
    {
      title: "Human error taxonomy",
      points: [
        "Slip — involuntary (inattention, distraction, fatigue, 'fat finger' typos); remedy is better workspace design, redesigned processes, clearer accountability — not training.",
        "Rule-based mistake — voluntary but the rule followed was flawed (e.g., an incentive scheme pushing unsuitable product sales); remedy is to fix the rule/incentive and strengthen controls.",
        "Knowledge-based mistake — voluntary; the wrong choice was made in an unfamiliar situation; remedy is better documentation, training, and clear escalation paths.",
        "Violation — voluntary AND deliberate; the person knowingly broke a rule they knew was correct; not classified as an 'error' at all; remedy is supervision and detection (cameras, call recording), not training."
      ]
    },
    {
      title: "Four phases of a major operational risk event",
      points: [
        "Crisis — the firm realizes an incident occurred (minutes to much longer).",
        "Emergency response — specialists determine and quickly implement the best course of action.",
        "Recovery — operations partially or fully resume; measured by Recovery Point Objective (RPO, how much data loss is tolerable) and Recovery Time Objective (RTO, how long the business can endure the disruption).",
        "Restoration — all lost functions are fully restored and the business returns to normal (can be fast, like after a power outage, or take years, like after a pandemic)."
      ]
    },
    {
      title: "Five components of a NIRAP business case",
      points: [
        "Objective — what the firm wants to achieve and why the new product/initiative is being introduced.",
        "Alternatives — what other options exist besides the proposed product.",
        "Expected benefits — the benefits and potential disadvantages of the product.",
        "Commercial aspects — the costs and funding needs.",
        "Risks — the main risks the product creates and the key mitigants for each."
      ]
    },
    {
      title: "Reputation management: crisis communication's three R's",
      points: [
        "Regret — take ownership and responsibility for the event.",
        "Reason — be honest about the exact cause(s) of the event.",
        "Remedy — find a fair resolution to compensate affected parties."
      ]
    }
  ],

  formulas: [],

  concepts: [
    {
      name: "Four T's of risk response",
      def: "Tolerate (fully accept), Treat (mitigate impact via action/remedy), Transfer (insurance, third parties), Terminate (eliminate exposure by discontinuing the activity).",
      intuition: "Think of it as a spectrum of how much action you take: tolerate is doing nothing, treat is fixing the risk in place, transfer is paying someone else to hold it, terminate is walking away from it entirely.",
      example: "A professor's-note mnemonic from the source: tolerating risk is like an unhedged position, treating or transferring risk is like a hedged position, and terminating risk is like avoiding the position altogether.",
      related: []
    },
    {
      name: "Four types of internal controls",
      def: "Preventive (lower the chance of an event happening at all), Detective (alarm/flag the event quickly to limit loss), Corrective (reduce negative impact after the fact — BCP, backups), Directive (guidance for performing a task correctly — policies, training).",
      example: "Preventive: segregation of duties, requiring four different people to generate, approve, pay, and record a transaction, so no single person can push through a fraudulent payment alone. Detective: a fraud alert sent to a cardholder about an unusual transaction, or an exception report. Corrective: a business continuity plan or a data backup restored after an incident. Directive: a written policy, a training program, or a required supervisory sign-off. Note the overlap case in the source — a second review of a transaction is detective if the transaction already processed, but preventive if it's caught before processing.",
      pitfall: "Automated controls beat manual ones for reliability but bring their own risks: Type 1 (false positive) and Type 2 (false negative) errors, and outages from system downtime/overcapacity. Weak-control patterns to watch for: 'optimistic' controls (too dependent on one individual, superficial — e.g., a manager rubber-stamping twenty document signoffs in the last five minutes before a deadline with no real time to review them) and 'collective' controls (diffused responsibility reduces accountability — e.g., a 'double check' where each reviewer half-relies on the other, best fixed by having the two checkers sit at different hierarchy levels or departments) — and the common bad habit of just piling on MORE of the same control type after a failure instead of diagnosing the actual gap.",
      related: [{ r: 48, label: "R48 — Equifax's directive-vs-operating control failure, a concrete example" }],
      memory: "Preventive stops it. Detective spots it. Corrective fixes it after. Directive tells you how to do it right."
    },
    {
      name: "Key controls vs. non-key (secondary) controls",
      def: "A key (primary) control can stand alone to prevent risk from occurring — it can be any of the four types (e.g., preventive automation that eliminates the error, or corrective backups that nullify the data loss). A non-key (secondary) control merely supplements a key control and cannot reduce risk on a stand-alone basis.",
      pitfall: "Control testing rigor should scale with inherent risk — key controls get the more thorough testing methods (observation), while secondary/low-risk controls can be tested via the weaker self-assessment method.",
      related: []
    },
    {
      name: "Four categories of control testing",
      def: "Self-assessment (control owner tests their own control — limited to low-risk/secondary controls because it lacks objectivity), Examination (independent review of documentation and written test results — best suited to automated controls given its limited scope), Observation (watching the control operate live, on a sampling basis — used for thorough testing of key controls), Reperformance (re-running the control on a sample of transactions, e.g. feeding in erroneous data to see if it's caught — also used in model validation).",
      pitfall: "Control testing should be more rigorous and more frequent for higher-severity or unstable risks, and is normally performed by someone independent of whoever designed the control (self-certification is the exception). Testing is usually done by internal audit (third line of defense); the ORM group (second line) doesn't typically test directly but must receive confirmation that controls are properly designed and operating.",
      related: [{ r: 41, label: "R41/R42 — the three lines of defense model that assigns who tests what" }],
      memory: "Self-assess (biased, low-risk only) → Examine (paper trail, automated) → Observe (live, key controls) → Reperform (re-run it yourself, model validation)."
    },
    {
      name: "Human error taxonomy",
      def: "Slip (involuntary, inattention/distraction — remedy: better workspace design, clearer accountability). Rule-based mistake (voluntary, flawed rule followed correctly — remedy: improve the rule, strengthen controls). Knowledge-based mistake (voluntary, wrong choice in an unfamiliar situation — remedy: better documentation, training, escalation paths). Violation (voluntary, not an error — deliberately breaking a known rule — remedy: better supervision/detection, cameras, call recording).",
      pitfall: "A 'violation' is explicitly NOT classified as an error in this taxonomy (it's deliberate) — don't lump it in with the other three, which are all genuine mistakes of varying voluntariness.",
      example: "A trader with a 10,000-share daily limit means to sell 3,000 shares of a client order but mistakenly enters it as 30,000 shares — this is a slip (an inadvertent 'fat finger' error), and the trader's daily limit is irrelevant to classifying the error type. Contrast: an employee who sells an unsuitable product to a client because the firm's aggressive sales-incentive structure rewards it is a rule-based mistake — the rule (the incentive scheme) is flawed, not the employee's intent. Lean Six Sigma (DMAIC: define, measure, analyze, improve, control) and quality improvement (PDSA: plan, do, study, act) are the two named process-improvement cycles for reducing operational error at the design stage — both connect to the idea of 'prevention through design' (PtD, or safety by design), which builds checklists, protocols, and standardized systems to make errors harder to happen in the first place, echoing the Swiss Cheese model from R43.",
      related: ["Four types of internal controls"],
      memory: "Slip=involuntary. Rule-based & knowledge-based=voluntary but genuine mistakes. Violation=voluntary AND deliberate — not a mistake at all."
    },
    {
      name: "New products, new initiatives, and M&A risk",
      def: "Firms vet new products and initiatives through the New Product Approval Process (NPAP) and New Initiative Risk Assessment Process (NIRAP); a well-built NIRAP business case has five parts: objective, alternatives, expected benefits, commercial aspects, and risks. In mergers and acquisitions, the acquiring firm inherits the target's credit, market, and operational risks — but unlike credit/market risk, the true scale of inherited operational risk is often only knowable months or years after the deal closes.",
      example: "Post-merger integration itself creates fresh operational risk: merging customer/account systems, payroll systems, and inter-company communications can all fail or introduce errors, which is why the ORM function stays involved identifying, assessing, and mitigating risk at three project stages — before kickoff (identify/plan), during the project (ongoing reporting), and at closure (debrief and lessons learned).",
      related: []
    },
    {
      name: "Contingency planning & crisis response",
      def: "BCM (business continuity management) is the action plan for crisis scenarios, part of the broader BCP (business continuity plan); a disaster recovery plan (DRP) is a related but distinct form of contingency planning, both aimed at recovering critical functions after a disruption. Success factors for crisis response: speed, competence (right specialist per task, including external specialists for technology/communications), transparency.",
      example: "Four phases of a major op-risk event: crisis (realizing something happened) → emergency response (specialists act fast) → recovery (operations resume; measured by Recovery Point Objective, RPO — how much data loss is tolerable — and Recovery Time Objective, RTO — how long the business can endure the disruption) → restoration (full return to normal, which can be quick, like after a power outage, or take years, like a pandemic recovery). BCM's first step is securing senior management support, since governance starts at the top; it's typically supplemented by a business impact analysis that estimates recovery time for each possible event.",
      related: [{ r: 43, why: "R43 — resilience's narrower scope vs. BCM's breadth" }]
    },
    {
      name: "Insurance, outsourcing, reputation",
      def: "Insurance trades an ongoing premium for reduced loss volatility — many large banks self-insure small losses since insurance costs can exceed the benefit at that scale, and instead buy insurance mainly for tail events (cyberattacks, business interruption). Outsourcing transfers risk to a third party, but the degree of actual risk transfer is case-specific — sometimes it's genuine transfer, sometimes really risk-SHARING, because the outsourcing firm still depends on the third party's controls actually working.",
      example: "Insurance works best when a risk is predictable/quantifiable enough to price and largely transferable to the insurer — but it's never a full transfer, since the insured still depends on the insurer's ability and willingness to pay, and payouts can be delayed months, creating a liquidity crunch in the meantime. Reputation management's crisis-communication playbook is the three R's: Regret (own the event), Reason (be honest about the cause), Remedy (fairly compensate affected parties).",
      pitfall: "Reputation management splits into prevention (image/relationship building, contingency planning, building goodwill with regulators before a crisis hits) and mitigation (fast, transparent communication using the three R's) — two distinct phases with different tools.",
      related: [{ r: 50, label: "R50 — outsourcing risk, fully developed" }]
    }
  ],

  connections: {
    from: [
      { r: 43, why: "Once risk is measured/assessed, mitigation is the natural next action." }
    ],
    to: [
      { r: 45, why: "Mitigation actions and their effectiveness need to be reported to the right audience." },
      { r: 48, why: "Equifax's failure illustrates the directive-vs-operating control distinction concretely." },
      { r: 50, why: "Outsourcing as a risk-transfer tool gets its own dedicated, detailed treatment." }
    ],
    confused: [
      { what: "Preventive vs directive controls", how: "Directive controls provide GUIDANCE (a policy document); preventive controls actually LOWER the chance of the event happening. A written policy alone (directive) isn't the same as an operating control that prevents the bad outcome." },
      { what: "Rule-based mistake vs violation", how: "Rule-based mistake: voluntarily followed a rule that was flawed (not their fault, the rule was wrong). Violation: voluntarily broke a rule KNOWN to be correct — deliberate, not a mistake at all." },
      { what: "Risk transfer vs risk sharing (outsourcing)", how: "Whether outsourcing achieves genuine risk TRANSFER or merely risk-SHARING is case-specific — don't assume outsourcing always fully offloads risk." },
      { what: "Examination vs. observation vs. reperformance (control testing)", how: "Examination reviews existing documentation/results (best for automated controls, limited scope); observation watches the control run live on a sample (used for thorough testing of key controls); reperformance actually re-executes the control on sample transactions (e.g., feeding in bad data to see if it's caught). Don't confuse 'watching it happen' (observation) with 'making it happen yourself' (reperformance)." }
    ]
  },

  misconceptions: [
    { wrong: "\"A violation is just a severe version of a mistake, like a knowledge-based error.\"", right: "A violation is explicitly NOT classified as a mistake/error in this taxonomy — it's a deliberate, voluntary breaking of a KNOWN rule, requiring supervision/detection remedies rather than training or documentation fixes." },
    { wrong: "\"Outsourcing always fully transfers the underlying risk to the third party.\"", right: "The degree of actual risk transfer is case-specific — outsourcing can be genuine risk transfer OR effectively risk-sharing, depending on the arrangement, since the firm still depends on the third party's controls actually working." },
    { wrong: "\"After a control failure, adding more of the same type of control is a sound response.\"", right: "This is flagged as a common BAD habit — piling on more of the same control type without diagnosing the actual gap that caused the failure wastes effort and may not address the real vulnerability." },
    { wrong: "\"Large banks always purchase insurance for every operational risk exposure.\"", right: "Many large banks SELF-INSURE small losses, since insurance costs (premiums, deductibles, administrative overhead) can exceed the benefit at that scale; insurance is reserved mainly for tail events like cyberattacks or business interruption." },
    { wrong: "\"Self-assessment is a reliable way to test any control, since the owner knows the control best.\"", right: "Self-assessment lacks objectivity precisely because the owner is testing their own work, so it's limited to secondary controls or low inherent-risk situations — higher-risk and key controls need independent testing (examination, observation, or reperformance)." }
  ],

  highYield: [
    { stars: 5, what: "Human error taxonomy: slip, rule-based mistake, knowledge-based mistake, violation — voluntariness, cause, and remedy for each.", why: "The most precisely tested framework in this reading, with a clean four-way structure GARP loves to test via scenario matching." },
    { stars: 4, what: "Four types of internal controls (preventive/detective/corrective/directive) and automated-control risks (Type 1/2 errors).", why: "Foundational control vocabulary reused when analyzing case studies (R48, R50, R52)." },
    { stars: 4, what: "Four categories of control testing (self-assessment/examination/observation/reperformance) and which control type each suits.", why: "A distinct LO (44.c) tested on its own — knowing which testing method fits automated vs. key controls is a frequent scenario-matching question." },
    { stars: 3, what: "Four T's of risk response (tolerate/treat/transfer/terminate).", why: "A clean, simple classification, easy points if memorized." },
    { stars: 3, what: "Weak-control patterns: 'optimistic' and 'collective' controls, and piling-on-more-of-the-same-type as a bad habit.", why: "A subtle, frequently tested set of anti-patterns." },
    { stars: 2, what: "Four phases of a major operational event (crisis/emergency response/recovery/restoration) and RPO vs. RTO.", why: "RPO (data loss tolerance) vs. RTO (downtime tolerance) is an easy definitional mix-up to test." }
  ],

  recall: [
    { q: "An employee, following a company policy that turns out to be flawed, makes an error that costs the bank money. What type of human error is this, and what's the correct remedy?", a: "A rule-based mistake — the employee voluntarily followed the rule/policy correctly, but the rule itself was flawed. The remedy is to IMPROVE THE RULE and strengthen controls, not to punish or retrain the employee, since they did nothing wrong given the (flawed) instructions they were given." },
    { q: "Distinguish a 'slip' from a 'violation' in the human error taxonomy, including the appropriate remedy for each.", a: "A slip is INVOLUNTARY — caused by inattention or distraction — and is remedied through better workspace design and clearer accountability structures. A violation is VOLUNTARY and deliberate — the person knowingly broke a rule they knew was correct — and is remedied through better supervision and detection (e.g., cameras, call recording), not training, since the person already knew the right course of action." },
    { q: "Why might a bank choose to self-insure small operational losses rather than purchase insurance for them?", a: "Insurance costs (premiums, deductibles, administrative overhead of claims) can exceed the expected benefit for small, frequent losses — for a large bank, self-insuring (absorbing these losses directly) can be more cost-effective than paying ongoing premiums for coverage whose expected payout doesn't justify the cost. Larger banks reserve insurance mainly for tail events like cyberattacks or business-interruption losses." },
    { q: "A bank wants to test a key (primary) automated fraud-detection control as thoroughly as possible. Which control-testing method should it use, and why not self-assessment?", a: "Observation — watching the control operate live, on a sampling basis — is used for thorough testing of key controls. Self-assessment is unsuitable here because it lacks objectivity (the control owner testing their own control) and is reserved for secondary controls or low inherent-risk situations, not a key control like fraud detection." },
    { q: "What is the difference between the Recovery Point Objective (RPO) and the Recovery Time Objective (RTO) in the recovery phase of a major operational risk event?", a: "RPO measures the amount of data lost (or that needs to be recovered) following a risk event. RTO measures the maximum amount of time the business can endure the disruption before it must be back online. RPO is about data loss tolerance; RTO is about downtime tolerance." }
  ],

  hooks: [
    { title: "Four kinds of 'oops'", text: "Slip: 'I wasn't paying attention.' Rule-based: 'I followed the rule exactly, but the rule was wrong.' Knowledge-based: 'I didn't know what to do, so I guessed wrong.' Violation: 'I knew exactly what to do, and chose not to.' Only the last one isn't really a mistake." },
    { title: "Four T's, four exits", text: "Tolerate (live with it), Treat (fix it), Transfer (hand it off), Terminate (stop doing the activity entirely) — four doors out of a risk, and picking the wrong one wastes resources." },
    { title: "Test it like you'd break it", text: "Self-assess (ask the owner), Examine (read the paperwork), Observe (watch it live), Reperform (try to break it yourself with bad data) — each step gets more rigorous, and rigor should scale with how much risk is riding on the control." }
  ],

  summary: `<p><strong>Four T's</strong>: tolerate, treat, transfer, terminate. <strong>Four control types</strong>: preventive, detective, corrective, directive — key (primary) controls stand alone, non-key (secondary) controls only supplement them; automated controls add Type 1/2 error risk and shift failures from frequent-small to rare-severe; avoid 'optimistic' (over-dependent) and 'collective' (diffused-responsibility) control patterns, and don't just pile on more of the same control type after a failure. <strong>Four control-testing methods</strong>: self-assessment (low-risk only), examination (automated controls), observation (key controls, live), reperformance (re-run with sample/erroneous data, also used in model validation) — rigor and frequency scale with risk severity. <strong>Human error taxonomy</strong>: slip (involuntary, workspace fix) / rule-based mistake (voluntary, fix the rule) / knowledge-based mistake (voluntary, better training/docs) / violation (voluntary AND deliberate — not a mistake, needs supervision/detection). Prevention through design and improvement cycles: DMAIC (Lean Six Sigma), PDSA (quality improvement). New products/initiatives vetted via NPAP/NIRAP (five-part business case: objective, alternatives, benefits, commercial aspects, risks); M&A means inheriting risks that are only fully knowable post-close. <strong>BCM</strong>: speed, competence, transparency; four phases (crisis→emergency response→recovery→restoration), recovery measured by RPO (data loss) and RTO (downtime). <strong>Insurance</strong> trades premium for reduced volatility (self-insure small losses, insure tail events); <strong>outsourcing</strong> transfer is case-specific (transfer vs. sharing); <strong>reputation management</strong> splits into prevention and mitigation, with crisis communication following the three R's: Regret, Reason, Remedy.</p>`,

  quiz: [
    {
      q: "A bank's IT team detects a data breach within minutes and immediately reassigns backup servers so account access continues without interruption. Which internal control type does this action best represent?",
      options: ["Preventive control", "Detective control", "Corrective control", "Directive control"],
      answer: 2,
      why: "Reassigning backup servers AFTER the breach was already detected to reduce the negative impact is a corrective control (like a BCP or backup restoration). It's tempting to call this 'detective' since detection is mentioned, but the action being asked about is the response that limits damage after the event, not the alarm itself — that's corrective by definition."
    },
    {
      q: "Following a fraud incident caused by a single reviewer rubber-stamping transaction approvals under deadline pressure, management responds by requiring a SECOND reviewer to also sign off on every transaction, with no other changes. What weak-control pattern does the ORIGINAL failure best represent, and is management's fix likely to work?",
      options: [
        "Collective control; the fix is likely to work because two reviewers catch more errors than one",
        "Optimistic control; the fix is risky because it may create a new collective control where each reviewer relies on the other",
        "Automated control failure; the fix correctly addresses a Type 1 error",
        "Directive control failure; the fix correctly converts it into a preventive control"
      ],
      answer: 1,
      why: "A single reviewer signing off superficially under time pressure is the textbook 'optimistic control' (highly dependent on one individual, superficial). Simply adding a second signer without redesigning the process risks creating a 'collective control' problem instead, where each reviewer assumes the other will catch mistakes — accountability gets diffused rather than strengthened, especially if both reviewers sit at the same hierarchy level. The other options misclassify the scenario as automated-control or directive-control issues, which it isn't."
    },
    {
      q: "A trader who correctly understands her firm's compliance rules deliberately routes a client order through an unauthorized venue to earn a personal bonus tied to execution speed, despite knowing this violates policy. How should this be classified, and what is the appropriate remedy?",
      options: [
        "A knowledge-based mistake; remedy is better training on venue selection",
        "A rule-based mistake; remedy is to fix the flawed venue-selection rule",
        "A violation; remedy is stronger supervision and detection, not training",
        "A slip; remedy is better workspace design and clearer accountability"
      ],
      answer: 2,
      why: "She knew the correct rule and chose to break it deliberately for personal gain — this is a violation, which is explicitly NOT classified as an error/mistake in the taxonomy. Because ignorance isn't the cause, training or documentation fixes (the tempting answers for 'mistake' options) won't help; the appropriate remedy is supervision and detection tools like audit trails, not education."
    },
    {
      q: "A bank wants to test whether its automated wire-transfer reconciliation control is properly designed, using a testing method suited to automated controls' limited scope, based on documentation and a written summary of results. Which control-testing method is this?",
      options: ["Self-assessment", "Examination", "Observation", "Reperformance"],
      answer: 1,
      why: "Examination involves reviewing documentation of the control process together with a written summary of testing results, and its limited scope makes it best suited to automated controls. Observation (watching live) is used for key controls and is more resource-intensive than the scope described here; self-assessment lacks objectivity and reperformance involves actually re-running the control on sample transactions, neither of which matches 'documentation plus written summary.'"
    },
    {
      q: "A firm suffers a ransomware attack. Its systems are down for 18 hours before full operations resume, and the firm determines it can tolerate losing at most 4 hours of transaction data. Which pair correctly labels these two tolerances?",
      options: [
        "18 hours = RPO; 4 hours = RTO",
        "4 hours = RPO; 18 hours = RTO",
        "Both figures are examples of RPO, since both relate to the recovery phase",
        "Both figures are examples of RTO, since both measure elapsed time"
      ],
      answer: 1,
      why: "Recovery Point Objective (RPO) measures how much DATA loss is tolerable — the 4-hour figure. Recovery Time Objective (RTO) measures how long the business can endure DOWNTIME before operations must resume — the 18-hour figure (or, more precisely, the maximum acceptable value the firm sets, against which the 18-hour actual outcome would be compared). Swapping them, or lumping both together as 'elapsed time,' is the common trap since both numbers are in hours and easy to confuse without anchoring on what each one actually measures (data vs. downtime)."
    },
    {
      q: "A large bank purchases insurance against cyberattack losses but self-insures against small, routine transaction-processing errors. Which statement best explains this pattern, and what is the biggest limitation of the insurance the bank DOES buy?",
      options: [
        "Insurance is bought for predictable, high-frequency losses; the limitation is that insurers never pay out on any claim",
        "Insurance is bought for tail-risk, high-severity events where premiums are justified; the limitation is that payouts may be delayed, creating a potential liquidity crunch",
        "Self-insurance is used because banks are legally barred from insuring cyber risk; the limitation is regulatory, not financial",
        "Insurance fully transfers all risk with no residual dependency on the insurer once the policy is purchased"
      ],
      answer: 1,
      why: "Banks self-insure small, frequent losses because the premium cost (plus administrative overhead) can exceed the expected benefit at that scale, and instead buy insurance for tail events like cyberattacks where potential severity justifies the premium. Insurance is never a full risk transfer, though — the insured still depends on the insurer's willingness and ability to pay, and compensation can take months to arrive, which can create a liquidity crunch in the meantime. The other options invent a legal bar that doesn't exist in the source and mischaracterize insurance as either always failing to pay or fully risk-free once purchased."
    }
  ],

  sources: [
    { title: "Operational risk management (overview)", url: "https://en.wikipedia.org/wiki/Operational_risk_management", note: "Background on the internal-controls and risk-response vocabulary this reading builds on." },
    { title: "Internal control — Investopedia", url: "https://www.investopedia.com/terms/i/internalcontrols.asp", note: "Plain-language explanation of preventive/detective/corrective control concepts used across accounting and risk management." },
    { title: "Business continuity planning — Investopedia", url: "https://www.investopedia.com/terms/b/business-continuity-planning.asp", note: "Context for BCM/BCP, disaster recovery, and the crisis-response phases covered in this reading." },
    { title: "Lean Six Sigma — Wikipedia", url: "https://en.wikipedia.org/wiki/Lean_Six_Sigma", note: "Background on the DMAIC cycle referenced as a process-improvement framework for reducing operational error." }
  ],

  pdf: { book: 3, query: "There are four ways to respond to risk: (1) tolerate" }
});
