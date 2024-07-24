import data from '../agricultureData.json';

// Define the structure of the crop data
interface CropData {
  Country: string;
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))"?: number;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"?: number;
  "Area Under Cultivation (UOM:Ha(Hectares))"?: number;
}

// Define the structure for yearly aggregated data
interface YearlyData {
  Year: string;
  maxCrop: string;
  minCrop: string;
}

// Define the structure for aggregated crop data
interface CropAggregatedData {
  crop: string;
  averageYield: number;
  averageArea: number;
}

// Helper function to extract the year from a string
const extractYear = (yearString: string): string => {
  const match = yearString.match(/(\d{4})$/);
  return match ? match[0] : yearString;
};

// Process the data to aggregate by year
export const processAgricultureDataByYear = (): YearlyData[] => {
  const cropData: CropData[] = data as CropData[];

  // Create a map to group data by year
  const yearMap: { [key: string]: CropData[] } = {};

  // Group crop data by year
  cropData.forEach((item) => {
    const year = extractYear(item.Year);
    if (!yearMap[year]) {
      yearMap[year] = [];
    }
    yearMap[year].push(item);
  });

  // Aggregate the data for each year
  const aggregatedData = Object.keys(yearMap).map((year) => {
    const crops = yearMap[year];
    // Find the crop with the maximum production in the year
    const maxCrop = crops.reduce((prev, curr) =>
      (prev["Crop Production (UOM:t(Tonnes))"] || 0) > (curr["Crop Production (UOM:t(Tonnes))"] || 0) ? prev : curr
    );
    // Find the crop with the minimum production in the year
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

// Process the data to aggregate by crop
export const processAgricultureDataByCrop = (): CropAggregatedData[] => {
  const cropData: CropData[] = data as CropData[];

  // Create a map to group data by crop
  const cropMap: { [key: string]: { totalYield: number; totalArea: number; count: number } } = {};

  // Group crop data and calculate totals for yield and area
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

  // Calculate average values for each crop
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
