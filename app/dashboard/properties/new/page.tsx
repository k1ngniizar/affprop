import PropertyForm from "@/components/forms/property-form";
import React from "react";

function CreatePropertyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add Property</h1>

        <p className="text-muted-foreground">Create a new property listing.</p>
      </div>

      <PropertyForm />
    </div>
  );
}

export default CreatePropertyPage;
