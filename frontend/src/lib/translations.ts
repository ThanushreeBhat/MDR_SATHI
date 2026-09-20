export type Language = "en" | "hi" | "kn";

export interface Translations {
  common: {
    brandName: string;
    brandSubtitle: string;
    home: string;
    checkMdr: string;
    certificate: string;
    uploadStatement: string;
    backToHome: string;
    backToManual: string;
    backToDetails: string;
    backToResult: string;
    checkAgain: string;
    loading: string;
    error: string;
    disclaimer: string;
    effectiveDateText: string;
    footerDesc: string;
  };
  navbar: {
    policyBasics: string;
    howItWorks: string;
    checkStatus: string;
  };
  home: {
    badge: string;
    heroTitle: string;
    heroDesc: string;
    checkStatusBtn: string;
    seeHowItWorksBtn: string;
    noAccountNeeded: string;
    previewStatusLabel: string;
    previewClearSimple: string;
    monthlyUpiReceipts: string;
    policyThreshold: string;
    previewExplanation: string;
    policyGlance: string;
    threeNumbers: string;
    policySub: string;
    card1Value: string;
    card1Label: string;
    card1Desc: string;
    card2Value: string;
    card2Label: string;
    card2Desc: string;
    card3Value: string;
    card3Label: string;
    card3Desc: string;
    policyEffectiveFrom: string;
    quickCheckClearAnswer: string;
    step1: string;
    step1Desc: string;
    step2: string;
    step2Desc: string;
    step3: string;
    step3Desc: string;
    step4: string;
    step4Desc: string;
    builtForClarity: string;
    clarityHeading: string;
    clarityDesc: string;
    rulesEngineBoxTitle: string;
    rulesEngineBoxDesc: string;
    pleaseNote: string;
  };
  check: {
    stepIndicator: string;
    stepCount: string;
    title: string;
    subtitle: string;
    presetsTitle: string;
    preset1: string;
    preset2: string;
    monthlyReceipts: string;
    monthlyReceiptsDesc: string;
    avgTx: string;
    avgTxDesc: string;
    largeTx: string;
    largeTxDesc: string;
    customTx: string;
    customTxDesc: string;
    customTxPlaceholder: string;
    exactAmount: string;
    exactCount: string;
    range: string;
    transactionsUnit: string;
    infoBox: string;
    calculateBtn: string;
    calculatingBtn: string;
    privacyNote: string;
    uploadCsvInstead: string;
    validationMin: string;
    validationRange: string;
  };
  result: {
    assessmentTitle: string;
    statusTitle: string;
    statusDesc: string;
    exemptBadge: string;
    mdrAppliesBadge: string;
    exemptHeading: string;
    mdrAppliesHeading: string;
    monthlyReceiptsLabel: string;
    thresholdLabel: string;
    affectedTxLabel: string;
    totalMdrLabel: string;
    breakdownHeading: string;
    breakdownSub: string;
    affectedBadge: string;
    colNumber: string;
    colAmount: string;
    colRate: string;
    colFee: string;
    rateDesc: string;
    totalMdrFooter: string;
    exemptBreakdownNote: string;
    noAbove2000Note: string;
    assessmentDetailsHeading: string;
    affectedTxDetail: string;
    applicableMdrRate: string;
    perTxCap: string;
    effective: string;
    explanationHeading: string;
    understandResult: string;
    explanationLang: string;
    getCertificateBtn: string;
    checkAgainBtn: string;
    missingTitle: string;
    missingDesc: string;
    loadingAssessment: string;
    resultDisclaimer: string;
  };
  certificate: {
    shareableSummary: string;
    title: string;
    subtitle: string;
    shopNameLabel: string;
    optional: string;
    shopNamePlaceholder: string;
    shopNameHelp: string;
    previewAria: string;
    officialSummary: string;
    certTitle: string;
    preparedFor: string;
    statusReturned: string;
    effective: string;
    generated: string;
    certNotice: string;
    downloadBtn: string;
    shareWhatsappBtn: string;
    whatsappNotice: string;
    preparing: string;
    missingCertTitle: string;
    missingCertDesc: string;
    defaultMerchant: string;
  };
  csv: {
    historyTitle: string;
    title: string;
    subtitle: string;
    uploadBoxTitle: string;
    uploadBoxDesc: string;
    dropHere: string;
    orChoose: string;
    browseBtn: string;
    fileTypesHint: string;
    removeBtn: string;
    infoBox: string;
    checkBtn: string;
    checkingBtn: string;
    errNoFile: string;
    errNotCsv: string;
    errEmpty: string;
    errTooLarge: string;
    errGeneric: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    common: {
      brandName: "MDR Sathi",
      brandSubtitle: "UPI Impact & Trust Assistant",
      home: "Home",
      checkMdr: "Check MDR",
      certificate: "Certificate",
      uploadStatement: "Upload Statement",
      backToHome: "Back to home",
      backToManual: "Back to manual check",
      backToDetails: "Back to your details",
      backToResult: "Back to result",
      checkAgain: "Check again",
      loading: "Checking your MDR impact...",
      error: "Unable to connect to MDR Sathi. Please make sure the backend is running.",
      disclaimer: "MDR Sathi provides informational guidance based on the transaction information provided. It is not financial, tax, or legal advice.",
      effectiveDateText: "Effective 15 October 2026",
      footerDesc: "Informational guidance for Indian merchants. Policy details may change.",
    },
    navbar: {
      policyBasics: "Policy basics",
      howItWorks: "How it works",
      checkStatus: "Check My Status",
    },
    home: {
      badge: "Made for Indian merchants",
      heroTitle: "Know your UPI impact in 30 seconds.",
      heroDesc: "MDR Sathi helps you understand whether the UPI MDR policy affects your business, in simple language and without confusing terms.",
      checkStatusBtn: "Check My Status",
      seeHowItWorksBtn: "See how it works",
      noAccountNeeded: "Takes about 30 seconds. No account or documents needed.",
      previewStatusLabel: "Your UPI status",
      previewClearSimple: "Clear and simple",
      monthlyUpiReceipts: "Monthly UPI receipts",
      policyThreshold: "Policy threshold",
      previewExplanation: "Your result comes with a plain-language explanation you can save or share.",
      policyGlance: "Policy at a glance",
      threeNumbers: "Three numbers worth knowing.",
      policySub: "The rules can feel complicated. These are the key thresholds to keep in mind.",
      card1Value: "₹1 Lakh",
      card1Label: "Monthly UPI receipts threshold",
      card1Desc: "Merchants receiving ₹1 lakh or less per month through UPI are exempt under the policy.",
      card2Value: "₹2,000",
      card2Label: "Transaction threshold",
      card2Desc: "MDR applies to applicable person-to-merchant transactions above ₹2,000.",
      card3Value: "0.4%",
      card3Label: "MDR rate",
      card3Desc: "Applicable transactions have a 0.4% MDR, capped at ₹300 per transaction.",
      policyEffectiveFrom: "Policy effective from",
      quickCheckClearAnswer: "A quick check. A clear answer.",
      step1: "Enter your numbers",
      step1Desc: "Share three simple details about your UPI collections.",
      step2: "Rules check",
      step2Desc: "The rules engine checks your inputs against the policy.",
      step3: "Understand your status",
      step3Desc: "See a clear explanation in language that is easy to follow.",
      step4: "Get a certificate",
      step4Desc: "Save and share a simple summary of your result.",
      builtForClarity: "Built for clarity",
      clarityHeading: "Policy information should work for you.",
      clarityDesc: "Built to turn confusing policy information into a clear answer for merchants. MDR Sathi uses a rules engine to check the information you provide and explain the result without jargon.",
      rulesEngineBoxTitle: "Rules engine, plain-language result",
      rulesEngineBoxDesc: "Your information is checked against the current policy rules. The backend is the source of truth for every calculation.",
      pleaseNote: "Please note:",
    },
    check: {
      stepIndicator: "Your business details",
      stepCount: "1 of 1",
      title: "Let's check your UPI status.",
      subtitle: "Tell us a little about your UPI collections. It takes about 30 seconds, and you do not need an account or any documents.",
      presetsTitle: "Quick Test Presets:",
      preset1: "₹1,50,000 receipts (3 txns > ₹2,000)",
      preset2: "₹90,000 receipts (Exempt case)",
      monthlyReceipts: "Monthly UPI receipts",
      monthlyReceiptsDesc: "The approximate total value your business receives through UPI in one month.",
      avgTx: "Average transaction size",
      avgTxDesc: "The usual amount a customer pays you in one UPI transaction.",
      largeTx: "Transactions above ₹2,000 per month",
      largeTxDesc: "Your best estimate of how many UPI payments above ₹2,000 you receive each month.",
      customTx: "Recent transaction amounts (₹)",
      customTxDesc: "Enter typical or sample transaction amounts separated by commas (e.g. 500, 2500, 3000, 1000, 5000). The rules engine verifies each transaction against the ₹2,000 threshold.",
      customTxPlaceholder: "e.g. 500, 2500, 3000, 1000, 5000",
      exactAmount: "Enter an exact amount",
      exactCount: "Enter an exact count",
      range: "Range:",
      transactionsUnit: "transactions",
      infoBox: "Exact calculations come directly from the deterministic MDR Sathi rules engine on your local backend.",
      calculateBtn: "Calculate MDR",
      calculatingBtn: "Checking your MDR impact...",
      privacyNote: "Your details are sent directly to the local rules engine API.",
      uploadCsvInstead: "Upload CSV instead",
      validationMin: "Please enter a number of 0 or more.",
      validationRange: "Please enter a value between {min} and {max}.",
    },
    result: {
      assessmentTitle: "MDR Sathi assessment",
      statusTitle: "Your UPI status",
      statusDesc: "Here is the real rules-engine result returned for the business details you shared.",
      exemptBadge: "EXEMPT",
      mdrAppliesBadge: "MDR APPLIES",
      exemptHeading: "You are exempt from UPI MDR",
      mdrAppliesHeading: "MDR applies to transactions above ₹2,000",
      monthlyReceiptsLabel: "Monthly UPI receipts",
      thresholdLabel: "Exemption threshold",
      affectedTxLabel: "Affected transactions",
      totalMdrLabel: "Total calculated MDR",
      breakdownHeading: "Transaction Breakdown",
      breakdownSub: "Transactions above ₹2,000 subject to MDR",
      affectedBadge: "{count} affected",
      colNumber: "#",
      colAmount: "Transaction Amount",
      colRate: "MDR Rate & Cap",
      colFee: "Calculated Fee",
      rateDesc: "0.4% (max ₹300)",
      totalMdrFooter: "Total MDR (Rules Engine Output)",
      exemptBreakdownNote: "All transactions are exempt from MDR because your monthly UPI receipts ({receipts}) do not exceed the {threshold} threshold.",
      noAbove2000Note: "No transactions exceeding ₹2,000 were identified.",
      assessmentDetailsHeading: "Assessment details",
      affectedTxDetail: "Affected transactions (> ₹2,000)",
      applicableMdrRate: "Applicable MDR rate",
      perTxCap: "Per-transaction cap",
      effective: "Effective",
      explanationHeading: "Merchant Explanation",
      understandResult: "Understand your result",
      explanationLang: "Explanation language",
      getCertificateBtn: "Get Certificate",
      checkAgainBtn: "Check Again",
      missingTitle: "We couldn't find your assessment.",
      missingDesc: "Start a new check to see your UPI status.",
      loadingAssessment: "Loading your assessment...",
      resultDisclaimer: "MDR Sathi provides informational guidance based on the deterministic NPCI MDR framework. It is not financial, tax, or legal advice.",
    },
    certificate: {
      shareableSummary: "Shareable status summary",
      title: "Create your certificate.",
      subtitle: "Add your shop name if you would like it shown on the certificate. It is optional.",
      shopNameLabel: "Shop / business name",
      optional: "(optional)",
      shopNamePlaceholder: "For example, Sharma Kirana Store",
      shopNameHelp: "Up to 80 characters. If left empty, the certificate will say Merchant.",
      previewAria: "Certificate preview",
      officialSummary: "Official assessment summary",
      certTitle: "UPI MDR Status Certificate",
      preparedFor: "Prepared for",
      statusReturned: "Status returned by MDR Sathi",
      effective: "Effective:",
      generated: "Generated:",
      certNotice: "Informational guidance only. Not financial, tax, or legal advice.",
      downloadBtn: "Download Certificate",
      shareWhatsappBtn: "Share on WhatsApp",
      whatsappNotice: "WhatsApp opens with a factual text message. The certificate image is not attached automatically.",
      preparing: "Preparing your certificate...",
      missingCertTitle: "We couldn't find your assessment.",
      missingCertDesc: "Start a new check before creating a certificate.",
      defaultMerchant: "Merchant",
    },
    csv: {
      historyTitle: "Transaction history",
      title: "Check using your transaction history",
      subtitle: "Upload a CSV of your UPI transactions and MDR Sathi will check the applicable rules for you.",
      uploadBoxTitle: "Upload your CSV",
      uploadBoxDesc: "Use the transaction export from your UPI provider. CSV files only, up to 10 MB.",
      dropHere: "Drop your CSV file here",
      orChoose: "or choose a file from your device",
      browseBtn: "Browse CSV file",
      fileTypesHint: "CSV only · Maximum file size 10 MB",
      removeBtn: "Remove",
      infoBox: "The backend rules engine will process your transaction history. MDR Sathi does not calculate your result in the browser.",
      checkBtn: "Check My Status",
      checkingBtn: "Checking your file...",
      errNoFile: "Choose a CSV file before checking your status.",
      errNotCsv: "Please choose a CSV file. Other file types are not supported.",
      errEmpty: "This CSV file is empty. Please choose a file with transaction history.",
      errTooLarge: "This file is larger than 10 MB. Please choose a smaller CSV file.",
      errGeneric: "We could not process this CSV right now. Please try again.",
    },
  },

  hi: {
    common: {
      brandName: "MDR Sathi",
      brandSubtitle: "यूपीआई प्रभाव और विश्वास सहायक",
      home: "होम",
      checkMdr: "MDR जाँचें",
      certificate: "प्रमाणपत्र",
      uploadStatement: "स्टेटमेंट अपलोड करें",
      backToHome: "होम पर वापस जाएँ",
      backToManual: "मैनुअल जाँच पर वापस जाएँ",
      backToDetails: "अपने विवरण पर वापस जाएँ",
      backToResult: "परिणाम पर वापस जाएँ",
      checkAgain: "पुनः जाँचें",
      loading: "आपके MDR प्रभाव की जाँच हो रही है...",
      error: "MDR Sathi से कनेक्ट करने में असमर्थ। कृपया सुनिश्चित करें कि बैकएंड चल रहा है।",
      disclaimer: "MDR Sathi प्रदान की गई लेन-देन जानकारी के आधार पर सूचनात्मक मार्गदर्शन प्रदान करता है। यह वित्तीय, कर या कानूनी सलाह नहीं है।",
      effectiveDateText: "15 अक्टूबर 2026 से प्रभावी",
      footerDesc: "भारतीय व्यापारियों के लिए सूचनात्मक मार्गदर्शन। नीति विवरण बदल सकते हैं।",
    },
    navbar: {
      policyBasics: "नीति के मूल नियम",
      howItWorks: "यह कैसे काम करता है",
      checkStatus: "मेरा स्टेटस जाँचें",
    },
    home: {
      badge: "भारतीय व्यापारियों के लिए निर्मित",
      heroTitle: "30 सेकंड में जानें अपने UPI पर प्रभाव।",
      heroDesc: "MDR Sathi आपको सरल भाषा में और बिना किसी तकनीकी शब्दावली के यह समझने में मदद करता है कि क्या UPI MDR नीति आपके व्यवसाय को प्रभावित करती है।",
      checkStatusBtn: "मेरा स्टेटस जाँचें",
      seeHowItWorksBtn: "देखें यह कैसे काम करता है",
      noAccountNeeded: "लगभग 30 सेकंड का समय लगता है। किसी खाते या दस्तावेज़ की आवश्यकता नहीं है।",
      previewStatusLabel: "आपका UPI स्टेटस",
      previewClearSimple: "स्पष्ट और सरल",
      monthlyUpiReceipts: "मासिक UPI प्राप्ति",
      policyThreshold: "नीति सीमा",
      previewExplanation: "आपका परिणाम एक सरल व्याख्या के साथ आता है जिसे आप सहेज सकते हैं या अन्य व्यापारियों के साथ साझा कर सकते हैं।",
      policyGlance: "नीति एक नज़र में",
      threeNumbers: "तीन महत्वपूर्ण आंकड़े जो आपको जानने चाहिए।",
      policySub: "नियम जटिल लग सकते हैं। ध्यान में रखने योग्य ये प्रमुख सीमाएं हैं।",
      card1Value: "₹1 लाख",
      card1Label: "मासिक UPI प्राप्ति सीमा",
      card1Desc: "UPI के माध्यम से प्रति माह ₹1 लाख या उससे कम प्राप्त करने वाले व्यापारी नीति के तहत पूर्णतः मुक्त हैं।",
      card2Value: "₹2,000",
      card2Label: "लेन-देन सीमा",
      card2Desc: "MDR केवल ₹2,000 से अधिक के लागू व्यक्ति-से-व्यापारी (P2M) लेन-देन पर लागू होता है।",
      card3Value: "0.4%",
      card3Label: "MDR दर",
      card3Desc: "लागू लेन-देन पर 0.4% MDR लागू है, जो प्रति लेन-देन अधिकतम ₹300 पर सीमित है।",
      policyEffectiveFrom: "नीति प्रभावी होने की तिथि:",
      quickCheckClearAnswer: "एक त्वरित जाँच। एक स्पष्ट उत्तर।",
      step1: "अपने आंकड़े दर्ज करें",
      step1Desc: "अपने UPI संग्रह के बारे में तीन सरल विवरण साझा करें।",
      step2: "नियमों की जाँच",
      step2Desc: "नियम इंजन नीति के अनुसार आपके इनपुट की निष्पक्ष जाँच करता है।",
      step3: "अपना स्टेटस समझें",
      step3Desc: "आसानी से समझ में आने वाली सरल भाषा में व्याख्या देखें।",
      step4: "प्रमाणपत्र प्राप्त करें",
      step4Desc: "अपने परिणाम का एक सरल सारांश सहेजें और साझा करें।",
      builtForClarity: "स्पष्टता के लिए निर्मित",
      clarityHeading: "नीति की जानकारी आपके काम आनी चाहिए।",
      clarityDesc: "व्यापारियों के लिए भ्रमित करने वाली नीति जानकारी को स्पष्ट उत्तर में बदलने के लिए बनाया गया। MDR Sathi आपके विवरण की जाँच के लिए एक नियम इंजन का उपयोग करता है।",
      rulesEngineBoxTitle: "नियम इंजन, सरल भाषा में परिणाम",
      rulesEngineBoxDesc: "आपकी जानकारी की जाँच वर्तमान नीति नियमों के अनुसार की जाती है। हर गणना के लिए बैकएंड ही सत्य का स्रोत है।",
      pleaseNote: "कृपया ध्यान दें:",
    },
    check: {
      stepIndicator: "आपके व्यवसाय का विवरण",
      stepCount: "1 में से 1",
      title: "आइए आपके UPI स्टेटस की जाँच करें।",
      subtitle: "अपने UPI संग्रह के बारे में थोड़ा बताएं। इसमें लगभग 30 सेकंड लगते हैं, और किसी खाते या दस्तावेज़ की आवश्यकता नहीं है।",
      presetsTitle: "त्वरित परीक्षण प्रीसेट:",
      preset1: "₹1,50,000 प्राप्ति (3 लेन-देन > ₹2,000)",
      preset2: "₹90,000 प्राप्ति (छूट मामला)",
      monthlyReceipts: "मासिक UPI प्राप्ति",
      monthlyReceiptsDesc: "एक महीने में आपका व्यवसाय UPI के माध्यम से जो अनुमानित कुल राशि प्राप्त करता है।",
      avgTx: "औसत लेन-देन आकार",
      avgTxDesc: "एक ग्राहक आमतौर पर एक UPI लेन-देन में आपको जो राशि देता है।",
      largeTx: "प्रति माह ₹2,000 से अधिक के लेन-देन",
      largeTxDesc: "हर महीने प्राप्त होने वाले ₹2,000 से अधिक के UPI भुगतानों की आपकी अनुमानित संख्या।",
      customTx: "हालिया लेन-देन की राशियाँ (₹)",
      customTxDesc: "अल्पविराम से अलग करके लेन-देन की राशियाँ दर्ज करें (जैसे 500, 2500, 3000, 1000, 5000)। नियम इंजन ₹2,000 की सीमा पर प्रत्येक की जाँच करता है।",
      customTxPlaceholder: "उदा. 500, 2500, 3000, 1000, 5000",
      exactAmount: "सटीक राशि दर्ज करें",
      exactCount: "सटीक संख्या दर्ज करें",
      range: "सीमा:",
      transactionsUnit: "लेन-देन",
      infoBox: "सटीक गणना सीधे स्थानीय बैकएंड पर स्थित MDR Sathi नियम इंजन से आती है।",
      calculateBtn: "MDR की गणना करें",
      calculatingBtn: "आपके MDR प्रभाव की जाँच हो रही है...",
      privacyNote: "आपका विवरण सीधे स्थानीय नियम इंजन API को भेजा जाता है।",
      uploadCsvInstead: "इसके बजाय CSV अपलोड करें",
      validationMin: "कृपया 0 या अधिक की संख्या दर्ज करें।",
      validationRange: "कृपया {min} और {max} के बीच का मान दर्ज करें।",
    },
    result: {
      assessmentTitle: "MDR Sathi आकलन",
      statusTitle: "आपका UPI स्टेटस",
      statusDesc: "यहाँ आपके द्वारा साझा किए गए विवरण के आधार पर नियम इंजन का वास्तविक परिणाम है।",
      exemptBadge: "छूट प्राप्त (EXEMPT)",
      mdrAppliesBadge: "MDR लागू होता है",
      exemptHeading: "आप UPI MDR से पूर्णतः मुक्त हैं",
      mdrAppliesHeading: "₹2,000 से अधिक के लेन-देन पर MDR लागू होता है",
      monthlyReceiptsLabel: "मासिक UPI प्राप्ति",
      thresholdLabel: "छूट सीमा",
      affectedTxLabel: "प्रभावित लेन-देन",
      totalMdrLabel: "कुल अनुमानित MDR",
      breakdownHeading: "लेन-देन का विवरण",
      breakdownSub: "₹2,000 से अधिक के लेन-देन जिन पर MDR लागू है",
      affectedBadge: "{count} प्रभावित",
      colNumber: "#",
      colAmount: "लेन-देन राशि",
      colRate: "MDR दर और सीमा",
      colFee: "गणना शुल्क",
      rateDesc: "0.4% (अधिकतम ₹300)",
      totalMdrFooter: "कुल MDR (नियम इंजन आउटपुट)",
      exemptBreakdownNote: "सभी लेन-देन MDR से मुक्त हैं क्योंकि आपकी मासिक UPI प्राप्ति ({receipts}) ₹1,00,000 की छूट सीमा से अधिक नहीं है।",
      noAbove2000Note: "₹2,000 से अधिक का कोई लेन-देन नहीं पाया गया।",
      assessmentDetailsHeading: "आकलन विवरण",
      affectedTxDetail: "प्रभावित लेन-देन (> ₹2,000)",
      applicableMdrRate: "लागू MDR दर",
      perTxCap: "प्रति-लेन-देन अधिकतम सीमा",
      effective: "प्रभावी",
      explanationHeading: "व्यापारी के लिए स्पष्टीकरण",
      understandResult: "अपने परिणाम को समझें",
      explanationLang: "व्याख्या की भाषा",
      getCertificateBtn: "प्रमाणपत्र प्राप्त करें",
      checkAgainBtn: "पुनः जाँचें",
      missingTitle: "हमें आपका आकलन नहीं मिला।",
      missingDesc: "अपना UPI स्टेटस देखने के लिए नई जाँच शुरू करें।",
      loadingAssessment: "आपका आकलन लोड हो रहा है...",
      resultDisclaimer: "MDR Sathi एनपीसीआई (NPCI) रूपरेखा के आधार पर सूचनात्मक मार्गदर्शन प्रदान करता है। यह वित्तीय, कर या कानूनी सलाह नहीं है।",
    },
    certificate: {
      shareableSummary: "साझा करने योग्य स्टेटस सारांश",
      title: "अपना प्रमाणपत्र बनाएं।",
      subtitle: "यदि आप प्रमाणपत्र पर अपनी दुकान का नाम दिखाना चाहते हैं तो जोड़ें। यह वैकल्पिक है।",
      shopNameLabel: "दुकान / व्यवसाय का नाम",
      optional: "(वैकल्पिक)",
      shopNamePlaceholder: "उदाहरण के लिए, शर्मा किराना स्टोर",
      shopNameHelp: "अधिकतम 80 वर्ण। खाली छोड़ने पर प्रमाणपत्र पर 'व्यापारी' लिखा होगा।",
      previewAria: "प्रमाणपत्र पूर्वावलोकन",
      officialSummary: "आधिकारिक आकलन सारांश",
      certTitle: "UPI MDR स्टेटस प्रमाणपत्र",
      preparedFor: "के लिए तैयार",
      statusReturned: "MDR Sathi द्वारा दिया गया स्टेटस",
      effective: "प्रभावी:",
      generated: "तैयार किया गया:",
      certNotice: "केवल सूचनात्मक मार्गदर्शन। वित्तीय, कर या कानूनी सलाह नहीं।",
      downloadBtn: "प्रमाणपत्र डाउनलोड करें",
      shareWhatsappBtn: "WhatsApp पर शेयर करें",
      whatsappNotice: "WhatsApp एक तथ्यात्मक पाठ संदेश के साथ खुलता है। प्रमाणपत्र छवि स्वतः संलग्न नहीं होती है।",
      preparing: "आपका प्रमाणपत्र तैयार हो रहा है...",
      missingCertTitle: "हमें आपका आकलन नहीं मिला।",
      missingCertDesc: "प्रमाणपत्र बनाने से पहले एक नई जाँच शुरू करें।",
      defaultMerchant: "व्यापारी",
    },
    csv: {
      historyTitle: "लेन-देन इतिहास",
      title: "अपने लेन-देन इतिहास का उपयोग करके जाँचें",
      subtitle: "अपने UPI लेन-देन का CSV अपलोड करें और MDR Sathi आपके लिए लागू नियमों की निष्पक्ष जाँच करेगा।",
      uploadBoxTitle: "अपना CSV अपलोड करें",
      uploadBoxDesc: "अपने UPI प्रदाता से लेन-देन निर्यात का उपयोग करें। केवल CSV फ़ाइलें, अधिकतम 10 MB।",
      dropHere: "अपनी CSV फ़ाइल यहाँ छोड़ें",
      orChoose: "या अपने डिवाइस से फ़ाइल चुनें",
      browseBtn: "CSV फ़ाइल ब्राउज़ करें",
      fileTypesHint: "केवल CSV · अधिकतम फ़ाइल आकार 10 MB",
      removeBtn: "हटाएं",
      infoBox: "बैकएंड नियम इंजन आपके लेन-देन इतिहास को प्रोसेस करेगा। MDR Sathi ब्राउज़र में गणना नहीं करता है।",
      checkBtn: "मेरा स्टेटस जाँचें",
      checkingBtn: "आपकी फ़ाइल की जाँच हो रही है...",
      errNoFile: "स्थिति की जाँच करने से पहले एक CSV फ़ाइल चुनें।",
      errNotCsv: "कृपया एक CSV फ़ाइल चुनें। अन्य फ़ाइल प्रकार समर्थित नहीं हैं।",
      errEmpty: "यह CSV फ़ाइल खाली है। कृपया लेन-देन इतिहास वाली फ़ाइल चुनें।",
      errTooLarge: "यह फ़ाइल 10 MB से बड़ी है। कृपया एक छोटी CSV फ़ाइल चुनें।",
      errGeneric: "हम अभी इस CSV को प्रोसेस नहीं कर सके। कृपया पुनः प्रयास करें।",
    },
  },

  kn: {
    common: {
      brandName: "MDR Sathi",
      brandSubtitle: "ಯುಪಿಐ ಪರಿಣಾಮ ಮತ್ತು ವಿಶ್ವಾಸ ಸಹಾಯಕ",
      home: "ಮುಖಪುಟ",
      checkMdr: "MDR ಪರಿಶೀಲಿಸಿ",
      certificate: "ಪ್ರಮಾಣಪತ್ರ",
      uploadStatement: "ಸ್ಟೇಟ್‌ಮೆಂಟ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
      backToHome: "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
      backToManual: "ಹಸ್ತಚಾಲಿತ ಪರಿಶೀಲನೆಗೆ ಹಿಂತಿರುಗಿ",
      backToDetails: "ನಿಮ್ಮ ವಿವರಗಳಿಗೆ ಹಿಂತಿರುಗಿ",
      backToResult: "ಫಲಿತಾಂಶಕ್ಕೆ ಹಿಂತಿರುಗಿ",
      checkAgain: "ಮತ್ತೊಮ್ಮೆ ಪರಿಶೀಲಿಸಿ",
      loading: "ನಿಮ್ಮ MDR ಪರಿಣಾಮವನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...",
      error: "MDR Sathi ಗೆ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ಬ್ಯಾಕೆಂಡ್ ಚಾಲನೆಯಲ್ಲಿದೆ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
      disclaimer: "MDR Sathi ಒದಗಿಸಲಾದ ವಹಿವಾಟು ಮಾಹಿತಿಯ ಆಧಾರದ ಮೇಲೆ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ. ಇದು ಆರ್ಥಿಕ, ತೆರಿಗೆ ಅಥವಾ ಕಾನೂನು ಸಲಹೆಯಲ್ಲ.",
      effectiveDateText: "15 ಅಕ್ಟೋಬರ್ 2026 ರಿಂದ ಜಾರಿಗೆ",
      footerDesc: "ಭಾರತೀಯ ವ್ಯಾಪಾರಿಗಳಿಗೆ ಮಾಹಿತಿ ಮಾರ್ಗದರ್ಶನ. ನೀತಿ ವಿವರಗಳು ಬದಲಾಗಬಹುದು.",
    },
    navbar: {
      policyBasics: "ನೀತಿಯ ಮೂಲ ನಿಯಮಗಳು",
      howItWorks: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
      checkStatus: "ನನ್ನ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ",
    },
    home: {
      badge: "ಭಾರತೀಯ ವ್ಯಾಪಾರಿಗಳಿಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ",
      heroTitle: "30 ಸೆಕೆಂಡುಗಳಲ್ಲಿ ನಿಮ್ಮ ಯುಪಿಐ ಪರಿಣಾಮ ತಿಳಿಯಿರಿ.",
      heroDesc: "MDR Sathi ಯುಪಿಐ MDR ನೀತಿಯು ನಿಮ್ಮ ವ್ಯವಹಾರದ ಮೇಲೆ ಪರಿಣಾಮ ಬೀರುತ್ತದೆಯೇ ಎಂಬುದನ್ನು ಸರಳ ಭಾಷೆಯಲ್ಲಿ ಯಾವುದೇ ಗೊಂದಲವಿಲ್ಲದೆ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
      checkStatusBtn: "ನನ್ನ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ",
      seeHowItWorksBtn: "ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ ನೋಡಿ",
      noAccountNeeded: "ಸುಮಾರು 30 ಸೆಕೆಂಡುಗಳು ಸಾಕು. ಯಾವುದೇ ಖಾತೆ ಅಥವಾ ದಾಖಲೆಗಳ ಅಗತ್ಯವಿಲ್ಲ.",
      previewStatusLabel: "ನಿಮ್ಮ ಯುಪಿಐ ಸ್ಥಿತಿ",
      previewClearSimple: "ಸ್ಪಷ್ಟ ಮತ್ತು ಸರಳ",
      monthlyUpiReceipts: "ಮಾಸಿಕ ಯುಪಿಐ ಸ್ವೀಕೃತಿ",
      policyThreshold: "ನೀತಿ ಮಿತಿ",
      previewExplanation: "ನಿಮ್ಮ ಫಲಿತಾಂಶವು ಸರಳ ವಿವರಣೆಯೊಂದಿಗೆ ಬರುತ್ತದೆ, ಅದನ್ನು ನೀವು ಉಳಿಸಬಹುದು ಅಥವಾ ಇತರ ವ್ಯಾಪಾರಿಗಳೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಬಹುದು.",
      policyGlance: "ನೀತಿಯ ಸಂಕ್ಷಿಪ್ತ ನೋಟ",
      threeNumbers: "ತಿಳಿದುಕೊಳ್ಳಬೇಕಾದ ಮೂರು ಮುಖ್ಯ ಅಂಕಿಅಂಶಗಳು.",
      policySub: "ನಿಯಮಗಳು ಸಂಕೀರ್ಣವಾಗಿರಬಹುದು. ನೆನಪಿನಲ್ಲಿಡಬೇಕಾದ ಮುಖ್ಯ ಮಿತಿಗಳು ಇಲ್ಲಿವೆ.",
      card1Value: "₹1 ಲಕ್ಷ",
      card1Label: "ಮಾಸಿಕ ಯುಪಿಐ ಸ್ವೀಕೃತಿ ಮಿತಿ",
      card1Desc: "ಯುಪಿಐ ಮೂಲಕ ತಿಂಗಳಿಗೆ ₹1 ಲಕ್ಷ ಅಥವಾ ಅದಕ್ಕಿಂತ ಕಡಿಮೆ ಸ್ವೀಕರಿಸುವ ವ್ಯಾಪಾರಿಗಳಿಗೆ ನೀತಿಯ ಅಡಿಯಲ್ಲಿ ಸಂಪೂರ್ಣ ವಿನಾಯಿತಿ ಇದೆ.",
      card2Value: "₹2,000",
      card2Label: "ವಹಿವಾಟು ಮಿತಿ",
      card2Desc: "₹2,000 ಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ಅನ್ವಯವಾಗುವ P2M (ವ್ಯಕ್ತಿ-ವ್ಯಾಪಾರಿ) ವಹಿವಾಟುಗಳಿಗೆ ಮಾತ್ರ MDR ಅನ್ವಯಿಸುತ್ತದೆ.",
      card3Value: "0.4%",
      card3Label: "MDR ದರ",
      card3Desc: "ಅನ್ವಯವಾಗುವ ವಹಿವಾಟುಗಳಿಗೆ 0.4% MDR ಇರುತ್ತದೆ, ಪ್ರತಿ ವಹಿವಾಟಿಗೆ ಗರಿಷ್ಠ ₹300 ಮಿತಿ ಇರುತ್ತದೆ.",
      policyEffectiveFrom: "ನೀತಿ ಜಾರಿಗೆ ಬರುವ ದಿನಾಂಕ:",
      quickCheckClearAnswer: "ತ್ವರಿತ ಪರಿಶೀಲನೆ. ಸ್ಪಷ್ಟ ಉತ್ತರ.",
      step1: "ನಿಮ್ಮ ಅಂಕಿಗಳನ್ನು ನಮೂದಿಸಿ",
      step1Desc: "ನಿಮ್ಮ ಯುಪಿಐ ಸಂಗ್ರಹದ ಮೂರು ಸರಳ ವಿವರಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.",
      step2: "ನಿಯಮಗಳ ಪರಿಶೀಲನೆ",
      step2Desc: "ನಿಯಮಗಳ ಎಂಜಿನ್ ನಿಮ್ಮ ವಿವರಗಳನ್ನು ನೀತಿಗೆ ಅನುಗುಣವಾಗಿ ಪರಿಶೀಲಿಸುತ್ತದೆ.",
      step3: "ನಿಮ್ಮ ಸ್ಥಿತಿಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ",
      step3Desc: "ಸುಲಭವಾಗಿ ಅರ್ಥವಾಗುವ ಭಾಷೆಯಲ್ಲಿ ಸ್ಪಷ್ಟ ವಿವರಣೆಯನ್ನು ನೋಡಿ.",
      step4: "ಪ್ರಮಾಣಪತ್ರ ಪಡೆಯಿರಿ",
      step4Desc: "ನಿಮ್ಮ ಫಲಿತಾಂಶದ ಸರಳ ಸಾರಾಂಶವನ್ನು ಉಳಿಸಿ ಮತ್ತು ಹಂಚಿಕೊಳ್ಳಿ.",
      builtForClarity: "ಸ್ಪಷ್ಟತೆಗಾಗಿ ರೂಪಿಸಲಾಗಿದೆ",
      clarityHeading: "ನೀತಿ ಮಾಹಿತಿ ನಿಮಗೆ ಪ್ರಯೋಜನಕಾರಿಯಾಗಿರಬೇಕು.",
      clarityDesc: "ವ್ಯಾಪಾರಿಗಳಿಗೆ ಗೊಂದಲಮಯ ನೀತಿ ಮಾಹಿತಿಯನ್ನು ಸ್ಪಷ್ಟ ಉತ್ತರವಾಗಿ ಪರಿವರ್ತಿಸಲು ನಿರ್ಮಿಸಲಾಗಿದೆ. MDR Sathi ನಿಯಮಗಳ ಎಂಜಿನ್ ಬಳಸಿ ಪರಿಶೀಲಿಸುತ್ತದೆ.",
      rulesEngineBoxTitle: "ನಿಯಮಗಳ ಎಂಜಿನ್, ಸರಳ ಭಾಷೆಯ ಫಲಿತಾಂಶ",
      rulesEngineBoxDesc: "ನಿಮ್ಮ ಮಾಹಿತಿಯನ್ನು ಪ್ರಸ್ತುತ ನೀತಿ ನಿಯಮಗಳ ಪ್ರಕಾರ ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ. ಪ್ರತಿ ಲೆಕ್ಕಾಚಾರಕ್ಕೂ ಬ್ಯಾಕೆಂಡ್ ಮೂಲವಾಗಿದೆ.",
      pleaseNote: "ದಯವಿಟ್ಟು ಗಮನಿಸಿ:",
    },
    check: {
      stepIndicator: "ನಿಮ್ಮ ವ್ಯವಹಾರದ ವಿವರಗಳು",
      stepCount: "1 ರಲ್ಲಿ 1",
      title: "ನಿಮ್ಮ ಯುಪಿಐ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸೋಣ.",
      subtitle: "ನಿಮ್ಮ ಯುಪಿಐ ಸಂಗ್ರಹಣೆಯ ಬಗ್ಗೆ ಸ್ವಲ್ಪ ತಿಳಿಸಿ. ಇದಕ್ಕೆ ಸುಮಾರು 30 ಸೆಕೆಂಡುಗಳು ಸಾಕು, ಮತ್ತು ಯಾವುದೇ ದಾಖಲೆಗಳ ಅಗತ್ಯವಿಲ್ಲ.",
      presetsTitle: "ತ್ವರಿತ ಪರೀಕ್ಷಾ ಮಾದರಿಗಳು:",
      preset1: "₹1,50,000 ಸ್ವೀಕೃತಿ (3 ವಹಿವಾಟುಗಳು > ₹2,000)",
      preset2: "₹90,000 ಸ್ವೀಕೃತಿ (ವಿನಾಯಿತಿ ಪ್ರಕರಣ)",
      monthlyReceipts: "ಮಾಸಿಕ ಯುಪಿಐ ಸ್ವೀಕೃತಿ",
      monthlyReceiptsDesc: "ಒಂದು ತಿಂಗಳಲ್ಲಿ ನಿಮ್ಮ ವ್ಯವಹಾರವು ಯುಪಿಐ ಮೂಲಕ ಸ್ವೀಕರಿಸುವ ಅಂದಾಜು ಒಟ್ಟು ಮೊತ್ತ.",
      avgTx: "ಸರಾಸರಿ ವಹಿವಾಟಿನ ಗಾತ್ರ",
      avgTxDesc: "ಒಂದು ಯುಪಿಐ ವಹಿವಾಟಿನಲ್ಲಿ ಗ್ರಾಹಕರು ಸಾಮಾನ್ಯವಾಗಿ ಪಾವತಿಸುವ ಮೊತ್ತ.",
      largeTx: "ತಿಂಗಳಿಗೆ ₹2,000 ಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ವಹಿವಾಟುಗಳು",
      largeTxDesc: "ಪ್ರತಿ ತಿಂಗಳು ನೀವು ಪಡೆಯುವ ₹2,000 ಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ಯುಪಿಐ ಪಾವತಿಗಳ ಅಂದಾಜು ಸಂಖ್ಯೆ.",
      customTx: "ಇತ್ತೀಚಿನ ವಹಿವಾಟಿನ ಮೊತ್ತಗಳು (₹)",
      customTxDesc: "ಅಲ್ಪವಿರಾಮದಿಂದ ಪ್ರತ್ಯೇಕಿಸಲಾದ ವಹಿವಾಟಿನ ಮೊತ್ತಗಳನ್ನು ನಮೂದಿಸಿ (ಉದಾ. 500, 2500, 3000, 1000, 5000). ನಿಯಮಗಳ ಎಂಜಿನ್ ₹2,000 ಮಿತಿಗೆ ಅನುಗುಣವಾಗಿ ಪರಿಶೀಲಿಸುತ್ತದೆ.",
      customTxPlaceholder: "ಉದಾ. 500, 2500, 3000, 1000, 5000",
      exactAmount: "ಖಚಿತ ಮೊತ್ತ ನಮೂದಿಸಿ",
      exactCount: "ಖಚಿತ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ",
      range: "ವ್ಯಾಪ್ತಿ:",
      transactionsUnit: "ವಹಿವಾಟುಗಳು",
      infoBox: "ಖಚಿತ ಲೆಕ್ಕಾಚಾರವು ನಿಮ್ಮ ಸ್ಥಳೀಯ ಬ್ಯಾಕೆಂಡ್‌ನಲ್ಲಿರುವ MDR Sathi ನಿಯಮಗಳ ಎಂಜಿನ್‌ನಿಂದ ನೇರವಾಗಿ ಬರುತ್ತದೆ.",
      calculateBtn: "MDR ಲೆಕ್ಕಹಾಕಿ",
      calculatingBtn: "ನಿಮ್ಮ MDR ಪರಿಣಾಮವನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...",
      privacyNote: "ನಿಮ್ಮ ವಿವರಗಳನ್ನು ನೇರವಾಗಿ ಸ್ಥಳೀಯ ನಿಯಮಗಳ ಎಂಜಿನ್ API ಗೆ ಕಳುಹಿಸಲಾಗುತ್ತದೆ.",
      uploadCsvInstead: "ಬದಲಿಗೆ CSV ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
      validationMin: "ದಯವಿಟ್ಟು 0 ಅಥವಾ ಹೆಚ್ಚಿನ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.",
      validationRange: "ದಯವಿಟ್ಟು {min} ಮತ್ತು {max} ನಡುವಿನ ಮೌಲ್ಯವನ್ನು ನಮೂದಿಸಿ.",
    },
    result: {
      assessmentTitle: "MDR Sathi ಮೌಲ್ಯಮಾಪನ",
      statusTitle: "ನಿಮ್ಮ ಯುಪಿಐ ಸ್ಥಿತಿ",
      statusDesc: "ನೀವು ಹಂಚಿಕೊಂಡ ವಿವರಗಳಿಗೆ ನಿಯಮಗಳ ಎಂಜಿನ್‌ನ ನೈಜ ಫಲಿತಾಂಶ ಇಲ್ಲಿದೆ.",
      exemptBadge: "ವಿನಾಯಿತಿ (EXEMPT)",
      mdrAppliesBadge: "MDR ಅನ್ವಯಿಸುತ್ತದೆ",
      exemptHeading: "ನೀವು ಯುಪಿಐ MDR ನಿಂದ ಸಂಪೂರ್ಣ ವಿನಾಯಿತಿ ಹೊಂದಿದ್ದೀರಿ",
      mdrAppliesHeading: "₹2,000 ಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ವಹಿವಾಟುಗಳಿಗೆ MDR ಅನ್ವಯಿಸುತ್ತದೆ",
      monthlyReceiptsLabel: "ಮಾಸಿಕ ಯುಪಿಐ ಸ್ವೀಕೃತಿ",
      thresholdLabel: "ವಿನಾಯಿತಿ ಮಿತಿ",
      affectedTxLabel: "ಬಾಧಿತ ವಹಿವಾಟುಗಳು",
      totalMdrLabel: "ಒಟ್ಟು ಲೆಕ್ಕಹಾಕಿದ MDR",
      breakdownHeading: "ವಹಿವಾಟುಗಳ ವಿವರಣೆ",
      breakdownSub: "MDR ಗೆ ಒಳಪಟ್ಟ ₹2,000 ಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ವಹಿವಾಟುಗಳು",
      affectedBadge: "{count} ಬಾಧಿತ",
      colNumber: "#",
      colAmount: "ವಹಿವಾಟು ಮೊತ್ತ",
      colRate: "MDR ದರ ಮತ್ತು ಮಿತಿ",
      colFee: "ಲೆಕ್ಕಹಾಕಿದ ಶುಲ್ಕ",
      rateDesc: "0.4% (ಗರಿಷ್ಠ ₹300)",
      totalMdrFooter: "ಒಟ್ಟು MDR (ನಿಯಮಗಳ ಎಂಜಿನ್ ಔಟ್‌ಪುಟ್)",
      exemptBreakdownNote: "ನಿಮ್ಮ ಮಾಸಿಕ ಯುಪಿಐ ಸ್ವೀಕೃತಿಯು ({receipts}) ₹1,00,000 ವಿನಾಯಿತಿ ಮಿತಿಯನ್ನು ಮೀರದ ಕಾರಣ ಎಲ್ಲಾ ವಹಿವಾಟುಗಳು MDR ನಿಂದ ಮುಕ್ತವಾಗಿವೆ.",
      noAbove2000Note: "₹2,000 ಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ಯಾವುದೇ ವಹಿವಾಟುಗಳು ಕಂಡುಬಂದಿಲ್ಲ.",
      assessmentDetailsHeading: "ಮೌಲ್ಯಮಾಪನ ವಿವರಗಳು",
      affectedTxDetail: "ಬಾಧಿತ ವಹಿವಾಟುಗಳು (> ₹2,000)",
      applicableMdrRate: "ಅನ್ವಯವಾಗುವ MDR ದರ",
      perTxCap: "ಪ್ರತಿ-ವಹಿವಾಟಿನ ಗರಿಷ್ಠ ಮಿತಿ",
      effective: "ಜಾರಿಗೆ ಬರುವ ದಿನಾಂಕ",
      explanationHeading: "ವ್ಯಾಪಾರಿ ವಿವರಣೆ",
      understandResult: "ನಿಮ್ಮ ಫಲಿತಾಂಶವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ",
      explanationLang: "ವಿವರಣೆಯ ಭಾಷೆ",
      getCertificateBtn: "ಪ್ರಮಾಣಪತ್ರ ಪಡೆಯಿರಿ",
      checkAgainBtn: "ಮತ್ತೊಮ್ಮೆ ಪರಿಶೀಲಿಸಿ",
      missingTitle: "ನಿಮ್ಮ ಮೌಲ್ಯಮಾಪನ ನಮಗೆ ಸಿಗಲಿಲ್ಲ.",
      missingDesc: "ನಿಮ್ಮ ಯುಪಿಐ ಸ್ಥಿತಿ ನೋಡಲು ಹೊಸ ಪರಿಶೀಲನೆ ಆರಂಭಿಸಿ.",
      loadingAssessment: "ನಿಮ್ಮ ಮೌಲ್ಯಮಾಪನವನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
      resultDisclaimer: "MDR Sathi ಎನ್‌ಪಿಸಿಐ (NPCI) ನೀತಿಯ ಆಧಾರದ ಮೇಲೆ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ. ಇದು ಆರ್ಥಿಕ, ತೆರಿಗೆ ಅಥವಾ ಕಾನೂನು ಸಲಹೆಯಲ್ಲ.",
    },
    certificate: {
      shareableSummary: "ಹಂಚಿಕೊಳ್ಳಬಹುದಾದ ಸ್ಥಿತಿ ಸಾರಾಂಶ",
      title: "ನಿಮ್ಮ ಪ್ರಮಾಣಪತ್ರವನ್ನು ರಚಿಸಿ.",
      subtitle: "ಪ್ರಮಾಣಪತ್ರದಲ್ಲಿ ನಿಮ್ಮ ಅಂಗಡಿಯ ಹೆಸರು ತೋರಿಸಲು ಬಯಸಿದರೆ ನಮೂದಿಸಿ. ಇದು ಐಚ್ಛಿಕ.",
      shopNameLabel: "ಅಂಗಡಿ / ವ್ಯವಹಾರದ ಹೆಸರು",
      optional: "(ಐಚ್ಛಿಕ)",
      shopNamePlaceholder: "ಉದಾಹರಣೆಗೆ, ಶರ್ಮಾ ಕಿರಾಣಿ ಅಂಗಡಿ",
      shopNameHelp: "ಗರಿಷ್ಠ 80 ಅಕ್ಷರಗಳು. ಖಾಲಿ ಬಿಟ್ಟರೆ ಪ್ರಮಾಣಪತ್ರದಲ್ಲಿ 'ವ್ಯಾಪಾರಿ' ಎಂದು ಇರುತ್ತದೆ.",
      previewAria: "ಪ್ರಮಾಣಪತ್ರ ಪೂರ್ವವೀಕ್ಷಣೆ",
      officialSummary: "ಅಧಿಕೃತ ಮೌಲ್ಯಮಾಪನ ಸಾರಾಂಶ",
      certTitle: "ಯುಪಿಐ MDR ಸ್ಥಿತಿ ಪ್ರಮಾಣಪತ್ರ",
      preparedFor: "ಸಿದ್ಧಪಡಿಸಲಾದ ಹೆಸರು",
      statusReturned: "MDR Sathi ನೀಡಿದ ಸ್ಥಿತಿ",
      effective: "ಜಾರಿಗೆ:",
      generated: "ರಚಿಸಿದ ದಿನಾಂಕ:",
      certNotice: "ಮಾಹಿತಿ ಮಾರ್ಗದರ್ಶನ ಮಾತ್ರ. ಆರ್ಥಿಕ, ತೆರಿಗೆ ಅಥವಾ ಕಾನೂನು ಸಲಹೆಯಲ್ಲ.",
      downloadBtn: "ಪ್ರಮಾಣಪತ್ರ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
      shareWhatsappBtn: "WhatsApp ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ",
      whatsappNotice: "WhatsApp ಸಂದೇಶದೊಂದಿಗೆ ತೆರೆಯುತ್ತದೆ. ಚಿತ್ರವು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಲಗತ್ತಾಗುವುದಿಲ್ಲ.",
      preparing: "ನಿಮ್ಮ ಪ್ರಮಾಣಪತ್ರ ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...",
      missingCertTitle: "ನಿಮ್ಮ ಮೌಲ್ಯಮಾಪನ ನಮಗೆ ಸಿಗಲಿಲ್ಲ.",
      missingCertDesc: "ಪ್ರಮಾಣಪತ್ರ ರಚಿಸುವ ಮೊದಲು ಹೊಸ ಪರಿಶೀಲನೆ ಮಾಡಿ.",
      defaultMerchant: "ವ್ಯಾಪಾರಿ",
    },
    csv: {
      historyTitle: "ವಹಿವಾಟು ಇತಿಹಾಸ",
      title: "ನಿಮ್ಮ ವಹಿವಾಟು ಇತಿಹಾಸ ಬಳಸಿ ಪರಿಶೀಲಿಸಿ",
      subtitle: "ನಿಮ್ಮ ಯುಪಿಐ ವಹಿವಾಟುಗಳ CSV ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಮತ್ತು MDR Sathi ನಿಮಗಾಗಿ ನಿಯಮಗಳನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ.",
      uploadBoxTitle: "ನಿಮ್ಮ CSV ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
      uploadBoxDesc: "ನಿಮ್ಮ ಯುಪಿಐ ಪೂರೈಕೆದಾರರಿಂದ ವಹಿವಾಟು ರಫ್ತು ಬಳಸಿ. CSV ಕಡತಗಳು ಮಾತ್ರ, ಗರಿಷ್ಠ 10 MB.",
      dropHere: "ನಿಮ್ಮ CSV ಕಡತವನ್ನು ಇಲ್ಲಿ ಹಾಕಿ",
      orChoose: "ಅಥವಾ ನಿಮ್ಮ ಸಾಧನದಿಂದ ಕಡತವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      browseBtn: "CSV ಕಡತ ಬ್ರೌಸ್ ಮಾಡಿ",
      fileTypesHint: "CSV ಮಾತ್ರ · ಗರಿಷ್ಠ ಕಡತ ಗಾತ್ರ 10 MB",
      removeBtn: "ತೆಗೆದುಹಾಕಿ",
      infoBox: "ಬ್ಯಾಕೆಂಡ್ ನಿಯಮಗಳ ಎಂಜಿನ್ ನಿಮ್ಮ ವಹಿವಾಟು ಇತಿಹಾಸವನ್ನು ಸಂಸ್ಕರಿಸುತ್ತದೆ. MDR Sathi ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಲೆಕ್ಕಿಸುವುದಿಲ್ಲ.",
      checkBtn: "ನನ್ನ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ",
      checkingBtn: "ನಿಮ್ಮ ಕಡತವನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...",
      errNoFile: "ನಿಮ್ಮ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸುವ ಮೊದಲು CSV ಕಡತವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
      errNotCsv: "ದಯವಿಟ್ಟು CSV ಕಡತವನ್ನು ಆಯ್ಕೆಮಾಡಿ. ಇತರ ಕಡತ ಪ್ರಕಾರಗಳನ್ನು ಬೆಂಬಲಿಸುವುದಿಲ್ಲ.",
      errEmpty: "ಈ CSV ಕಡತ ಖಾಲಿಯಾಗಿದೆ. ದಯವಿಟ್ಟು ವಹಿವಾಟು ಇತಿಹಾಸವಿರುವ ಕಡತವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
      errTooLarge: "ಈ ಕಡತ 10 MB ಗಿಂತ ದೊಡ್ಡದಾಗಿದೆ. ದಯವಿಟ್ಟು ಸಣ್ಣ CSV ಕಡತವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
      errGeneric: "ನಾವು ಈ CSV ಅನ್ನು ಸಂಸ್ಕರಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    },
  },
};
