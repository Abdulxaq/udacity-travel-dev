

const handleSubmit = async (event) => {
  event.preventDefault()
  const placeName = document.getElementById('name').value;
  const results = document.getElementById('results');
  const user = 'abdulkhak';
  const geonamesBaseUrl = 'http://api.geonames.org/searchJSON?q=';
  const weatherBitBaseUrl = 'https://api.weatherbit.io/v2.0/forecast/hourly?lat=38.123&lon=-78.543&hours=48';
  const pixabyBaseUrl = 'https://pixabay.com/api/?'
  const weatherBitApiKey = 'c7a7dc2f7e16491d8a35bdc0df767fc9';
  const pixabayApiKey = '24890188-5152ada420a008bea2b482ee4'
  const unspLashApiKey = 'wvkoWLVPOx07gcvHvdfL-ZPSylMDpMX2W4FM0WvMMRU';


  const rows = 1;
  results.innerHTML = '';
  if (placeName == '') {
    return alert('Please, enter a LINK to check!')
  }

  // const requestOptions = {
  //   method: 'POST',
  //   body: formdata,
  //   redirect: 'follow'
  // };

  const geoName = fetch(`${geonamesBaseUrl}${placeName}&maxRows=${rows}&username=${user}`)
    .then(geonameApiResponse => ({

      body: geonameApiResponse.json()

    }))
    .then(({ body }) => {

      return body

    })
    .then(({ geonames }) => {

      const { lat, lng, toponymName } = geonames[0]

      const weatherBit = fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${weatherBitApiKey}`)
        .then(weatherApiResponse => ({

          weatherBody: weatherApiResponse.json()

        }))
        .then(({ weatherBody }) => {

          return weatherBody;

        })
        .then(({ data }) => {

          const pixabyApi = fetch(`https://api.unsplash.com/search/photos/?query=${placeName}&fit=fill&fill=blur&w=250&h=250&&page=1&client_id=${unspLashApiKey}`)

            .then((pixabyApiResponse) => {

              return pixabyApiResponse.json()

            })
            .then((datata) => {
              console.log(datata.results[0].urls);

              for (let i = 0; i < datata.results.length; i++) {
                const { full, raw, regular, small, thumb } = datata.results[i].urls
                let img4 = document.createElement('img')
                img4.setAttribute('src', full)
                results.append(img4);
              }

            })
          //               .then(({hits})=>{


          //                 for (let i = 0; i < hits.length; i++) {
          //                   const {webformatURL} = hits[i];
          //                   let img4 = document.createElement('img')
          //                   img4.setAttribute('src', webformatURL)
          //                   results.append(img4);

          //                 }


          //                 console.log(hits);

          //               })

          console.log(data);

          results.innerHTML = `
                        <div class="tab" >
                            <p>Place name: ${toponymName}</p>
                            <p>Place latitude: ${lat}</p>
                            <p>Place longtitude: ${lng}</p>
                        </div>
                        <div class="tab" >
                            <p>Rain</p>
                            <p>Snow</p>
                            <p>Temp</p>
                        </div>
                        `
          for (let i = 0; i < data.length; i++) {
            const { pop, snow, temp } = data[i];
            let div = document.createElement('div')
            let p1 = document.createElement('p')
            let p2 = document.createElement('p')
            let p3 = document.createElement('p')
            p1.textContent = pop > 40 ? 'Rain' : 'No rain';
            p2.textContent = snow > 30 ? 'Snow' : 'No Snow';
            p3.textContent = temp;
            div.append(p1)
            div.append(p2)
            div.append(p3)
            results.append(div);

          }

        })

    }).then(() => {
      console.log('Working');
    })
    .catch(error => console.log('error', error));


}

export { handleSubmit }

