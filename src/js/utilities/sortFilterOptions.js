import { default as sortedFRMTOptions } from 'configs/dashboards/financial/sortedFRMTOptions.json';

export default function sortFilterOptions(data) {
    let arr = [];

    sortedFRMTOptions.forEach(i => {
      const value = data.find(j => j.label === i);
      if (value) arr.push(value)
    })

    return [...new Set([...arr, ...data])]
};