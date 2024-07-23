// src/utils/dataProcessor.ts
import data from '../agricultureData.json';

interface CropData {
  Country: string;
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))"?: number;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"?: number;
  "Area Under Cultivation (UOM:Ha(Hectares))"?: number;
}

interface YearlyData {
  Year: string;
  maxCrop: string;
  minCrop: string;
}

interface CropAggregatedData {
  crop: string;
  averageYield: number;
  averageArea: number;
}

export const processAgricultureDataByYear = (): YearlyData[] => {
  const cropData: CropData[] = data as CropData[];

  const yearMap: { [key: string]: CropData[] } = {};

  // Group data by year
  cropData.forEach((item) => {
    const year = item.Year;
    if (!yearMap[year]) {
      yearMap[year] = [];
    }
    yearMap[year].push(item);
  });

  // Aggregate data by year
  const aggregatedData = Object.keys(yearMap).map((year) => {
    const crops = yearMap[year];
    const maxCrop = crops.reduce((prev, curr) =>
      (prev["Crop Production (UOM:t(Tonnes))"] || 0) > (curr["Crop Production (UOM:t(Tonnes))"] || 0) ? prev : curr
    );
    const minCrop = crops.reduce((prev, curr) =>
      (prev["Crop Production (UOM:t(Tonnes))"] || 0) < (curr["Crop Production (UOM:t(Tonnes))"] || 0) ? prev : curr
    );

    return {
      Year: year,
      maxCrop: maxCrop["Crop Name"],
      minCrop: minCrop["Crop Name"],
    };
  });

  return aggregatedData;
};

export const processAgricultureDataByCrop = (): CropAggregatedData[] => {
  const cropData: CropData[] = data as CropData[];

  const cropMap: { [key: string]: { totalYield: number; totalArea: number; count: number } } = {};

  // Group data by crop
  cropData.forEach((item) => {
    const crop = item["Crop Name"];
    if (!cropMap[crop]) {
      cropMap[crop] = {
        totalYield: 0,
        totalArea: 0,
        count: 0
      };
    }
    cropMap[crop].totalYield += item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] || 0;
    cropMap[crop].totalArea += item["Area Under Cultivation (UOM:Ha(Hectares))"] || 0;
    cropMap[crop].count += 1;
  });

  // Calculate averages
  const aggregatedData = Object.keys(cropMap).map((crop) => {
    const { totalYield, totalArea, count } = cropMap[crop];
    return {
      crop,
      averageYield: parseFloat((totalYield / count).toFixed(3)),
      averageArea: parseFloat((totalArea / count).toFixed(3)),
    };
  });

  return aggregatedData;
};
