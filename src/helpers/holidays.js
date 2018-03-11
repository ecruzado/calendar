import https from 'https';

export const getSupportedCountries = () => new Promise ((resolve, reject) => {

    const uri = 'https://kayaposoft.com/enrico/json/v2.0/?action=getSupportedCountries';
  
    https.get(uri, res => {
      let body = "";
      res.on('data', data => {
        body += data;
      });

      res.on('end', () => {
        
        let error = null;
        if (res.statusCode !== 200) {
          if ('undefined' === typeof data['error']) {
            error = 'Unknown error.';
            reject(error);
          } else {
            reject(data.error);
          }
        }

        const parsedData = JSON.parse(body);  
        resolve(parsedData);
      });

    }).on('error', e => {
        reject(e);
    });
});

export const getHolidays = (year, country) => new Promise ((resolve, reject) => {
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
  const uri = `${url}${querystring}`;

  https.get(uri, res => {
    let body = "";
    res.on('data', data => {
      body += data;
    });

    res.on('end', () => {
      
      let error = null;
      if (res.statusCode !== 200) {
        if ('undefined' === typeof data['error']) {
          error = 'Unknown error.';
          reject(error);
        } else {
          reject(data.error);
        }
      }

      const parsedData = JSON.parse(body);  
      resolve(parsedData);
    });

  }).on('error', e => {
      reject(e);
  });
});

