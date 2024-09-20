'use client'
import React, { useState } from "react";
import AdminCard from "./AdminCard";
import AdminTable from "./AdminTable";

export default function Admin() {
    const [category, setCategory] = useState('election')
  return (
    <>
      
      <AdminCard category={category} setCategory={setCategory} />
      <AdminTable category={category} />
    </>
  );
}
