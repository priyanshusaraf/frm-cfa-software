/* The 2026 CFA Level II Financial Statement Analysis curriculum (Topic 3,
   Learning Modules 10 to 15), as the scope of this platform.

   PROVENANCE, read before trusting a letter: the owner's CFA books were not
   available in the cloud session that built this (they live in a local
   Downloads folder). The module list is confirmed by several 2026 sources;
   the LOS wording was reconstructed from third-party listings (AnalystNotes,
   whose pages are offset by a few LOS each, and were joined back together)
   and checked against the long-standing Level II wording. LOS LETTERS are
   therefore our ordering, not necessarily CFA Institute's. Reconcile against
   the official curriculum: react-site/docs/cfa/fsa-curriculum-reconciliation.md. */
export const CURRICULUM = {
  exam: "CFA Level II",
  year: 2026,
  topic: "Financial Statement Analysis",
  weight: "10-15%",
  verified: false,
  modules: [
    {
      id: "lm10", num: 10, title: "Intercorporate Investments",
      los: [
        { id: "a", text: "describe the classification, measurement, and disclosure under International Financial Reporting Standards (IFRS) for 1) investments in financial assets, 2) investments in associates, 3) joint ventures, 4) business combinations, and 5) special purpose and variable interest entities" },
        { id: "b", text: "distinguish between IFRS and US GAAP in the classification, measurement, and disclosure of investments in financial assets, investments in associates, joint ventures, business combinations, and special purpose and variable interest entities" },
        { id: "c", text: "analyze how different methods used to account for intercorporate investments affect financial statements and ratios" },
      ],
    },
    {
      id: "lm11", num: 11, title: "Employee Compensation: Post-Employment and Share-Based",
      los: [
        { id: "a", text: "describe the types of post-employment benefit plans and implications for financial reports" },
        { id: "b", text: "explain and calculate measures of a defined benefit pension obligation (i.e., present value of the defined benefit obligation and projected benefit obligation) and net pension liability (or asset)" },
        { id: "c", text: "describe the components of a company's defined benefit pension costs" },
        { id: "d", text: "explain and calculate the effect of a defined benefit plan's assumptions on the defined benefit obligation and periodic pension cost" },
        { id: "e", text: "explain and calculate how adjusting for items of pension and other post-employment benefits that are reported in the notes to the financial statements affects financial statements and ratios" },
        { id: "f", text: "interpret pension plan note disclosures including cash flow related information" },
        { id: "g", text: "explain issues associated with accounting for share-based compensation" },
        { id: "h", text: "explain how accounting for stock grants and stock options affects financial statements, and the importance of companies' assumptions in valuing these grants and options" },
      ],
    },
    {
      id: "lm12", num: 12, title: "Multinational Operations",
      los: [
        { id: "a", text: "describe foreign currency transaction exposure, including accounting for and disclosures about foreign currency transaction gains and losses" },
        { id: "b", text: "analyze how changes in exchange rates affect the translated sales of the subsidiary and parent company" },
        { id: "c", text: "compare and contrast presentation in (reporting) currency, functional currency, and local currency" },
        { id: "d", text: "compare the current rate method and the temporal method, evaluate how each affects the parent company's balance sheet and income statement, and determine which method is appropriate in various scenarios" },
        { id: "e", text: "calculate the translation effects and evaluate the translation of a subsidiary's balance sheet and income statement into the parent company's presentation currency" },
        { id: "f", text: "analyze how the current rate method and the temporal method affect financial statements and ratios" },
        { id: "g", text: "analyze how alternative translation methods for subsidiaries operating in hyperinflationary economies affect financial statements and ratios" },
        { id: "h", text: "describe how multinational operations affect a company's effective tax rate" },
        { id: "i", text: "explain how changes in the components of sales affect the sustainability of sales growth" },
        { id: "j", text: "analyze how currency fluctuations potentially affect financial results, given a company's countries of operation" },
      ],
    },
    {
      id: "lm13", num: 13, title: "Analysis of Financial Institutions",
      los: [
        { id: "a", text: "describe how financial institutions differ from other companies" },
        { id: "b", text: "describe key aspects of financial regulations of financial institutions" },
        { id: "c", text: "explain the CAMELS (capital adequacy, asset quality, management, earnings, liquidity, and sensitivity) approach to analyzing a bank, including key ratios and its limitations" },
        { id: "d", text: "describe other factors to consider in analyzing a bank" },
        { id: "e", text: "analyze a bank based on financial statements and other factors" },
        { id: "f", text: "describe key ratios and other factors to consider in analyzing an insurance company" },
      ],
    },
    {
      id: "lm14", num: 14, title: "Evaluating Quality of Financial Reports",
      los: [
        { id: "a", text: "demonstrate the use of a conceptual framework for assessing the quality of a company's financial reports" },
        { id: "b", text: "explain potential problems that affect the quality of financial reports" },
        { id: "c", text: "describe how to evaluate the quality of a company's financial reports" },
        { id: "d", text: "evaluate the quality of a company's financial reports" },
        { id: "e", text: "describe the concept of sustainable (persistent) earnings" },
        { id: "f", text: "describe indicators of earnings quality" },
        { id: "g", text: "explain mean reversion in earnings and how the accruals component of earnings affects the speed of mean reversion" },
        { id: "h", text: "evaluate the earnings quality of a company" },
        { id: "i", text: "describe indicators of cash flow quality" },
        { id: "j", text: "evaluate the cash flow quality of a company" },
        { id: "k", text: "describe indicators of balance sheet quality" },
        { id: "l", text: "evaluate the balance sheet quality of a company" },
        { id: "m", text: "describe sources of information about risk" },
      ],
    },
    {
      id: "lm15", num: 15, title: "Integration of Financial Statement Analysis Techniques",
      los: [
        { id: "a", text: "demonstrate the use of a framework for the analysis of financial statements, given a particular problem, question, or purpose (e.g., valuing equity based on comparables, critiquing a credit rating, obtaining a comprehensive picture of financial leverage, evaluating the perspectives given in management's discussion of financial results)" },
        { id: "b", text: "identify financial reporting choices and biases that affect the quality and comparability of companies' financial statements and explain how such biases may affect financial decisions" },
        { id: "c", text: "evaluate the quality of a company's financial data and recommend appropriate adjustments to improve quality and comparability with similar companies, including adjustments for differences in accounting standards, methods, and assumptions" },
        { id: "d", text: "evaluate how a given change in accounting standards, methods, or assumptions affects financial statements and ratios" },
        { id: "e", text: "analyze and interpret how balance sheet modifications, earnings normalization, and cash flow statement related modifications affect a company's financial statements, financial ratios, and overall financial condition" },
      ],
    },
  ],
};

export function curriculumModule(id) {
  return CURRICULUM.modules.find((m) => m.id === id) || null;
}
