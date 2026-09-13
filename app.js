/**
 * Shortage vs Stockout — drug name → FDA national shortage YES/NO/UNKNOWN status card.
 * Brand: Shortage vs Stockout only.
 * Never invent shortage status. Live openFDA when CORS allows; else labeled seeds.
 */
(function () {
  "use strict";

  const FDA_API = "https://api.fda.gov/drug/shortages.json";
  const FDA_DB = "https://www.accessdata.fda.gov/scripts/drugshortages/default.cfm";
  const FDA_HUB = "https://www.fda.gov/drugs/drug-safety-and-availability/drug-shortages";
  const FDA_FAQ = "https://www.fda.gov/drugs/drug-shortages/frequently-asked-questions-about-drug-shortages";
  const FDA_REPORT = "https://www.fda.gov/drugs/drug-shortages/fda-drug-shortages";
  const SEED_DATASET_LAST_UPDATED = "2026-09-11";

  /** Labeled openFDA download snapshot — Public Domain / CC0. Never invent rows. */
  const SEEDS = [
  {
    "key": "adderall",
    "label": "Adderall (amphetamine salts)",
    "chip": "Adderall \u00b7 YES",
    "aliases": [
      "adderall",
      "adderall (amphetamine salts)",
      "amphetamine aspartate monohydrate"
    ],
    "genericName": "Amphetamine Aspartate Monohydrate, Amphetamine Sulfate, Dextroamphetamine Saccharate, Dextroamphetamine Sulfate Tablet",
    "brands": [
      "Adderall"
    ],
    "nationalShortage": "YES",
    "fdaStatus": "Current",
    "availability": "Available",
    "therapeuticCategory": [
      "Psychiatry"
    ],
    "initialPostingDate": "10/12/2022",
    "updateDate": "09/03/2026",
    "relatedInfo": "",
    "shortageReason": "",
    "sourceMode": "seed",
    "source": "openFDA Drug Shortages download (Public Domain / CC0)",
    "datasetLastUpdated": "2026-09-11",
    "fdaDbUrl": "https://www.accessdata.fda.gov/scripts/drugshortages/default.cfm",
    "note": "NDC-level rows collapsed to one national YES for this presentation. Check FDA DB for strength/NDC detail."
  },
  {
    "key": "vyvanse-cap",
    "label": "Vyvanse (lisdexamfetamine) capsules",
    "chip": "Vyvanse \u00b7 YES",
    "aliases": [
      "lisdexamfetamine dimesylate",
      "lisdexamfetamine dimesylate capsule",
      "vyvanse",
      "vyvanse (lisdexamfetamine) capsules",
      "vyvanse cap"
    ],
    "genericName": "Lisdexamfetamine Dimesylate Capsule",
    "brands": [
      "Vyvanse",
      "Lisdexamfetamine Dimesylate"
    ],
    "nationalShortage": "YES",
    "fdaStatus": "Current",
    "availability": "Available",
    "therapeuticCategory": [
      "Psychiatry"
    ],
    "initialPostingDate": "11/01/2023",
    "updateDate": "09/08/2026",
    "relatedInfo": "",
    "shortageReason": "",
    "sourceMode": "seed",
    "source": "openFDA Drug Shortages download (Public Domain / CC0)",
    "datasetLastUpdated": "2026-09-11",
    "fdaDbUrl": "https://www.accessdata.fda.gov/scripts/drugshortages/default.cfm",
    "note": "NDC-level rows collapsed to one national YES for this presentation. Check FDA DB for strength/NDC detail."
  },
  {
    "key": "vyvanse-chew",
    "label": "Vyvanse (lisdexamfetamine) chewable",
    "chip": "Vyvanse \u00b7 YES",
    "aliases": [
      "lisdexamfetamine dimesylate",
      "lisdexamfetamine dimesylate tablet",
      "vyvanse",
      "vyvanse (lisdexamfetamine) chewable",
      "vyvanse chew"
    ],
    "genericName": "Lisdexamfetamine Dimesylate Tablet, Chewable",
    "brands": [
      "Vyvanse",
      "Lisdexamfetamine Dimesylate"
    ],
    "nationalShortage": "YES",
    "fdaStatus": "Current",
    "availability": "Available",
    "therapeuticCategory": [
      "Psychiatry"
    ],
    "initialPostingDate": "07/14/2023",
    "updateDate": "08/27/2026",
    "relatedInfo": "",
    "shortageReason": "",
    "sourceMode": "seed",
    "source": "openFDA Drug Shortages download (Public Domain / CC0)",
    "datasetLastUpdated": "2026-09-11",
    "fdaDbUrl": "https://www.accessdata.fda.gov/scripts/drugshortages/default.cfm",
    "note": "NDC-level rows collapsed to one national YES for this presentation. Check FDA DB for strength/NDC detail."
  },
  {
    "key": "concerta",
    "label": "Concerta / methylphenidate ER tablets",
    "chip": "Concerta / methylphenida\u2026 \u00b7 YES",
    "aliases": [
      "concerta",
      "concerta / methylphenidate er tablets",
      "methylphenidate hydrochloride",
      "methylphenidate hydrochloride tablet",
      "relexxii"
    ],
    "genericName": "Methylphenidate Hydrochloride Tablet, Extended Release",
    "brands": [
      "Concerta",
      "Relexxii",
      "Methylphenidate Hydrochloride"
    ],
    "nationalShortage": "YES",
    "fdaStatus": "Current",
    "availability": "Available",
    "therapeuticCategory": [
      "Psychiatry"
    ],
    "initialPostingDate": "07/26/2023",
    "updateDate": "09/01/2026",
    "relatedInfo": "",
    "shortageReason": "",
    "sourceMode": "seed",
    "source": "openFDA Drug Shortages download (Public Domain / CC0)",
    "datasetLastUpdated": "2026-09-11",
    "fdaDbUrl": "https://www.accessdata.fda.gov/scripts/drugshortages/default.cfm",
    "note": "NDC-level rows collapsed to one national YES for this presentation. Check FDA DB for strength/NDC detail."
  },
  {
    "key": "methylphenidate-patch",
    "label": "Methylphenidate transdermal (patch)",
    "chip": "Methylphenidate transder\u2026 \u00b7 YES",
    "aliases": [
      "methylphenidate film",
      "methylphenidate patch",
      "methylphenidate transdermal (patch)",
      "methylphenidate transdermal system"
    ],
    "genericName": "Methylphenidate Film, Extended Release",
    "brands": [
      "Methylphenidate Transdermal System"
    ],
    "nationalShortage": "YES",
    "fdaStatus": "Current",
    "availability": "Available",
    "therapeuticCategory": [
      "Psychiatry"
    ],
    "initialPostingDate": "02/28/2025",
    "updateDate": "09/02/2026",
    "relatedInfo": "Distributed by Padagis US LLC",
    "shortageReason": "",
    "sourceMode": "seed",
    "source": "openFDA Drug Shortages download (Public Domain / CC0)",
    "datasetLastUpdated": "2026-09-11",
    "fdaDbUrl": "https://www.accessdata.fda.gov/scripts/drugshortages/default.cfm",
    "note": "NDC-level rows collapsed to one national YES for this presentation. Check FDA DB for strength/NDC detail."
  },
  {
    "key": "lidocaine-inj",
    "label": "Lidocaine injection",
    "chip": "Lidocaine injection \u00b7 YES",
    "aliases": [
      "lidocaine",
      "lidocaine hydrochloride",
      "lidocaine hydrochloride and dextrose",
      "lidocaine hydrochloride injection",
      "lidocaine inj",
      "lidocaine injection",
      "xylocaine",
      "xylocaine mpf"
    ],
    "genericName": "Lidocaine Hydrochloride Injection",
    "brands": [
      "Lidocaine",
      "Xylocaine",
      "Xylocaine Mpf",
      "Lidocaine Hydrochloride",
      "Lidocaine Hydrochloride And Dextrose"
    ],
    "nationalShortage": "YES",
    "fdaStatus": "Current",
    "availability": "Available",
    "therapeuticCategory": [
      "Anesthesia",
      "Pediatric"
    ],
    "initialPostingDate": "02/22/2012",
    "updateDate": "09/09/2026",
    "relatedInfo": "",
    "shortageReason": "",
    "sourceMode": "seed",
    "source": "openFDA Drug Shortages download (Public Domain / CC0)",
    "datasetLastUpdated": "2026-09-11",
    "fdaDbUrl": "https://www.accessdata.fda.gov/scripts/drugshortages/default.cfm",
    "note": "NDC-level rows collapsed to one national YES for this presentation. Check FDA DB for strength/NDC detail."
  },
  {
    "key": "lorazepam-inj",
    "label": "Lorazepam (Ativan) injection",
    "chip": "Lorazepam \u00b7 YES",
    "aliases": [
      "ativan",
      "lorazepam",
      "lorazepam (ativan) injection",
      "lorazepam inj",
      "lorazepam injection"
    ],
    "genericName": "Lorazepam Injection",
    "brands": [
      "Ativan",
      "Lorazepam"
    ],
    "nationalShortage": "YES",
    "fdaStatus": "Current",
    "availability": "Unavailable",
    "therapeuticCategory": [
      "Neurology"
    ],
    "initialPostingDate": "09/05/2018",
    "updateDate": "09/03/2026",
    "relatedInfo": "Estimated recovery: TBD",
    "shortageReason": "Other",
    "sourceMode": "seed",
    "source": "openFDA Drug Shortages download (Public Domain / CC0)",
    "datasetLastUpdated": "2026-09-11",
    "fdaDbUrl": "https://www.accessdata.fda.gov/scripts/drugshortages/default.cfm",
    "note": "NDC-level rows collapsed to one national YES for this presentation. Check FDA DB for strength/NDC detail."
  },
  {
    "key": "heparin",
    "label": "Heparin sodium injection",
    "chip": "Heparin sodium injection \u00b7 YES",
    "aliases": [
      "heparin",
      "heparin sodium",
      "heparin sodium in sodium chloride",
      "heparin sodium injection"
    ],
    "genericName": "Heparin Sodium Injection",
    "brands": [
      "Heparin Sodium",
      "Heparin Sodium In Sodium Chloride"
    ],
    "nationalShortage": "YES",
    "fdaStatus": "Current",
    "availability": "Available",
    "therapeuticCategory": [
      "Hematology"
    ],
    "initialPostingDate": "11/14/2017",
    "updateDate": "09/09/2026",
    "relatedInfo": "",
    "shortageReason": "",
    "sourceMode": "seed",
    "source": "openFDA Drug Shortages download (Public Domain / CC0)",
    "datasetLastUpdated": "2026-09-11",
    "fdaDbUrl": "https://www.accessdata.fda.gov/scripts/drugshortages/default.cfm",
    "note": "NDC-level rows collapsed to one national YES for this presentation. Check FDA DB for strength/NDC detail."
  },
  {
    "key": "morphine-inj",
    "label": "Morphine sulfate injection",
    "chip": "Morphine sulfate injection \u00b7 YES",
    "aliases": [
      "duramorph",
      "infumorph 200",
      "infumorph 500",
      "mitigo",
      "morphine inj",
      "morphine sulfate",
      "morphine sulfate injection"
    ],
    "genericName": "Morphine Sulfate Injection",
    "brands": [
      "Mitigo",
      "Duramorph",
      "Infumorph 200",
      "Infumorph 500",
      "Morphine Sulfate"
    ],
    "nationalShortage": "YES",
    "fdaStatus": "Current",
    "availability": "Available",
    "therapeuticCategory": [
      "Analgesia/Addiction"
    ],
    "initialPostingDate": "10/31/2017",
    "updateDate": "09/09/2026",
    "relatedInfo": "",
    "shortageReason": "",
    "sourceMode": "seed",
    "source": "openFDA Drug Shortages download (Public Domain / CC0)",
    "datasetLastUpdated": "2026-09-11",
    "fdaDbUrl": "https://www.accessdata.fda.gov/scripts/drugshortages/default.cfm",
    "note": "NDC-level rows collapsed to one national YES for this presentation. Check FDA DB for strength/NDC detail."
  },
  {
    "key": "fentanyl-inj",
    "label": "Fentanyl citrate injection",
    "chip": "Fentanyl citrate injection \u00b7 YES",
    "aliases": [
      "fentanyl citrate",
      "fentanyl citrate injection",
      "fentanyl inj"
    ],
    "genericName": "Fentanyl Citrate Injection",
    "brands": [
      "Fentanyl Citrate"
    ],
    "nationalShortage": "YES",
    "fdaStatus": "Current",
    "availability": "Available",
    "therapeuticCategory": [
      "Analgesia/Addiction",
      "Pediatric"
    ],
    "initialPostingDate": "01/01/2012",
    "updateDate": "09/09/2026",
    "relatedInfo": "",
    "shortageReason": "",
    "sourceMode": "seed",
    "source": "openFDA Drug Shortages download (Public Domain / CC0)",
    "datasetLastUpdated": "2026-09-11",
    "fdaDbUrl": "https://www.accessdata.fda.gov/scripts/drugshortages/default.cfm",
    "note": "NDC-level rows collapsed to one national YES for this presentation. Check FDA DB for strength/NDC detail."
  },
  {
    "key": "midazolam",
    "label": "Midazolam injection",
    "chip": "Midazolam injection \u00b7 YES",
    "aliases": [
      "midazolam",
      "midazolam hydrochloride",
      "midazolam hydrochloride injection",
      "midazolam in sodium chloride",
      "midazolam injection"
    ],
    "genericName": "Midazolam Hydrochloride Injection",
    "brands": [
      "Midazolam",
      "Midazolam Hydrochloride",
      "Midazolam In Sodium Chloride"
    ],
    "nationalShortage": "YES",
    "fdaStatus": "Current",
    "availability": "Available",
    "therapeuticCategory": [
      "Anesthesia",
      "Neurology"
    ],
    "initialPostingDate": "04/02/2020",
    "updateDate": "09/09/2026",
    "relatedInfo": "",
    "shortageReason": "",
    "sourceMode": "seed",
    "source": "openFDA Drug Shortages download (Public Domain / CC0)",
    "datasetLastUpdated": "2026-09-11",
    "fdaDbUrl": "https://www.accessdata.fda.gov/scripts/drugshortages/default.cfm",
    "note": "NDC-level rows collapsed to one national YES for this presentation. Check FDA DB for strength/NDC detail."
  },
  {
    "key": "dexamethasone-inj",
    "label": "Dexamethasone sodium phosphate injection",
    "chip": "Dexamethasone sodium pho\u2026 \u00b7 YES",
    "aliases": [
      "dexamethasone inj",
      "dexamethasone sodium phosphate",
      "dexamethasone sodium phosphate injection"
    ],
    "genericName": "Dexamethasone Sodium Phosphate Injection",
    "brands": [
      "Dexamethasone Sodium Phosphate"
    ],
    "nationalShortage": "YES",
    "fdaStatus": "Current",
    "availability": "Available",
    "therapeuticCategory": [
      "Dermatology",
      "Endocrinology/Metabolism",
      "Gastroenterology",
      "Hematology",
      "Neurology",
      "Oncology",
      "Ophthalmology",
      "Other",
      "Pulmonary/Allergy",
      "Rheumatology"
    ],
    "initialPostingDate": "02/08/2019",
    "updateDate": "09/03/2026",
    "relatedInfo": "",
    "shortageReason": "",
    "sourceMode": "seed",
    "source": "openFDA Drug Shortages download (Public Domain / CC0)",
    "datasetLastUpdated": "2026-09-11",
    "fdaDbUrl": "https://www.accessdata.fda.gov/scripts/drugshortages/default.cfm",
    "note": "NDC-level rows collapsed to one national YES for this presentation. Check FDA DB for strength/NDC detail."
  },
  {
    "key": "sterile-water",
    "label": "Sterile water for injection",
    "chip": "Sterile water for inject\u2026 \u00b7 YES",
    "aliases": [
      "bacteriostatic water",
      "sterile water",
      "sterile water for injection",
      "sterile water injection"
    ],
    "genericName": "Sterile Water Injection",
    "brands": [
      "Sterile Water",
      "Bacteriostatic Water"
    ],
    "nationalShortage": "YES",
    "fdaStatus": "Current",
    "availability": "Available",
    "therapeuticCategory": [
      "Other"
    ],
    "initialPostingDate": "11/23/2021",
    "updateDate": "09/09/2026",
    "relatedInfo": "",
    "shortageReason": "",
    "sourceMode": "seed",
    "source": "openFDA Drug Shortages download (Public Domain / CC0)",
    "datasetLastUpdated": "2026-09-11",
    "fdaDbUrl": "https://www.accessdata.fda.gov/scripts/drugshortages/default.cfm",
    "note": "NDC-level rows collapsed to one national YES for this presentation. Check FDA DB for strength/NDC detail."
  },
  {
    "key": "rocuronium",
    "label": "Rocuronium bromide injection",
    "chip": "Rocuronium bromide injec\u2026 \u00b7 YES",
    "aliases": [
      "rocuronium",
      "rocuronium bromide",
      "rocuronium bromide injection"
    ],
    "genericName": "Rocuronium Bromide Injection",
    "brands": [
      "Rocuronium",
      "Rocuronium Bromide"
    ],
    "nationalShortage": "YES",
    "fdaStatus": "Current",
    "availability": "Available",
    "therapeuticCategory": [
      "Anesthesia"
    ],
    "initialPostingDate": "02/15/2023",
    "updateDate": "09/09/2026",
    "relatedInfo": "",
    "shortageReason": "",
    "sourceMode": "seed",
    "source": "openFDA Drug Shortages download (Public Domain / CC0)",
    "datasetLastUpdated": "2026-09-11",
    "fdaDbUrl": "https://www.accessdata.fda.gov/scripts/drugshortages/default.cfm",
    "note": "NDC-level rows collapsed to one national YES for this presentation. Check FDA DB for strength/NDC detail."
  },
  {
    "key": "dopamine",
    "label": "Dopamine hydrochloride injection",
    "chip": "Dopamine hydrochloride i\u2026 \u00b7 YES",
    "aliases": [
      "dopamine",
      "dopamine hydrochloride",
      "dopamine hydrochloride and dextrose",
      "dopamine hydrochloride in dextrose",
      "dopamine hydrochloride injection"
    ],
    "genericName": "Dopamine Hydrochloride Injection",
    "brands": [
      "Dopamine Hydrochloride",
      "Dopamine Hydrochloride In Dextrose",
      "Dopamine Hydrochloride And Dextrose"
    ],
    "nationalShortage": "YES",
    "fdaStatus": "Current",
    "availability": "Unavailable",
    "therapeuticCategory": [
      "Cardiovascular"
    ],
    "initialPostingDate": "11/06/2017",
    "updateDate": "09/09/2026",
    "relatedInfo": "Next Delivery and Estimated Recovery: December 2027; Shortage per Manufacturer: Manufacturing Delay",
    "shortageReason": "Other",
    "sourceMode": "seed",
    "source": "openFDA Drug Shortages download (Public Domain / CC0)",
    "datasetLastUpdated": "2026-09-11",
    "fdaDbUrl": "https://www.accessdata.fda.gov/scripts/drugshortages/default.cfm",
    "note": "NDC-level rows collapsed to one national YES for this presentation. Check FDA DB for strength/NDC detail."
  },
  {
    "key": "albuterol-sol",
    "label": "Albuterol sulfate inhalation solution",
    "chip": "Albuterol sulfate inhala\u2026 \u00b7 NO",
    "aliases": [
      "albuterol",
      "albuterol sulfate",
      "albuterol sulfate inhalation solution"
    ],
    "genericName": "Albuterol Sulfate Solution",
    "brands": [
      "Albuterol Sulfate"
    ],
    "nationalShortage": "NO",
    "fdaStatus": "Resolved",
    "availability": "",
    "therapeuticCategory": [
      "Pediatric",
      "Pulmonary/Allergy"
    ],
    "initialPostingDate": "10/25/2022",
    "updateDate": "08/27/2026",
    "relatedInfo": "",
    "shortageReason": "",
    "sourceMode": "seed",
    "source": "openFDA Drug Shortages download (Public Domain / CC0)",
    "datasetLastUpdated": "2026-09-11",
    "fdaDbUrl": "https://www.accessdata.fda.gov/scripts/drugshortages/default.cfm",
    "note": "FDA lists this presentation as Resolved \u2014 not Current. A local pharmacy empty shelf can still happen."
  },
  {
    "key": "metformin",
    "label": "Metformin",
    "chip": "Metformin \u00b7 NO",
    "aliases": [
      "metformin"
    ],
    "genericName": "Metformin",
    "brands": [
      "Metformin"
    ],
    "nationalShortage": "NO",
    "fdaStatus": "Not listed as Current",
    "availability": "",
    "therapeuticCategory": [],
    "initialPostingDate": "",
    "updateDate": "",
    "relatedInfo": "No Current openFDA Drug Shortages rows for Metformin in the 2026-09-11 snapshot. Local stockouts can still happen.",
    "shortageReason": "",
    "sourceMode": "seed",
    "source": "openFDA Drug Shortages download (Public Domain / CC0) \u2014 absence of Current rows",
    "datasetLastUpdated": "2026-09-11",
    "fdaDbUrl": "https://www.accessdata.fda.gov/scripts/drugshortages/default.cfm",
    "note": "Absence of a Current national listing \u2260 guaranteed stock at your pharmacy."
  },
  {
    "key": "atorvastatin",
    "label": "Atorvastatin",
    "chip": "Atorvastatin \u00b7 NO",
    "aliases": [
      "atorvastatin",
      "lipitor"
    ],
    "genericName": "Atorvastatin",
    "brands": [
      "Lipitor"
    ],
    "nationalShortage": "NO",
    "fdaStatus": "Not listed as Current",
    "availability": "",
    "therapeuticCategory": [],
    "initialPostingDate": "",
    "updateDate": "",
    "relatedInfo": "No Current openFDA Drug Shortages rows for Atorvastatin in the 2026-09-11 snapshot. Local stockouts can still happen.",
    "shortageReason": "",
    "sourceMode": "seed",
    "source": "openFDA Drug Shortages download (Public Domain / CC0) \u2014 absence of Current rows",
    "datasetLastUpdated": "2026-09-11",
    "fdaDbUrl": "https://www.accessdata.fda.gov/scripts/drugshortages/default.cfm",
    "note": "Absence of a Current national listing \u2260 guaranteed stock at your pharmacy."
  },
  {
    "key": "sertraline",
    "label": "Sertraline",
    "chip": "Sertraline \u00b7 NO",
    "aliases": [
      "sertraline",
      "zoloft"
    ],
    "genericName": "Sertraline",
    "brands": [
      "Zoloft"
    ],
    "nationalShortage": "NO",
    "fdaStatus": "Not listed as Current",
    "availability": "",
    "therapeuticCategory": [],
    "initialPostingDate": "",
    "updateDate": "",
    "relatedInfo": "No Current openFDA Drug Shortages rows for Sertraline in the 2026-09-11 snapshot. Local stockouts can still happen.",
    "shortageReason": "",
    "sourceMode": "seed",
    "source": "openFDA Drug Shortages download (Public Domain / CC0) \u2014 absence of Current rows",
    "datasetLastUpdated": "2026-09-11",
    "fdaDbUrl": "https://www.accessdata.fda.gov/scripts/drugshortages/default.cfm",
    "note": "Absence of a Current national listing \u2260 guaranteed stock at your pharmacy."
  },
  {
    "key": "omeprazole",
    "label": "Omeprazole",
    "chip": "Omeprazole \u00b7 NO",
    "aliases": [
      "omeprazole",
      "prilosec"
    ],
    "genericName": "Omeprazole",
    "brands": [
      "Prilosec"
    ],
    "nationalShortage": "NO",
    "fdaStatus": "Not listed as Current",
    "availability": "",
    "therapeuticCategory": [],
    "initialPostingDate": "",
    "updateDate": "",
    "relatedInfo": "No Current openFDA Drug Shortages rows for Omeprazole in the 2026-09-11 snapshot. Local stockouts can still happen.",
    "shortageReason": "",
    "sourceMode": "seed",
    "source": "openFDA Drug Shortages download (Public Domain / CC0) \u2014 absence of Current rows",
    "datasetLastUpdated": "2026-09-11",
    "fdaDbUrl": "https://www.accessdata.fda.gov/scripts/drugshortages/default.cfm",
    "note": "Absence of a Current national listing \u2260 guaranteed stock at your pharmacy."
  },
  {
    "key": "lisinopril",
    "label": "Lisinopril",
    "chip": "Lisinopril \u00b7 NO",
    "aliases": [
      "lisinopril",
      "zestril"
    ],
    "genericName": "Lisinopril",
    "brands": [
      "Zestril"
    ],
    "nationalShortage": "NO",
    "fdaStatus": "Not listed as Current",
    "availability": "",
    "therapeuticCategory": [],
    "initialPostingDate": "",
    "updateDate": "",
    "relatedInfo": "No Current openFDA Drug Shortages rows for Lisinopril in the 2026-09-11 snapshot. Local stockouts can still happen.",
    "shortageReason": "",
    "sourceMode": "seed",
    "source": "openFDA Drug Shortages download (Public Domain / CC0) \u2014 absence of Current rows",
    "datasetLastUpdated": "2026-09-11",
    "fdaDbUrl": "https://www.accessdata.fda.gov/scripts/drugshortages/default.cfm",
    "note": "Absence of a Current national listing \u2260 guaranteed stock at your pharmacy."
  }
];

  let lastCard = null;

  function $(id) {
    return document.getElementById(id);
  }

  function el(tag, attrs, text) {
    const n = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach((k) => {
        if (k === "className") n.className = attrs[k];
        else if (k === "textContent") n.textContent = attrs[k];
        else n.setAttribute(k, attrs[k]);
      });
    }
    if (text != null) n.textContent = text;
    return n;
  }

  function norm(s) {
    return String(s || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function findSeed(q) {
    const nq = norm(q);
    if (!nq) return null;
    return (
      SEEDS.find((s) => s.key === nq.replace(/\s+/g, "-")) ||
      SEEDS.find((s) => norm(s.label) === nq) ||
      SEEDS.find((s) => (s.aliases || []).some((a) => norm(a) === nq)) ||
      SEEDS.find((s) => (s.aliases || []).some((a) => nq.includes(norm(a)) || norm(a).includes(nq))) ||
      SEEDS.find((s) => norm(s.genericName).includes(nq) || nq.includes(norm(s.genericName).slice(0, 24))) ||
      SEEDS.find((s) => (s.brands || []).some((b) => norm(b) === nq || nq.includes(norm(b))))
    );
  }

  function durationLine(card) {
    if (!card.initialPostingDate) {
      return card.nationalShortage === "YES"
        ? "Duration: see FDA row for estimated recovery"
        : "—";
    }
    if (card.nationalShortage === "YES") {
      return "On FDA list since " + card.initialPostingDate + " (check FDA for estimated recovery)";
    }
    if (card.fdaStatus === "Resolved") {
      return "Resolved (FDA update " + (card.updateDate || "—") + ")";
    }
    return "—";
  }

  function askLines(card) {
    const lines = [];
    if (card.nationalShortage === "YES") {
      lines.push("Ask your pharmacist which NDCs / strengths are still available and whether a partial fill or transfer helps.");
      lines.push("Ask your prescriber if a therapeutically appropriate alternative is OK while the shortage lasts.");
      lines.push("Open the FDA Drug Shortage Database for the specific presentation before hopping stores all afternoon.");
    } else if (card.nationalShortage === "NO") {
      lines.push("Ask the pharmacist to check other NDCs, strengths, or sister stores — this may be local distribution, not a national shortage.");
      lines.push("Ask whether they can transfer the Rx or order stock with an ETA.");
      lines.push("If you believe a national shortage is missing from FDA’s list, use FDA’s report path (link on card).");
    } else {
      lines.push("We could not confirm national status here — open the FDA Drug Shortage Database and ask your pharmacist.");
      lines.push("Do not drive store-to-store on a rumor; confirm the presentation (strength / form) first.");
    }
    return lines;
  }

  function literacyFor(card) {
    if (card.nationalShortage === "YES") {
      return "FDA lists this as a Current national shortage — but some pharmacies may still have certain NDCs. A full shelf at one store doesn’t cancel the national listing; an empty shelf elsewhere doesn’t make it worse than FDA says. Confirm form/strength before you spend the afternoon hopping.";
    }
    if (card.nationalShortage === "NO") {
      return "No Current FDA national shortage found for this lookup — so one pharmacy’s empty shelf is often temporary distribution, a different NDC, or local demand. Ask the pharmacist to check other packages or transfer before assuming a national crisis.";
    }
    return "National status unknown from our sources — we will not invent a YES or NO. Use the FDA Drug Shortage Database and your pharmacist. Pharmacy empty still ≠ automatic national shortage.";
  }

  function seedToCard(seed) {
    return {
      key: seed.key,
      label: seed.label,
      query: seed.label,
      genericName: seed.genericName,
      brands: seed.brands || [],
      nationalShortage: seed.nationalShortage,
      fdaStatus: seed.fdaStatus,
      availability: seed.availability || "",
      therapeuticCategory: seed.therapeuticCategory || [],
      initialPostingDate: seed.initialPostingDate || "",
      updateDate: seed.updateDate || "",
      relatedInfo: seed.relatedInfo || "",
      shortageReason: seed.shortageReason || "",
      sourceMode: "seed",
      sourceLabel: "Labeled seed · openFDA download snapshot " + (seed.datasetLastUpdated || SEED_DATASET_LAST_UPDATED),
      datasetLastUpdated: seed.datasetLastUpdated || SEED_DATASET_LAST_UPDATED,
      note: seed.note || "",
      nMatches: null,
    };
  }

  function aggregateLive(results, query) {
    if (!results || !results.length) {
      return {
        key: "live-" + norm(query).replace(/\s+/g, "-").slice(0, 40),
        label: query.trim(),
        query: query.trim(),
        genericName: query.trim(),
        brands: [],
        nationalShortage: "NO",
        fdaStatus: "Not listed as Current (live openFDA)",
        availability: "",
        therapeuticCategory: [],
        initialPostingDate: "",
        updateDate: "",
        relatedInfo: "Live openFDA query returned no matching shortage rows for this search. Local stockouts can still happen.",
        shortageReason: "",
        sourceMode: "live",
        sourceLabel: "Live openFDA Drug Shortages API",
        datasetLastUpdated: "",
        note: "Absence of rows ≠ guaranteed pharmacy stock. Confirm spelling / generic name on FDA DB if unsure.",
        nMatches: 0,
      };
    }

    const current = results.filter((r) => (r.status || "") === "Current");
    const resolved = results.filter((r) => (r.status || "") === "Resolved");
    const brands = new Set();
    results.forEach((r) => {
      ((r.openfda && r.openfda.brand_name) || []).forEach((b) => {
        if (b && b.length < 48) brands.add(b);
      });
    });

    if (current.length) {
      const sorted = current.slice().sort((a, b) => String(b.update_date || "").localeCompare(String(a.update_date || "")));
      const r = sorted[0];
      const generics = Array.from(new Set(current.map((x) => x.generic_name).filter(Boolean)));
      return {
        key: "live-" + norm(r.generic_name || query).replace(/\s+/g, "-").slice(0, 48),
        label: (Array.from(brands)[0] || generics[0] || query).toString(),
        query: query.trim(),
        genericName: generics[0] || r.generic_name || query,
        brands: Array.from(brands).slice(0, 8),
        nationalShortage: "YES",
        fdaStatus: "Current",
        availability: r.availability || "",
        therapeuticCategory: r.therapeutic_category || [],
        initialPostingDate: r.initial_posting_date || "",
        updateDate: r.update_date || "",
        relatedInfo: (r.related_info || "").slice(0, 240),
        shortageReason: (r.shortage_reason || "").slice(0, 160),
        sourceMode: "live",
        sourceLabel: "Live openFDA Drug Shortages API",
        datasetLastUpdated: "",
        note: "Collapsed " + current.length + " Current NDC/presentation row(s). Check FDA DB for strength-level detail.",
        nMatches: current.length,
      };
    }

    if (resolved.length && !current.length) {
      const r = resolved[0];
      return {
        key: "live-" + norm(r.generic_name || query).replace(/\s+/g, "-").slice(0, 48),
        label: (Array.from(brands)[0] || r.generic_name || query).toString(),
        query: query.trim(),
        genericName: r.generic_name || query,
        brands: Array.from(brands).slice(0, 8),
        nationalShortage: "NO",
        fdaStatus: "Resolved",
        availability: r.availability || "",
        therapeuticCategory: r.therapeutic_category || [],
        initialPostingDate: r.initial_posting_date || "",
        updateDate: r.update_date || "",
        relatedInfo: (r.related_info || r.resolved_notes || "").slice(0, 240),
        shortageReason: (r.shortage_reason || "").slice(0, 160),
        sourceMode: "live",
        sourceLabel: "Live openFDA Drug Shortages API",
        datasetLastUpdated: "",
        note: "FDA marks matching row(s) Resolved — not Current. Local empty shelves can still happen.",
        nMatches: resolved.length,
      };
    }

    // Other statuses (e.g. To Be Discontinued) — not a Current national shortage
    const r = results[0];
    return {
      key: "live-" + norm(r.generic_name || query).replace(/\s+/g, "-").slice(0, 48),
      label: (Array.from(brands)[0] || r.generic_name || query).toString(),
      query: query.trim(),
      genericName: r.generic_name || query,
      brands: Array.from(brands).slice(0, 8),
      nationalShortage: "NO",
      fdaStatus: r.status || "Not Current",
      availability: r.availability || "",
      therapeuticCategory: r.therapeutic_category || [],
      initialPostingDate: r.initial_posting_date || "",
      updateDate: r.update_date || "",
      relatedInfo: (r.related_info || "").slice(0, 240),
      shortageReason: (r.shortage_reason || "").slice(0, 160),
      sourceMode: "live",
      sourceLabel: "Live openFDA Drug Shortages API",
      datasetLastUpdated: "",
      note: "Matching rows found but none with status Current — not counted as national shortage YES.",
      nMatches: results.length,
    };
  }

  async function fetchLive(query) {
    const q = query.trim();
    if (!q) throw new Error("Empty query");
    // Prefer brand then generic search; openFDA search syntax
    const attempts = [
      'openfda.brand_name:"' + q.replace(/"/g, "") + '"',
      "generic_name:" + q.replace(/[^a-zA-Z0-9\\-\\s]/g, " ").trim(),
      q.replace(/[^a-zA-Z0-9\\-\\s]/g, " ").trim(),
    ];
    let lastErr = null;
    for (let i = 0; i < attempts.length; i++) {
      const search = attempts[i];
      const url = FDA_API + "?search=" + encodeURIComponent(search) + "&limit=100";
      try {
        const res = await fetch(url);
        if (res.status === 404) {
          // openFDA uses 404 for zero results
          if (i === attempts.length - 1) return aggregateLive([], q);
          continue;
        }
        if (!res.ok) throw new Error("openFDA HTTP " + res.status);
        const data = await res.json();
        const results = data.results || [];
        if (results.length || i === attempts.length - 1) {
          return aggregateLive(results, q);
        }
      } catch (err) {
        lastErr = err;
      }
    }
    throw lastErr || new Error("openFDA fetch failed");
  }

  function renderCard(card) {
    lastCard = card;
    $("cardSection").hidden = false;

    const badge = $("statusBadge");
    badge.classList.remove("yes", "no", "unknown");
    const ns = card.nationalShortage;
    if (ns === "YES") badge.classList.add("yes");
    else if (ns === "NO") badge.classList.add("no");
    else badge.classList.add("unknown");

    $("statusWord").textContent = ns;
    $("statusSub").textContent =
      ns === "YES"
        ? "Current on FDA shortage list"
        : ns === "NO"
          ? "Not a Current national listing"
          : "Could not confirm — not invented";

    const brandBit = (card.brands || []).slice(0, 3).join(" · ");
    $("cardDrug").textContent = brandBit
      ? brandBit + " · lookup: " + (card.query || card.label)
      : "lookup: " + (card.query || card.label);
    $("cardAsOf").textContent =
      card.sourceMode === "live"
        ? "Source: live openFDA · checked just now in this browser"
        : "Source: labeled seed · openFDA download last_updated " + (card.datasetLastUpdated || SEED_DATASET_LAST_UPDATED);
    $("cardHeadline").textContent = card.genericName || card.label;

    $("fdaStatusLine").textContent = card.fdaStatus || "—";
    $("availLine").textContent = card.availability || durationLine(card) || "—";
    $("postedLine").textContent = card.initialPostingDate || "—";
    $("updateLine").textContent = card.updateDate || (card.sourceMode === "live" ? "live check" : "—");

    $("literacyLine").textContent = literacyFor(card);

    const ask = $("askList");
    ask.innerHTML = "";
    askLines(card).forEach((line) => ask.appendChild(el("li", null, line)));

    $("sourceLine").textContent =
      card.sourceLabel +
      (card.note ? " · " + card.note : "") +
      (card.relatedInfo ? " · FDA note: " + card.relatedInfo.slice(0, 120) : "");

    const links = $("sourceLinks");
    links.innerHTML = "";
    [
      ["FDA shortage DB", FDA_DB],
      ["FDA hub", FDA_HUB],
      ["FDA FAQs", FDA_FAQ],
      ["openFDA", "https://open.fda.gov/apis/drug/drugshortages/"],
    ].forEach(([label, href]) => {
      const a = el("a", { href: href, target: "_blank", rel: "noopener noreferrer" }, label + " ↗");
      links.appendChild(a);
    });

    updateShare(card);
  }

  function summaryText(card) {
    const lines = [
      "Shortage vs Stockout — " + (card.label || card.query),
      "FDA national shortage: " + card.nationalShortage,
      "FDA status: " + (card.fdaStatus || "—"),
      card.genericName ? "Presentation: " + card.genericName : "",
      durationLine(card),
      "",
      "Pharmacy empty ≠ national shortage.",
      literacyFor(card),
      "",
      "Ask next:",
      ...askLines(card).map((l) => "• " + l),
      "",
      "Sources: " + card.sourceLabel,
      "FDA DB: " + FDA_DB,
      "",
      "Not medical advice — not a substitute for pharmacist / prescriber / FDA.",
    ];
    return lines.filter((x) => x !== "").join("\\n");
  }

  function updateShare(card) {
    $("shareBox").hidden = false;
    const hash = "#p=" + encodeURIComponent(card.key || norm(card.query));
    if (location.hash !== hash) {
      history.replaceState(null, "", location.pathname + location.search + hash);
    }
    $("shareUrl").value = location.origin + location.pathname + location.search + hash;
  }

  function wrapText(ctx, text, x, y, maxW, lineH) {
    const words = String(text || "").split(/\\s+/);
    let line = "";
    let yy = y;
    for (let i = 0; i < words.length; i++) {
      const test = line ? line + " " + words[i] : words[i];
      if (ctx.measureText(test).width > maxW && line) {
        ctx.fillText(line, x, yy);
        line = words[i];
        yy += lineH;
      } else line = test;
    }
    if (line) {
      ctx.fillText(line, x, yy);
      yy += lineH;
    }
    return yy;
  }

  function exportPng() {
    if (!lastCard) return;
    const card = lastCard;
    const canvas = $("pngCanvas");
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;

    ctx.fillStyle = "#0c1016";
    ctx.fillRect(0, 0, w, h);

    // badge panel
    const ns = card.nationalShortage;
    const badgeColor = ns === "YES" ? "#ff6b6b" : ns === "NO" ? "#3ecf8e" : "#9aa4b2";
    ctx.fillStyle = "#141a22";
    ctx.fillRect(24, 24, w - 48, h - 48);
    ctx.strokeStyle = "#2a3444";
    ctx.lineWidth = 2;
    ctx.strokeRect(24, 24, w - 48, h - 48);

    ctx.fillStyle = "#5eb0ff";
    ctx.font = "700 14px IBM Plex Sans, system-ui, sans-serif";
    ctx.fillText("SHORTAGE VS STOCKOUT", 48, 64);

    ctx.fillStyle = "#8a96a8";
    ctx.font = "400 13px IBM Plex Mono, monospace";
    ctx.fillText(card.sourceMode === "live" ? "live openFDA check" : "seed · openFDA " + (card.datasetLastUpdated || ""), 48, 88);

    ctx.fillStyle = "#e8eef6";
    ctx.font = "700 26px IBM Plex Sans, system-ui, sans-serif";
    let y = wrapText(ctx, card.label || card.query, 48, 130, w - 280, 30);

    // huge badge
    const bx = w - 200;
    const by = 110;
    ctx.fillStyle = ns === "YES" ? "rgba(255,107,107,0.15)" : ns === "NO" ? "rgba(62,207,142,0.12)" : "rgba(154,164,178,0.12)";
    ctx.strokeStyle = badgeColor;
    ctx.lineWidth = 3;
    roundRect(ctx, bx, by, 152, 130, 14);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#8a96a8";
    ctx.font = "700 11px IBM Plex Sans, system-ui, sans-serif";
    ctx.fillText("FDA NATIONAL", bx + 22, by + 28);
    ctx.fillStyle = badgeColor;
    ctx.font = "600 42px IBM Plex Mono, monospace";
    ctx.fillText(ns, bx + (ns === "UNKNOWN" ? 8 : 36), by + 78);
    ctx.fillStyle = "#8a96a8";
    ctx.font = "400 11px IBM Plex Sans, system-ui, sans-serif";
    wrapText(ctx, ns === "YES" ? "Current shortage" : ns === "NO" ? "Not Current" : "Not confirmed", bx + 16, by + 100, 120, 14);

    y = Math.max(y, by + 150) + 20;
    ctx.fillStyle = "#8a96a8";
    ctx.font = "700 12px IBM Plex Sans, system-ui, sans-serif";
    ctx.fillText("FDA STATUS", 48, y);
    ctx.fillStyle = "#e8eef6";
    ctx.font = "600 16px IBM Plex Sans, system-ui, sans-serif";
    y = wrapText(ctx, (card.fdaStatus || "—") + (card.availability ? " · " + card.availability : ""), 48, y + 24, w - 96, 22);

    y += 18;
    ctx.fillStyle = "#f0b429";
    ctx.font = "700 14px IBM Plex Sans, system-ui, sans-serif";
    ctx.fillText("PHARMACY EMPTY ≠ NATIONAL SHORTAGE", 48, y);
    ctx.fillStyle = "#e8eef6";
    ctx.font = "500 15px IBM Plex Sans, system-ui, sans-serif";
    y = wrapText(ctx, literacyFor(card), 48, y + 26, w - 96, 22);

    y += 20;
    ctx.fillStyle = "#5eb0ff";
    ctx.font = "700 12px IBM Plex Sans, system-ui, sans-serif";
    ctx.fillText("ASK NEXT", 48, y);
    ctx.fillStyle = "#e8eef6";
    ctx.font = "500 14px IBM Plex Sans, system-ui, sans-serif";
    y += 26;
    askLines(card).forEach((line, i) => {
      y = wrapText(ctx, i + 1 + ". " + line, 48, y, w - 96, 20) + 10;
    });

    ctx.fillStyle = "#8a96a8";
    ctx.font = "400 12px IBM Plex Mono, monospace";
    ctx.fillText("Not medical advice · Cite FDA · accessdata.fda.gov drugshortages", 48, h - 40);

    canvas.toBlob((blob) => {
      if (!blob) {
        $("status").textContent = "PNG export failed.";
        return;
      }
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "shortage-vs-stockout-" + String(card.key || "card").replace(/\\W+/g, "-") + ".png";
      a.click();
      URL.revokeObjectURL(a.href);
      $("status").textContent = "PNG downloaded.";
    });
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  async function resolveAndRender(rawQuery, opts) {
    opts = opts || {};
    const preferLive = opts.forceSeed ? false : $("preferLive").checked;
    const q = String(rawQuery || "").trim();
    if (!q) {
      $("status").textContent = "Enter a drug name (or tap a seed chip).";
      return;
    }

    $("status").textContent = "Looking up…";
    document.querySelectorAll(".chip").forEach((b) => b.classList.remove("active"));

    const seed = findSeed(q);
    if (seed && opts.fromChip) {
      document.querySelectorAll('.chip[data-key="' + seed.key + '"]').forEach((b) => b.classList.add("active"));
    }

    let card = null;
    try {
      if (seed && (!preferLive || opts.forceSeed)) {
        card = seedToCard(seed);
      } else if (preferLive) {
        try {
          card = await fetchLive(seed && seed.brands && seed.brands[0] ? seed.brands[0] : q);
          // If live says NO but we have a YES seed for same drug, prefer live truth but annotate seed existence
          if (seed && card.nationalShortage !== seed.nationalShortage) {
            card.note =
              (card.note || "") +
              " Seed snapshot (" +
              seed.datasetLastUpdated +
              ") had " +
              seed.nationalShortage +
              " — live openFDA is authoritative when it loads.";
          }
        } catch (err) {
          if (seed) {
            card = seedToCard(seed);
            card.note =
              "Live openFDA failed (" +
              err.message +
              "). Showing labeled seed snapshot. " +
              (seed.note || "");
          } else {
            card = {
              key: "unk-" + norm(q).replace(/\\s+/g, "-").slice(0, 40),
              label: q,
              query: q,
              genericName: q,
              brands: [],
              nationalShortage: "UNKNOWN",
              fdaStatus: "Unconfirmed",
              availability: "",
              therapeuticCategory: [],
              initialPostingDate: "",
              updateDate: "",
              relatedInfo: "",
              shortageReason: "",
              sourceMode: "unknown",
              sourceLabel: "No live openFDA + no seed match — status not invented",
              datasetLastUpdated: "",
              note: err.message,
              nMatches: null,
            };
          }
        }
      } else if (seed) {
        card = seedToCard(seed);
      }

      if (!card) {
        $("cardSection").hidden = true;
        $("status").textContent =
          "No seed match and live lookup failed or was off. Enable prefer-live or tap a seed — we never invent shortage status.";
        return;
      }

      if (!card.key) card.key = seed ? seed.key : "q-" + norm(q).replace(/\\s+/g, "-").slice(0, 40);
      renderCard(card);
      $("status").textContent =
        card.sourceMode === "live"
          ? "Live openFDA card ready — copy, share, or export PNG."
          : card.sourceMode === "unknown"
            ? "UNKNOWN — open FDA DB; we did not invent a status."
            : "Labeled seed card ready — uncheck prefer-live stays on snapshot; prefer-live rechecks openFDA.";
    } catch (err) {
      $("status").textContent = "Lookup failed: " + err.message;
    }
  }

  function fillChips() {
    const box = $("seedChips");
    box.innerHTML = "";
    // Show a curated subset first for mobile, then rest
    const order = [
      "adderall",
      "vyvanse-cap",
      "concerta",
      "metformin",
      "sertraline",
      "albuterol-sol",
      "lidocaine-inj",
      "lorazepam-inj",
      "heparin",
      "atorvastatin",
    ];
    const shown = new Set();
    const list = [];
    order.forEach((k) => {
      const s = SEEDS.find((x) => x.key === k);
      if (s) {
        list.push(s);
        shown.add(s.key);
      }
    });
    SEEDS.forEach((s) => {
      if (!shown.has(s.key)) list.push(s);
    });

    list.slice(0, 14).forEach((s) => {
      const b = el("button", {
        type: "button",
        className: "chip",
        "data-key": s.key,
        role: "listitem",
      });
      const parts = String(s.chip || s.label).split(" · ");
      b.appendChild(document.createTextNode(parts[0]));
      if (parts[1]) {
        b.appendChild(el("span", { className: "chip-meta" }, " · " + parts.slice(1).join(" · ")));
      }
      b.addEventListener("click", () => {
        $("queryInput").value = s.brands[0] || s.label;
        $("preferLive").checked = false;
        resolveAndRender(s.key, { fromChip: true, forceSeed: true });
      });
      box.appendChild(b);
    });
  }

  function fillDatalist() {
    const dl = $("drugSuggestions");
    dl.innerHTML = "";
    SEEDS.forEach((s) => {
      const labels = [s.label].concat(s.brands || []).concat(s.aliases || []);
      Array.from(new Set(labels.map((x) => String(x)))).forEach((lab) => {
        dl.appendChild(el("option", { value: lab }));
      });
    });
  }

  function initFromHash() {
    const raw = location.hash || "";
    if (!raw.startsWith("#p=")) return;
    try {
      const key = decodeURIComponent(raw.slice(3));
      const seed = SEEDS.find((s) => s.key === key || norm(s.label) === norm(key));
      if (seed) {
        $("queryInput").value = seed.brands[0] || seed.label;
        $("preferLive").checked = false;
        resolveAndRender(seed.key, { fromChip: true, forceSeed: true });
      } else if (key) {
        $("queryInput").value = key.replace(/^live-/, "").replace(/-/g, " ");
        resolveAndRender($("queryInput").value, {});
      }
    } catch (e) {
      /* ignore bad hash */
    }
  }

  function bind() {
    $("seedAsOf").textContent = SEED_DATASET_LAST_UPDATED;
    fillChips();
    fillDatalist();

    $("lookupBtn").addEventListener("click", () => resolveAndRender($("queryInput").value));
    $("queryInput").addEventListener("keydown", (e) => {
      if (e.key === "Enter") resolveAndRender($("queryInput").value);
    });
    $("copyCard").addEventListener("click", async () => {
      if (!lastCard) return;
      try {
        await navigator.clipboard.writeText(summaryText(lastCard));
        $("status").textContent = "Summary copied.";
      } catch (e) {
        $("status").textContent = "Copy failed — select share URL instead.";
      }
    });
    $("shareBtn").addEventListener("click", async () => {
      if (!lastCard) return;
      updateShare(lastCard);
      const url = $("shareUrl").value || location.href;
      try {
        await navigator.clipboard.writeText(url);
        $("status").textContent = "Share link copied.";
      } catch (e) {
        $("status").textContent = "Share box ready — copy manually.";
      }
    });
    $("copyShare").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText($("shareUrl").value);
        $("status").textContent = "Share URL copied.";
      } catch (e) {
        $("status").textContent = "Copy failed.";
      }
    });
    $("pngBtn").addEventListener("click", exportPng);
    window.addEventListener("hashchange", initFromHash);
    initFromHash();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind);
  else bind();
})();
