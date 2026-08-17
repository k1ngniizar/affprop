"use client";
import { dummyProperty } from "@/constants/dummy";
import { useParams } from "next/navigation";
import { useState } from "react";

function EditPropertyPage() {
  const { propertyId } = useParams();
  const [editProperties, setEditProperties] = useState(dummyProperty);
  return (
    <div>
      <p>{propertyId}</p>
      <h1>EditPropertyPage</h1>
    </div>
  );
}

export default EditPropertyPage;
