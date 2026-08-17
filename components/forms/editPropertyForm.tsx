import React, { useState } from "react";

function EditPropertyForm({ property }) {
  const [editPropertyForm, setEditPropertyForm] = useState(property);
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>EditPropertyForm</h1>
      <p>{property._id}</p>
    </form>
  );
}

export default EditPropertyForm;
