const form = document.getElementById('form');
const d = new Date();
const year = d.getFullYear();
const month = d.getMonth();
const day = d.getDate();





const handleSubmit = async (event) => {
  event.preventDefault()
  const placeName = document.getElementById('name').value;
  const results = document.getElementById('results');

  const card = document.getElementById('card');

  const user = 'abdulkhak';
  const geonamesBaseUrl = 'http://api.geonames.org/searchJSON?q=';
  const weatherBitApiKey = 'c7a7dc2f7e16491d8a35bdc0df767fc9';
  const unspLashApiKey = 'wvkoWLVPOx07gcvHvdfL-ZPSylMDpMX2W4FM0WvMMRU';


  const rows = 1;
  card.innerHTML = '';
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
          const dateInput = document.getElementById('dateInput').value;
          const valOfEnteredInput = dateInput.slice(8, 10);
          const realDay = day - valOfEnteredInput
          // console.log(weatherBody);
          // console.log(dateInput);
          // console.log(valOfEnteredInput);
          // console.log(realDay);

          return weatherBody;


        })
        .then(({ data }) => {

          const pixabyApi = fetch(`https://api.unsplash.com/search/photos/?query=${placeName}&fit=fill&fill=blur&w=250&h=250&&page=1&client_id=${unspLashApiKey}`)

            .then((pixabyApiResponse) => {

              return pixabyApiResponse.json()

            })
            .then((datata) => {

              /*
              
              <img src="https://images.unsplash.com/photo-1641078864179-ba5d900e43f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" id="placeImg" >
                                          <p id="placeName" >America</p>
                                          <p>Weather forcast for the next<br> 16 days in <u id="placeName2" >America</u> </p>
              
              
                                          <div id="tempFrame" >
              
                                              <div id="tempSet" >
                                                  <h6>2000-20-45</h6>
                                                  <div id="weather" >
                                                      <p class="text">No rain</p>
                                                      <p class="text">Snow</p>
                                                  </div>
                                                  <p class="text temp">Temp: 35</p>
                                              </div>
                                          </div>

              
              */

              // console.log(datata.results[0].urls);

              const { full, raw, regular, small, thumb } = datata.results[0].urls;
              let img4 = document.createElement('img');
              img4.setAttribute('src', full);
              card.append(img4);
              const p = document.createElement("p");
              const placeN = document.createElement("p");
              placeN.setAttribute('id', 'placeName')
              placeN.innerText = placeName;
              p.innerHTML = `Weather forcast for the next<br> 16 days in <u>${placeName}</u>`
              card.append(placeN)
              card.append(p)

            }).then(()=>{

              // console.log(data);
              const tempFrame = document.createElement('div');
              tempFrame.setAttribute("id", "tempFrame");




              for (let i = 0; i < data.length; i++) {
                const { pop, snow, temp, datetime } = data[i];

                const tempSet = document.createElement('div');
                tempSet.setAttribute("id", "tempSet");

                const h6 = document.createElement('h6');

                h6.innerText = datetime;
                tempSet.append(h6);
              
                const weather = document.createElement('div');
                let p1 = document.createElement('p');
                let p2 = document.createElement('p');
                let p3 = document.createElement('p');
                p1.setAttribute('class', 'text');
                p2.setAttribute('class', 'text');
                p3.setAttribute('class', 'text');

                p1.textContent = pop > 40 ? 'Rain' : 'No rain';
                p2.textContent = snow > 30 ? 'Snow' : 'No Snow';
                p3.textContent = temp;
                weather.append(p1);
                weather.append(p2);
                weather.append(p3);
                tempSet.append(weather);
                tempFrame.append(tempSet)
              }
              card.append(tempFrame);
            })
    

        })

    }).then(() => {
      // console.log('Working');
    })
    .catch(error => console.log('error', error));


}

export { handleSubmit }

