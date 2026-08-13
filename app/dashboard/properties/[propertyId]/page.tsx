"use client";
import { useParams } from "next/navigation";

function DashboardPropertyPreviewPage() {
  const { propertyId } = useParams();
  return (
    <div>
      <h1>DashboardPropertyPreviewPage</h1>
      <p>{propertyId}</p>
    </div>
  );
}

export default DashboardPropertyPreviewPage;
