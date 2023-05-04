import { format } from 'date-fns';

 function convertDateTimeToTime(dateString) {
    const dateObject = new Date(dateString);
    return format(dateObject, 'HH:mm');
  }


  export function convertData(data){
      const convertedData = data.map((item) => {
        return {
          ...item,
          TimeDate: convertDateTimeToTime(item.TimeDate),
        };
      });
  }
  