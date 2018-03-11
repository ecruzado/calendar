import https from 'https';

const getHolidays = (year, country) => new Promise ((resolve, reject) => {
  let region = undefined;
  if (country === 'usa') region = 'ca';
  else if (country === 'can') region = 'on';
  else if (country === 'nzl') region = 'wgn'; 
  
  const parameters = [
      `year=${year}`,
      `country=${country}`,
      region ? `region=${region}` : undefined
    ].map(x => x);

    const url = 'https://kayaposoft.com/enrico/json/v2.0/?action=getHolidaysForYear&holidayType=public_holiday&';
    const querystring = parameters.join('&');

    const callback = (error, data) => console.log(data);

    const uri = `${url}${querystring}`;
  
    https.get(uri, function (res) {
      res.on('data', function (data) {
        try {
          data = JSON.parse(data);
        } catch (e) {
          data = {};
        }
  
        var error = null;
  
        if (res.statusCode !== 200) {
          if ('undefined' === typeof data['error']) {
            error = 'Unknown error.';
            reject(error);
          } else {
            reject(data.error);
          }
        }
  
        resolve(data);
      });
    }).on('error', function (e) {
        reject(e.message);
    })
});

export default getHolidays;