"use client";

import React, { useState, useEffect } from 'react';
import CardTree from "@/components/CardTree";
import { generateMetricTreeData } from "@/data/treeTemplate";
import { TemplateProps } from '@/data/treeTemplate';


export default function Home() {
  const [cardData, setCardData] = useState<TemplateProps[]>([]);

  useEffect(() => {
    async function fetchData() {
        const data = await generateMetricTreeData();
        setCardData(data);
    }

    fetchData();
}, []);

  return (
      <CardTree data={cardData}/>
  );
}
