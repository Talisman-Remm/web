export const fetchTrendData = async (keyword: string) => {
  try {
const MAKE_URL = 'https://hook.us2.make.com/liw0drtm9xwkq35l9t5gtse0yk28nzu9';
const response = await fetch(`${MAKE_URL}?keyword=${encodeURIComponent(keyword)}`);
    const rawData = await response.json();

    const chartData = rawData.map((item: any) => ({
      name: item.date.split('–')[0].trim(),
      value: item.values?.[0]?.extracted_value || 0
    }));

    // Cálculos para tus nuevas tarjetas
    const values = chartData.map(d => d.value);
    const currentInterest = values[values.length - 1];
    const peakInterest = Math.max(...values);
    const lowestInterest = Math.min(...values);
    
    // Encontrar la fecha del pico
    const peakDate = chartData.find(d => d.value === peakInterest)?.name || "";
    const lowestDate = chartData.find(d => d.value === lowestInterest)?.name || "";

    return {
      chartData,
      stats: {
        current: currentInterest,
        peak: peakInterest,
        peakDate,
        lowest: lowestInterest,
        lowestDate,
        status: currentInterest > values[values.length - 2] ? "On the Hype!" : "Cooling Down"
      }
    };
  } catch (e) {
    console.error(e);
    return null;
  }
};