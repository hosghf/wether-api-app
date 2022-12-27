const cityField = document.querySelector('.city')
const submitButton = document.querySelector('.submit')
const resultDom = document.querySelector('.result')
const loading = document.querySelector('.loading')

submitButton.onclick = showResult

async function getWeatherData() {
  toggleLoading()
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityField.value}&APPID=6f7fcd30fb6bfeae08d475d0b894b435`

  const response = await fetch(url, {mode: 'cors'})
  if(response.status === 200) {
    return await response.json()
  }

  if(response.status === 404) throw 404
}

async function showResult() {
  try {
    const data = await getWeatherData()
    const description = data.weather[0].description
    resultDom.innerHTML = `<span class="success">${cityField.value}</span> weather is <span class="gray">${description}<span>`
  } catch (err) {
    if(err === 404) resultDom.innerHTML = "<span class='danger'>the city didn't find</span>"
  }

  toggleLoading()
}

function toggleLoading() {
  if(loading.classList.value.includes('d-none')) {
    loading.classList.remove('d-none')
    return
  }

  loading.classList.add('d-none')
}
