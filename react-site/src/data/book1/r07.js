export default ({
  book: 1, reading: 7,
  session: "Correlation Risk",
  title: "Correlation Basics",
  tagline: "Study Session 1 treated correlation as an input you already have. This reading asks where that number actually comes from, how you'd price a bet on correlation itself, and how correlation misunderstanding helped cause 2008.",

  teaches: `<p>This reading surveys correlation as a risk in its own right, not just an input you plug into a VaR formula. It walks through five things. First, the portfolio mean/variance foundation from Markowitz, with a worked numeric example computing variance, covariance, and correlation from raw price data, so you see where a correlation number actually comes from. Second, wrong-way risk (WWR) in credit default swaps (CDS), using a concrete example of a U.S. investor buying protection on French government bonds from Deutsche Bank. Third, correlation options and correlation swaps, including the exchange option, the quanto option, and a fully worked correlation-swap payoff. Fourth, how correlation feeds directly into the VaR capital charge banks must hold. Fifth, the 2008 correlation-trading mechanism: hedge funds long the CDO equity tranche and short the CDO mezzanine tranche, who lost money on <em>both</em> legs when GM and Ford were downgraded to junk in May 2005, plus concentration and systemic risk. Readings 8 and 9 go deep on the empirics (how correlation actually behaves over time) and the modeling machinery (copulas) that this reading only gestures at.</p>`,

  why: `<p>Diversification is the only "free lunch" in finance, but its size depends entirely on correlation, which is not a fixed physical constant like the speed of light. It moves, sometimes violently, and it tends to move in the direction that hurts you most: correlations that sit low in calm markets have a habit of spiking toward 1 in a crisis, exactly when you need diversification to work. Traders also built entire product lines betting explicitly on correlation itself: correlation swaps, correlation options, CDO tranche trades, all treating correlation as an asset with its own price. When those bets went wrong in May 2005 and again in 2008, correlation misunderstanding sat at the center of the losses, not off to the side. Rating agencies, risk managers, and regulators all used copula correlation models that turned out not to capture how tranche correlations actually move together during stress. This reading is the origin story for why correlation gets its own three-reading study session (Readings 7 through 9) before the curriculum even reaches portfolio credit risk.</p>`,

  intuition: `<p>Correlation shows up in two very different guises. First, as an input that shrinks portfolio risk, the diversification benefit you already used in Reading 1's and Reading 5's VaR formulas. Second, as an asset in itself, something a trading desk can buy, sell, and take a directional view on, the way you'd take a view on an interest rate or a stock price. Wrong-way risk is the nasty case where these two roles collide. You bought a CDS from Deutsche Bank to insure against France defaulting, thinking of the CDS as a hedge (role one), but if Deutsche Bank's own fortunes are positively correlated with France's, the CDS itself carries hidden correlation risk (role two): your hedge's payout probability is correlated with your hedge's ability to pay, so the insurance evaporates exactly when you need it. Every other piece of this reading, correlation options, correlation swaps, the CDO tranche trade, is really the same idea in different clothes. Someone is either receiving a diversification benefit that depends on correlation staying low, or someone has structured a product whose value moves directly with the correlation number itself.</p>`,

  visual: `<div class="widget" data-widget="divers"></div>`,

  formulas: [
    {
      name: "Two-asset portfolio variance",
      math: "\\sigma_{P}^{2} = w_{X}^{2}\\sigma_{X}^{2} + w_{Y}^{2}\\sigma_{Y}^{2} + 2w_{X}w_{Y}\\sigma_{X}\\sigma_{Y}\\rho",
      note: "The foundation formula. Every diversification, VaR, and factor-correlation argument in the curriculum traces back to this.",
      plain: "Portfolio variance isn't just the weighted average of the two assets' variances. It has a third term, driven entirely by correlation \\(\\rho\\), that can push total risk up (when \\(\\rho\\) is high and positive) or pull it down (when \\(\\rho\\) is low or negative) relative to that weighted average.",
      derivation: `<p>Start from the definition of the return on a two-asset portfolio: \\(R_P = w_X R_X + w_Y R_Y\\). Variance is the expected squared deviation from the mean, so:</p>
      <p>\\[ \\sigma_P^{2} = \\text{Var}(w_X R_X + w_Y R_Y) \\]</p>
      <p>Variance of a sum expands using the rule \\(\\text{Var}(aA+bB) = a^{2}\\text{Var}(A) + b^{2}\\text{Var}(B) + 2ab\\,\\text{Cov}(A,B)\\):</p>
      <p>\\[ \\sigma_P^{2} = w_X^{2}\\sigma_X^{2} + w_Y^{2}\\sigma_Y^{2} + 2w_Xw_Y\\,\\text{Cov}(X,Y) \\]</p>
      <p>Finally substitute the definition of correlation, \\(\\rho = \\dfrac{\\text{Cov}(X,Y)}{\\sigma_X\\sigma_Y}\\), so \\(\\text{Cov}(X,Y) = \\sigma_X\\sigma_Y\\rho\\), which gives the formula above. This is exactly why correlation, not covariance directly, is the number traders and risk managers quote. It's the standardized, unit-free version of "how much do these two assets move together," bounded between −1 and +1, so a −0.75 always means the same thing regardless of which two assets you're looking at.</p>`
    },
    {
      name: "Correlation coefficient (from covariance)",
      math: "\\rho_{X,Y} = \\dfrac{\\text{Cov}(X,Y)}{\\sigma_X\\sigma_Y}",
      note: "Standardizes covariance into a unit-free number between −1 and +1 so correlations can be compared across any pair of assets.",
      plain: "Correlation is covariance rescaled by the two assets' own volatilities, which is what lets you compare 'how much do these two move together' across completely different asset pairs on the same −1-to-+1 scale."
    },
    {
      name: "Correlation swap payoff",
      math: "\\text{Notional}\\times(\\rho_{\\text{realized}} - \\rho_{\\text{fixed}})",
      note: "A pure bet on realized average pairwise correlation vs a fixed strike.",
      plain: "The correlation swap buyer profits dollar-for-dollar (scaled by notional) for every point that the realized correlation over the life of the trade comes in above the fixed rate agreed at inception. It works the same way an interest rate swap exchanges a floating rate for a fixed one, just applied to correlation instead."
    },
    {
      name: "Basel trading-book capital charge",
      math: "\\text{Capital} \\geq 3 \\times \\text{VaR}_{10\\text{-day}}",
      note: "The Basel Committee on Banking Supervision (BCBS) multiplier applied to 10-day VaR for trading-book assets (stocks, futures, options, swaps marked to market).",
      plain: "Regulators don't let a bank hold capital equal to its own model's VaR estimate. They require at least three times that number, a built-in buffer against the model itself being wrong, including about correlation."
    }
  ],

  concepts: [
    {
      name: "Financial correlation risk (definition and scope)",
      def: "Correlation risk is the risk of financial loss resulting from adverse changes in the correlation between financial or nonfinancial assets. It splits into static correlations (fixed for a given measurement period, e.g. the correlation matrix inside a VaR calculation, copula correlations for CDOs, the binomial default correlation model) and dynamic correlations (measuring comovement as it evolves over time, e.g. pairs trading, deterministic and stochastic correlation models).",
      intuition: "The key mental shift from Reading 1 is that correlation isn't a fixed physical constant you look up once. It's itself a source of loss when it moves against you, the same way an interest rate or a stock price can move against you.",
      example: "The negative correlation between interest rates and commodity prices means that when rates rise, commodity investments can lose value even if nothing about commodities themselves changed. In the 2012 Greek crisis, the positive correlation between Mexican and Greek sovereign bonds caused losses for Mexican bond investors purely because of contagion, not Mexican fundamentals. A low U.S. GDP print similarly hits Asian and European exporters who depend on U.S. demand. Correlation risk isn't limited to financial assets.",
      pitfall: "Don't treat 'correlation' as always meaning 'stock-to-stock correlation.' The exam tests correlation risk across market risk, credit risk (migration and default risk), systemic risk, and concentration risk, and across financial and nonfinancial assets alike.",
      related: [{ r: 1, label: "R1: the risk being diversified" }, { r: 81, label: "R81: factor correlations reuse this exact logic" }]
    },
    {
      name: "Portfolio mean/variance foundation",
      def: "\\(\\sigma_P^{2}\\) = \\(w_X^{2}\\sigma_X^{2}\\) + \\(w_Y^{2}\\sigma_Y^{2}\\) + \\(2w_Xw_Y\\sigma_X\\sigma_Y\\rho\\). The return/risk ratio improves as \\(\\rho\\) falls.",
      intuition: "Covariance captures both how much two assets move and whether they move in the same or opposite direction. For each period you multiply asset X's deviation from its own mean by asset Y's deviation from its own mean, so when both sit above their means together (or both below together) the product is positive, and when one is above while the other is below the product is negative. Sum those products across periods and divide by (n − 1) observations, and you get covariance. Divide covariance by \\(\\sigma_X\\sigma_Y\\) and you get the correlation coefficient, a standardized, unit-free version bounded between −1 and +1.",
      example: "Markowitz's original worked example: an analyst computes returns for two assets X and Y with average returns \\(\\mu_X = 0.3019\\) and \\(\\mu_Y = 0.2032\\), standard deviations \\(\\sigma_X = 0.4207\\) and \\(\\sigma_Y = 0.4068\\), and covariance −0.1284, giving correlation \\(\\rho = -0.1284/(0.4207\\times0.4068) = -0.7501\\). For an equally weighted portfolio, \\(\\mu_P = 0.2526\\) and \\(\\sigma_P = 0.1464\\), so the return/risk ratio is \\(0.2526/0.1464 = 1.725\\), or 172.5%. At \\(\\rho = -0.9\\) the return/risk ratio would exceed 250%; at \\(\\rho = +0.9\\) it falls to near 50%. Same two assets, radically different diversification payoff, purely as a function of \\(\\rho\\).",
      pitfall: "This is a smooth, continuous relationship, not a step function. Diversification benefit exists well before \\(\\rho\\) reaches −1. A drop from 0.9 to 0.5 already meaningfully improves the ratio, so don't assume benefit only appears at extreme negative correlation.",
      related: [{ r: 1, label: "R1: the risk being diversified" }, { r: 81, label: "R81: factor correlations reuse this exact logic" }]
    },
    {
      name: "Wrong-way risk (WWR) in CDS",
      def: "The reference asset and the CDS-seller counterparty are positively correlated, so the CDS is most likely to be needed exactly when the seller is least able to pay.",
      intuition: "You bought insurance from a company whose fortunes rise and fall with the very thing you insured. The payout and the payer's solvency turn out to be the same bet, just wearing different clothes.",
      example: "An investor holds $1 million of French government bonds and worries about France defaulting. The investor (the CDS buyer, or protection buyer) buys a CDS from Deutsche Bank (the CDS seller, or protection seller), transferring the default risk to Deutsche Bank in exchange for a periodic fixed CDS spread. Assuming zero recovery rate, if France defaults the investor is protected: Deutsche Bank pays the investor $1 million. But the CDS spread itself is priced off both France's default probability and the joint default correlation between France and Deutsche Bank. If that correlation is positive, the investor has wrong-way risk. The same macro shock that pushes France toward default (say, a Eurozone banking crisis) also weakens Deutsche Bank, a large European bank. In the true worst case, both France and Deutsche Bank default together and the investor loses the entire $1 million with no protection ever paid out.",
      pitfall: "The CDS spread-vs-correlation relationship is non-monotonic. For correlation between roughly −1 and −0.4, the spread can actually rise slightly, because a strongly negative correlation implies that France or Deutsche Bank defaults, but not both. So if Deutsche Bank alone defaults, the investor still holds unprotected exposure to France and must repurchase protection at a new, likely higher, spread. Simultaneous default becomes nearly impossible at extreme negative correlation, but replacement-cost risk after a single default still bites.",
      related: [{ r: 32, label: "R32: wrong-way risk generalized to all counterparty exposure" }, { r: 37, label: "R37: CVA's wrong-way adjustment" }],
      memory: "WWR = 'the fire insurance company is next door to the fire.'"
    },
    {
      name: "Correlation options and correlation swaps",
      def: "For almost every multi-asset correlation strategy, LOWER correlation → HIGHER option price (more dispersion, better chance of a favorable payout).",
      intuition: "Correlation options (also called multi-asset options) are options whose payoff depends on the joint movement of two or more underlying assets: a basket option, a spread option, or an exchange option (the right to swap asset 1 for asset 2, payoff \\(\\max(0, S_2 - S_1)\\)). A low correlation between the two assets means they're more likely to diverge, one going up while the other goes down, which widens the expected spread between them and improves the chance of a favorable payout for most of these structures. Take the exchange option specifically: its implied volatility is driven by the volatility of the ratio \\(S_2/S_1\\), and that ratio barely moves when the two assets move together (high \\(\\rho\\)), so the option is worth almost nothing near \\(\\rho = 1\\). As \\(\\rho\\) falls, the ratio becomes more volatile and the option price rises.",
      example: "Correlation swap: buyer pays fixed 0.2, notional $1M, 3 assets, realized pairwise correlations of daily log returns \\(\\rho_{2,1}=0.6\\), \\(\\rho_{3,1}=0.2\\), \\(\\rho_{3,2}=0.04\\), giving a realized \\(\\rho\\) of 0.28 and a payoff of $1M×(0.28−0.20) = $80,000. A quanto call on the Nikkei index (a fixed-exchange-rate call that lets a U.S. investor convert Japanese yen gains to dollars at a pre-set rate) is worth more when the correlation between the Nikkei level and the yen/dollar rate is low, because the seller (the bank writing the quanto) faces more uncertainty about how much yen it will need to deliver dollars at the fixed rate. That uncertainty gets priced into the option.",
      counter: "The one notable exception is an option on the worse-of two assets (payoff = the minimum of the two asset prices). There, lower correlation reduces the price, because more dispersion increases the chance that at least one of the two assets performs badly, which is exactly what hurts a worse-of payoff. Quanto options don't break the pattern: lower correlation between underlying and FX rate still means a higher quanto price.",
      pitfall: "Memorize the exception, not just the rule. 'Lower correlation, higher price' fails for worse-of options specifically.",
      related: ["Portfolio mean/variance foundation"]
    },
    {
      name: "Correlation swap mechanics",
      def: "A correlation swap exchanges a pre-agreed FIXED correlation rate for the REALIZED (also called stochastic) correlation that actually occurs over the life of the trade, computed as the average of all pairwise correlations across the underlying assets.",
      intuition: "Structurally it's the same idea as an interest rate swap or a variance swap: one side locks in a number today, the other side's payoff floats with whatever the market actually delivers. 'Buying correlation' means you profit when realized correlation comes in higher than the fixed rate you agreed to pay.",
      example: "You can also buy correlation synthetically without a dedicated correlation swap. One way: buy call options on a stock index (say, the S&P 500) and sell call options on the individual stocks inside it. If correlation among the constituent stocks rises, the index option's implied volatility rises more than the sum of the individual stock options, so the position gains. Another way: pay fixed on a variance swap on the index while receiving fixed on variance swaps on the individual securities. A rise in constituent correlation raises index variance, which benefits the fixed-variance payer (the buyer) on that leg.",
      pitfall: "Don't confuse 'buying correlation' with 'buying volatility.' They can move together in a crisis, but the correlation swap payoff is defined purely off the realized-vs-fixed correlation spread, not off the level of volatility itself.",
      related: [{ r: 1, label: "R1: the correlation input the swap is betting on" }]
    },
    {
      name: "VaR and correlation",
      def: "VaR increases as correlation between portfolio assets increases. Diversification benefit shrinks as \\(\\rho\\)→1. Basel requires capital ≥ 3× the 10-day VaR for trading-book assets.",
      intuition: "The variance-covariance (delta-normal) method for VaR is \\(\\text{VaR} = \\alpha\\,\\sigma_P\\sqrt{x}\\), where \\(\\alpha\\) is the z-value for the chosen confidence level and \\(x\\) is the number of trading days. \\(\\sigma_P\\) is exactly the two-asset portfolio standard deviation above, so every correlation assumption baked into the covariance matrix flows straight through into the regulatory capital number.",
      example: "$8M asset A \\((\\sigma =1.5\\)%), $4M asset B \\((\\sigma =2\\)%), \\(\\rho =0.6\\), 99% confidence (z=2.33), 10-day horizon. Build the 2×2 covariance matrix from these inputs, get the portfolio \\(\\sigma_P\\), compute 1-day VaR, then scale by \\(\\sqrt{10}\\) for the 10-day VaR of roughly $1.325M. The Basel-required capital charge comes out to about 3×$1.325M ≈ $3.97M. The trading book covered by this multiplier includes any assets marked to market: stocks, futures, options, and swaps.",
      pitfall: "The capital charge is a multiple of a number that is itself sensitive to a correlation assumption the bank chose. If the correlation input is wrong (too low), both the VaR estimate and the capital cushion built on top of it come in too low, precisely the failure mode regulators worry about.",
      related: [{ r: 1, label: "R1: the VaR formula being fed correlated inputs" }, { r: 5, label: "R5: diversified vs undiversified VaR" }]
    },
    {
      name: "Correlation and the 2008 crisis: the CDO tranche mechanism",
      def: "Hedge funds went long the CDO equity tranche, short the mezzanine tranche, believing the position was correlation-hedged.",
      intuition: "A collateralized debt obligation (CDO) pools debt (commonly residential mortgages) and slices the pooled cash flows into tranches by seniority. The equity tranche is the riskiest slice, typically absorbing the first 3% of defaults in the pool; the mezzanine tranche sits just above it, absorbing the next 4% (from 3% to 7%). Because it's the first-loss piece, the equity tranche pays the highest spread; because losses have to eat through equity first, the mezzanine tranche is considered safer and pays a lower spread. Hedge funds went long equity (collecting the high spread, betting on few defaults) and short mezzanine (paying the lower spread, betting the tranche stays money-good), a trade that on paper looks correlation-hedged because both legs reference the same underlying pool. It relied on the Gaussian copula correlation model to price and manage default correlation across roughly 125 assets in a typical CDO, meaning up to \\(125\\times124/2 = 7{,}750\\) pairwise correlations to estimate.",
      example: "In May 2005, rating agencies downgraded General Motors and Ford to junk bond status. Equity tranche spreads increased dramatically, a loss on the long leg, because the spread the fund had locked in was now below the new market spread. Meanwhile mezzanine tranche correlations decreased for investment-grade CDOs, which lowered mezzanine tranche spreads too. The short leg needed spreads to rise to profit (a short position gains when the price it pays falls, meaning when spreads rise), but instead the spread the fund had to pay was now above the market level, so it lost money there as well. Both legs lost simultaneously, the opposite of what a hedge is supposed to do.",
      pitfall: "The root cause: tranche correlation dynamics were poorly understood by the copula models in use (R9). Bonds within the same credit-quality band tend to be more highly correlated with each other than bonds across quality bands, and that within-tranche correlation shift is exactly what moved against both legs at once. This is a frequently tested scenario question, so know the direction of both legs' moves.",
      related: [{ r: 9, label: "R9: the Gaussian copula models that failed here" }, { r: 28, label: "R28: structured credit tranche mechanics" }],
      memory: "Both legs lost. A 'hedge' that hedges nothing once correlation itself moves against you."
    },
    {
      name: "The wider 2008 correlation story: systemic risk and market scale",
      def: "Beyond the tranche trade itself, correlation misunderstanding compounded through market growth, leverage, and a systemic collapse in which previously uncorrelated or negatively correlated assets suddenly moved together.",
      intuition: "Systemic risk is the risk that the entire financial system, not just one firm, collapses, and it shows up as a correlation phenomenon: assets that behaved independently in calm markets become highly positively correlated in a crisis, exactly when investors are counting on diversification to protect them.",
      example: "The CDO market grew from $64 billion (2003) to $455 billion (2006), and the CDS market grew from $8 trillion to $60 trillion between 2004 and 2007. AIG sold $500 billion in CDS protection with little reinsurance and couldn't make good on its obligations when defaults rose. Lehman Brothers carried leverage of 30.7 times equity in September 2008 with 8,000 different derivatives counterparties, and filed for bankruptcy that month. From October 2007 to March 2009 the Dow Jones Industrial Average fell over 50%, and only 11 of the 500 stocks in the S&P 500 rose. The other 489 fell together, illustrating correlations across the entire market converging toward 1.",
      pitfall: "Don't treat the CDO tranche trade as the whole 2008 correlation story. The exam also tests systemic risk (correlations spiking together across the whole market), the sheer scale of counterparty exposure (AIG, Lehman), and how new copula models plus regulatory blind spots on leverage all fed the same underlying failure to understand correlation risk.",
      related: [{ r: 9, label: "R9: Gaussian copula and joint default probability" }, { r: 32, label: "R32: counterparty exposure and wrong-way risk at scale" }],
      memory: "2007–09 in one line: correlations that looked low and stable in a calm market snapped toward 1 exactly when everyone needed them to stay low."
    },
    {
      name: "Correlation, concentration & systemic risk",
      def: "Concentration ratio = 1/(number of equally-sized exposures). Lower concentration ratio AND lower default correlation BOTH reduce joint (worst-case) probability of default.",
      intuition: "Concentration risk is the loss that can arise from exposure to multiple counterparties within a specific group, say a bank whose loan book is dominated by a handful of borrowers, or a single industry. The concentration ratio measures how spread out that exposure is: a bank with 100 equal-size loans has a concentration ratio of 1/100 = 0.01 (well diversified by count); a bank with a single loan has a ratio of 1/1 = 1.0 (fully concentrated). But the ratio only counts names, not whether those names default together. That's what default correlation adds.",
      example: "A $5M loan to Company A alone, 5% PD, LGD 100%, concentration ratio 1.0. Worst case is A defaults, so EL = 0.05 × $5,000,000 = $250,000. Split into a $2.5M loan to A and a $2.5M loan to B, each still 5% PD, concentration ratio now 0.5, but with default correlation assumed at 1.0, the worst case (both default together) has the same joint probability as the single-loan case, so EL is still $250,000. Splitting the exposure changed nothing, because the two loans are glued together by perfect correlation. Drop the default correlation to 0.5 and EL falls; drop it to 0 (fully independent defaults) and EL falls all the way to $12,500, since the joint probability of both A and B defaulting independently is just \\(0.05\\times0.05=0.0025\\), giving EL = 0.0025 × $5,000,000 = $12,500.",
      pitfall: "Diversifying the number of exposures (lower concentration ratio) does nothing by itself if correlation stays at 1. You need both lower concentration and lower default correlation for the worst-case loss to actually fall. Historical evidence backs why correlation doesn't fall for free: default correlations tend to run higher within an industry than across industries (if Chrysler defaults, Ford and GM become more likely to default too, not less), so genuine diversification means spreading exposure across industries, not just across more borrowers in the same industry. The energy sector is a noted exception with little or no correlation to the rest of the market.",
      related: [{ r: 27, label: "R27: portfolio credit risk formalizes this with the single-factor model" }],
      memory: "Splitting one big loan into many correlated small loans is diversification theater. EL stays unchanged until correlation actually drops."
    }
  ],

  connections: {
    from: [
      { r: 5, why: "Diversified VaR needed a correlation matrix as an input; this reading asks where that number actually comes from and what it costs to get wrong." }
    ],
    to: [
      { r: 8, why: "The empirical behavior of correlation (regimes, mean reversion) is the next natural question after establishing it matters." },
      { r: 9, why: "Copulas are the actual machinery for building joint distributions once you accept correlation is central and messy." },
      { r: 27, why: "Default correlation and concentration ratio reappear as the core drivers of portfolio credit risk tails." }
    ],
    confused: [
      { what: "Wrong-way risk vs simple counterparty risk", how: "Ordinary counterparty risk is 'can they pay'; wrong-way risk specifically means their ability to pay is CORRELATED with the very event that triggers your claim." },
      { what: "Concentration ratio vs default correlation", how: "Concentration ratio is about the NUMBER/size distribution of exposures; default correlation is about how those exposures move together. Both must fall together to meaningfully reduce worst-case loss." },
      { what: "Static vs dynamic financial correlation", how: "Static correlations (VaR covariance matrices, CDO copula correlations, the binomial default correlation model) are measured as a fixed value for one period; dynamic correlations (pairs trading, stochastic correlation processes) explicitly model how comovement changes over time. This reading's tools are mostly static, and Reading 8 is where the dynamic behavior gets covered." }
    ]
  },

  misconceptions: [
    { wrong: "\"Diversification benefit only exists near \\(\\rho\\) = −1.\"", right: "It's continuous. Even modest reductions (0.9→0.5) meaningfully improve the return/risk ratio, so don't wait for extreme correlation to expect benefit." },
    { wrong: "\"Lower correlation always raises a correlation-sensitive option's price.\"", right: "True for most multi-asset payoffs, but reversed for options on the worse-of two assets, and for quanto options the relevant correlation is between the underlying and FX." },
    { wrong: "\"Splitting a large exposure into many smaller ones always reduces expected loss.\"", right: "Only if default correlation also falls. At correlation = 1, splitting changes nothing: EL is identical to the single large exposure." },
    { wrong: "\"The 2008 CDO tranche trade lost money because the long leg alone went bad.\"", right: "Both legs lost simultaneously. Mezzanine correlation fell (lowering its spread, hurting the short position) while equity spreads rose (hurting the long position). The 'hedge' failed on both sides at once." },
    { wrong: "\"Wrong-way risk means the counterparty is simply likely to default.\"", right: "Wrong-way risk is specifically about the correlation between the reference asset's performance and the counterparty's solvency. A counterparty could have a high standalone default probability with zero wrong-way risk if that probability is uncorrelated with what you're being protected against." }
  ],

  highYield: [
    { stars: 5, what: "The 2008 correlation-trading mechanism: which leg moved which way and why.", why: "A frequently tested scenario question requiring you to track two simultaneous, counter-intuitive moves." },
    { stars: 5, what: "Portfolio variance formula and the continuous nature of diversification benefit.", why: "Foundational: feeds VaR, factor theory, and credit portfolio questions across the whole curriculum." },
    { stars: 4, what: "Wrong-way risk definition and the non-monotonic spread-correlation relationship.", why: "Reused conceptually in counterparty risk (Book 2) and CVA." },
    { stars: 4, what: "Concentration ratio + default correlation jointly determining EL (the worked $5M/$2.5M example).", why: "A clean numeric example that GARP likes to vary." },
    { stars: 3, what: "Correlation options: general rule + the worse-of exception + quanto direction.", why: "Memorize the exception — it's the trap." },
    { stars: 3, what: "Correlation swap payoff calculation (fixed vs realized correlation, notional scaling).", why: "A direct plug-and-chug calculation GARP has tested with different notionals and asset counts — practice recomputing realized correlation from pairwise inputs." }
  ],

  recall: [
    { q: "Why is wrong-way risk described as insurance that evaporates exactly when needed?", a: "The CDS protection seller's solvency is positively correlated with the reference entity's default — so the moment the reference defaults (protection is needed), the seller is also more likely to be unable to pay." },
    { q: "In the 2008 tranche trade, why did the mezzanine (short) leg lose money instead of gaining?", a: "Mezzanine tranche correlation FELL after the GM/Ford downgrade, which lowered mezzanine spreads. A short position profits when spreads RISE; falling spreads meant the short leg lost money too — the opposite of what the 'hedge' was supposed to do." },
    { q: "A bank splits a $10M loan into ten $1M loans, same total PD, but default correlation stays at 1.0. Does expected loss change?", a: "No — at correlation 1, the ten small loans behave exactly like the one large loan in every default scenario. Concentration ratio fell but correlation didn't, so worst-case loss is unchanged." },
    { q: "Name the one payoff type where lower asset correlation LOWERS the option price, and explain why.", a: "An option on the worse-of two assets. Lower correlation increases dispersion, raising the chance that AT LEAST ONE asset performs badly — which is exactly the scenario that hurts a worse-of payoff, so the price falls rather than rises." },
    { q: "Why does the exchange option's price fall toward zero as correlation between the two underlying assets approaches 1?", a: "The exchange option's value depends on the volatility of the ratio S2/S1. When the two assets are highly correlated they move together, so the ratio barely changes and the spread between them stays narrow — there's little chance of a payout, so the option is worth almost nothing." },
    { q: "In the concentration-ratio example, why does expected loss fall from $250,000 to $12,500 when default correlation drops from 1.0 to 0 (keeping concentration ratio and individual PDs fixed)?", a: "At correlation 1.0 the two loans default together with the same probability as the single large loan (5%), so EL matches the single-loan case. At correlation 0, the two 5% PDs are independent, so the joint (worst-case, both-default) probability is 0.05 × 0.05 = 0.0025, giving EL = 0.0025 × $5,000,000 = $12,500 — dramatically lower because both companies defaulting together is now a rare coincidence rather than a shared fate." }
  ],

  hooks: [
    { title: "Two lost legs", text: "2008's tranche trade: 'long equity, short mezz, correlation-hedged' sounds safe. Remember it as TWO SEPARATE LOSSES: equity spreads UP (long leg loses), mezz spreads DOWN (short leg loses too). A hedge where both legs lose is the whole lesson." },
    { title: "Insurance next door to the fire", text: "Wrong-way risk: your insurer's office is next door to the building you insured. When it burns, so does your insurer's ability to pay." },
    { title: "Splitting doesn't help if they're glued together", text: "Ten loans glued by correlation=1 behave like one loan. Diversification needs both MORE names AND LOWER correlation — one alone is theater." }
  ],

  eli5: `<p>Imagine two umbrella-selling friends, one who works downtown and one at the beach. If it rains everywhere on the same day, both friends make money together and both lose money together on sunny days — that's high correlation, and pooling their earnings barely smooths anything out. Now imagine instead a friend who sells umbrellas and a friend who sells sunscreen: rain is bad for one and good for the other, so pooling their earnings gives you a much steadier combined income — that's negative correlation, and it's the "free lunch" of diversification. Wrong-way risk is the sneaky version of this: suppose you buy rain insurance from a company that is itself owned by an umbrella factory — on the worst rainy days, the factory (and its insurance arm) is drowning in claims from everyone at once and might not be able to pay you either, so your insurance is least reliable exactly when you need it most. In finance, the "friends" are assets or a reference bond and its CDS seller, and "rain" is a default or a market crash — correlation is what determines whether your hedge actually protects you or quietly fails alongside the very risk it was supposed to cover.</p>`,

  thinkLike: `<p>A risk manager reading this material never asks "what is the correlation?" as if it were a single fixed number to look up — they ask "what is this correlation TODAY, under CALM conditions, and what does it become under STRESS?" because the entire discipline exists precisely because correlations are not stable: assets that look nicely diversifying in a quiet market have a well-documented habit of converging toward 1 exactly when a shock hits, which is the moment diversification benefit is needed most and least available. When a practitioner sees a "hedged" position — long one instrument, short a correlated one — their first move is to ask what specific correlation the hedge depends on staying put, and what event would move that correlation against both legs simultaneously, the way the GM/Ford downgrade moved the CDO tranche trade against both the long equity and short mezzanine legs at once.</p>
  <p>On the exam, GARP tests this reading in two recurring shapes. First, plug-and-chug numeric problems: compute a correlation swap payoff from given pairwise realized correlations and a fixed strike, or compute 10-day VaR (and the resulting 3x capital charge) from a two-asset covariance matrix — these reward simply doing the arithmetic correctly and knowing which formula piece changes with which input. Second, scenario/direction questions, most often the 2008 tranche trade: you are given a downgrade event and asked which leg gained, which lost, and why — the trap is assuming the "hedged" position must have offset, when the entire teaching point is that it didn't. A third, subtler pattern is the "except" question: which correlation-sensitive strategy behaves opposite to the general rule (worse-of options), or which sector behaves opposite to the general default-correlation pattern (energy, largely uncorrelated with the rest of the market) — GARP likes testing the one item that breaks the pattern you just memorized.</p>`,

  breakdown: [
    {
      title: "Five areas where financial correlation risk appears",
      points: [
        "Investments — Markowitz's portfolio theory: correlation between held assets determines diversification benefit and the return/risk ratio.",
        "Trading — correlation-sensitive products (correlation options, correlation swaps, quanto options) whose value is a direct function of the correlation between two or more underlyings.",
        "Risk management — correlation is a core input to VaR and expected shortfall via the covariance matrix, and to credit risk via default correlation.",
        "Global markets — cross-border and cross-asset correlations (e.g., sovereign bond contagion, currency-to-export-market linkages) that can transmit shocks internationally.",
        "Regulation — Basel capital requirements are built directly on VaR, which is itself built on correlation assumptions, so mis-measured correlation flows straight into mis-sized regulatory capital."
      ]
    },
    {
      title: "Static vs dynamic financial correlation measures",
      points: [
        "Static correlations — measured as a fixed value for a specific time period; examples: the covariance matrix behind VaR, copula correlations for CDOs, the binomial default correlation model.",
        "Dynamic correlations — measure how comovement changes over time; examples: pairs trading, deterministic correlation approaches, stochastic correlation processes (the subject of Reading 8's empirical deep-dive)."
      ]
    },
    {
      title: "Multi-asset correlation strategies and the direction of the correlation effect",
      points: [
        "General rule (most multi-asset correlation options: exchange options, basket options, spread options, and similar structures) — LOWER correlation → HIGHER option price, because more dispersion between the two assets improves the chance of a favorable payout.",
        "Exception: option on the worse-of two assets (payoff = min of the two prices) — LOWER correlation → LOWER option price, because dispersion raises the chance that at least one asset performs badly, which directly hurts a worse-of payoff.",
        "Quanto option (protects a domestic investor from foreign-currency risk on a foreign underlying) — LOWER correlation between the underlying and the FX rate → HIGHER quanto price, following the general rule."
      ]
    },
    {
      title: "The 2008 CDO tranche trade: both legs, in order",
      points: [
        "Setup — hedge funds go long the CDO equity tranche (first-loss piece, ~0–3% of pool defaults, highest spread received) and short the CDO mezzanine tranche (~3–7% of pool defaults, lower spread paid), believing the position is correlation-hedged.",
        "Trigger — May 2005: rating agencies downgrade GM and Ford to junk bond status.",
        "Long leg (equity) — equity tranche spreads INCREASE, meaning the spread the fund locked in is now below market, producing a mark-to-market loss on the long position.",
        "Short leg (mezzanine) — mezzanine tranche default correlation for investment-grade CDOs DECREASES, which lowers mezzanine spreads; since a short position needs spreads to rise to profit, falling spreads instead produce a loss on the short position too.",
        "Result — both legs lose money at the same time, the opposite of what a correlation-hedged position is supposed to deliver, because the copula models used to price and manage the hedge did not correctly capture how tranche correlations move relative to each other."
      ]
    },
    {
      title: "Concentration ratio and default correlation: what each one controls",
      points: [
        "Concentration ratio = 1 / (number of equally-sized exposures) — a lower ratio means more names, i.e. more diversification BY COUNT.",
        "Default correlation measures whether those names tend to default together — a lower default correlation means the exposures are more independent.",
        "Worst-case expected loss only falls when BOTH move together: a lower concentration ratio with unchanged (=1) default correlation leaves worst-case EL unchanged, as the worked $5M/$2.5M example shows."
      ]
    }
  ],

  quiz: [
    {
      q: "An investor buys a CDS on French government bonds from Deutsche Bank. Which condition specifically creates wrong-way risk in this trade?",
      options: [
        "Deutsche Bank has a high standalone probability of default",
        "The default probability of France and the default probability of Deutsche Bank are positively correlated",
        "The CDS spread is set too low relative to France's credit rating",
        "Deutsche Bank is domiciled in a different country than France"
      ],
      answer: 1,
      why: "Wrong-way risk is specifically about the correlation between the reference asset's default (France) and the counterparty's (Deutsche Bank's) ability to pay — not Deutsche Bank's standalone default probability in isolation, which could be high or low independent of any correlation to France. The 'CDS spread set too low' and 'different domicile country' answers describe pricing or geographic details that don't define WWR."
    },
    {
      q: "A correlation swap buyer pays a fixed correlation of 0.25 on a $2 million notional. At maturity, the realized average pairwise correlation across the underlying assets is 0.40. What is the buyer's payoff?",
      options: [
        "$150,000 loss",
        "$300,000 gain",
        "$800,000 gain",
        "$500,000 gain"
      ],
      answer: 1,
      why: "Payoff = Notional × (realized − fixed) = $2,000,000 × (0.40 − 0.25) = $2,000,000 × 0.15 = $300,000. The most tempting distractor, the $150,000 loss answer, comes from forgetting to multiply the 0.15 spread back through the full $2 million notional (mistakenly using $1 million); the $800,000 answer misapplies 0.40 directly to the notional instead of the spread."
    },
    {
      q: "In the 2008 CDO tranche trade, hedge funds were long the equity tranche and short the mezzanine tranche. After GM and Ford were downgraded to junk in May 2005, what happened to each leg?",
      options: [
        "Both tranches' spreads rose, so both legs gained",
        "Equity spreads fell and mezzanine correlation rose, so both legs gained",
        "Equity spreads rose (hurting the long leg) and mezzanine correlation fell, lowering mezzanine spreads and hurting the short leg too",
        "Only the equity tranche was affected; the mezzanine tranche was unchanged"
      ],
      answer: 2,
      why: "Equity tranche spreads increased (a loss for the long position, since the locked-in spread was now below market), while mezzanine tranche correlation fell for investment-grade CDOs, lowering mezzanine spreads — which hurt the short position, since a short needs spreads to rise to profit. The 'both tranches' spreads rose' and 'equity spreads fell, mezzanine correlation rose' answers invert the actual direction of the moves; the 'only equity was affected' answer wrongly claims the mezzanine tranche was untouched, when its correlation shift is the entire point of the lesson."
    },
    {
      q: "Which multi-asset correlation strategy is the notable EXCEPTION to the rule 'lower correlation → higher option price'?",
      options: [
        "An exchange option (right to swap one asset for another)",
        "An option on the worse-of two assets",
        "A quanto call option on a foreign equity index",
        "A basket option on multiple correlated stocks"
      ],
      answer: 1,
      why: "An option on the worse-of two assets pays off based on the minimum of the two prices; lower correlation raises dispersion, which raises the chance that at least one asset performs badly — hurting, not helping, a worse-of payoff, so its price falls as correlation falls. Exchange options, quanto options, and basket options all follow the general rule (lower correlation → higher price)."
    },
    {
      q: "Commercial Bank Z makes a $6 million loan to Company A and a $6 million loan to Company B, each with a 5% default probability, LGD 100%, and a default correlation of 1.0 between the two companies. What is the expected loss under the worst-case scenario?",
      options: [
        "$300,000",
        "$600,000",
        "$150,000",
        "$30,000"
      ],
      answer: 1,
      why: "At default correlation 1.0, the two $6M loans behave exactly like a single $12M loan — both default together with the same 5% probability, so EL = 0.05 × $12,000,000 = $600,000. $300,000 (the tempting distractor) mistakenly applies the 5% PD to only one $6M loan instead of the combined $12M exposure; $150,000 and $30,000 come from further arithmetic slips on the notional or the PD."
    },
    {
      q: "A bank's concentration ratio falls from 1.0 (one large loan) to 0.5 (two equal loans) after splitting an exposure, but the default correlation between the two resulting loans remains 1.0. What happens to expected loss under the worst-case scenario?",
      options: [
        "It falls proportionally to the drop in concentration ratio",
        "It falls to zero because the exposure is now diversified",
        "It stays exactly the same as the single large loan",
        "It rises because there are now two separate default events to consider"
      ],
      answer: 2,
      why: "With default correlation held at 1.0, the two smaller loans always default together in the worst case, replicating the single large loan exactly — expected loss is unchanged, as the worked $5M example shows ($250,000 in both the one-loan and correlation-1.0 two-loan cases). A lower concentration ratio only helps if default correlation ALSO falls; it does not fall automatically just because the loan was split, which is why options A, B, and D are all wrong."
    }
  ],

  sources: [
    { title: "Correlation (statistics) — Wikipedia", url: "https://en.wikipedia.org/wiki/Correlation", note: "Background on covariance, the correlation coefficient, and why it is bounded between −1 and +1." },
    { title: "Wrong-Way Risk — Investopedia", url: "https://www.investopedia.com/terms/w/wrong-way-risk.asp", note: "Plain-language explanation of wrong-way risk in derivatives and counterparty exposure, the concept underlying the CDS/Deutsche Bank example." },
    { title: "Collateralized Debt Obligation (CDO) — Investopedia", url: "https://www.investopedia.com/terms/c/cdo.asp", note: "Overview of CDO structure and tranching (equity, mezzanine, senior) that underlies the 2008 tranche-trade mechanism." },
    { title: "Basel III: international regulatory framework for banks — Bank for International Settlements", url: "https://www.bis.org/bcbs/basel3.htm", note: "Primary source on the Basel capital framework, including the trading-book VaR-based capital multiplier discussed in this reading." }
  ],

  pdf: { book: 1, query: "Correlation risk measures the risk of financial loss resulting" },

  summary: `<p><strong>Portfolio variance</strong> \\(\\sigma_P^{2}\\) = \\(w_X^{2}\\sigma_X^{2}\\) + \\(w_Y^{2}\\sigma_Y^{2}\\) + \\(2w_Xw_Y\\sigma_X\\sigma_Y\\rho\\) — diversification benefit is continuous, not step-like. <strong>Wrong-way risk</strong>: reference asset and counterparty solvency positively correlated (e.g. a CDS on French bonds bought from Deutsche Bank); spread-correlation relationship is non-monotonic. <strong>Correlation products</strong>: lower \\(\\rho\\) → higher option price generally, EXCEPT worse-of options (reversed) and quanto options (lower \\(\\rho\\) between underlying/FX → higher price); correlation swaps pay notional × (realized − fixed) correlation. <strong>VaR rises with correlation</strong>; Basel requires capital ≥ 3× 10-day VaR. <strong>2008 mechanism</strong>: long equity tranche + short mezzanine, both legs lost simultaneously as equity spreads rose and mezzanine correlation (and spreads) fell after the May 2005 GM/Ford downgrade — the copula models (R9) misunderstood tranche correlation dynamics, and the same correlation blind spot compounded through systemic risk as markets crashed together in 2007–09. <strong>Concentration + default correlation</strong> must BOTH fall to reduce worst-case loss; splitting exposures alone (correlation unchanged) does nothing, and default correlations tend to run higher within an industry than across industries.</p>`
});
