import img1 from "../imgs/section.png";
import img2 from '../imgs/section2.png'
import img3 from '../imgs/section3.png'
import img4 from '../imgs/section4.png'
import img5 from '../imgs/section5.png'
import img6 from '../imgs/section6.png'
import img7 from '../imgs/section7.png'

export const SectionList = [
  {
    title: "REAL-TIME RESULTS",
    body: "Users can access real-time election results through the application, ensuring faster and accurate dissemination of information.",
    color: "#272727",
    image: img1,
  },
  {
    title: "LIVE MONITORING",
    body: "Stakeholders can monitor polling units live, promoting transparency and deterring potential fraud.",
    color: "#2550C0",
    image: img2,
  },
  {
    title: "OFFLINE MODE",
    body: "Bad connection? No problem. PU agents' input and reports are safeguarded until the internet connection is restored, preventing any potential data loss.",
    color: "#272727",
    image: img3,
  },
  {
    title: "DATA ANALYTICS",
    body: "Visual representation of data and trends on the dashboard enables easy analysis for stakeholders.",
    color: "#2550C0",
    image: img4,
  },
  {
    title: "INCIDENT REPORTING",
    body: "PU Agents can report irregularities, violations, or incidents directly and in real-time through the app for swift resolution",
    color: "#272727",
    image: img5,
  },
  {
    title: "SECURITY AND PRIVACY",
    body: "Robust security measures including end-to-end encryption to protect election data and maintain the integrity of the database.",
    color: "#2550C0",
    image: img6,
  },
  {
    title: "ENHANCED ESCALATION",
    body: "The app allows comms agents to escalate priority incidents to the dashboard so that stakeholders can be alerted and resolve them immediately.",
    color: "#272727",
    image: img7,
  },
];
export const SubList = [
  {
    title: "Expertise:",
    body: "Our team consists of seasoned election monitoring professionals with a deep understanding of electoral processes and international standards.",
  },
  {
    title: "Impartiality:",
    body: "We adhere strictly to principles of impartiality, independence, and transparency, ensuring our monitoring activities are objective and unbiased.",
  },
  {
    title: "Analysis and Reporting:",
    body: "We analyze data collected during the election and produce detailed reports of the election, from findings, trends, recommendations.",
  },
];
export const SubPlans = [
  {
    title: "Professional Plan",
    subtitle: "N5000 Per Agent",
    btnTitle: "Subscribe to Professional Plan",
    body: ["Ideal for small teams and professional elections.", "1-100 agents"],
    link: "/plan/professional",
  },
  {
    title: "Premium Plan",
    subtitle: "N4600 Per Agent",
    btnTitle: "Subscribe to Premium Plan",
    body: ["Designed for larger teams and local elections.", "101-1000 agents"],
    link: "/plan/premium",
  },
  {
    title: "Enterprise Plan",
    subtitle: "",
    link: "/#contact",
    btnTitle: "Contact our Sales Team",
    body: [
      "Tailored solutions for large-scale operations and major elections.",
      "Contact our sales team for a personalized quote",
      "1001+ agents",
    ],
  },
];

export const testApi = [
  {
    Role: "Comms",
  },
  {
    Role: "Observer",
  },
  {
    Role: "Agent",
  },
  {
    Role: "Moderator",
  },
  {
    Role: "Admin",
  },
];