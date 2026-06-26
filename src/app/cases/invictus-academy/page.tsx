import CaseClient from "../[slug]/CaseClient";

const invictusAcademyCaseData = {
    title: "Invictus Academy",
    year: "2025",
    service: "Продакшн",
    industry: "Фитнес",
};

export default function InvictusAcademyCasePage() {
    return <CaseClient data={invictusAcademyCaseData} slug="invictus-academy" />;
}
